'use client';
import React, { useState } from 'react';

export default function SettingsPage() {
  const [profileName, setProfileName] = useState('Creative Author');
  const [bio, setBio] = useState('Passionate designer creating premium digital assets for the creative community.');
  const [website, setWebsite] = useState('https://creativeauthor.com');
  const [email, setEmail] = useState('creative@author.com');
  const [notifications, setNotifications] = useState({
    newSale: true,
    review: true,
    marketing: false,
    weeklyDigest: true,
  });
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-lg font-headline-lg text-on-surface mb-1">Settings</h1>
        <p className="text-body-md font-body-md text-on-surface-variant">Manage your profile and account preferences.</p>
      </div>

      {saved && (
        <div className="mb-6 bg-secondary-container text-on-secondary-container border border-secondary/20 rounded-lg p-4 flex items-center gap-3 animate-fade-in-up">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
          <span className="text-label-md font-label-md font-bold">Settings saved successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Settings */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Profile Info */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-5 pb-4 border-b border-outline-variant">Profile Information</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-headline-lg font-bold shrink-0">
                C
              </div>
              <div>
                <p className="text-label-md font-label-md text-on-surface font-bold mb-1">Profile Photo</p>
                <button className="text-label-sm font-label-sm text-secondary hover:underline">Upload new photo</button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-sm font-label-sm text-on-surface-variant">Display Name</label>
                  <input type="text" value={profileName} onChange={e => setProfileName(e.target.value)}
                    className="bg-surface-bright border border-outline-variant rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-sm font-label-sm text-on-surface-variant">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="bg-surface-bright border border-outline-variant rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-label-sm font-label-sm text-on-surface-variant">Website</label>
                <input type="url" value={website} onChange={e => setWebsite(e.target.value)}
                  className="bg-surface-bright border border-outline-variant rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-label-sm font-label-sm text-on-surface-variant">Bio</label>
                <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
                  className="bg-surface-bright border border-outline-variant rounded-lg px-4 py-2.5 text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors resize-none" />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-5 pb-4 border-b border-outline-variant">Notification Preferences</h2>
            <div className="flex flex-col gap-4">
              {(Object.entries(notifications) as [keyof typeof notifications, boolean][]).map(([key, val]) => {
                const labels: Record<keyof typeof notifications, string> = {
                  newSale: 'New Sale Notifications',
                  review: 'Asset Review Updates',
                  marketing: 'Promotional Emails',
                  weeklyDigest: 'Weekly Digest',
                };
                const descriptions: Record<keyof typeof notifications, string> = {
                  newSale: 'Get notified whenever someone purchases your asset.',
                  review: 'Updates on your submitted asset review status.',
                  marketing: 'Platform promotions, offers, and announcements.',
                  weeklyDigest: 'A weekly summary of your earnings and views.',
                };
                return (
                  <div key={key} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-label-md font-label-md text-on-surface">{labels[key]}</p>
                      <p className="text-body-sm font-body-sm text-on-surface-variant">{descriptions[key]}</p>
                    </div>
                    <button
                      onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}
                      className={`relative w-12 h-6 rounded-full transition-colors shrink-0 mt-0.5 ${val ? 'bg-secondary' : 'bg-outline-variant'}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${val ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payout */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <h2 className="text-headline-md font-headline-md text-on-surface mb-5 pb-4 border-b border-outline-variant">Payout Method</h2>
            <div className="flex flex-col gap-3">
              {[
                { id: 'bkash', label: 'bKash', icon: '💳' },
                { id: 'nagad', label: 'Nagad', icon: '💳' },
                { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
              ].map(method => (
                <label key={method.id} className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === method.id ? 'border-secondary bg-secondary-container/10' : 'border-outline-variant hover:bg-surface-container-low'}`}>
                  <input type="radio" name="payout" value={method.id} checked={paymentMethod === method.id} onChange={e => setPaymentMethod(e.target.value)} className="text-secondary" />
                  <span className="text-xl">{method.icon}</span>
                  <span className={`text-label-md font-label-md ${paymentMethod === method.id ? 'text-on-surface font-bold' : 'text-on-surface'}`}>{method.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="bg-primary text-on-primary px-8 py-3 rounded-lg text-label-md font-label-md hover:opacity-90 transition-opacity shadow-sm self-start flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            Save Changes
          </button>
        </div>

        {/* Account Info Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <h3 className="text-label-md font-label-md text-on-surface font-bold mb-4">Account Plan</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-fixed rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>workspace_premium</span>
              </div>
              <div>
                <p className="text-label-md font-label-md text-on-surface font-bold">Pro Member</p>
                <p className="text-body-sm font-body-sm text-on-surface-variant">Active since Jan 2025</p>
              </div>
            </div>
            <button className="w-full py-2 px-4 bg-primary text-on-primary rounded-lg text-label-sm font-label-sm hover:opacity-90 transition-opacity">
              Upgrade Plan
            </button>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <h3 className="text-label-md font-label-md text-on-surface font-bold mb-4">Danger Zone</h3>
            <div className="flex flex-col gap-3">
              <button className="w-full py-2 px-4 border border-error text-error rounded-lg text-label-sm font-label-sm hover:bg-error-container transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
