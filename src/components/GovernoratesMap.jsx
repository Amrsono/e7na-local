import React from 'react';
import { MapPin, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { GOVERNORATES, BRANDS } from '../data/brandsData';

export default function GovernoratesMap({ lang, selectedGov, setSelectedGov, onSelectBrand }) {
  const filteredBrands = selectedGov === 'all' 
    ? BRANDS 
    : BRANDS.filter(b => b.governorate === selectedGov);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-bold mb-3 border border-cyan-400/30">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>{lang === 'ar' ? 'خريطة التخصصات الصناعية والحرفية' : 'Egyptian Governorates Origin Hub'}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
          {lang === 'ar' ? 'استكشف منتجات مصر بحسب المحافظة والقلعة الصناعية' : 'Discover Brands by Governorate & Origin City'}
        </h2>
        <p className="text-xs sm:text-sm text-[color:var(--ink-muted)] mt-3">
          {lang === 'ar'
            ? 'كل محافظة مصرية تتميز بقلعة صناعية وتراث حرفي فريد — من قلعة غزل المحلة لورش دمياط وفخار الفيوم.'
            : 'Every Egyptian governorate hosts specialized industrial hubs & heritage crafts — from Mahalla textiles to Damietta woodwork.'}
        </p>
      </div>

      {/* Governorates Selector Pills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-3 mb-10">
        {GOVERNORATES.map((gov) => (
          <button
            key={gov.id}
            onClick={() => setSelectedGov(gov.id)}
            className={`p-3 rounded-2xl text-center transition-all border flex flex-col items-center justify-center gap-1.5 ${
              selectedGov === gov.id
                ? 'bg-amber-400 text-slate-950 border-amber-400 font-extrabold shadow-lg shadow-amber-400/20 scale-105'
                : 'bg-[color:var(--card-bg)] text-[color:var(--ink-muted)] border-[color:var(--hairline)] hover:border-amber-400/50 hover:text-[color:var(--ink)]'
            }`}
          >
            <span className="text-2xl">{gov.icon}</span>
            <span className="text-xs font-bold leading-tight">
              {lang === 'ar' ? gov.nameAr : gov.nameEn}
            </span>
          </button>
        ))}
      </div>

      {/* Origin Hub Results */}
      <div className="gmt-panel p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[color:var(--hairline)]">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-black text-[color:var(--ink)]">
              {lang === 'ar' ? 'البراندات والمصانع المسجلة' : 'Registered Regional Manufacturers'} ({filteredBrands.length})
            </h3>
          </div>
          <span className="text-xs text-[color:var(--ink-muted)] font-semibold">
            {lang === 'ar' ? 'ربط مباشر 100%' : '100% Direct Digital Linked'}
          </span>
        </div>

        {filteredBrands.length === 0 ? (
          <div className="text-center py-12 text-[color:var(--ink-muted)]">
            <p className="text-sm font-semibold">{lang === 'ar' ? 'لا توجد علامات مسجلة في هذه المحافظة حالياً' : 'No registered brands found in this governorate currently.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBrands.map((brand) => (
              <div 
                key={brand.id}
                onClick={() => onSelectBrand(brand)}
                className="p-4 rounded-xl bg-[color:var(--bg-surface-elevated)] border border-[color:var(--hairline)] hover:border-amber-400/50 transition cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <img src={brand.logoImage} alt={brand.nameEn} className="w-12 h-12 rounded-xl object-cover border border-amber-400/30 shrink-0" />
                  <div>
                    <h4 className="font-extrabold text-sm text-[color:var(--ink)] group-hover:text-amber-400 transition-colors">
                      {lang === 'ar' ? brand.nameAr : brand.nameEn}
                    </h4>
                    <p className="text-xs text-amber-400 font-semibold">{brand.fobPort}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[color:var(--ink-subtle)] group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
