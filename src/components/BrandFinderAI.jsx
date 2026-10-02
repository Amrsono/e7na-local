import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Zap, ArrowUpRight } from 'lucide-react';
import { ALTERNATIVES_MAPPING, BRANDS } from '../data/brandsData';

export default function BrandFinderAI({ lang, onSelectBrand }) {
  const [selectedGlobal, setSelectedGlobal] = useState(ALTERNATIVES_MAPPING[0].globalBrand);
  const activeMapping = ALTERNATIVES_MAPPING.find(m => m.globalBrand === selectedGlobal) || ALTERNATIVES_MAPPING[0];
  const matchedBrand = BRANDS.find(b => b.id === activeMapping.localBrandId);

  return (
    <section className="py-12 max-w-6xl mx-auto px-4">
      <div className="gmt-panel p-6 sm:p-10 relative overflow-hidden border border-amber-500/30">
        
        {/* Glow orb background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold mb-3 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'محرّك الذكاء الاصطناعي للبديل المحلي' : 'AI Local Alternative Matchmaker'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            {lang === 'ar' ? 'اعثر على البديل المصري الفاخر لماركاتك العالمية' : 'Find Premium Egyptian Alternatives to Global Brands'}
          </h2>
          <p className="text-xs sm:text-sm text-[color:var(--ink-muted)] mt-2">
            {lang === 'ar' 
              ? 'اختر الماركة العالمية التي تشتريها عادةً لمعرفة البديل المصنوع في مصر بجودة أعلى وسعر أفضل.' 
              : 'Select a global brand you usually buy to unlock authentic local Egyptian alternatives with superior craftsmanship.'}
          </p>
        </div>

        {/* Selector Pills for Global Brands */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {ALTERNATIVES_MAPPING.map((item) => (
            <button
              key={item.globalBrand}
              onClick={() => setSelectedGlobal(item.globalBrand)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${
                selectedGlobal === item.globalBrand
                  ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-[color:var(--bg-surface-elevated)] text-[color:var(--ink-muted)] border-[color:var(--hairline)] hover:border-amber-400/50'
              }`}
            >
              <span>{item.globalBrand}</span>
            </button>
          ))}
        </div>

        {/* Match Result Display Box */}
        {matchedBrand && (
          <div className="mt-8 p-6 rounded-2xl bg-[color:var(--bg-surface-elevated)] border border-amber-400/40 relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Global Vs Local comparison */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-red-500/15 text-red-400 text-xs font-bold line-through border border-red-500/30">
                    {activeMapping.globalBrand}
                  </span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-sm font-extrabold border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'ar' ? matchedBrand.nameAr : matchedBrand.nameEn}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-amber-400">
                  {lang === 'ar' ? 'لماذا تختار البديل المصري؟' : 'Why Switch to this Egyptian Brand?'}
                </h3>

                <p className="text-sm text-[color:var(--ink)] leading-relaxed">
                  {lang === 'ar' ? activeMapping.reasonAr : activeMapping.reasonEn}
                </p>

                {/* Key Benefits Pills */}
                <div className="grid grid-cols-2 gap-2 text-xs text-[color:var(--ink-muted)] pt-2">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'ar' ? 'خامات قطن وحشب طبيعية 100%' : '100% Raw Egyptian Materials'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'ar' ? 'توفير حتى 50% من السعر' : 'Save up to 50% vs Import Prices'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'ar' ? 'دعم الاقتصاد الوطني' : 'Supports Local Egyptian Economy'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'ar' ? 'شحن فوري محلي ودولي' : 'Fast Express Worldwide Dispatch'}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => onSelectBrand(matchedBrand)}
                    className="gmt-gradient-btn px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <span>{lang === 'ar' ? 'تصفح البراند والمنتجات' : 'View Brand Products'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href={matchedBrand.directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 text-xs font-extrabold flex items-center gap-2 transition"
                  >
                    <span>{lang === 'ar' ? 'زيارة المتجر المباشر' : 'Direct Link to Store'}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Preview Image */}
              <div className="md:col-span-5 relative h-56 md:h-full min-h-[220px] rounded-xl overflow-hidden border border-amber-400/30">
                <img 
                  src={matchedBrand.coverImage} 
                  alt={matchedBrand.nameEn} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <span className="text-xs font-bold text-amber-400">{matchedBrand.locationEn}</span>
                    <h4 className="text-lg font-black text-white">{lang === 'ar' ? matchedBrand.nameAr : matchedBrand.nameEn}</h4>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
