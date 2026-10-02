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
  Ship,
  User,
  ShieldCheck,
  Package
} from 'lucide-react';
import { useMall } from '../context/MallContext';
import { BRANDS } from '../data/brandsData';

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
  const { 
    customer, 
    setIsAccountModalOpen, 
    totalBasketItemsCount, 
    outletBaskets,
    setActiveOutletBasketBrand 
  } = useMall();

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

  // Helper to open the first active outlet basket
  const handleOpenActiveBasket = () => {
    const activeBrandIds = Object.keys(outletBaskets).filter(id => outletBaskets[id]?.length > 0);
    if (activeBrandIds.length > 0) {
      const brand = BRANDS.find(b => b.id === Number(activeBrandIds[0]));
      if (brand) {
        setActiveOutletBasketBrand(brand);
        return;
      }
    }
    // fallback to account modal
    setIsAccountModalOpen(true);
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
              {lang === 'ar' ? 'مول الربط الرقمي للعلامات والمصانع المصرية' : 'Egypt\'s Digital Brand Mall & Export Hub'}
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

        {/* Right Tools & Account Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
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

          {/* Outlet Basket Icon Indicator (if items exist) */}
          <button
            onClick={handleOpenActiveBasket}
            className={`relative p-2 rounded-xl border transition flex items-center justify-center ${
              totalBasketItemsCount > 0
                ? 'border-amber-400/50 bg-amber-400/15 text-amber-400 hover:bg-amber-400/25'
                : 'border-[color:var(--hairline)] bg-[color:var(--bg-surface-elevated)] text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]'
            }`}
            title={lang === 'ar' ? 'سلة مشتريات المعارض' : 'Outlet Baskets'}
          >
            <ShoppingBag className="w-4 h-4" />
            {totalBasketItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow-sm animate-pulse">
                {totalBasketItemsCount}
              </span>
            )}
          </button>

          {/* Mall Account Button (Explaining Open Guest Mode vs Logged In) */}
          <button
            onClick={() => setIsAccountModalOpen(true)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
              customer?.isLoggedIn 
                ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                : 'border-[color:var(--hairline)] bg-[color:var(--bg-surface-elevated)] text-[color:var(--ink)] hover:border-cyan-400/50'
            }`}
            title={customer?.isLoggedIn ? 'Customer Mall Account' : 'Mall Guest Mode — Browse Freely'}
          >
            <User className={`w-3.5 h-3.5 ${customer?.isLoggedIn ? 'text-emerald-400' : 'text-cyan-400'}`} />
            <span className="hidden md:inline">
              {customer?.isLoggedIn 
                ? customer.name.split(' ')[0]
                : (lang === 'ar' ? 'حسابي (ضيف المول)' : 'Account (Guest)')}
            </span>
            {customer?.isLoggedIn && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping hidden md:inline-block" />
            )}
          </button>

          {/* Wholesale RFQ Basket Button */}
          <button
            onClick={onOpenRfqModal}
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 hover:bg-pink-500/20 text-xs font-extrabold transition"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'طلب RFQ' : 'B2B RFQ'}</span>
          </button>

          {/* List Your Brand CTA */}
          <button
            onClick={onOpenOnboardModal}
            className="gmt-gradient-btn px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
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
          
          {/* Account status in mobile drawer */}
          <button
            onClick={() => { setIsAccountModalOpen(true); setMobileMenuOpen(false); }}
            className="w-full p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-left rtl:text-right flex items-center justify-between text-cyan-200 mb-2"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" />
              <span>
                {customer?.isLoggedIn 
                  ? (lang === 'ar' ? `حساب: ${customer.name}` : `Account: ${customer.name}`)
                  : (lang === 'ar' ? 'حسابي (وضع ضيف المول المفتوح)' : 'My Account (Open Guest Mode)')}
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 font-bold">
              {customer?.isLoggedIn ? (lang === 'ar' ? 'موثق' : 'Verified') : (lang === 'ar' ? 'تصفح حر' : 'Guest')}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('explore'); setMobileMenuOpen(false); }}
            className={`w-full text-left rtl:text-right px-4 py-3 rounded-xl text-sm font-extrabold ${activeTab === 'explore' ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' : 'text-[color:var(--ink)]'}`}
          >
            🛍️ {lang === 'ar' ? 'تصفح البراندات المصرية' : 'Explore Mall Brands'}
          </button>
          <button
            onClick={() => { setActiveTab('silkroad'); setMobileMenuOpen(false); }}
            className={`w-full text-left rtl:text-right px-4 py-3 rounded-xl text-sm font-extrabold ${activeTab === 'silkroad' ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' : 'text-[color:var(--ink)]'}`}
          >
            🚢 {lang === 'ar' ? 'طريق الحرير للتصدير (B2B)' : 'Silk Road Wholesale (B2B)'}
          </button>
          <button
            onClick={() => { setActiveTab('finder'); setMobileMenuOpen(false); }}
            className={`w-full text-left rtl:text-right px-4 py-3 rounded-xl text-sm font-extrabold ${activeTab === 'finder' ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' : 'text-[color:var(--ink)]'}`}
          >
            ✨ {lang === 'ar' ? 'مكتشف البديل المحلي AI' : 'AI Local Brand Finder'}
          </button>
          <button
            onClick={() => { setActiveTab('map'); setMobileMenuOpen(false); }}
            className={`w-full text-left rtl:text-right px-4 py-3 rounded-xl text-sm font-extrabold ${activeTab === 'map' ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' : 'text-[color:var(--ink)]'}`}
          >
            📍 {lang === 'ar' ? 'خريطة المحافظات والمنتجات' : 'Governorates Origin Map'}
          </button>

          <button
            onClick={() => { onOpenRfqModal(); setMobileMenuOpen(false); }}
            className="w-full text-left rtl:text-right px-4 py-3 rounded-xl text-sm font-extrabold text-pink-400 bg-pink-500/10 border border-pink-500/30"
          >
            🏢 {lang === 'ar' ? 'طلب توريد جملة وتصدير (B2B RFQ)' : 'Wholesale B2B RFQ'}
          </button>
        </div>
      )}
    </header>
  );
}
