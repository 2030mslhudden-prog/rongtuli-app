'use client';
import React, { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface UploadedFile {
  id: string;
  name: string;
  type: 'main' | 'thumbnail' | 'extra';
  size: string;
  status: 'uploading' | 'done' | 'error';
  progress: number;
  previewUrl?: string;
  file?: File;
}

const STEPS = ['Upload Files', 'Details', 'Review'];

export default function UploadPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('0');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = useCallback((file: File): UploadedFile => {
    const isImage = file.type.startsWith('image/');
    const isThumbnail = isImage && files.length === 0 || (isImage && !files.find(f => f.type === 'thumbnail'));
    const type: UploadedFile['type'] = isThumbnail ? 'thumbnail' : (files.length === 0 ? 'main' : 'extra');
    const sizeKb = file.size / 1024;
    const size = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb.toFixed(0)} KB`;
    const previewUrl = isImage ? URL.createObjectURL(file) : undefined;

    if (isImage && type === 'thumbnail') {
      setThumbnailPreview(previewUrl || null);
    }

    return {
      id: Math.random().toString(36).slice(2),
      name: file.name,
      type,
      size,
      status: 'uploading',
      progress: 0,
      previewUrl,
      file,
    };
  }, [files]);

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList).map((file) => simulateUpload(file));
    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((f, idx) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20 + 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles(prev =>
            prev.map(pf => pf.id === f.id ? { ...pf, progress: 100, status: 'done' } : pf)
          );
        } else {
          setFiles(prev =>
            prev.map(pf => pf.id === f.id ? { ...pf, progress } : pf)
          );
        }
      }, 300 + idx * 100);
    });
  }, [simulateUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeFile = (id: string) => {
    const file = files.find(f => f.id === id);
    if (file?.type === 'thumbnail') setThumbnailPreview(null);
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !category.trim()) {
      alert('অনুগ্রহ করে Asset Title এবং Category পূরণ করুন।');
      return;
    }

    const parsedPrice = Number(price);
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      alert('Price অবশ্যই শূন্য বা তার বেশি হতে হবে।');
      return;
    }

    if (files.length === 0) {
      alert('কমপক্ষে একটি ফাইল আপলোড করুন।');
      return;
    }

    try {
      setIsSubmitting(true);

      const uploaded = await Promise.all(
        files.map(async (file) => {
          if (!file.file) {
            return null;
          }

          const formData = new FormData();
          formData.append('file', file.file);

          const response = await fetch('/api/files/upload', {
            method: 'POST',
            body: formData,
          });

          const payload = await response.json();
          if (!response.ok) {
            throw new Error(payload?.error || 'File upload failed');
          }

          return {
            ...file,
            key: payload.key,
            url: payload.url,
            downloadUrl: payload.downloadUrl,
          };
        }),
      );

      const thumbnailAsset = uploaded.find((item) => item?.type === 'thumbnail');
      const sourceAsset = uploaded.find((item) => item && item.type !== 'thumbnail') ?? uploaded[0];
      const productPayload = {
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        price: parsedPrice,
        tags,
        imageUrl: thumbnailAsset?.url || thumbnailPreview || '/images/product-saas-checkout.jpg',
        fileUrl: sourceAsset?.key || null,
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productPayload),
      });

      const data = await response.json().catch(() => ({ error: 'Unknown error' }));
      if (!response.ok) {
        throw new Error(data?.error || 'Failed to save asset metadata');
      }

      alert('ডিজাইন সফলভাবে ডাটাবেজে যুক্ত হয়েছে! 🎉');
      window.location.href = '/dashboard/assets';
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'সার্ভারে সমস্যা হয়েছে।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full -m-10">
      {/* Sticky Header / Stepper */}
      <header className="bg-surface sticky top-0 z-40 border-b border-outline-variant py-5 px-8 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-headline-md font-headline-md font-bold text-on-surface">Upload New Asset</h1>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">Submit your creative work to the Rongtuli marketplace.</p>
          </div>
          <Link href="/dashboard" className="text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined">close</span>
            Cancel
          </Link>
        </div>

        {/* Progress Stepper */}
        <div className="flex items-center max-w-lg">
          {STEPS.map((step, idx) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center gap-1.5">
                <button
                  onClick={() => idx < currentStep && setCurrentStep(idx)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-label-sm font-label-sm transition-all ${
                    idx < currentStep
                      ? 'bg-secondary text-on-secondary cursor-pointer'
                      : idx === currentStep
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-high text-on-surface-variant border border-outline-variant'
                  }`}
                >
                  {idx < currentStep ? <span className="material-symbols-outlined text-[16px]">check</span> : idx + 1}
                </button>
                <span className={`text-label-sm font-label-sm ${idx === currentStep ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                  {step}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`flex-1 h-[2px] mx-1 -mt-5 transition-colors ${idx < currentStep ? 'bg-secondary' : 'bg-outline-variant'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-8 py-10 pb-28 overflow-y-auto">
        {currentStep === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Upload Area */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Drop Zone */}
              <div
                className={`w-full bg-surface-container-lowest border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer group shadow-sm ${
                  isDragging ? 'border-primary bg-primary-fixed/20' : 'border-outline-variant hover:border-primary hover:bg-surface-bright'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 transition-transform ${isDragging ? 'scale-110 bg-primary-fixed/30' : 'bg-primary-fixed/10 group-hover:scale-110'}`}>
                  <span className="material-symbols-outlined text-[40px] text-primary">cloud_upload</span>
                </div>
                <h3 className="text-headline-md font-headline-md text-on-surface text-center">Drag &amp; Drop your files here</h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant text-center max-w-md">
                  Upload your main design source file (ZIP), a high-resolution preview image (JPG/PNG), and any additional presentation assets.
                </p>
                <button
                  type="button"
                  className="mt-2 bg-primary text-on-primary px-6 py-3 rounded-lg text-label-md font-label-md hover:opacity-90 transition-opacity shadow-sm pointer-events-none"
                >
                  Browse Files
                </button>
                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
              </div>

              {/* Uploaded Files List */}
              {files.length > 0 && (
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-4">
                  <h4 className="text-label-md font-label-md text-on-surface font-bold">Uploaded Assets</h4>
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 border border-outline-variant rounded-lg bg-surface-bright relative overflow-hidden">
                      {file.status === 'uploading' && (
                        <div
                          className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      )}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden bg-secondary-container text-on-secondary-container shrink-0 relative">
                          {file.previewUrl ? (
                            <Image src={file.previewUrl} alt="Preview" fill className="object-cover" />
                          ) : (
                            <span className="material-symbols-outlined">folder_zip</span>
                          )}
                        </div>
                        <div>
                          <p className="text-label-md font-label-md text-on-surface">{file.name}</p>
                          <p className="text-body-sm font-body-sm text-on-surface-variant capitalize">
                            {file.type} File · {file.size}
                            {file.status === 'uploading' && ` · Uploading... ${Math.round(file.progress)}%`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {file.status === 'done' && (
                          <div className="flex items-center gap-1 text-secondary">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            <span className="text-label-sm font-label-sm">Done</span>
                          </div>
                        )}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-on-surface-variant hover:text-error transition-colors p-1"
                        >
                          <span className="material-symbols-outlined">{file.status === 'done' ? 'delete' : 'close'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Preview */}
            <div className="lg:col-span-4">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-6 sticky top-[160px]">
                <h4 className="text-label-md font-label-md text-on-surface font-bold border-b border-outline-variant pb-4">Thumbnail Preview</h4>
                <div className="aspect-video w-full bg-surface-container-highest rounded-lg border border-outline-variant border-dashed flex items-center justify-center overflow-hidden relative">
                  {thumbnailPreview ? (
                    <Image src={thumbnailPreview} alt="Thumbnail Preview" fill className="object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[32px]">add_photo_alternate</span>
                      <p className="text-label-sm font-label-sm text-center">Select primary preview image</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-label-sm font-label-sm text-on-surface-variant">Asset Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-surface-bright border border-outline-variant rounded-lg px-4 py-3 text-body-md font-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors appearance-none"
                  >
                    <option value="">Select Category...</option>
                    <option>UI Kits</option>
                    <option>Vectors</option>
                    <option>Fonts</option>
                    <option>3D Assets</option>
                    <option>Templates</option>
                    <option>Illustrations</option>
                  </select>
                </div>

                <div className="bg-surface-container-low p-4 rounded-lg flex gap-3 items-start border border-outline-variant">
                  <span className="material-symbols-outlined text-secondary shrink-0">info</span>
                  <div>
                    <p className="text-label-sm font-label-sm font-bold text-on-surface mb-1">Upload Guidelines</p>
                    <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                      Ensure your zip file contains all necessary source files. Thumbnails should be exactly 1920×1080px (16:9).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-label-md font-label-md text-on-surface font-bold">Asset Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Modern SaaS UI Kit"
                className="w-full bg-surface-bright border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-md font-label-md text-on-surface font-bold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Describe your asset — what's included, features, use-cases..."
                className="w-full bg-surface-bright border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-label-md font-label-md text-on-surface font-bold">Price (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">$</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full bg-surface-bright border border-outline-variant rounded-lg pl-8 pr-4 py-3 text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-md font-label-md text-on-surface font-bold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-surface-bright border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors appearance-none"
                >
                  <option value="">Select...</option>
                  <option>UI Kits</option>
                  <option>Vectors</option>
                  <option>Fonts</option>
                  <option>3D Assets</option>
                  <option>Templates</option>
                  <option>Illustrations</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-md font-label-md text-on-surface font-bold">Tags <span className="text-on-surface-variant font-normal">(comma-separated)</span></label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. ui kit, dashboard, saas, minimal"
                className="w-full bg-surface-bright border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors"
              />
              {tags && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {tags.split(',').map(tag => tag.trim()).filter(Boolean).map((tag, i) => (
                    <span key={i} className="bg-secondary-container text-on-secondary-container text-label-sm font-label-sm px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm">
              <h2 className="text-headline-md font-headline-md text-on-surface mb-6">Review Your Submission</h2>
              <div className="flex flex-col gap-5">
                {thumbnailPreview && (
                  <div className="aspect-video w-full rounded-lg overflow-hidden relative border border-outline-variant">
                    <Image src={thumbnailPreview} alt="Preview" fill className="object-cover" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant mb-1">Title</p>
                    <p className="text-body-md font-body-md text-on-surface font-semibold">{title || '—'}</p>
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant mb-1">Category</p>
                    <p className="text-body-md font-body-md text-on-surface font-semibold">{category || '—'}</p>
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant mb-1">Price</p>
                    <p className="text-body-md font-body-md text-on-surface font-semibold">{price ? `$${price}` : '—'}</p>
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant mb-1">Files</p>
                    <p className="text-body-md font-body-md text-on-surface font-semibold">{files.length} file(s)</p>
                  </div>
                </div>
                {description && (
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant mb-1">Description</p>
                    <p className="text-body-sm font-body-sm text-on-surface leading-relaxed">{description}</p>
                  </div>
                )}
                {tags && (
                  <div>
                    <p className="text-label-sm font-label-sm text-on-surface-variant mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.split(',').map(t => t.trim()).filter(Boolean).map((tag, i) => (
                        <span key={i} className="bg-secondary-container text-on-secondary-container text-label-sm font-label-sm px-3 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="bg-secondary-container/30 border border-secondary/20 rounded-lg p-4 flex gap-3 items-start">
                  <span className="material-symbols-outlined text-secondary">verified</span>
                  <div>
                    <p className="text-label-md font-label-md text-on-surface font-bold">Ready to Submit</p>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">Your asset will be reviewed within 2-3 business days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="bg-surface border-t border-outline-variant p-4 px-8 flex justify-between items-center sticky bottom-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button
          className="px-6 py-2 border-2 border-secondary text-secondary rounded-lg text-label-md font-label-md hover:bg-secondary-fixed transition-colors"
          onClick={() => currentStep > 0 && setCurrentStep(p => p - 1)}
        >
          {currentStep === 0 ? 'Save Draft' : 'Back'}
        </button>
        {currentStep < STEPS.length - 1 ? (
          <button
            onClick={() => setCurrentStep(p => p + 1)}
            className="px-8 py-3 bg-primary text-on-primary rounded-lg text-label-md font-label-md hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2"
          >
            Continue to {STEPS[currentStep + 1]}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        ) : (
          <button
            onClick={() => void handleSubmit()}
            disabled={isSubmitting}
            className="px-8 py-3 bg-secondary text-on-secondary rounded-lg text-label-md font-label-md hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            {isSubmitting ? 'Uploading...' : 'Submit for Review'}
          </button>
        )}
      </div>
    </div>
  );
}
