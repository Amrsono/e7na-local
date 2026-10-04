import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Truck, 
  Sparkles,
  Lock
} from 'lucide-react';
import { useMall } from '../context/MallContext';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

export default function OutletBasketDrawer({ lang, currency }) {
  const { 
    activeOutletBasketBrand, 
    setActiveOutletBasketBrand, 
    outletBaskets,
    updateOutletItemQuantity,
    removeFromOutletBasket,
    attemptPlaceOrder,
    customer
  } = useMall();

  // Lock background page scroll on iOS while drawer is open
  useBodyScrollLock(!!activeOutletBasketBrand);

  if (!activeOutletBasketBrand) return null;

  const brand = activeOutletBasketBrand;
  const items = outletBaskets[brand.id] || [];
  const isRtl = lang === 'ar';

  const subtotalEgp = items.reduce((acc, it) => acc + (it.priceEgp * it.quantity), 0);
  const subtotalUsd = items.reduce((acc, it) => acc + (it.priceUsd * it.quantity), 0);

  const formatPrice = (egp, usd) => {
    if (currency === 'USD') return `$${usd.toFixed(2)}`;
    if (currency === 'EUR') return `€${Math.round(usd * 0.92)}`;
    return `${egp.toLocaleString()} ج.م`;
  };

  const handleCheckoutClick = () => {
    attemptPlaceOrder(brand);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm overflow-x-hidden animate-in fade-in duration-200">
      <div 
        className="w-full max-w-full sm:max-w-md h-full bg-[color:var(--bg-surface)] border-l border-[color:var(--hairline)] flex flex-col justify-between shadow-2xl relative overflow-x-hidden min-w-0 animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[color:var(--hairline)] bg-[color:var(--bg-surface-elevated)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={brand.logoImage} 
              alt={brand.nameEn} 
              className="w-10 h-10 rounded-xl object-cover border border-amber-400/40 bg-slate-900"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                  {lang === 'ar' ? 'معرض معتمد' : 'Outlet Boutique'}
                </span>
                <span className="text-[11px] text-[color:var(--ink-muted)]">
                  {lang === 'ar' ? brand.locationAr : brand.locationEn}
                </span>
              </div>
              <h3 className="text-base font-black text-[color:var(--ink)] mt-0.5">
                {lang === 'ar' ? `سلة معرض ${brand.nameAr}` : `${brand.nameEn} Outlet Basket`}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setActiveOutletBasketBrand(null)}
            className="p-2 rounded-xl text-[color:var(--ink-muted)] hover:text-[color:var(--ink)] hover:bg-[color:var(--bg-overlay)] transition"
            aria-label="Close Outlet Basket"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Mall Note: Explaining the Mall Concept */}
        <div className="px-5 py-3 bg-gradient-to-r from-cyan-950/30 to-amber-950/20 border-b border-[color:var(--hairline)] flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-[color:var(--ink-muted)]">
            {lang === 'ar' ? (
              <>
                <strong className="text-amber-400 font-bold">تجربة تسوق المول المفتوح:</strong> يمكنك تصفح المول وإضافة منتجات أي معرض بحرية تامة دون تسجيل دخول. سيُطلب تسجيل الدخول فقط عند النقر على إتمام الطلب للتحقق من بيانات الشحن.
              </>
            ) : (
              <>
                <strong className="text-amber-400 font-bold">Open Mall Shopping:</strong> Browse the mall freely without any login. Sign-in is only requested when you attempt to place your order with this specific outlet.
              </>
            )}
          </p>
        </div>

        {/* Basket Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5" style={{ WebkitOverflowScrolling: 'touch' }}>
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[color:var(--bg-surface-elevated)] border border-[color:var(--hairline)] flex items-center justify-center text-3xl">
                🛍️
              </div>
              <h4 className="text-sm font-bold text-[color:var(--ink)]">
                {lang === 'ar' ? 'سلة هذا المعرض فارغة حالياً' : 'Your basket for this outlet is empty'}
              </h4>
              <p className="text-xs text-[color:var(--ink-muted)] max-w-xs mx-auto">
                {lang === 'ar' 
                  ? 'تصفح تشكيلة منتجات المعرض وأضف القطع التي ترغب في طلبها مباشرة من المصنع.' 
                  : 'Browse the outlet catalog and add items you want to order directly from the factory.'}
              </p>
              <button
                onClick={() => setActiveOutletBasketBrand(null)}
                className="mt-3 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-black hover:bg-amber-300 transition"
              >
                {lang === 'ar' ? 'استكشاف منتجات المعرض' : 'Browse Outlet Products'}
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-2xl bg-[color:var(--bg-surface-elevated)] border border-[color:var(--hairline)] flex items-center gap-3.5 hover:border-amber-400/40 transition"
              >
                <img 
                  src={item.image} 
                  alt={item.nameEn} 
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-900 border border-[color:var(--hairline)]"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-[color:var(--ink)] truncate">
                    {lang === 'ar' ? item.nameAr : item.nameEn}
                  </h4>
                  <div className="text-xs font-black text-amber-400 mt-0.5">
                    {formatPrice(item.priceEgp, item.priceUsd)}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-[color:var(--hairline)] rounded-lg bg-[color:var(--bg-overlay)]">
                      <button
                        onClick={() => updateOutletItemQuantity(brand.id, item.nameEn, -1)}
                        className="p-1 text-[color:var(--ink-muted)] hover:text-white transition"
                        title="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-extrabold text-[color:var(--ink)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateOutletItemQuantity(brand.id, item.nameEn, 1)}
                        className="p-1 text-[color:var(--ink-muted)] hover:text-white transition"
                        title="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromOutletBasket(brand.id, item.nameEn)}
                      className="p-1.5 rounded-lg text-rose-400/70 hover:text-rose-400 hover:bg-rose-500/10 transition"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-black text-[color:var(--ink)]">
                    {formatPrice(item.priceEgp * item.quantity, item.priceUsd * item.quantity)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Checkout & Login Trigger */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[color:var(--hairline)] bg-[color:var(--bg-surface-elevated)] space-y-3">
            
            {/* Origin & Direct Dispatch Notice */}
            <div className="flex items-center gap-2 text-[11px] text-[color:var(--ink-muted)]">
              <Truck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>
                {lang === 'ar' 
                  ? `شحن محلي مباشر من مستودعات ${brand.locationAr}`
                  : `Dispatched directly from ${brand.locationEn}`}
              </span>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-[color:var(--hairline)] text-xs">
              <div className="flex justify-between text-[color:var(--ink-muted)]">
                <span>{lang === 'ar' ? 'إجمالي منتجات المعرض:' : 'Outlet Subtotal:'}</span>
                <span className="font-bold text-[color:var(--ink)]">
                  {formatPrice(subtotalEgp, subtotalUsd)}
                </span>
              </div>
              <div className="flex justify-between text-[color:var(--ink-muted)]">
                <span>{lang === 'ar' ? 'خدمة الشحن والتوصيل المقدرة:' : 'Estimated Direct Courier:'}</span>
                <span className="font-bold text-emerald-400">
                  {currency === 'USD' ? '$2.00' : '60 ج.م'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-[color:var(--ink)] pt-1.5 border-t border-[color:var(--hairline)]">
                <span>{lang === 'ar' ? 'الإجمالي التقريبي:' : 'Total:'}</span>
                <span className="text-amber-400">
                  {formatPrice(subtotalEgp + 60, subtotalUsd + 2)}
                </span>
              </div>
            </div>

            {/* The Main Checkout Button: Triggers Login/Order placement */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-400/20 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2"
            >
              {!customer ? (
                <>
                  <Lock className="w-4 h-4 text-slate-950" />
                  <span>{lang === 'ar' ? 'إتمام الطلب وتسجيل الدخول للمعرض' : 'Place Order & Sign In to Outlet'}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>{lang === 'ar' ? 'متابعة إتمام الطلب كعميل موثق' : 'Confirm Order as Verified Customer'}</span>
                </>
              )}
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            {/* Deferred Login Clarification note */}
            {!customer && (
              <p className="text-[10px] text-center text-[color:var(--ink-muted)]">
                {lang === 'ar' 
                  ? '🔒 لن يُطلب منك أي كلمة سر معقدة، فقط رقم الهاتف أو البريد الإلكتروني لتأكيد استلام الطلب.'
                  : '🔒 Frictionless outlet verification: only phone or email needed to dispatch.'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
