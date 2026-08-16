'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('print');
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [sourceFiles, setSourceFiles] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const sourceFilesInputRef = useRef<HTMLInputElement>(null);

  // Fetch product data on load
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        const product = data.product;
        if (product) {
          setTitle(product.title);
          setDescription(product.description);
          setPrice(String(product.price));
          setCategory(product.category);
          setSelectedProductType(product.tags || 'print');
          setBannerPreview(product.imageUrl);
        }
        setLoading(false);
      })
      .catch(() => {
        alert('ডিজাইনের তথ্য লোড করা যায়নি।');
        setLoading(false);
      });
  }, [id]);

  const handleBannerSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('অনুগ্রহ করে শুধুমাত্র ইমেজ ফাইল আপলোড করুন।');
      return;
    }
    setBanner(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleBannerSelect(files[0]);
    }
  };

  const handleBannerFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleBannerSelect(e.target.files[0]);
    }
  };

  const handleSourceFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSourceFiles(e.target.files[0]);
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      alert('ডিজাইনের শিরোনাম প্রদান করুন।');
      return false;
    }
    if (!description.trim()) {
      alert('ডিজাইনের বিবরণ প্রদান করুন।');
      return false;
    }
    if (!price.trim() || isNaN(Number(price)) || Number(price) < 0) {
      alert('সঠিক মূল্য প্রদান করুন (ফ্রি হলে 0 লিখুন)।');
      return false;
    }
    if (!category) {
      alert('অনুগ্রহ করে একটি ক্যাটেগরি নির্বাচন করুন।');
      return false;
    }
    return true;
  };

  const uploadFileToR2 = async (file: File): Promise<{ key: string; url: string } | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/files/upload', { method: 'POST', body: formData });
      if (response.ok) {
        const data = await response.json();
        return { key: data.key, url: data.url };
      }
      const err = await response.json();
      console.error('Upload failed:', err.error || response.statusText);
      return null;
    } catch (error) {
      console.error('File upload error:', error);
      return null;
    }
  };

  const handleSave = async (statusOverride?: string) => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      let finalImageUrl = bannerPreview;
      let finalSourceFilesKey = undefined;

      // Upload Banner Image if updated
      if (banner) {
        const bannerResult = await uploadFileToR2(banner);
        if (!bannerResult) {
          alert('নতুন ব্যানার ইমেজ আপলোড করতে সমস্যা হয়েছে। R2 স্টোরেজ কনফিগারেশন চেক করুন।');
          setIsSubmitting(false);
          return;
        }
        finalImageUrl = bannerResult.url;
      }

      // Upload Source File (ZIP) if updated
      if (sourceFiles) {
        const sourceResult = await uploadFileToR2(sourceFiles);
        if (!sourceResult) {
          alert('নতুন সোর্স ফাইল (ZIP) আপলোড করতে সমস্যা হয়েছে।');
          setIsSubmitting(false);
          return;
        }
        finalSourceFilesKey = sourceResult.key;
      }

      const payload: any = {
        title: title.trim(),
        description: description.trim(),
        price: parseFloat(price),
        category,
        imageUrl: finalImageUrl,
        tags: selectedProductType,
      };

      if (finalSourceFilesKey !== undefined) {
        payload.fileUrl = finalSourceFilesKey;
      }
      if (statusOverride) {
        payload.status = statusOverride;
      }

      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('ডিজাইন সফলভাবে আপডেট করা হয়েছে! 🎉');
        window.location.href = '/dashboard/assets';
      } else {
        const errorData = await response.json();
        alert('ত্রুটি: ' + (errorData.error || response.statusText));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('আপডেট করতে সমস্যা হয়েছে: ' + (error instanceof Error ? error.message : 'Unknown'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-container-max mx-auto p-12 text-center text-on-surface-variant">
        <span className="material-symbols-outlined text-4xl mb-2 animate-spin text-primary">autorenew</span>
        <p className="text-body-sm">লোড হচ্ছে…</p>
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto p-4 md:p-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-outline-variant/30">
        <div>
          <div className="flex items-center space-x-2 text-on-surface-variant mb-2">
            <span className="font-label-sm text-label-sm uppercase tracking-wider">ড্যাশবোর্ড</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider">আমার ডিজাইনসমূহ</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">ডিজাইন সম্পাদনা</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">ডিজাইন সম্পাদনা করুন</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">ডিজাইনের বিবরণ, মূল্য, প্রিভিউ অথবা সোর্স ফাইল পরিবর্তন করুন। পরিবর্তনগুলো মার্কেটপ্লেসে সরাসরি আপডেট হবে।</p>
        </div>

        <div className="mt-4 md:mt-0 flex gap-3">
          <Link
            href="/dashboard/assets"
            className="px-5 py-2.5 rounded-lg border-2 border-outline text-on-surface font-label-md text-label-md hover:border-primary hover:text-primary transition-all text-center"
          >
            বাতিল করুন
          </Link>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-lg bg-primary text-white font-label-md text-label-md hover:bg-opacity-90 transition-all shadow-sm hover:shadow-md cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span className="material-symbols-outlined text-[18px]">{isSubmitting ? 'hourglass_empty' : 'save'}</span>
            <span>{isSubmitting ? 'আপডেট হচ্ছে...' : 'আপডেট সেভ করুন'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Forms */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Media Assets Section */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-6 shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-2 flex items-center space-x-2">
              <span className="material-symbols-outlined text-primary">perm_media</span>
              <span>মিডিয়া ও সোর্স ফাইল পরিবর্তন</span>
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">নতুন ব্যানার ইমেজ বা প্রজেক্ট জিপ ফাইল আপলোড করতে পারেন। কোনো নতুন ফাইল আপলোড না করলে পূর্বের ফাইলই বহাল থাকবে।</p>
            
            <div className="space-y-6">
              {/* Product Preview Image Dropzone */}
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface mb-2 font-bold">ডিজাইন ব্যানার/প্রিভিউ ইমেজ (16:9 অনুপাত) *</label>
                <div
                  className={`border-2 border-dashed rounded-xl bg-surface-container-low transition-colors p-8 flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden ${
                    isDragging ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/50'
                  }`}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => bannerInputRef.current?.click()}
                >
                  {bannerPreview ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-outline-variant">
                      <Image
                        alt="Preview"
                        src={bannerPreview}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-white text-sm bg-black/60 px-4 py-2 rounded-full font-bold">নতুন ইমেজ পরিবর্তন করুন</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-3xl text-primary">image</span>
                      </div>
                      <p className="font-label-md text-label-md text-on-surface mb-1">প্রিভিউ ইমেজ ড্র্যাগ করুন অথবা এখানে ক্লিক করুন</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">সমর্থিত ফরম্যাট: JPG, PNG, WEBP (সর্বোচ্চ 5MB)</p>
                    </>
                  )}
                  <input
                    ref={bannerInputRef}
                    accept="image/*"
                    className="hidden"
                    type="file"
                    onChange={handleBannerFileSelect}
                  />
                </div>
              </div>

              {/* Source Zip File Upload */}
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface mb-2 font-bold">নতুন সোর্স ফাইল (ZIP/RAR) - ঐচ্ছিক</label>
                <div
                  className="border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-low hover:border-primary/50 transition-colors p-6 flex items-center space-x-4 cursor-pointer group relative"
                  onClick={() => sourceFilesInputRef.current?.click()}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-2xl text-primary">folder_zip</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-label-md text-label-md text-on-surface">নতুন প্রজেক্ট সোর্স ফাইল আপলোড করতে এখানে ক্লিক করুন</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">ফাইল পরিবর্তন করতে চাইলে নতুন ফাইলটি নির্বাচন করুন (সর্বোচ্চ ৫০০ মেগাবাইট)</p>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg bg-surface-container-lowest shadow-sm border border-outline text-on-surface font-label-sm text-label-sm hover:border-primary transition-colors shrink-0 cursor-pointer"
                    type="button"
                  >
                    খুঁজুন
                  </button>
                  <input
                    ref={sourceFilesInputRef}
                    accept=".zip,.rar,.7z,.tar"
                    className="hidden"
                    type="file"
                    onChange={handleSourceFilesSelect}
                  />
                </div>
                {sourceFiles && (
                  <p className="mt-2 text-sm text-secondary font-bold flex items-center">
                    <span className="material-symbols-outlined text-[18px] mr-1">check_circle</span>
                    নতুন ফাইল: {sourceFiles.name} ({ (sourceFiles.size / (1024 * 1024)).toFixed(2) } MB)
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-6 shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center space-x-2">
              <span className="material-symbols-outlined text-primary">edit_note</span>
              <span>ডিজাইন ইনফরমেশন</span>
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface mb-2 font-bold" htmlFor="product-title">ডিজাইনের নাম/শিরোনাম *</label>
                <input
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow placeholder:text-on-surface-variant/40"
                  id="product-title"
                  placeholder="যেমন: ইলাস্ট্রেটর মাহফিল পোস্টার টেমপ্লেট"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface mb-2 font-bold">ডিজাইনের বিবরণ/ডিসক্রিপশন *</label>
                <textarea
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow resize-y placeholder:text-on-surface-variant/40"
                  placeholder="বিস্তারিত বিবরণ লিখুন..."
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface mb-2 font-bold" htmlFor="product-price">মূল্য (টাকা/টাকা সমমূল্য) *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">৳</span>
                    <input
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-8 pr-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow"
                      id="product-price"
                      placeholder="0.00"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface mb-2 font-bold" htmlFor="category-select">ক্যাটেগরি *</label>
                  <select
                    id="category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow cursor-pointer"
                    required
                  >
                    <option value="">নির্বাচন করুন</option>
                    <option value="Print Templates">Print Templates</option>
                    <option value="MAHFIL">MAHFIL (মাহফিল ব্যানার/পোস্টার)</option>
                    <option value="Madrasah & School">Madrasah &amp; School</option>
                    <option value="UI Kits">UI Kits &amp; Web templates</option>
                    <option value="Vectors">Vectors &amp; Illustrations</option>
                    <option value="Fonts">Fonts (ফন্ট)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface mb-2 font-bold">ডিজাইন ধরন</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedProductType('print')}
                    className={`flex-1 p-3 border-2 rounded-lg cursor-pointer transition-colors font-label-md text-label-md ${
                      selectedProductType === 'print'
                        ? 'border-primary bg-primary/5 text-primary font-bold'
                        : 'border-outline-variant text-on-surface-variant'
                    }`}
                  >
                    Print Ready
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedProductType('digital')}
                    className={`flex-1 p-3 border-2 rounded-lg cursor-pointer transition-colors font-label-md text-label-md ${
                      selectedProductType === 'digital'
                        ? 'border-primary bg-primary/5 text-primary font-bold'
                        : 'border-outline-variant text-on-surface-variant'
                    }`}
                  >
                    Digital Asset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Guide / Preview */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 p-6 shadow-sm sticky top-6">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center space-x-2">
              <span className="material-symbols-outlined text-primary">info</span>
              <span>আপডেট গাইডলাইনস</span>
            </h3>
            <p className="text-body-sm text-on-surface-variant">
              ডিজাইন ইনফরমেশন পরিবর্তন করার পরে অবশ্যই "আপডেট সেভ করুন" বাটনটি ক্লিক করুন। কোনো তথ্য অসম্পূর্ণ থাকলে তা আপডেট করতে দেয়া হবে না।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
