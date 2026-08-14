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
    <div className="max-w-[1400px] mx-auto px-4 py-6 md:px-8">
      <header className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-label-sm text-on-surface-variant uppercase tracking-[0.2em]">Product Management</p>
          <h1 className="mt-2 text-headline-lg text-on-surface font-bold">Upload New Asset</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 bg-surface-container-lowest border border-white/50 rounded-full px-4 py-2 shadow-sm">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
            <input
              aria-label="Search"
              className="w-56 border-0 bg-transparent text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none"
              placeholder="Search anything..."
            />
          </div>
          <button className="w-10 h-10 rounded-full bg-surface-container-lowest border border-white/50 text-on-surface-variant flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <Link href="/dashboard" className="text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined">close</span>
            Cancel
          </Link>
        </div>
      </header>

      <div className="bg-surface-container-lowest rounded-[28px] border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="border-b border-surface-variant/20 bg-surface-container-low px-6 py-5">
          <div className="flex items-center max-w-lg">
            {STEPS.map((step, idx) => (
              <React.Fragment key={step}>
                <div className="flex flex-1 items-center gap-2">
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
                {idx < STEPS.length - 1 && <div className={`h-[2px] flex-1 mx-2 ${idx < currentStep ? 'bg-secondary' : 'bg-outline-variant'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="px-6 py-8 md:px-8">
          {currentStep === 0 && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="xl:col-span-8 flex flex-col gap-6">
                <div
                  className={`w-full border-2 border-dashed rounded-[24px] p-8 md:p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
                    isDragging ? 'border-primary bg-primary-container/10' : 'border-outline-variant bg-surface-container-low hover:border-primary hover:bg-surface-bright'
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isDragging ? 'bg-primary-container/20 scale-110' : 'bg-primary-container/10'}`}>
                    <span className="material-symbols-outlined text-[40px] text-primary">cloud_upload</span>
                  </div>
                  <h3 className="text-headline-md text-on-surface text-center">Drag & Drop your files here</h3>
                  <p className="max-w-md text-body-sm text-on-surface-variant text-center">
                    Upload your main design source file, preview image, and any supporting assets.
                  </p>
                  <button type="button" className="pointer-events-none bg-primary text-on-primary px-6 py-3 rounded-lg text-label-md font-label-md shadow-sm">
                    Browse Files
                  </button>
                  <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
                </div>

                {files.length > 0 && (
                  <div className="bg-surface-container-low border border-outline-variant rounded-[22px] p-5 flex flex-col gap-4">
                    <h4 className="text-label-md text-on-surface font-bold">Uploaded Assets</h4>
                    {files.map((file) => (
                      <div key={file.id} className="relative flex items-center justify-between gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-4 overflow-hidden">
                        {file.status === 'uploading' && (
                          <div className="absolute left-0 bottom-0 h-1 bg-primary transition-all duration-300" style={{ width: `${file.progress}%` }} />
                        )}
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="relative w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center overflow-hidden shrink-0">
                            {file.previewUrl ? (<Image src={file.previewUrl} alt={file.name} fill className="object-cover" />) : (<span className="material-symbols-outlined">folder_zip</span>)}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-label-md text-on-surface">{file.name}</p>
                            <p className="text-body-sm text-on-surface-variant capitalize">
                              {file.type} File · {file.size}
                              {file.status === 'uploading' && ` · Uploading... ${Math.round(file.progress)}%`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {file.status === 'done' && (
                            <div className="flex items-center gap-1 text-secondary">
                              <span className="material-symbols-outlined text-[16px]">check_circle</span>
                              <span className="text-label-sm">Done</span>
                            </div>
                          )}
                          <button onClick={() => removeFile(file.id)} className="p-1 text-on-surface-variant hover:text-error">
                            <span className="material-symbols-outlined">{file.status === 'done' ? 'delete' : 'close'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <aside className="xl:col-span-4">
                <div className="bg-surface-container-low border border-outline-variant rounded-[24px] p-5 xl:sticky xl:top-6 flex flex-col gap-6">
                  <h4 className="text-label-md text-on-surface font-bold border-b border-outline-variant pb-4">Thumbnail Preview</h4>
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-outline-variant border-dashed bg-surface-container-highest">
                    {thumbnailPreview ? (
                      <Image src={thumbnailPreview} alt="Thumbnail Preview" fill className="object-cover" />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[32px]">add_photo_alternate</span>
                        <p className="text-label-sm text-center">Select primary preview image</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-label-sm text-on-surface-variant">Asset Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-xl border border-outline-variant bg-surface-bright px-4 py-3 text-body-md text-on-surface outline-none focus:border-secondary focus:ring-1 focus:ring-secondary">
                      <option value="">Select Category...</option>
                      <option>UI Kits</option>
                      <option>Vectors</option>
                      <option>Fonts</option>
                      <option>3D Assets</option>
                      <option>Templates</option>
                      <option>Illustrations</option>
                    </select>
                  </div>

                  <div className="flex gap-3 rounded-2xl bg-surface-container-lowest p-4 border border-outline-variant">
                    <span className="material-symbols-outlined text-secondary">info</span>
                    <div>
                      <p className="text-label-sm font-bold text-on-surface mb-1">Upload Guidelines</p>
                      <p className="text-body-sm text-on-surface-variant leading-relaxed">Keep your thumbnail close to 1920×1080 and include all source files in the ZIP package.</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}

          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-label-md text-on-surface font-bold">Asset Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Modern SaaS UI Kit" className="w-full rounded-xl border border-outline-variant bg-surface-bright px-4 py-3 text-body-md text-on-surface outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-label-md text-on-surface font-bold">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Describe your asset — what's included, features, use-cases..." className="w-full resize-none rounded-xl border border-outline-variant bg-surface-bright px-4 py-3 text-body-md text-on-surface outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-label-md text-on-surface font-bold">Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">$</span>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" step="0.01" className="w-full rounded-xl border border-outline-variant bg-surface-bright pl-8 pr-4 py-3 text-body-md text-on-surface outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-label-md text-on-surface font-bold">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-xl border border-outline-variant bg-surface-bright px-4 py-3 text-body-md text-on-surface outline-none focus:border-secondary focus:ring-1 focus:ring-secondary">
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
                <label className="text-label-md text-on-surface font-bold">Tags <span className="font-normal text-on-surface-variant">(comma-separated)</span></label>
                <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. ui kit, dashboard, saas, minimal" className="w-full rounded-xl border border-outline-variant bg-surface-bright px-4 py-3 text-body-md text-on-surface outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
                {tags && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {tags.split(',').map(tag => tag.trim()).filter(Boolean).map((tag, i) => (
                      <span key={i} className="rounded-full bg-secondary-container text-on-secondary-container px-3 py-1 text-label-sm">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="max-w-2xl mx-auto">
              <div className="rounded-[24px] border border-outline-variant bg-surface-container-lowest p-8">
                <h2 className="mb-6 text-headline-md text-on-surface font-bold">Review Your Submission</h2>
                <div className="flex flex-col gap-5">
                  {thumbnailPreview && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-outline-variant">
                      <Image src={thumbnailPreview} alt="Preview" fill className="object-cover" />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="mb-1 text-label-sm text-on-surface-variant">Title</p>
                      <p className="text-body-md text-on-surface font-semibold">{title || '—'}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-label-sm text-on-surface-variant">Category</p>
                      <p className="text-body-md text-on-surface font-semibold">{category || '—'}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-label-sm text-on-surface-variant">Price</p>
                      <p className="text-body-md text-on-surface font-semibold">{price ? `$${price}` : '—'}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-label-sm text-on-surface-variant">Files</p>
                      <p className="text-body-md text-on-surface font-semibold">{files.length} file(s)</p>
                    </div>
                  </div>

                  {description && (
                    <div>
                      <p className="mb-1 text-label-sm text-on-surface-variant">Description</p>
                      <p className="text-body-sm text-on-surface leading-relaxed">{description}</p>
                    </div>
                  )}

                  {tags && (
                    <div>
                      <p className="mb-2 text-label-sm text-on-surface-variant">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {tags.split(',').map(t => t.trim()).filter(Boolean).map((tag, i) => (
                          <span key={i} className="rounded-full bg-secondary-container text-on-secondary-container px-3 py-1 text-label-sm">{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 rounded-2xl border border-secondary/20 bg-secondary-container/30 p-4">
                    <span className="material-symbols-outlined text-secondary">verified</span>
                    <div>
                      <p className="text-label-md text-on-surface font-bold">Ready to Submit</p>
                      <p className="text-body-sm text-on-surface-variant">Your asset will be reviewed within 2-3 business days.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-outline-variant bg-surface px-6 py-4 md:px-8 flex items-center justify-between gap-3">
          <button
            onClick={() => currentStep > 0 && setCurrentStep(p => p - 1)}
            className="px-6 py-2 rounded-lg border-2 border-secondary text-secondary text-label-md font-label-md hover:bg-secondary-fixed transition-colors"
          >
            {currentStep === 0 ? 'Save Draft' : 'Back'}
          </button>

          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={() => setCurrentStep(p => p + 1)}
              className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-label-md font-label-md text-on-primary shadow-sm hover:opacity-90 transition-opacity"
            >
              Continue to {STEPS[currentStep + 1]}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          ) : (
            <button
              onClick={() => void handleSubmit()}
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-secondary px-8 py-3 text-label-md font-label-md text-on-secondary shadow-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              {isSubmitting ? 'Uploading...' : 'Submit for Review'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

