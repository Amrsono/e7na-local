import React, { useState } from 'react';
import { 
  Globe, 
  Moon, 
  Sun, 
  Building2, 
  Sparkles, 
  PlusCircle, 
  Menu,
  X,
  Compass,
  Search,
  ShoppingBag,
  Ship
} from 'lucide-react';

export default function Header({ 
  theme, 
  setTheme, 
  lang, 
  setLang, 
  currency, 
  setCurrency, 
  onOpenOnboardModal,
  onOpenRfqModal,
  activeTab,
  setActiveTab
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLang = () => {
    const nextLang = lang === 'en' ? 'ar' : 'en';
    setLang(nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = nextLang;
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <header className="glass-header sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div 
          className="flex items-center gap-3 cursor-pointer group shrink-0" 
          onClick={() => setActiveTab('explore')}
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 via-pink-500 to-amber-400 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#050914] rounded-[14px] flex items-center justify-center font-black text-lg text-cyan-400">
              e7
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight gmt-gradient-text">
                {lang === 'ar' ? 'إحنا Local' : 'e7na Local'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-extrabold tracking-widest uppercase">
                {lang === 'ar' ? 'صنع في مصر' : 'MALL & EXPORT'}
              </span>
            </div>
            <p className="text-[11px] text-[color:var(--ink-muted)] font-semibold -mt-0.5">
              {lang === 'ar' ? 'شبكة الربط الرقمي للعلامات المصرية' : 'Egypt\'s Brand Digital Link Network'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[color:var(--bg-surface-elevated)] p-1.5 rounded-2xl border border-[color:var(--hairline)] shadow-inner">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
              activeTab === 'explore' 
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md shadow-cyan-500/20' 
                : 'text-[color:var(--ink-muted)] hover:text-[color:var(--ink)] hover:bg-[color:var(--bg-overlay)]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{lang === 'ar' ? 'تصفح البراندات' : 'Explore Mall'}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('silkroad')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
              activeTab === 'silkroad' 
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md shadow-cyan-500/20' 
                : 'text-[color:var(--ink-muted)] hover:text-[color:var(--ink)] hover:bg-[color:var(--bg-overlay)]'
            }`}
          >
            <Ship className="w-4 h-4" />
            <span>{lang === 'ar' ? 'طريق الحرير للتصدير' : 'Silk Road (B2B)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('finder')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
              activeTab === 'finder' 
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md shadow-cyan-500/20' 
                : 'text-[color:var(--ink-muted)] hover:text-[color:var(--ink)] hover:bg-[color:var(--bg-overlay)]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'ar' ? 'البديل المحلي AI' : 'AI Alternative'}</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
              activeTab === 'map' 
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-md shadow-cyan-500/20' 
                : 'text-[color:var(--ink-muted)] hover:text-[color:var(--ink)] hover:bg-[color:var(--bg-overlay)]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{lang === 'ar' ? 'خريطة المحافظات' : 'Origin Map'}</span>
          </button>
        </nav>

        {/* Right Tools Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Currency Switcher */}
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-[color:var(--bg-surface-elevated)] border border-[color:var(--hairline)] text-xs font-black px-2.5 py-2 rounded-xl text-[color:var(--ink)] outline-none cursor-pointer hover:border-cyan-400/50 transition"
            aria-label="Currency"
          >
            <option value="EGP">EGP (ج.م)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>

          {/* Language Toggle Button */}
          <button
            onClick={toggleLang}
            className="px-2.5 py-2 rounded-xl border border-[color:var(--hairline)] bg-[color:var(--bg-surface-elevated)] hover:border-cyan-400/50 text-xs font-black text-[color:var(--ink)] flex items-center gap-1 transition"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Dark / Light Theme Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-[color:var(--hairline)] bg-[color:var(--bg-surface-elevated)] text-[color:var(--ink)] hover:border-cyan-400/50 transition"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Wholesale RFQ Basket Button */}
          <button
            onClick={onOpenRfqModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 hover:bg-pink-500/20 text-xs font-extrabold transition"
          >
            <Building2 className="w-4 h-4" />
            <span>{lang === 'ar' ? 'طلب توريد RFQ' : 'B2B RFQ'}</span>
          </button>

          {/* List Your Brand CTA */}
          <button
            onClick={onOpenOnboardModal}
            className="gmt-gradient-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">{lang === 'ar' ? 'سجّل علاماتك' : 'List Brand'}</span>
            <span className="sm:hidden">{lang === 'ar' ? 'سجل' : 'Join'}</span>
          </button>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-[color:var(--hairline)] text-[color:var(--ink)]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[color:var(--hairline)] bg-[color:var(--bg-surface)] p-4 space-y-2 animate-in slide-in-from-top duration-200">
          <button
            onClick={() => { setActiveTab('explore'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-extrabold ${activeTab === 'explore' ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' : 'text-[color:var(--ink)]'}`}
          >
            🛍️ {lang === 'ar' ? 'تصفح البراندات المصرية' : 'Explore Mall Brands'}
          </button>
          <button
            onClick={() => { setActiveTab('silkroad'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-extrabold ${activeTab === 'silkroad' ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' : 'text-[color:var(--ink)]'}`}
          >
            🚢 {lang === 'ar' ? 'طريق الحرير للتصدير (B2B)' : 'Silk Road Wholesale (B2B)'}
          </button>
          <button
            onClick={() => { setActiveTab('finder'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-extrabold ${activeTab === 'finder' ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' : 'text-[color:var(--ink)]'}`}
          >
            ✨ {lang === 'ar' ? 'مكتشف البديل المحلي AI' : 'AI Local Brand Finder'}
          </button>
          <button
            onClick={() => { setActiveTab('map'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-extrabold ${activeTab === 'map' ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' : 'text-[color:var(--ink)]'}`}
          >
            📍 {lang === 'ar' ? 'خريطة المحافظات والمنتجات' : 'Governorates Origin Map'}
          </button>
        </div>
      )}
    </header>
  );
}
