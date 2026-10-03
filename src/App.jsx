import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BrandCard from './components/BrandCard';
import BrandFinderAI from './components/BrandFinderAI';
import GovernoratesMap from './components/GovernoratesMap';
import WholesaleSilkRoad from './components/WholesaleSilkRoad';
import BrandModal from './components/BrandModal';
import RfqModal from './components/RfqModal';
import OnboardBrandModal from './components/OnboardBrandModal';
import FloatingWidgets from './components/FloatingWidgets';
import Footer from './components/Footer';
import OutletBasketDrawer from './components/OutletBasketDrawer';
import OutletAuthModal from './components/OutletAuthModal';
import CustomerAccountModal from './components/CustomerAccountModal';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginModal from './components/AdminLoginModal';

import { useMall } from './context/MallContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('EGP');
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'silkroad' | 'finder' | 'map'
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGov, setSelectedGov] = useState('all');

  // Modals state
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [rfqModalBrand, setRfqModalBrand] = useState(null);
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);
  
  // Admin View State
  const [isAdminViewOpen, setIsAdminViewOpen] = useState(false);

  const { 
    brands, 
    adminUser,
    isAdminLoginModalOpen, 
    setIsAdminLoginModalOpen,
    platformSettings 
  } = useMall();

  // Filtered brands calculation (using dynamic brands from MallContext)
  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = 
      brand.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.nameAr.includes(searchTerm) ||
      brand.taglineEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.descriptionEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.locationEn?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = selectedCategory === 'all' || brand.category === selectedCategory;
    const matchesGov = selectedGov === 'all' || brand.governorate === selectedGov;

    return matchesSearch && matchesCat && matchesGov;
  });

  const handleOpenRfqForBrand = (brand) => {
    setRfqModalBrand(brand);
    setIsRfqModalOpen(true);
  };

  // If Admin View is active, render full-screen Admin Dashboard
  if (isAdminViewOpen && adminUser?.isLoggedIn) {
    return (
      <AdminDashboard
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        onBackToMall={() => setIsAdminViewOpen(false)}
      />
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col relative text-[color:var(--ink)]">
      
      {/* Radial Background Mesh Glow matching Grand Minds Tech */}
      <div className="gmt-bg-radial">
        <div className="gmt-bg-glow" />
      </div>

      {/* Top Platform Announcement Banner (Configured from Admin Dashboard) */}
      {platformSettings?.bannerActive && (
        <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white text-xs sm:text-sm font-black py-2.5 px-4 text-center shadow-lg relative z-50 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
          <span>{lang === 'ar' ? platformSettings.bannerTextAr : platformSettings.bannerTextEn}</span>
        </div>
      )}

      {/* Main Header Nav */}
      <Header
        theme={theme}
        setTheme={setTheme}
        lang={lang}
        setLang={setLang}
        currency={currency}
        setCurrency={setCurrency}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenOnboardModal={() => setIsOnboardModalOpen(true)}
        onOpenRfqModal={() => handleOpenRfqForBrand(null)}
        onOpenAdmin={() => setIsAdminViewOpen(true)}
      />

      {/* Main Body Content */}
      <main className="flex-1">
        
        {/* Main Hero Section */}
        <Hero
          lang={lang}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onOpenOnboardModal={() => setIsOnboardModalOpen(true)}
        />

        {/* Tab View Switcher */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Active Tab: Explore Mall Catalog */}
          {activeTab === 'explore' && (
            <section className="py-8">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[color:var(--hairline)]">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                    {lang === 'ar' ? 'العلامات التجارية والمصانع المصرية' : 'Authentic Egyptian Brand Catalog'}
                  </h2>
                  <p className="text-xs text-[color:var(--ink-muted)] mt-1">
                    {lang === 'ar' 
                      ? `تم العثور على (${filteredBrands.length}) علامة تجارية موثقة بحسب البحث`
                      : `Showing (${filteredBrands.length}) verified Egyptian brands`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {adminUser?.isLoggedIn && (
                    <button
                      onClick={() => setIsAdminViewOpen(true)}
                      className="px-3.5 py-2 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-black hover:bg-amber-500/25 transition flex items-center gap-1.5"
                    >
                      <span>⚡ {lang === 'ar' ? 'لوحة تحكم الأدمن' : 'Admin Console'}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOnboardModalOpen(true)}
                    className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold hover:bg-cyan-500/25 transition"
                  >
                    {lang === 'ar' ? '+ أضف علاماتك التجارية' : '+ Submit Your Brand'}
                  </button>
                </div>
              </div>

              {filteredBrands.length === 0 ? (
                <div className="text-center py-20 gmt-panel">
                  <span className="text-5xl">🔍</span>
                  <h3 className="text-xl font-bold mt-4">
                    {lang === 'ar' ? 'لم نجد نتائج مطابقة لجهد بحثك' : 'No matching brands found'}
                  </h3>
                  <p className="text-xs text-[color:var(--ink-muted)] mt-2">
                    {lang === 'ar' ? 'جرب البحث بكلمات أخرى مثل: قطن، دمياط، زيوت، أو خزف' : 'Try searching for: cotton, furniture, oils, or pottery'}
                  </p>
                  <button
                    onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedGov('all'); }}
                    className="mt-4 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold"
                  >
                    {lang === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBrands.map((brand) => (
                    <BrandCard
                      key={brand.id}
                      brand={brand}
                      lang={lang}
                      currency={currency}
                      onSelectBrand={setSelectedBrand}
                      onRequestRfq={handleOpenRfqForBrand}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Active Tab: Silk Road B2B Export Hub */}
          {activeTab === 'silkroad' && (
            <WholesaleSilkRoad
              lang={lang}
              onRequestRfq={handleOpenRfqForBrand}
            />
          )}

          {/* Active Tab: AI Local Alternative Matchmaker */}
          {activeTab === 'finder' && (
            <BrandFinderAI
              lang={lang}
              onSelectBrand={setSelectedBrand}
            />
          )}

          {/* Active Tab: Governorates Map */}
          {activeTab === 'map' && (
            <GovernoratesMap
              lang={lang}
              selectedGov={selectedGov}
              setSelectedGov={setSelectedGov}
              onSelectBrand={setSelectedBrand}
            />
          )}

        </div>

      </main>

      {/* Floating Widgets: AI Assistant & WhatsApp Export Desk */}
      <FloatingWidgets
        lang={lang}
        onOpenRfq={() => handleOpenRfqForBrand(null)}
      />

      {/* Brand Profile & Outlet Boutique Modal */}
      {selectedBrand && (
        <BrandModal
          brand={selectedBrand}
          lang={lang}
          currency={currency}
          onClose={() => setSelectedBrand(null)}
          onRequestRfq={handleOpenRfqForBrand}
        />
      )}

      {/* Wholesale RFQ Modal */}
      {isRfqModalOpen && (
        <RfqModal
          brand={rfqModalBrand}
          lang={lang}
          onClose={() => { setIsRfqModalOpen(false); setRfqModalBrand(null); }}
        />
      )}

      {/* Brand Onboarding Modal */}
      {isOnboardModalOpen && (
        <OnboardBrandModal
          lang={lang}
          onClose={() => setIsOnboardModalOpen(false)}
        />
      )}

      {/* Outlet-Specific Cart Drawer */}
      <OutletBasketDrawer
        lang={lang}
        currency={currency}
      />

      {/* Outlet Checkout & Deferred Login Modal */}
      <OutletAuthModal
        lang={lang}
        currency={currency}
      />

      {/* Mall Shopper Account & Order Tracking Modal */}
      <CustomerAccountModal
        lang={lang}
        currency={currency}
      />

      {/* Admin Login Modal (Triggered when user clicks Admin and is not logged in) */}
      {isAdminLoginModalOpen && (
        <AdminLoginModal
          lang={lang}
          onClose={() => setIsAdminLoginModalOpen(false)}
          onSuccess={() => setIsAdminViewOpen(true)}
        />
      )}

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
