import React, { useState } from 'react';
import { X, Send, Building2, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RfqModal({ brand, lang, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    buyerName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'United Arab Emirates',
    targetQuantity: '1 Container (20ft)',
    targetPort: 'Jebel Ali, UAE',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl border border-white/12 bg-[#090f1d] p-6 sm:p-9 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Subtle Top Glow Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 opacity-90" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest mb-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'ar' ? 'نموذج طلب عروض الأسعار والتصدير (B2B RFQ)' : 'B2B EXPORT REQUEST FOR QUOTATION'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {brand 
                ? (lang === 'ar' ? `طلب توريد من مصنع: ${brand.nameAr}` : `Inquire Wholesale from: ${brand.nameEn}`)
                : (lang === 'ar' ? 'طلب توريد عام من المصانع المصرية' : 'General Egyptian Factory RFQ')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
              {lang === 'ar'
                ? 'سيتم توجيه الطلب مباشرةً لمكتب التصدير بالمصنع مع التوليد الآلي لشروط التوريد والموانئ.'
                : 'Directly forwarded to the factory export desk with auto-generated FOB shipping terms.'}
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5 text-left">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                    {lang === 'ar' ? 'الاسم الكامل' : 'Contact Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.buyerName}
                    onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                    placeholder="e.g. Ahmed Al-Maktoum"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/12 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                    {lang === 'ar' ? 'اسم الشركة / المستورد' : 'Company / Business Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Gulf Trading Co."
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/12 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Corporate Email'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="buyer@company.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/12 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                    {lang === 'ar' ? 'دولة الاستيراد' : 'Destination Country'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/12 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                    {lang === 'ar' ? 'الكمية المطلوبة / الحجم' : 'Target Quantity / Volume'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.targetQuantity}
                    onChange={(e) => setFormData({ ...formData, targetQuantity: e.target.value })}
                    placeholder="e.g. 500 units / 1 FCL Container"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/12 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                    {lang === 'ar' ? 'ميناء الوصول النهائي' : 'Discharge Sea/Air Port'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.targetPort}
                    onChange={(e) => setFormData({ ...formData, targetPort: e.target.value })}
                    placeholder="e.g. Rotterdam Port / Jebel Ali"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/12 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                  {lang === 'ar' ? 'مواصفات إضافية / تصنيع للغير OEM' : 'Detailed Specifications / OEM Notes'}
                </label>
                <textarea
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={lang === 'ar' ? 'اكتب أي مواصفات خاصة بالطباعة والتغليف المطلوبة...' : 'Specify fabric GSM, custom branding, or packaging...'}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-white/12 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-slate-950 font-black text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 mt-2"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'ar' ? 'إرسال طلب التسعيرة للمصنع الآن' : 'Submit Wholesale RFQ to Factory'}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-400/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="text-2xl font-black text-white">
              {lang === 'ar' ? 'تم إرسال طلب التوريد بنجاح!' : 'Export RFQ Successfully Transmitted!'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              {lang === 'ar'
                ? `تم توجيه طلب التوريد إلى مسؤولي التصدير في ${brand ? brand.nameAr : 'المصانع المطلوبة'}. سيتواصل معك ممثل المصنع خلال 24 ساعة عبر البريد الإلكتروني.`
                : `Your wholesale quote request has been transmitted directly to the export desk. A representative will get in touch within 24 hours.`}
            </p>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-cyan-400 text-slate-950 text-xs font-bold hover:bg-cyan-300 transition"
            >
              {lang === 'ar' ? 'إغلاق النافذة' : 'Done'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
