import React from 'react';
import { Search, Sparkles, ShieldCheck, ExternalLink, ArrowRight, Package, MapPin, Building2, Eye } from 'lucide-react';
import { MOCK_STATS, CATEGORIES } from '../data/brandsData';

export default function Hero({ 
  lang, 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory,
  onOpenOnboardModal 
}) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
      
      {/* Background glowing glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-purple-600/15 via-amber-500/15 to-cyan-500/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Tag Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-extrabold tracking-wide mb-6 pulse-badge shadow-lg shadow-amber-500/10">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>
            {lang === 'ar' 
              ? 'المنصة الرقمية الأولى لربط وتصدير العلامات التجارية المصرية' 
              : 'EGYPT\'S PREMIER DIGITAL MALL & EXPORT LINK NETWORK'}
          </span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] max-w-5xl mx-auto">
          {lang === 'ar' ? (
            <>
              مول مصر الرقمي — <span className="gmt-gradient-text">e7na Local</span> لربط وتصدير البراندات
            </>
          ) : (
            <>
              Where Local Heritage Meets Global Reach — <span className="gmt-gradient-text">e7na Local Digital Mall</span>
            </>
          )}
        </h1>

        {/* Hero Subtitle */}
        <p className="text-[color:var(--ink-muted)] text-base sm:text-xl max-w-3xl mx-auto mt-5 leading-relaxed">
          {lang === 'ar'
            ? 'ربط رقمي مباشر للمصنعين والحرفيين والماركات المصرية 100٪ بالمتسوقين وتجار التصدير والجملة عالمياً — كـ Alibaba و Silk Road للمنتجات المصرية.'
            : 'Direct digital linking for authentic Egyptian manufacturers, artisans, & modern brands to shoppers & wholesale buyers like Alibaba and the Silk Road.'}
        </p>

        {/* Featured Main Banner Display Card */}
        <div className="mt-10 max-w-5xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-pink-500 to-cyan-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 pointer-events-none" />
          
          <div className="relative rounded-3xl overflow-hidden border border-amber-400/40 shadow-2xl bg-slate-950">
            <img 
              src="/e7na.jpg" 
              alt="e7na Local Digital Mall Banner"
              className="w-full h-[320px] sm:h-[480px] lg:h-[540px] object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-700"
            />
            
            {/* Banner Glass Overlay Card */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070c18] via-transparent to-black/30 flex flex-col justify-end p-6 sm:p-10 text-left">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-400/50 text-cyan-300 text-xs font-black mb-2">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'مول افتراضي ثلاثي الأبعاد وربط مباشر' : '3D Next-Gen Digital Link Mall'}</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    {lang === 'ar' ? 'تسوق واستورد مباشرة من قلعة الصناعة المصرية' : 'Direct Digital Sourcing Hub — e7na Local'}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onOpenOnboardModal}
                    className="gmt-gradient-btn px-5 py-3 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-xl shadow-amber-500/20"
                  >
                    <Package className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'سجل علاماتك الآن' : 'List Your Brand'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Central Search Bar */}
        <div className="mt-12 max-w-2xl mx-auto relative">
          <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden border border-amber-500/30 bg-[color:var(--bg-surface-elevated)] backdrop-blur-xl focus-within:border-amber-400 transition-all">
            <Search className="w-6 h-6 text-amber-400 ml-4 mr-2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                lang === 'ar'
                  ? 'ابحث عن منتج أو براند مصري (قطن المحلة، أثاث دمياط، زيوت سيوة، خزف الفيوم...)'
                  : 'Search Egyptian product or brand (e.g. Giza Cotton, Damietta Wood, Fayoum Pottery...)'
              }
              className="w-full py-4 px-2 text-sm sm:text-base bg-transparent border-none outline-none text-[color:var(--ink)] placeholder-[color:var(--ink-subtle)]"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="px-3 py-1 mr-3 text-xs text-[color:var(--ink-subtle)] hover:text-amber-400 font-bold"
              >
                {lang === 'ar' ? 'مسح' : 'Clear'}
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="mt-8 flex items-center justify-center flex-wrap gap-2 max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-400/20'
                  : 'bg-[color:var(--card-bg)] text-[color:var(--ink-muted)] border-[color:var(--hairline)] hover:border-amber-400/40 hover:text-[color:var(--ink)]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{lang === 'ar' ? cat.nameAr : cat.nameEn}</span>
            </button>
          ))}
        </div>

        {/* Live Metric Stats Bar (Inspired by Grand Minds Technology) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
          {MOCK_STATS.map((stat, idx) => (
            <div 
              key={idx} 
              className="gmt-panel p-5 text-center relative overflow-hidden group hover:border-amber-400/50"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-cyan-400 to-amber-500 opacity-60" />
              <div className="text-2xl sm:text-4xl font-black gmt-gradient-text tracking-tight">
                {lang === 'ar' ? stat.valueAr : stat.valueEn}
              </div>
              <div className="text-xs sm:text-sm text-[color:var(--ink-muted)] font-semibold mt-1">
                {lang === 'ar' ? stat.labelAr : stat.labelEn}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
