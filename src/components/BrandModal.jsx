import React from 'react';
import { X, ExternalLink, ShieldCheck, MapPin, Building2, PhoneCall, Award, ShoppingBag, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BrandModal({ brand, lang, currency, onClose, onRequestRfq }) {
  if (!brand) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="gmt-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-amber-400/40 relative bg-[color:var(--bg-surface)] shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/70 border border-white/20 text-white hover:bg-slate-950 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover & Brand Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img src={brand.coverImage} alt={brand.nameEn} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070c18] via-[#070c18]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div className="flex items-center gap-4">
              <img src={brand.logoImage} alt={brand.nameEn} className="w-20 h-20 rounded-2xl border-2 border-amber-400 shadow-2xl object-cover bg-slate-900" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'مصري 100%' : '100% Egyptian'}</span>
                  </span>
                  <span className="text-xs text-amber-400 font-bold">Est. {brand.establishedYear}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                  {lang === 'ar' ? brand.nameAr : brand.nameEn}
                </h2>
                <p className="text-sm text-slate-300 font-semibold">{lang === 'ar' ? brand.taglineAr : brand.taglineEn}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Content Details */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Key Quick Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[color:var(--bg-overlay)] border border-[color:var(--hairline)]">
              <div className="text-[color:var(--ink-muted)]">{lang === 'ar' ? 'مقر المصنع/المحيط:' : 'Origin Governorate:'}</div>
              <div className="font-bold text-amber-400 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? brand.locationAr : brand.locationEn}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[color:var(--bg-overlay)] border border-[color:var(--hairline)]">
              <div className="text-[color:var(--ink-muted)]">{lang === 'ar' ? 'الاعتمادات والجودة:' : 'Certifications:'}</div>
              <div className="font-bold text-emerald-400 mt-1 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>{brand.certification}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[color:var(--bg-overlay)] border border-[color:var(--hairline)]">
              <div className="text-[color:var(--ink-muted)]">{lang === 'ar' ? 'حد التصدير الأدنى (MOQ):' : 'Export MOQ:'}</div>
              <div className="font-bold text-cyan-400 mt-1">{brand.moq}</div>
            </div>

            <div className="p-3 rounded-xl bg-[color:var(--bg-overlay)] border border-[color:var(--hairline)]">
              <div className="text-[color:var(--ink-muted)]">{lang === 'ar' ? 'ميناء التجميع الشاحن:' : 'FOB Sea Port:'}</div>
              <div className="font-bold text-[color:var(--ink)] mt-1">{brand.fobPort}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-black text-[color:var(--ink)] mb-2">
              {lang === 'ar' ? 'عن العلامة التجارية والتراث:' : 'Brand Heritage & Story:'}
            </h3>
            <p className="text-sm text-[color:var(--ink-muted)] leading-relaxed">
              {lang === 'ar' ? brand.descriptionAr : brand.descriptionEn}
            </p>
          </div>

          {/* Featured Products Showcase */}
          {brand.featuredProducts && (
            <div>
              <h3 className="text-lg font-black text-[color:var(--ink)] mb-3 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <span>{lang === 'ar' ? 'كتالوج المنتجات البارزة' : 'Featured Product Catalog'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {brand.featuredProducts.map((prod, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-[color:var(--bg-surface-elevated)] border border-[color:var(--hairline)]">
                    <img src={prod.image} alt={prod.nameEn} className="w-full h-32 object-cover rounded-xl mb-3" />
                    <h4 className="font-bold text-xs text-[color:var(--ink)] line-clamp-1">{lang === 'ar' ? prod.nameAr : prod.nameEn}</h4>
                    <p className="text-xs font-black text-amber-400 mt-1">
                      {currency === 'USD' ? `$${prod.priceUsd}` : `${prod.priceEgp.toLocaleString()} ج.م`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Drawer */}
          <div className="pt-6 border-t border-[color:var(--hairline)] flex flex-wrap gap-3">
            
            {/* Direct Link to Store (Silk Road Link) */}
            <a
              href={brand.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={triggerConfetti}
              className="flex-1 py-3.5 rounded-xl bg-amber-400 text-slate-950 text-sm font-black flex items-center justify-center gap-2 hover:bg-amber-300 transition shadow-lg shadow-amber-400/20"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{lang === 'ar' ? 'الانتقال المباشر لمتجر البراند (Digital Link)' : 'Direct Link to Official Store'}</span>
            </a>

            {/* Wholesale RFQ Quote */}
            <button
              onClick={() => { onClose(); onRequestRfq(brand); }}
              className="px-6 py-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-sm font-extrabold flex items-center gap-2 transition"
            >
              <Building2 className="w-4 h-4" />
              <span>{lang === 'ar' ? 'طلب تسعيرة جملة / تصدير' : 'Request Wholesale Quote'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
