import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle2, ShieldCheck, Building2, MapPin, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GOVERNORATES, CATEGORIES } from '../data/brandsData';

export default function OnboardBrandModal({ lang, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [brandForm, setBrandForm] = useState({
    brandName: '',
    category: 'fashion',
    governorate: 'cairo',
    websiteUrl: '',
    phone: '',
    isWholesale: true,
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl border border-white/12 bg-[#090f1d] p-6 sm:p-9 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Subtle Neon Top Glow Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 opacity-90" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest mb-2">
              <PlusCircle className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'ar' ? 'انضم إلى منصة إحنا للبراندات المصرية' : 'REGISTER YOUR EGYPTIAN BRAND'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'ar' ? 'سجّل علاماتك التجارية وافتح أفق التصدير' : 'List Your Brand on e7na Digital Mall'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
              {lang === 'ar'
                ? 'انضم لأكثر من 500 براند ومصنع مصري واحصل على ربط رقمي مباشر ووصول لعملاء الخليج والعالم.'
                : 'Join 500+ verified Egyptian brands to gain direct digital linking & global wholesale export reach.'}
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5 text-left">
              
              {/* Brand Name Input */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                  {lang === 'ar' ? 'اسم العلامة التجارية / المصنع' : 'Brand / Manufacturer Name'}
                </label>
                <input
                  type="text"
                  required
                  value={brandForm.brandName}
                  onChange={(e) => setBrandForm({ ...brandForm, brandName: e.target.value })}
                  placeholder="e.g. Nile Artisans Co."
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/12 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                />
              </div>

              {/* Category & Governorate Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                    {lang === 'ar' ? 'القطاع الصناعي / التصنيف' : 'Category Sector'}
                  </label>
                  <select
                    value={brandForm.category}
                    onChange={(e) => setBrandForm({ ...brandForm, category: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/12 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 cursor-pointer"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id} className="bg-slate-900 text-slate-100">
                        {lang === 'ar' ? c.nameAr : c.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                    {lang === 'ar' ? 'المحافظة / مقر التصنيع' : 'Governorate / Origin'}
                  </label>
                  <select
                    value={brandForm.governorate}
                    onChange={(e) => setBrandForm({ ...brandForm, governorate: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/12 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 cursor-pointer"
                  >
                    {GOVERNORATES.filter(g => g.id !== 'all').map(g => (
                      <option key={g.id} value={g.id} className="bg-slate-900 text-slate-100">
                        {lang === 'ar' ? g.nameAr : g.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Website & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                    {lang === 'ar' ? 'رابط المتجر الرسمي / إنستجرام' : 'Direct Website or Store Link'}
                  </label>
                  <input
                    type="url"
                    required
                    value={brandForm.websiteUrl}
                    onChange={(e) => setBrandForm({ ...brandForm, websiteUrl: e.target.value })}
                    placeholder="https://yourbrand.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/12 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                    {lang === 'ar' ? 'رقم الواتساب للتواصل' : 'Official WhatsApp Number'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={brandForm.phone}
                    onChange={(e) => setBrandForm({ ...brandForm, phone: e.target.value })}
                    placeholder="+201000000000"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/12 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                  {lang === 'ar' ? 'نبذة عن العلامة وجودة الخامة المصرية' : 'Brand Heritage & Materials Story'}
                </label>
                <textarea
                  rows="3"
                  value={brandForm.description}
                  onChange={(e) => setBrandForm({ ...brandForm, description: e.target.value })}
                  placeholder={lang === 'ar' ? 'اشرح ما يميز منتجاتك وخاماتك المصرية 100%...' : 'Describe your products and local materials...'}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/12 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-slate-950 font-black text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 mt-2"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>{lang === 'ar' ? 'تقديم الطلب وتوثيق العلامة' : 'Submit Brand Verification Request'}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-400/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="text-2xl font-black text-white">
              {lang === 'ar' ? 'أهلاً بك في عائلة إحنا!' : 'Welcome to e7na Brand Family!'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'تم استلام بيانات علامتك التجارية بنجاح. سيقوم فريق التدقيق والتوثيق بمراجعة المتجر وتفعيل الربط الرقمي المباشر خلال 24 ساعة.'
                : 'Your brand onboarding request has been submitted. Our verification team will activate your direct digital listing within 24 hours.'}
            </p>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-cyan-400 text-slate-950 text-xs font-bold hover:bg-cyan-300 transition"
            >
              {lang === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
