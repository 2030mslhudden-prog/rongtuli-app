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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
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
          <button className="w-full flex items-center justify-center space-x-2 bg-[#42b72a] text-white py-3 px-4 rounded-lg font-label-md text-label-md hover:bg-[#36a420] transition-colors shadow-sm hover:shadow-md">
            <span className="material-symbols-outlined">upload</span>
            <span>Upload Asset</span>
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
                <p className="font-body-md text-body-md text-[#606770] mt-2 max-w-2xl">Add a new digital asset to the marketplace. Ensure all source files and previews meet the platform quality guidelines.</p>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-3">
                <button className="px-5 py-2.5 rounded-lg border-2 border-[#ccd0d5] text-[#1c1e21] font-label-md text-label-md hover:border-[#1877f2] hover:text-[#1877f2] hover:bg-[#1877f2]/5 transition-all focus:ring-2 ring-[#1877f2]/20 outline-none shadow-sm">
                  Save to Draft
                </button>
                <button className="px-5 py-2.5 rounded-lg bg-[#1877f2] text-white font-label-md text-label-md hover:bg-[#1469d4] transition-all shadow-sm hover:shadow-md focus:ring-2 ring-[#1877f2]/20 outline-none flex items-center space-x-2">
                  <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                  <span>Publish Asset</span>
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
                  <p className="font-body-sm text-body-sm text-[#606770] mb-6">Upload high-quality previews and the final source files.</p>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2">Product Banner (16:9 Ratio)</label>
                      <div
                        className={`border-2 border-dashed border-[#ccd0d5] rounded-xl bg-[#f0f2f5] hover:bg-[#f0f2f5] transition-colors p-8 flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden ${isDragging ? 'border-[#1877f2] bg-[#1877f2]/5' : ''}`}
                        id="banner-dropzone"
                        onDragOver={(event) => {
                          event.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            fileInputRef.current?.click();
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label="Upload product preview image"
                      >
                        <div className="w-16 h-16 rounded-full bg-[#e7f3ff] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <span className="material-symbols-outlined text-3xl text-[#1877f2]">image</span>
                        </div>
                        <p className="font-label-md text-label-md text-[#1c1e21] mb-1">Drag &amp; drop your preview image here</p>
                        <p className="font-body-sm text-body-sm text-[#606770] mb-4">Supports JPG, PNG, WEBP up to 5MB</p>
                        <button
                          className="px-4 py-2 rounded-lg bg-white shadow-sm border border-[#ccd0d5] text-[#1c1e21] font-label-sm text-label-sm hover:border-[#1877f2] hover:text-[#1877f2] transition-colors"
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                        >
                          Browse Files
                        </button>
                        <input ref={fileInputRef} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" />
                      </div>
                    </div>

                    <div>
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2">Source Files (ZIP)</label>
                      <div
                        className="border-2 border-dashed border-[#ccd0d5] rounded-xl bg-[#f0f2f5] hover:bg-[#f0f2f5] transition-colors p-6 flex items-center space-x-4 cursor-pointer group relative"
                        onClick={() => fileInputRef.current?.click()}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            fileInputRef.current?.click();
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label="Upload source files"
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
                          onClick={(event) => {
                            event.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                        >
                          Browse
                        </button>
                        <input accept=".zip,.rar" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" />
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
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2" htmlFor="product-title">Product Title</label>
                      <input
                        className="w-full bg-[#f0f2f5] border border-[#ccd0d5] rounded-lg px-4 py-3 font-body-md text-body-md text-[#1c1e21] focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] outline-none transition-shadow placeholder:text-[#606770]/50"
                        id="product-title"
                        placeholder="e.g., Minimalist E-commerce UI Kit"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2 flex justify-between items-end">
                        <span>Description</span>
                        <span className="font-body-sm text-[11px] text-[#606770] font-normal">Markdown supported</span>
                      </label>

                      <div className="border border-[#ccd0d5] rounded-t-lg bg-[#f7f8fa] p-2 flex space-x-1 border-b-0">
                        <button className="p-1.5 text-[#606770] hover:text-[#1877f2] hover:bg-[#1877f2]/10 rounded" type="button"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
                        <button className="p-1.5 text-[#606770] hover:text-[#1877f2] hover:bg-[#1877f2]/10 rounded" type="button"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
                        <div className="w-px h-5 bg-[#ccd0d5]/50 mx-1 self-center"></div>
                        <button className="p-1.5 text-[#606770] hover:text-[#1877f2] hover:bg-[#1877f2]/10 rounded" type="button"><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
                        <button className="p-1.5 text-[#606770] hover:text-[#1877f2] hover:bg-[#1877f2]/10 rounded" type="button"><span className="material-symbols-outlined text-[18px]">link</span></button>
                      </div>

                      <textarea
                        className="w-full bg-[#f0f2f5] border border-[#ccd0d5] rounded-b-lg px-4 py-3 font-body-md text-body-md text-[#1c1e21] focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] outline-none transition-shadow resize-y placeholder:text-[#606770]/50"
                        id="product-desc"
                        placeholder="Describe the features, contents, and technical details of your asset..."
                        rows={6}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="bg-[#ffffff] rounded-xl border-none p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="font-headline-md text-headline-md text-[#1c1e21] mb-6 flex items-center space-x-2">
                    <span className="material-symbols-outlined text-[#1877f2]">print</span>
                    <span>Product Type &amp; Specifications</span>
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-3">Product Type</label>
                      <div className="flex space-x-4">
                        <label className={`flex-1 flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-colors group ${selectedProductType === 'digital' ? 'border-[#1877f2] bg-[#1877f2]/5' : 'border-[#ccd0d5] hover:border-[#1877f2]'}`}>
                          <input className="hidden" name="prod-type" type="radio" value="digital" checked={selectedProductType === 'digital'} onChange={() => setSelectedProductType('digital')} />
                          <span className={`font-label-md text-label-md ${selectedProductType === 'digital' ? 'text-[#1877f2]' : 'text-[#606770] group-hover:text-[#1877f2]'}`}>Digital Asset</span>
                        </label>
                        <label className={`flex-1 flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-colors group ${selectedProductType === 'print' ? 'border-[#1877f2] bg-[#1877f2]/5' : 'border-[#ccd0d5] hover:border-[#1877f2]'}`}>
                          <input className="hidden" name="prod-type" type="radio" value="print" checked={selectedProductType === 'print'} onChange={() => setSelectedProductType('print')} />
                          <span className={`font-label-md text-label-md ${selectedProductType === 'print' ? 'text-[#1877f2]' : 'text-[#606770] group-hover:text-[#1877f2]'}`}>Physical Print</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2">Size</label>
                        <select className="w-full bg-[#f0f2f5] border border-[#ccd0d5] rounded-lg px-4 py-3 font-body-md text-body-md text-[#1c1e21] focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] outline-none">
                          <option>A4 Standard</option>
                          <option>A3 Poster</option>
                          <option>Business Card</option>
                          <option>Custom Size</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2">Paper Material</label>
                        <select className="w-full bg-[#f0f2f5] border border-[#ccd0d5] rounded-lg px-4 py-3 font-body-md text-body-md text-[#1c1e21] focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] outline-none">
                          <option>130 GSM Glossy</option>
                          <option>300 GSM Matte</option>
                          <option>Premium Card Stock</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-3">Finish Options</label>
                      <div className="flex flex-wrap gap-2">
                        <button className="px-4 py-2 rounded-full border border-[#1877f2] bg-[#e7f3ff] text-[#1877f2] font-label-sm text-[12px]" type="button">Matte</button>
                        <button className="px-4 py-2 rounded-full border border-[#ccd0d5] text-[#606770] font-label-sm text-[12px] hover:border-[#1877f2] hover:text-[#1877f2]" type="button">Glossy</button>
                        <button className="px-4 py-2 rounded-full border border-[#ccd0d5] text-[#606770] font-label-sm text-[12px] hover:border-[#1877f2] hover:text-[#1877f2]" type="button">Textured</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-[24px]">
                <div className="bg-[#ffffff] rounded-xl border-none p-6 shadow-sm">
                  <h2 className="font-headline-md text-headline-md text-[#1c1e21] mb-4 flex items-center space-x-2">
                    <span className="material-symbols-outlined text-[#1877f2]">payments</span>
                    <span>Pricing</span>
                  </h2>
                  <div>
                    <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2" htmlFor="product-price">Standard License Price (USD)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-[#606770] font-bold">$</span>
                      </div>
                      <input
                        className="w-full bg-[#f0f2f5] border border-[#ccd0d5] rounded-lg pl-8 pr-4 py-3 font-body-md text-body-md text-[#1c1e21] focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] outline-none transition-shadow"
                        id="product-price"
                        placeholder="0.00"
                        step="0.01"
                        type="number"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                      />
                    </div>
                    <div className="mt-3 flex items-center space-x-2">
                      <input className="w-4 h-4 rounded border-[#ccd0d5] text-[#1877f2] focus:ring-[#1877f2] bg-[#f0f2f5]" id="free-item" type="checkbox" />
                      <label className="font-body-sm text-body-sm text-[#606770] cursor-pointer" htmlFor="free-item">Offer as a free download</label>
                    </div>
                  </div>
                </div>

                <div className="bg-[#ffffff] rounded-xl border-none p-6 shadow-sm">
                  <h2 className="font-headline-md text-headline-md text-[#1c1e21] mb-4 flex items-center space-x-2">
                    <span className="material-symbols-outlined text-[#1877f2]">category</span>
                    <span>Categorization</span>
                  </h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2" htmlFor="category-select">Category</label>
                      <div className="relative">
                        <select
                          className="w-full appearance-none bg-[#f0f2f5] border border-[#ccd0d5] rounded-lg px-4 py-3 font-body-md text-body-md text-[#1c1e21] focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] outline-none transition-shadow pr-10"
                          id="category-select"
                          value={category}
                          onChange={(event) => setCategory(event.target.value)}
                        >
                          <option disabled value="">Select a category</option>
                          <option value="ui-kits">UI Kits &amp; Templates</option>
                          <option value="illustrations">Illustrations</option>
                          <option value="fonts">Fonts &amp; Typography</option>
                          <option value="3d">3D Assets</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#606770]">
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2">Tags</label>
                      <div className="bg-[#f0f2f5] border border-[#ccd0d5] rounded-lg p-2 focus-within:border-[#1877f2] focus-within:ring-1 focus-within:ring-[#1877f2] transition-shadow flex flex-wrap gap-2 items-center min-h-[52px]">
                        <span className="inline-flex items-center space-x-1 bg-[#e7f3ff] text-[#1877f2] px-2 py-1 rounded-md font-label-sm text-[11px]">
                          <span>minimal</span>
                          <button className="hover:text-[#1469d4] transition-colors" type="button"><span className="material-symbols-outlined text-[14px]">close</span></button>
                        </span>
                        <span className="inline-flex items-center space-x-1 bg-[#e7f3ff] text-[#1877f2] px-2 py-1 rounded-md font-label-sm text-[11px]">
                          <span>ecommerce</span>
                          <button className="hover:text-[#1469d4] transition-colors" type="button"><span className="material-symbols-outlined text-[14px]">close</span></button>
                        </span>
                        <input className="flex-1 min-w-[100px] bg-transparent border-none focus:ring-0 p-1 font-body-sm text-body-sm text-[#1c1e21] placeholder:text-[#606770]/50" placeholder="Add tag and press Enter..." type="text" />
                      </div>
                      <p className="font-body-sm text-[11px] text-[#606770] mt-1">Add up to 10 tags to improve searchability.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#ffffff] rounded-xl border-none p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-headline-md text-headline-md text-[#1c1e21] flex items-center space-x-2">
                      <span className="material-symbols-outlined text-[#1877f2]">verified</span>
                      <span>Design Approval</span>
                    </h2>
                    <span className="px-2 py-1 rounded bg-[#e7f3ff] text-[#1877f2] font-label-sm text-[10px] uppercase tracking-wider">Pending Approval</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-label-sm text-label-sm text-[#1c1e21] mb-2">Client Feedback/Notes</label>
                      <textarea className="w-full bg-[#f0f2f5] border border-[#ccd0d5] rounded-lg px-3 py-2 font-body-sm text-body-sm text-[#1c1e21] focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] outline-none resize-none" placeholder="Add notes for the client..." rows={3}></textarea>
                    </div>
                    <button className="w-full py-3 rounded-lg bg-[#1877f2] text-white font-label-md text-label-md hover:bg-[#1469d4] transition-all shadow-sm flex items-center justify-center space-x-2">
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      <span>Send for Approval</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#e7f3ff] border border-[#dfefff] rounded-xl p-4 flex space-x-3">
                  <span className="material-symbols-outlined text-[#1877f2] mt-0.5 text-[20px]">info</span>
                  <div>
                    <h4 className="font-label-md text-label-md text-[#1c1e21] mb-1">Update Mode Available</h4>
                    <p className="font-body-sm text-[12px] text-[#606770]">Editing an existing asset? Form details will auto-fill to preserve your current data.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-12"></div>
          </div>
        </main>
      </div>
    </div>
  );
}

