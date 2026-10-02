import React from 'react';
import { 
  ExternalLink, 
  ShieldCheck, 
  MapPin, 
  Building2, 
  Eye, 
  ShoppingBag, 
  ArrowRight,
  ArrowLeft 
} from 'lucide-react';
import { useMall } from '../context/MallContext';

export default function BrandCard({ brand, lang, currency, onSelectBrand, onRequestRfq }) {
  const { outletBaskets, setActiveOutletBasketBrand } = useMall();
  const outletItems = outletBaskets[brand.id] || [];
  const basketCount = outletItems.reduce((acc, it) => acc + it.quantity, 0);
  const isRtl = lang === 'ar';

  const formatPrice = (priceEgp, priceUsd) => {
    if (currency === 'USD') return `$${priceUsd}`;
    if (currency === 'EUR') return `€${Math.round(priceUsd * 0.92)}`;
    return `${priceEgp.toLocaleString()} ج.م`;
  };

  return (
    <div className="gmt-panel group flex flex-col justify-between overflow-hidden relative border border-[color:var(--hairline)] hover:border-amber-400/50 transition-all duration-300">
      
      {/* Top Cover Image + Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onSelectBrand(brand)}>
        <img 
          src={brand.coverImage} 
          alt={brand.nameEn} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070c18] via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {brand.isVerified && (
            <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-amber-400 text-xs font-bold flex items-center gap-1 shadow-lg">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'معرض مصدق عليه' : 'Verified Mall Outlet'}</span>
            </span>
          )}

          {basketCount > 0 ? (
            <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1 shadow-lg animate-pulse">
              <ShoppingBag className="w-3 h-3" />
              <span>{basketCount} {lang === 'ar' ? 'بالسلة' : 'in basket'}</span>
            </span>
          ) : brand.isWholesaleReady && (
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-[11px] font-bold flex items-center gap-1 shadow-lg">
              <Building2 className="w-3 h-3" />
              <span>{lang === 'ar' ? 'تصدير B2B' : 'Export Ready'}</span>
            </span>
          )}
        </div>

        {/* Origin Location Pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[11px] font-semibold text-slate-200 border border-white/10">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span>{lang === 'ar' ? brand.locationAr : brand.locationEn}</span>
        </div>
      </div>

      {/* Brand Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Logo */}
          <div className="flex items-start justify-between gap-3 cursor-pointer" onClick={() => onSelectBrand(brand)}>
            <div>
              <h3 className="text-xl font-black tracking-tight text-[color:var(--ink)] group-hover:text-amber-400 transition-colors">
                {lang === 'ar' ? brand.nameAr : brand.nameEn}
              </h3>
              <p className="text-xs text-amber-400 font-semibold mt-0.5">
                {lang === 'ar' ? brand.taglineAr : brand.taglineEn}
              </p>
            </div>
            
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400/30 shrink-0 bg-slate-900 shadow-md">
              <img src={brand.logoImage} alt={brand.nameEn} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-[color:var(--ink-muted)] line-clamp-2 mt-3 leading-relaxed">
            {lang === 'ar' ? brand.descriptionAr : brand.descriptionEn}
          </p>

          {/* Specifications & Export details */}
          <div className="mt-4 p-3 rounded-xl bg-[color:var(--bg-overlay)] border border-[color:var(--hairline)] text-[11px] space-y-1.5">
            <div className="flex justify-between text-[color:var(--ink-muted)]">
              <span>{lang === 'ar' ? 'ميناء التصدير:' : 'FOB Port:'}</span>
              <span className="font-bold text-[color:var(--ink)]">{brand.fobPort}</span>
            </div>
            <div className="flex justify-between text-[color:var(--ink-muted)]">
              <span>{lang === 'ar' ? 'نطاق الأسعار:' : 'Price Range:'}</span>
              <span className="font-bold text-amber-400">{currency === 'USD' ? brand.priceRangeUsd : brand.priceRangeEgp}</span>
            </div>
            <div className="flex justify-between text-[color:var(--ink-muted)]">
              <span>{lang === 'ar' ? 'الحد أدنى للجملة:' : 'Wholesale MOQ:'}</span>
              <span className="font-bold text-[color:var(--ink)]">{brand.moq}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Enter Outlet, Direct Digital Link, RFQ */}
        <div className="mt-5 space-y-2 pt-3 border-t border-[color:var(--hairline)]">
          
          {/* Main Action: Enter Outlet Boutique */}
          <button
            onClick={() => onSelectBrand(brand)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 hover:opacity-95 transition shadow-md shadow-amber-400/10"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'دخول المعرض والتسوق المباشر' : 'Enter Outlet & Shop'}</span>
            {isRtl ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
          </button>

          <div className="grid grid-cols-2 gap-2">
            {/* Direct Digital Linking Button (Silk Road Mechanism) */}
            <a
              href={brand.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-[color:var(--bg-surface-elevated)] border border-[color:var(--hairline)] hover:border-amber-400 text-xs font-bold text-[color:var(--ink)] flex items-center justify-center gap-1.5 transition"
            >
              <ExternalLink className="w-3 h-3 text-cyan-400" />
              <span>{lang === 'ar' ? 'المتجر الخارجي' : 'External Store'}</span>
            </a>

            {/* Wholesale Export Quote (B2B) */}
            <button
              onClick={() => onRequestRfq(brand)}
              className="px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Building2 className="w-3 h-3" />
              <span>{lang === 'ar' ? 'طلب RFQ' : 'B2B RFQ'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
