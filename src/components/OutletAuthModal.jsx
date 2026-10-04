import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Phone, 
  User, 
  MapPin, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  Building2, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  ExternalLink,
  ShoppingBag
} from 'lucide-react';
import { useMall } from '../context/MallContext';
import { GOVERNORATES } from '../data/brandsData';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

export default function OutletAuthModal({ lang, currency }) {
  const { 
    isAuthCheckoutOpen, 
    setIsAuthCheckoutOpen, 
    authCheckoutBrand,
    outletBaskets,
    customer,
    confirmOutletOrder,
    latestCompletedOrder,
    setLatestCompletedOrder,
    setActiveOutletBasketBrand,
    setIsAccountModalOpen
  } = useMall();

  const brand = authCheckoutBrand;
  const items = brand ? (outletBaskets[brand.id] || []) : [];
  const isRtl = lang === 'ar';

  // Form State
  const [name, setName] = useState(customer?.name || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const [address, setAddress] = useState(customer?.address || '');
  const [governorate, setGovernorate] = useState(customer?.governorate || 'القاهرة (Cairo)');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'instapay' | 'card'
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('4921');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Lock background page scroll on iOS while modal is open
  useBodyScrollLock(!!(isAuthCheckoutOpen && brand));

  if (!isAuthCheckoutOpen || !brand) return null;

  const subtotalEgp = items.reduce((acc, it) => acc + (it.priceEgp * it.quantity), 0);
  const subtotalUsd = items.reduce((acc, it) => acc + (it.priceUsd * it.quantity), 0);
  const shippingFeeEgp = 60;
  const totalEgp = subtotalEgp + shippingFeeEgp;

  const formatPrice = (egp, usd) => {
    if (currency === 'USD') return `$${usd.toFixed(2)}`;
    if (currency === 'EUR') return `€${Math.round(usd * 0.92)}`;
    return `${egp.toLocaleString()} ج.م`;
  };

  const handleQuickDemoFill = () => {
    setName(lang === 'ar' ? 'أحمد الشناوي' : 'Ahmed El Shenawy');
    setPhone('+20 102 345 6789');
    setAddress(lang === 'ar' ? 'عمارة 14، شارع النصر، المعادي، القاهرة' : 'Building 14, El Nasr St, Maadi, Cairo');
    setGovernorate('cairo');
    setErrorMsg('');
  };

  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg(lang === 'ar' ? 'يرجى استكمال الاسم ورقم الهاتف والعنوان.' : 'Please fill your name, phone, and delivery address.');
      return;
    }
    setErrorMsg('');

    // If customer already verified previously, skip OTP
    if (customer?.isLoggedIn) {
      handleFinalOrderSubmit();
    } else {
      setOtpStep(true);
      setEnteredOtp('4921'); // Pre-fill sample OTP for smooth frictionless demo
    }
  };

  const handleFinalOrderSubmit = () => {
    const customerInfo = {
      name,
      phone,
      address,
      governorate,
      isLoggedIn: true
    };
    confirmOutletOrder(brand, customerInfo, paymentMethod);
    setOtpStep(false);
  };

  const handleClose = () => {
    setIsAuthCheckoutOpen(false);
    setOtpStep(false);
    setLatestCompletedOrder(null);
  };

  // WhatsApp order share URL
  const generateWhatsAppUrl = (order) => {
    const phoneClean = brand.whatsappNumber.replace(/[^0-9]/g, '');
    const text = lang === 'ar'
      ? `مرحباً ${brand.nameAr}، قمت بطلب أوردر جديد عبر مول إحنا المحلي برقم: ${order.id} بإجمالي ${order.totalEgp.toLocaleString()} ج.م. أرجو تأكيد الشحن.`
      : `Hello ${brand.nameEn}, I placed a new order via e7na Local Mall #${order.id} totaling ${order.totalEgp.toLocaleString()} EGP. Please confirm direct dispatch.`;
    return `https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto overflow-x-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="gmt-panel w-full max-w-2xl max-h-[92vh] overflow-y-auto overflow-x-hidden min-w-0 rounded-3xl border border-amber-400/50 bg-[color:var(--bg-surface)] shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 border border-white/10 text-[color:var(--ink-muted)] hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Banner */}
        <div className="relative p-6 sm:p-7 border-b border-[color:var(--hairline)] bg-gradient-to-r from-slate-950 via-[#0a1122] to-slate-950 overflow-hidden">
          <div className="flex items-center gap-3.5 relative z-10">
            <img 
              src={brand.logoImage} 
              alt={brand.nameEn} 
              className="w-14 h-14 rounded-2xl border-2 border-amber-400 object-cover shadow-xl bg-slate-900 shrink-0" 
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  <span>{lang === 'ar' ? 'معرض مول إحنا المعتمد' : 'Authorized Mall Outlet'}</span>
                </span>
                <span className="text-[11px] text-amber-400 font-bold">
                  {lang === 'ar' ? brand.locationAr : brand.locationEn}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {lang === 'ar' ? `إتمام الطلب من معرض ${brand.nameAr}` : `Order from ${brand.nameEn} Outlet`}
              </h2>
            </div>
          </div>

          {/* Core Architecture Highlight: Explaining Why Login Triggers Here */}
          {!latestCompletedOrder && (
            <div className="mt-4 p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-black">
                  {lang === 'ar' ? 'لماذا نسجل الدخول الآن؟' : 'Why sign in at this step?'}
                </strong>
                <p className="text-[11px] text-cyan-200/90 mt-0.5 leading-relaxed">
                  {lang === 'ar' 
                    ? 'في مول إحنا تتسوق كزائر حر دون أي تسجيل مسبق. الآن وبما أنك تطلب منتجات محددة من هذا المعرض، نسجل حسابك ونوثق رقم هاتفك لربط طلبك مباشرة بمصنع المعرض وتأكيد بيانات التوصيل.'
                    : 'In e7na Mall, you browse freely as a guest without prior login. Now that you are ordering from this outlet, we authenticate your details so the brand factory can prepare and dispatch your parcel.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          
          {/* CASE 1: ORDER SUCCESSFULLY COMPLETED */}
          {latestCompletedOrder ? (
            <div className="text-center py-6 space-y-6 animate-in fade-in">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  {lang === 'ar' ? 'تم تأكيد طلبك بنجاح مع المعرض' : 'Order Successfully Placed!'}
                </span>
                <h3 className="text-2xl font-black text-[color:var(--ink)] mt-2">
                  {lang === 'ar' ? `رقم الطلب: ${latestCompletedOrder.id}` : `Order Ref: ${latestCompletedOrder.id}`}
                </h3>
                <p className="text-xs text-[color:var(--ink-muted)] mt-1.5 max-w-md mx-auto">
                  {lang === 'ar' 
                    ? `تم إرسال تفاصيل طلبك مباشرة لإدارة إنتاج وشحن معرض ${brand.nameAr} بـ ${brand.locationAr}. تم حفظ حسابك لتتبع الطلبات القادمة.`
                    : `Your order was dispatched directly to ${brand.nameEn}'s workshop in ${brand.locationEn}. Your customer account is now verified.`}
                </p>
              </div>

              {/* Order Quick Summary Card */}
              <div className="p-4 rounded-2xl bg-[color:var(--bg-overlay)] border border-[color:var(--hairline)] text-left rtl:text-right max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between text-[color:var(--ink-muted)]">
                  <span>{lang === 'ar' ? 'المستلم:' : 'Recipient:'}</span>
                  <span className="font-bold text-[color:var(--ink)]">{latestCompletedOrder.customer?.name}</span>
                </div>
                <div className="flex justify-between text-[color:var(--ink-muted)]">
                  <span>{lang === 'ar' ? 'رقم الهاتف:' : 'Phone:'}</span>
                  <span className="font-bold text-[color:var(--ink)]">{latestCompletedOrder.customer?.phone}</span>
                </div>
                <div className="flex justify-between text-[color:var(--ink-muted)]">
                  <span>{lang === 'ar' ? 'عنوان التوصيل:' : 'Address:'}</span>
                  <span className="font-bold text-[color:var(--ink)]">{latestCompletedOrder.customer?.address}</span>
                </div>
                <div className="flex justify-between text-[color:var(--ink-muted)]">
                  <span>{lang === 'ar' ? 'طريقة الدفع:' : 'Payment:'}</span>
                  <span className="font-bold text-amber-400">
                    {latestCompletedOrder.paymentMethod === 'cod' ? (lang === 'ar' ? 'دفع عند الاستلام' : 'Cash on Delivery') : 'InstaPay / Card'}
                  </span>
                </div>
                <div className="flex justify-between text-[color:var(--ink-muted)] pt-2 border-t border-[color:var(--hairline)]">
                  <span className="font-black text-sm text-[color:var(--ink)]">{lang === 'ar' ? 'الإجمالي الشامل:' : 'Total Amount:'}</span>
                  <span className="font-black text-sm text-amber-400">{latestCompletedOrder.totalEgp.toLocaleString()} ج.م</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 max-w-md mx-auto pt-2">
                {/* Direct WhatsApp link to Outlet */}
                <a
                  href={generateWhatsAppUrl(latestCompletedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تتبع الطلب مباشرة عبر واتساب المعرض' : 'Track Directly via Outlet WhatsApp'}</span>
                </a>

                {/* View Account Orders */}
                <button
                  onClick={() => { handleClose(); setIsAccountModalOpen(true); }}
                  className="w-full py-3 rounded-xl bg-[color:var(--bg-surface-elevated)] border border-[color:var(--hairline)] hover:border-amber-400 text-xs font-bold text-[color:var(--ink)] flex items-center justify-center gap-2 transition"
                >
                  <User className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'ar' ? 'عرض طلباتي في حسابي بالمول' : 'View My Mall Orders in Account'}</span>
                </button>
              </div>
            </div>
          ) : otpStep ? (
            /* CASE 2: FRICTIONLESS 1-TAP OTP STEP */
            <div className="space-y-5 animate-in fade-in">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center mb-2">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[color:var(--ink)]">
                  {lang === 'ar' ? 'تأكيد رقم الهاتف عبر رمز التحقق (OTP)' : 'Verify Your Phone Number (OTP)'}
                </h3>
                <p className="text-xs text-[color:var(--ink-muted)] mt-1">
                  {lang === 'ar' 
                    ? `تم إرسال رمز تحقق تجريبي لرقمك: ${phone}`
                    : `We sent a quick verification code to ${phone}`}
                </p>
                <div className="inline-block mt-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold">
                  Demo Code: {otpCode}
                </div>
              </div>

              <div className="max-w-xs mx-auto">
                <input
                  type="text"
                  maxLength={4}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  placeholder="••••"
                  className="w-full text-center tracking-[1em] text-2xl font-black py-3 rounded-2xl bg-[color:var(--bg-overlay)] border border-amber-400 text-amber-400 outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setOtpStep(false)}
                  className="flex-1 py-3 rounded-xl bg-[color:var(--bg-overlay)] border border-[color:var(--hairline)] text-xs font-bold text-[color:var(--ink-muted)] hover:text-white transition"
                >
                  {lang === 'ar' ? 'رجوع لتعديل البيانات' : 'Back'}
                </button>
                <button
                  type="button"
                  onClick={handleFinalOrderSubmit}
                  className="flex-1 py-3 rounded-xl bg-amber-400 text-slate-950 text-xs font-black hover:bg-amber-300 transition shadow-lg shadow-amber-400/20"
                >
                  {lang === 'ar' ? 'تأكيد الرمز وإتمام الطلب' : 'Verify & Place Order'}
                </button>
              </div>
            </div>
          ) : (
            /* CASE 3: OUTLET CUSTOMER CHECKOUT & LOGIN FORM */
            <form onSubmit={handleSubmitStep1} className="space-y-5">
              
              {/* Demo Autofil Helper */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-400/10 border border-amber-400/30">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تجربة سريعة بدون كتابة؟' : 'Quick Demo One-Click Fill?'}</span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickDemoFill}
                  className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 text-[11px] font-black hover:bg-amber-300 transition"
                >
                  {lang === 'ar' ? 'ملء بيانات تجريبية' : 'Fill Demo Details'}
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Customer Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[color:var(--ink)] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{lang === 'ar' ? 'الاسم بالكامل' : 'Full Name'} *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'ar' ? 'مثال: أحمد مصطفى' : 'e.g. Ahmed Mostafa'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[color:var(--bg-overlay)] border border-[color:var(--hairline)] focus:border-amber-400 outline-none text-xs text-[color:var(--ink)] transition"
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[color:var(--ink)] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{lang === 'ar' ? 'رقم الموبايل المصري (واتساب للتأكيد)' : 'Egyptian Phone Number'} *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010 1234 5678"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[color:var(--bg-overlay)] border border-[color:var(--hairline)] focus:border-amber-400 outline-none text-xs text-[color:var(--ink)] transition"
                  />
                </div>

                {/* Governorate */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[color:var(--ink)] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{lang === 'ar' ? 'المحافظة' : 'Governorate'} *</span>
                  </label>
                  <select
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[color:var(--bg-overlay)] border border-[color:var(--hairline)] focus:border-amber-400 outline-none text-xs text-[color:var(--ink)] transition"
                  >
                    {GOVERNORATES.filter(g => g.id !== 'all').map((gov) => (
                      <option key={gov.id} value={gov.nameEn}>
                        {lang === 'ar' ? gov.nameAr : gov.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Street Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[color:var(--ink)] flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{lang === 'ar' ? 'العنوان التفصيلي للتوصيل' : 'Detailed Delivery Address'} *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={lang === 'ar' ? 'الحي، اسم الشارع، رقم العقار' : 'District, Street, Bldg No.'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[color:var(--bg-overlay)] border border-[color:var(--hairline)] focus:border-amber-400 outline-none text-xs text-[color:var(--ink)] transition"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-[color:var(--ink)]">
                  {lang === 'ar' ? 'طريقة الدفع في المعرض:' : 'Payment Method:'}
                </label>

                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-center transition ${
                      paymentMethod === 'cod'
                        ? 'border-amber-400 bg-amber-400/15 text-amber-300 font-bold'
                        : 'border-[color:var(--hairline)] bg-[color:var(--bg-overlay)] text-[color:var(--ink-muted)]'
                    }`}
                  >
                    <div className="text-base mb-1">💵</div>
                    <div>{lang === 'ar' ? 'دفع عند الاستلام' : 'Cash on Delivery'}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('instapay')}
                    className={`p-3 rounded-xl border text-center transition ${
                      paymentMethod === 'instapay'
                        ? 'border-cyan-400 bg-cyan-400/15 text-cyan-300 font-bold'
                        : 'border-[color:var(--hairline)] bg-[color:var(--bg-overlay)] text-[color:var(--ink-muted)]'
                    }`}
                  >
                    <div className="text-base mb-1">⚡</div>
                    <div>{lang === 'ar' ? 'إنستاباي / محفظة' : 'InstaPay / Wallet'}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition ${
                      paymentMethod === 'card'
                        ? 'border-purple-400 bg-purple-400/15 text-purple-300 font-bold'
                        : 'border-[color:var(--hairline)] bg-[color:var(--bg-overlay)] text-[color:var(--ink-muted)]'
                    }`}
                  >
                    <div className="text-base mb-1">💳</div>
                    <div>{lang === 'ar' ? 'بطاقة بنكية / فيزا' : 'Bank Card / Visa'}</div>
                  </button>
                </div>
              </div>

              {/* Basket Items Summary Recap */}
              <div className="p-3.5 rounded-2xl bg-[color:var(--bg-overlay)] border border-[color:var(--hairline)] space-y-2 text-xs">
                <div className="flex justify-between items-center text-[color:var(--ink-muted)]">
                  <span>{lang === 'ar' ? 'عدد المنتجات في سلة المعرض:' : 'Outlet Basket Items:'}</span>
                  <span className="font-bold text-[color:var(--ink)]">
                    {items.reduce((s, it) => s + it.quantity, 0)} {lang === 'ar' ? 'قطع' : 'items'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[color:var(--ink-muted)]">
                  <span>{lang === 'ar' ? 'مصاريف الشحن الداخلي المباشر:' : 'Direct Factory Shipping:'}</span>
                  <span className="font-bold text-emerald-400">60 ج.م</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[color:var(--hairline)] text-sm font-black text-[color:var(--ink)]">
                  <span>{lang === 'ar' ? 'الإجمالي المطلوب دفعه:' : 'Total Payable:'}</span>
                  <span className="text-amber-400">{formatPrice(totalEgp, subtotalUsd + 2)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-400/20 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5 text-slate-950" />
                <span>
                  {customer?.isLoggedIn 
                    ? (lang === 'ar' ? `تأكيد الطلب الفوري مع معرض ${brand.nameAr}` : `Confirm Order with ${brand.nameEn}`)
                    : (lang === 'ar' ? `تسجيل الدخول وإرسال الطلب للمعرض` : `Sign In & Place Order with ${brand.nameEn}`)}
                </span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <p className="text-[10px] text-center text-[color:var(--ink-muted)]">
                {lang === 'ar' 
                  ? '🛡️ بتأكيدك للطلب، يتم إشعار المعرض مباشرة وتوثيق تسجيل حسابك في مول إحنا لسهولة إعادة الطلب.'
                  : '🛡️ By confirming, the brand outlet is notified directly and your mall account is established for instant future ordering.'}
              </p>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
