import React, { useState } from 'react';
import { 
  X, 
  User, 
  ShoppingBag, 
  Package, 
  ShieldCheck, 
  LogOut, 
  Phone, 
  MapPin, 
  Clock, 
  ExternalLink,
  Building2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Smartphone
} from 'lucide-react';
import { useMall } from '../context/MallContext';
import { BRANDS } from '../data/brandsData';

export default function CustomerAccountModal({ lang, currency }) {
  const { 
    isAccountModalOpen, 
    setIsAccountModalOpen, 
    customer, 
    orders, 
    logoutCustomer,
    loginCustomer,
    outletBaskets,
    setActiveOutletBasketBrand
  } = useMall();

  const [earlyPhone, setEarlyPhone] = useState('');
  const [earlyName, setEarlyName] = useState('');

  if (!isAccountModalOpen) return null;

  const isRtl = lang === 'ar';

  const handleEarlyLogin = (e) => {
    e.preventDefault();
    if (!earlyName.trim() || !earlyPhone.trim()) return;
    loginCustomer({
      name: earlyName,
      phone: earlyPhone,
      address: 'القاهرة، مصر',
      governorate: 'cairo'
    });
  };

  const handleOpenBrandBasket = (brandId) => {
    const brand = BRANDS.find(b => b.id === Number(brandId));
    if (brand) {
      setIsAccountModalOpen(false);
      setActiveOutletBasketBrand(brand);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="gmt-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-400/40 bg-[color:var(--bg-surface)] shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAccountModalOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 border border-white/10 text-[color:var(--ink-muted)] hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 border-b border-[color:var(--hairline)] bg-gradient-to-r from-slate-950 via-[#0a1226] to-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-[2px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#050914] rounded-[14px] flex items-center justify-center text-cyan-400">
                <User className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-extrabold uppercase tracking-wider">
                  {lang === 'ar' ? 'حساب متسوق المول' : 'Mall Shopper Account'}
                </span>
                {customer?.isLoggedIn && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 font-extrabold">
                    {lang === 'ar' ? '● عميل موثق' : '● Verified Active'}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-black text-white mt-1">
                {customer?.isLoggedIn 
                  ? (lang === 'ar' ? `أهلاً بك، ${customer.name}` : `Welcome back, ${customer.name}`)
                  : (lang === 'ar' ? 'حسابك في مول إحنا المحلي' : 'Your Account in e7na Mall')}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* CASE 1: NOT LOGGED IN (GUEST MODE) */}
          {!customer?.isLoggedIn ? (
            <div className="space-y-6">
              
              {/* Mall Guest Architecture Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-[color:var(--bg-surface-elevated)] to-amber-950/20 border border-cyan-500/30 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-black text-sm">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>{lang === 'ar' ? 'مفهوم تسوق المول: لا تسجيل دخول إجباري' : 'Mall Concept: No Upfront Login Required'}</span>
                </div>
                <p className="text-xs text-[color:var(--ink-muted)] leading-relaxed">
                  {lang === 'ar' ? (
                    <>
                      أنت تتسوق الآن في <strong className="text-white">وضع ضيف المول المفتوح</strong>. صُمم مول إحنا كمنظومة مفتوحة تتيح لك حرية استكشاف مصانع مصر ومعارض البراندات المحلية ومقارنة الأسعار بدون أن يقطعك أي تسجيل دخول.
                      <br /><br />
                      <span className="text-amber-400 font-bold">متى يُطلب تسجيل الدخول؟</span>
                      <br />
                      فقط عند دخولك لمعرض براند معين، وإضافة منتجاته إلى السلة، ومحاولة إتمام الشحن والتوصيل.
                    </>
                  ) : (
                    <>
                      You are browsing in <strong className="text-white">Open Mall Guest Mode</strong>. e7na is built like a physical mall: browse any corridor, inspect local artisan brands, and explore origin maps without authentication hurdles.
                      <br /><br />
                      <span className="text-amber-400 font-bold">When does login happen?</span>
                      <br />
                      Only when you enter a specific outlet, add products to your basket, and attempt to place an order.
                    </>
                  )}
                </p>
              </div>

              {/* Quick Early Sign-In Form (Optional) */}
              <div className="p-5 rounded-2xl bg-[color:var(--bg-surface-elevated)] border border-[color:var(--hairline)] space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-[color:var(--ink-muted)]">
                  {lang === 'ar' ? 'هل تملك حساباً سابقاً أو ترغب بتسجيل الدخول مسبقاً؟' : 'Already have an account or want to sign in early?'}
                </h3>
                
                <form onSubmit={handleEarlyLogin} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={earlyName}
                      onChange={(e) => setEarlyName(e.target.value)}
                      placeholder={lang === 'ar' ? 'اسمك' : 'Your name'}
                      className="px-3.5 py-2.5 rounded-xl bg-[color:var(--bg-overlay)] border border-[color:var(--hairline)] text-xs text-[color:var(--ink)] outline-none focus:border-cyan-400"
                    />
                    <input
                      type="tel"
                      required
                      value={earlyPhone}
                      onChange={(e) => setEarlyPhone(e.target.value)}
                      placeholder={lang === 'ar' ? 'رقم هاتفك (مثال: 010...)' : 'Phone number (e.g. 010...)'}
                      className="px-3.5 py-2.5 rounded-xl bg-[color:var(--bg-overlay)] border border-[color:var(--hairline)] text-xs text-[color:var(--ink)] outline-none focus:border-cyan-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-bold text-xs hover:bg-cyan-500/25 transition"
                  >
                    {lang === 'ar' ? 'تسجيل دخول مبكر للحساب' : 'Sign In to Mall Account'}
                  </button>
                </form>
              </div>

            </div>
          ) : (
            /* CASE 2: CUSTOMER IS LOGGED IN */
            <div className="space-y-6">
              
              {/* Customer Profile Card */}
              <div className="p-4 rounded-2xl bg-[color:var(--bg-surface-elevated)] border border-[color:var(--hairline)] flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-[color:var(--ink)]">{customer.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-400 text-[10px] font-bold">
                      {lang === 'ar' ? 'متسوق موثق' : 'Verified Shopper'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[color:var(--ink-muted)]">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-cyan-400" />
                      {customer.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {customer.address}
                    </span>
                  </div>
                </div>

                <button
                  onClick={logoutCustomer}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'خروج (لوضع الضيف)' : 'Sign Out'}</span>
                </button>
              </div>

              {/* Active Outlet Baskets Indicator */}
              {Object.keys(outletBaskets).length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                    <span className="flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'سلات المعارض النشطة لديك:' : 'Active Outlet Baskets:'}</span>
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-1">
                    {Object.entries(outletBaskets).map(([brandId, items]) => {
                      if (!items || items.length === 0) return null;
                      const brand = BRANDS.find(b => b.id === Number(brandId));
                      if (!brand) return null;
                      return (
                        <button
                          key={brandId}
                          onClick={() => handleOpenBrandBasket(brandId)}
                          className="px-3 py-1.5 rounded-xl bg-[color:var(--bg-surface)] border border-amber-400/40 text-xs font-bold text-[color:var(--ink)] hover:border-amber-400 transition flex items-center gap-1.5"
                        >
                          <img src={brand.logoImage} alt="" className="w-4 h-4 rounded-full object-cover" />
                          <span>{lang === 'ar' ? brand.nameAr : brand.nameEn}</span>
                          <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                            {items.reduce((s, it) => s + it.quantity, 0)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Past Outlet Orders */}
              <div>
                <h3 className="text-sm font-black text-[color:var(--ink)] mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4 text-cyan-400" />
                  <span>{lang === 'ar' ? 'سجل طلباتي بالمعارض' : 'My Outlet Orders History'}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[color:var(--bg-surface-elevated)] border border-[color:var(--hairline)] text-[color:var(--ink-muted)]">
                    {orders.length}
                  </span>
                </h3>

                {orders.length === 0 ? (
                  <div className="text-center py-10 rounded-2xl bg-[color:var(--bg-surface-elevated)] border border-[color:var(--hairline)] space-y-2">
                    <p className="text-xs text-[color:var(--ink-muted)]">
                      {lang === 'ar' 
                        ? 'لم تقم بطلب أوردر من أي معرض حتى الآن. تصفح المعارض وأضف منتجاتك للسلة.' 
                        : 'No orders placed with any outlet yet.'}
                    </p>
                    <button
                      onClick={() => setIsAccountModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition"
                    >
                      {lang === 'ar' ? 'تصفح معارض المول' : 'Explore Mall Outlets'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div 
                        key={order.id}
                        className="p-4 rounded-2xl bg-[color:var(--bg-surface-elevated)] border border-[color:var(--hairline)] hover:border-amber-400/40 transition space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <img src={order.brandLogo} alt="" className="w-8 h-8 rounded-lg object-cover bg-slate-900 border border-white/10" />
                            <div>
                              <div className="text-xs font-black text-[color:var(--ink)]">
                                {lang === 'ar' ? order.brandNameAr : order.brandNameEn}
                              </div>
                              <div className="text-[10px] text-[color:var(--ink-muted)] flex items-center gap-1">
                                <Clock className="w-3 h-3 text-cyan-400" />
                                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                <span>•</span>
                                <span className="font-mono text-amber-400 font-bold">#{order.id}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold">
                              {lang === 'ar' ? order.statusLabelAr : order.statusLabelEn}
                            </span>
                          </div>
                        </div>

                        {/* Order items recap */}
                        <div className="p-2.5 rounded-xl bg-[color:var(--bg-overlay)] text-[11px] space-y-1">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between text-[color:var(--ink-muted)]">
                              <span>{it.quantity}x {lang === 'ar' ? it.nameAr : it.nameEn}</span>
                              <span className="font-bold text-[color:var(--ink)]">{(it.priceEgp * it.quantity).toLocaleString()} ج.م</span>
                            </div>
                          ))}
                          <div className="flex justify-between pt-1 border-t border-[color:var(--hairline)] font-bold text-[color:var(--ink)]">
                            <span>{lang === 'ar' ? 'الإجمالي والتوصيل:' : 'Total & Shipping:'}</span>
                            <span className="text-amber-400">{order.totalEgp.toLocaleString()} ج.م</span>
                          </div>
                        </div>

                        {/* Direct WhatsApp Track */}
                        <a
                          href={`https://wa.me/${order.brandWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`مرحباً ${order.brandNameAr}، أود الاستفسار عن حالة طلبي رقم #${order.id} عبر مول إحنا.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'تتبع فوري مع مسؤول شحن المعرض' : 'Track via Outlet WhatsApp'}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
