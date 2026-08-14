'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('print');
  const [banner, setBanner] = useState<File | null>(null);
  const [sourceFiles, setSourceFiles] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const sourceFilesInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setBanner(files[0]);
    }
  };

  const handleBannerFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBanner(e.target.files[0]);
    }
  };

  const handleSourceFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSourceFiles(e.target.files[0]);
    }
  };

  const validateForm = () => {
    if (!title.trim()) {
      alert('Please enter a product title');
      return false;
    }
    if (!description.trim()) {
      alert('Please enter a product description');
      return false;
    }
    if (!price.trim()) {
      alert('Please enter a price');
      return false;
    }
    if (!category.trim()) {
      alert('Please select a category');
      return false;
    }
    if (!banner) {
      alert('Please upload a banner image');
      return false;
    }
    return true;
  };

  const uploadFileToR2 = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/files/upload', { method: 'POST', body: formData });
      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded:', data.key);
        return data.key;
      }
      console.error('Upload failed:', response.statusText);
      return null;
    } catch (error) {
      console.error('File upload error:', error);
      return null;
    }
  };

  const handlePublish = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      if (!banner) {
        alert('Please upload a banner image');
        setIsSubmitting(false);
        return;
      }
      const bannerKey = await uploadFileToR2(banner);
      if (!bannerKey) {
        alert('Failed to upload banner image');
        setIsSubmitting(false);
        return;
      }
      let sourceFilesKey: string | null = null;
      if (sourceFiles) {
        sourceFilesKey = await uploadFileToR2(sourceFiles);
      }
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          price: parseFloat(price),
          category,
          imageUrl: bannerKey,
          fileUrl: sourceFilesKey,
          tags: selectedProductType,
        }),
      });
      if (response.ok) {
        alert('Product "' + title + '" published successfully!');
        setTitle('');
        setDescription('');
        setPrice('');
        setCategory('');
        setBanner(null);
        setSourceFiles(null);
      } else {
        const errorData = await response.json();
        alert('Error: ' + (errorData.error || response.statusText));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error publishing: ' + (error instanceof Error ? error.message : 'Unknown'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!title.trim()) {
      alert('Please enter at least a product title for draft');
      return;
    }
    setIsSubmitting(true);
    try {
      let bannerKey: string | null = null;
      if (banner) {
        bannerKey = await uploadFileToR2(banner);
      }
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          price: price ? parseFloat(price) : 0,
          category: category || 'Uncategorized',
          imageUrl: bannerKey,
          tags: selectedProductType,
        }),
      });
      if (response.ok) {
        alert('Draft "' + title + '" saved successfully!');
        setTitle('');
        setDescription('');
        setPrice('');
        setCategory('');
        setBanner(null);
      } else {
        const errorData = await response.json();
        alert('Error saving draft: ' + (errorData.error || response.statusText));
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Error saving draft: ' + (error instanceof Error ? error.message : 'Unknown'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#f0f2f5] text-[#1c1e21] antialiased selection:bg-[#1877f2] selection:text-white overflow-hidden">
      <nav className="h-screen w-64 fixed left-0 top-0 bg-[#ffffff] shadow-sm flex flex-col py-6 px-4 z-50">
        <div className="mb-10 px-2 flex items-center space-x-3">
          <span className="material-symbols-outlined text-[#1877f2] text-3xl font-bold">palette</span>
          <div className="font-headline-md text-headline-md font-bold text-[#1877f2]">Rongtuli</div>
        </div>

        <div className="flex items-center space-x-3 px-2 mb-8 p-3 rounded-xl bg-[#f7f8fa] shadow-sm">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#e4e6eb]">
            <img
              alt="Rongtuli Admin Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPh5ZZPGjMdGdgCXhZKe7Nn6JagOCBshH70HHWJ06CTa1mLSh_tdSHQxaS-5ReOmP5JNPoMNy8GpIVAPlBFcU5UsmrGK6Oa1qOAnJbrruoN0VWCpZCBHjD5RS1OycKinufXBD-vxealFJwu-GYiqIrVoLXdA07QGnBmct3BhsNdyHSk9-vHOqHzchEeoUsCEwokELWqEIn7quZgmMOYTRLSoX2rcpmy5QMdIbHBioXdxrA3Qeu2qFV"
            />
          </div>
          <div className="flex flex-col truncate">
            <span className="font-label-md text-label-md text-[#1c1e21] truncate">Admin Profile</span>
            <span className="font-body-sm text-body-sm text-[#606770] truncate">Design Admin</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col space-y-2 overflow-y-auto">
          <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#606770] hover:text-[#1877f2] transition-colors hover:bg-[#f0f2f5] group">
            <span className="material-symbols-outlined transition-transform group-hover:scale-110 duration-200">dashboard</span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </Link>
          <Link href="/dashboard/assets" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#1877f2] font-bold border-r-4 border-[#1877f2] bg-[#e7f3ff] group scale-[0.98] transition-transform duration-200">
            <span className="material-symbols-outlined transition-transform group-hover:scale-110 duration-200" style={{ fontVariationSettings: '"FILL" 1' }}>inventory_2</span>
            <span className="font-label-md text-label-md text-[#1877f2]">Products</span>
          </Link>
          <Link href="/dashboard/earnings" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#606770] hover:text-[#1877f2] transition-colors hover:bg-[#f0f2f5] group">
            <span className="material-symbols-outlined transition-transform group-hover:scale-110 duration-200">payments</span>
            <span className="font-label-md text-label-md">Sales</span>
          </Link>
          <Link href="/dashboard/settings" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#606770] hover:text-[#1877f2] transition-colors hover:bg-[#f0f2f5] group">
            <span className="material-symbols-outlined transition-transform group-hover:scale-110 duration-200">settings</span>
            <span className="font-label-md text-label-md">Settings</span>
          </Link>
        </div>

        <div className="mt-auto pt-6">
          <button type="button" onClick={handlePublish} disabled={isSubmitting} className="w-full flex items-center justify-center space-x-2 bg-[#42b72a] text-white py-3 px-4 rounded-lg font-label-md text-label-md hover:bg-[#36a420] disabled:bg-[#999] disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md">
            <span className="material-symbols-outlined">{isSubmitting ? 'hourglass_empty' : 'upload'}</span>
            <span>{isSubmitting ? 'Publishing...' : 'Upload Asset'}</span>
          </button>
        </div>
      </nav>

      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <header className="top-0 sticky z-40 bg-[#ffffff] shadow-sm flex justify-between items-center px-[64px] h-16 w-full shrink-0">
          <div className="flex items-center space-x-8">
            <a className="font-label-sm text-label-sm text-[#606770] hover:text-[#1877f2] transition-colors focus:ring-2 ring-[#1877f2]/20 outline-none rounded-sm px-1 py-1" href="#">Overview</a>
            <a className="font-label-sm text-label-sm text-[#606770] hover:text-[#1877f2] transition-colors focus:ring-2 ring-[#1877f2]/20 outline-none rounded-sm px-1 py-1" href="#">Analytics</a>
            <a className="font-label-sm text-label-sm text-[#606770] hover:text-[#1877f2] transition-colors focus:ring-2 ring-[#1877f2]/20 outline-none rounded-sm px-1 py-1" href="#">Reports</a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-[#606770] hover:text-[#1877f2] transition-colors rounded-full hover:bg-[#f7f8fa] focus:ring-2 ring-[#1877f2]/20 outline-none">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <button className="p-2 text-[#606770] hover:text-[#1877f2] transition-colors rounded-full hover:bg-[#f7f8fa] focus:ring-2 ring-[#1877f2]/20 outline-none">
              <span className="material-symbols-outlined text-[20px]">help_outline</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#e4e6eb] ml-2 cursor-pointer">
              <img
                alt="Admin User Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKHJEDkdBUNJWGWCuqc-XX7XPu28nCgRdkG4GFaQakCoozAOBhqdWRcyeImgswC_FQvFi0TGoNBILsaZE_SsLJ5KlcMVoxTaVZBzkUqwRqY-CSL598533TUywQNZr1xan4lMHF2u5IeIXi7tSUt0Ou_sLCOQGBhYP2dXHGjOPByPcJg3UlNjcw_5SvpUPQPdOt8VgYR9H9fPUrPcezaM2vjp_XKCopIQ3iMBjnaXUUScl4BRsUpIrH"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#f0f2f5] p-8 lg:p-[64px] scroll-smooth">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#e4e6eb]/30">
              <div>
                <div className="flex items-center space-x-2 text-[#606770] mb-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider">Products</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#1877f2]">Upload New Design</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-[#1c1e21]">Upload New Design</h1>
                <p className="font-body-md text-body-md text-[#606770] mt-2 max-w-2xl">Add a new digital asset to the marketplace. Files will be uploaded to our secure storage.</p>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-3">
                <button type="button" onClick={handleSaveDraft} disabled={isSubmitting} className="px-5 py-2.5 rounded-lg border-2 border-[#ccd0d5] text-[#1c1e21] font-label-md text-label-md hover:border-[#1877f2] hover:text-[#1877f2] hover:bg-[#1877f2]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:ring-2 ring-[#1877f2]/20 outline-none shadow-sm">
                  {isSubmitting ? 'Saving...' : 'Save to Draft'}
                </button>
                <button type="button" onClick={handlePublish} disabled={isSubmitting} className="px-5 py-2.5 rounded-lg bg-[#1877f2] text-white font-label-md text-label-md hover:bg-[#1469d4] disabled:bg-[#999] disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md focus:ring-2 ring-[#1877f2]/20 outline-none flex items-center space-x-2">
                  <span className="material-symbols-outlined text-[18px]">{isSubmitting ? 'hourglass_empty' : 'cloud_upload'}</span>
                  <span>{isSubmitting ? 'Publishing...' : 'Publish Asset'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
              <div className="lg:col-span-8 space-y-[24px]">
                <div className="bg-[#ffffff] rounded-xl border-none p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="font-headline-md text-headline-md text-[#1c1e21] mb-1 flex items-center space-x-2">
                    <span className="material-symbols-outlined text-[#1877f2]">perm_media</span>
                    <span>Media Assets</span>
                  </h2>
                  <p className="font-body-sm text-body-sm text-[#606770] mb-6">Upload high-quality previews and the final source files to our R2 storage.</p>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2">Product Banner (16:9 Ratio) *</label>
                      <div
                        className={`border-2 border-dashed border-[#ccd0d5] rounded-xl bg-[#f0f2f5] hover:bg-[#f0f2f5] transition-colors p-8 flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden ${isDragging ? 'border-[#1877f2] bg-[#1877f2]/5' : ''}`}
                        onDragOver={(event) => {
                          event.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                      >
                        <div className="w-16 h-16 rounded-full bg-[#e7f3ff] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <span className="material-symbols-outlined text-3xl text-[#1877f2]">image</span>
                        </div>
                        <p className="font-label-md text-label-md text-[#1c1e21] mb-1">Drag &amp; drop your preview image here</p>
                        <p className="font-body-sm text-body-sm text-[#606770] mb-4">Supports JPG, PNG, WEBP up to 5MB</p>
                        <button
                          className="px-4 py-2 rounded-lg bg-white shadow-sm border border-[#ccd0d5] text-[#1c1e21] font-label-sm text-label-sm hover:border-[#1877f2] hover:text-[#1877f2] transition-colors"
                          type="button"
                          onClick={() => bannerInputRef.current?.click()}
                        >
                          Browse Files
                        </button>
                        <input ref={bannerInputRef} accept="image/*" className="hidden" type="file" onChange={handleBannerFileSelect} />
                        {banner && <p className="absolute bottom-2 left-2 text-sm text-green-600 font-bold">✓ {banner.name}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2">Source Files (ZIP)</label>
                      <div
                        className="border-2 border-dashed border-[#ccd0d5] rounded-xl bg-[#f0f2f5] hover:bg-[#f0f2f5] transition-colors p-6 flex items-center space-x-4 cursor-pointer group relative"
                        onClick={() => sourceFilesInputRef.current?.click()}
                      >
                        <div className="w-12 h-12 rounded-lg bg-[#e7f3ff] flex items-center justify-center shrink-0 group-hover:bg-[#dfefff] transition-colors">
                          <span className="material-symbols-outlined text-2xl text-[#1877f2]">folder_zip</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-label-md text-label-md text-[#1c1e21]">Upload project source files</p>
                          <p className="font-body-sm text-body-sm text-[#606770]">Max size: 500MB. Include AI, PSD, FIG, etc.</p>
                        </div>
                        <button
                          className="px-4 py-2 rounded-lg bg-white shadow-sm border border-[#ccd0d5] text-[#1c1e21] font-label-sm text-label-sm hover:border-[#1877f2] hover:text-[#1877f2] transition-colors shrink-0"
                          type="button"
                          onClick={() => sourceFilesInputRef.current?.click()}
                        >
                          Browse
                        </button>
                        <input ref={sourceFilesInputRef} accept=".zip,.rar,.7z,.tar" className="hidden" type="file" onChange={handleSourceFilesSelect} />
                        {sourceFiles && <p className="absolute bottom-2 left-2 text-sm text-green-600 font-bold">✓ {sourceFiles.name}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#ffffff] rounded-xl border-none p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="font-headline-md text-headline-md text-[#1c1e21] mb-6 flex items-center space-x-2">
                    <span className="material-symbols-outlined text-[#1877f2]">edit_note</span>
                    <span>Product Details</span>
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2" htmlFor="product-title">Product Title *</label>
                      <input
                        className="w-full bg-[#f0f2f5] border border-[#ccd0d5] rounded-lg px-4 py-3 font-body-md text-body-md text-[#1c1e21] focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] outline-none transition-shadow placeholder:text-[#606770]/50"
                        id="product-title"
                        placeholder="e.g., Minimalist E-commerce UI Kit"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2">Description *</label>
                      <textarea
                        className="w-full bg-[#f0f2f5] border border-[#ccd0d5] rounded-lg px-4 py-3 font-body-md text-body-md text-[#1c1e21] focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] outline-none transition-shadow resize-y placeholder:text-[#606770]/50"
                        placeholder="Describe the features, contents, and technical details..."
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2" htmlFor="product-price">Price (USD) *</label>
                      <input
                        className="w-full bg-[#f0f2f5] border border-[#ccd0d5] rounded-lg px-4 py-3 font-body-md text-body-md text-[#1c1e21] focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] outline-none transition-shadow placeholder:text-[#606770]/50"
                        id="product-price"
                        placeholder="0.00"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2" htmlFor="category-select">Category *</label>
                      <select
                        id="category-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-[#f0f2f5] border border-[#ccd0d5] rounded-lg px-4 py-3 font-body-md text-body-md text-[#1c1e21] focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] outline-none transition-shadow"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="UI Kits">UI Kits</option>
                        <option value="Vectors">Vectors &amp; Illustrations</option>
                        <option value="Fonts">Fonts</option>
                        <option value="Templates">Templates</option>
                        <option value="Icons">Icons</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2">Product Type</label>
                      <div className="flex gap-4">
                        <label className={`flex-1 flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${selectedProductType === 'digital' ? 'border-[#1877f2] bg-[#1877f2]/5' : 'border-[#ccd0d5]'}`}>
                          <input type="radio" value="digital" checked={selectedProductType === 'digital'} onChange={() => setSelectedProductType('digital')} className="hidden" />
                          <span className={`font-label-md text-label-md ${selectedProductType === 'digital' ? 'text-[#1877f2]' : 'text-[#606770]'}`}>Digital</span>
                        </label>
                        <label className={`flex-1 flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${selectedProductType === 'print' ? 'border-[#1877f2] bg-[#1877f2]/5' : 'border-[#ccd0d5]'}`}>
                          <input type="radio" value="print" checked={selectedProductType === 'print'} onChange={() => setSelectedProductType('print')} className="hidden" />
                          <span className={`font-label-md text-label-md ${selectedProductType === 'print' ? 'text-[#1877f2]' : 'text-[#606770]'}`}>Print</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="bg-[#ffffff] rounded-xl border-none p-6 shadow-sm sticky top-20">
                  <h3 className="font-headline-md text-headline-md text-[#1c1e21] mb-4 flex items-center space-x-2">
                    <span className="material-symbols-outlined text-[#1877f2]">info</span>
                    <span>Publishing Guide</span>
                  </h3>
                  <ul className="space-y-3 text-body-sm text-[#606770]">
                    <li className="flex space-x-2">
                      <span className="text-[#1877f2] font-bold">✓</span>
                      <span>High-resolution preview image (min 1280x720px)</span>
                    </li>
                    <li className="flex space-x-2">
                      <span className="text-[#1877f2] font-bold">✓</span>
                      <span>All files properly organized in ZIP</span>
                    </li>
                    <li className="flex space-x-2">
                      <span className="text-[#1877f2] font-bold">✓</span>
                      <span>Clear, detailed description</span>
                    </li>
                    <li className="flex space-x-2">
                      <span className="text-[#1877f2] font-bold">✓</span>
                      <span>Appropriate pricing</span>
                    </li>
                  </ul>
                  <p className="text-body-sm text-[#999] mt-6 pt-6 border-t border-[#e4e6eb]">
                    Files are uploaded securely to our R2 storage. Your assets will be reviewed before going live.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
