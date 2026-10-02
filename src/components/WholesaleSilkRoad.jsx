import React, { useState } from 'react';
import { Building2, Globe, ShieldCheck, FileText, Send, CheckCircle, Ship, Award, ArrowUpRight } from 'lucide-react';
import { BRANDS } from '../data/brandsData';

export default function WholesaleSilkRoad({ lang, onRequestRfq }) {
  const [filterMarket, setFilterMarket] = useState('all');
  const wholesaleBrands = BRANDS.filter(b => b.isWholesaleReady);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      {/* Header Banner */}
      <div className="gmt-panel p-8 sm:p-12 mb-10 relative overflow-hidden border border-cyan-500/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-black mb-4 border border-cyan-400/30">
            <Ship className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'ar' ? 'بوابة التصدير والجملة الدولية — طريق الحرير المصري' : 'THE EGYPTIAN SILK ROAD — B2B EXPORT HUB'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {lang === 'ar' ? (
              <>
                منصة الاستيراد والتوريد المباشر من <span className="text-cyan-400">المصانع المصرية</span>
              </>
            ) : (
              <>
                Direct Factory Sourcing & Exporting from <span className="text-cyan-400">Egyptian Manufacturers</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[color:var(--ink-muted)] mt-4 leading-relaxed">
            {lang === 'ar'
              ? 'بوابة شبيهة بـ Alibaba تتيح للمستوردين والتجار في دول الخليج، أوروبا، وأمريكا طلب عروض أسعار (RFQ)، وتعيين مواصفات التصنيع للغير، والشحن المباشر من الموانئ المصرية.'
              : 'An Alibaba-styled B2B wholesale corridor allowing international buyers across GCC, Europe, and Americas to request factory RFQs, private-label manufacturing, and FOB container shipping.'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[color:var(--hairline)]">
            <div>
              <div className="text-xs text-[color:var(--ink-muted)] font-semibold">{lang === 'ar' ? 'موانئ التصدير:' : 'FOB Shipping Ports:'}</div>
              <div className="text-sm font-bold text-[color:var(--ink)] mt-0.5">Alex, Damietta, Sokhna</div>
            </div>
            <div>
              <div className="text-xs text-[color:var(--ink-muted)] font-semibold">{lang === 'ar' ? 'الشهادات الدولية:' : 'Global Certifications:'}</div>
              <div className="text-sm font-bold text-amber-400 mt-0.5">ISO, GOTS, ECOCERT</div>
            </div>
            <div>
              <div className="text-xs text-[color:var(--ink-muted)] font-semibold">{lang === 'ar' ? 'التصنيع للغير (OEM):' : 'Private Labeling (OEM):'}</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">Available (متاح)</div>
            </div>
            <div>
              <div className="text-xs text-[color:var(--ink-muted)] font-semibold">{lang === 'ar' ? 'سرعة الرد على طلب RFQ:' : 'RFQ Response Time:'}</div>
              <div className="text-sm font-bold text-cyan-400 mt-0.5">&lt; 24 Hours</div>
            </div>
          </div>
        </div>
      </div>

      {/* Factories & Suppliers Catalog Table / Grid */}
      <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
        <Building2 className="w-6 h-6 text-amber-400" />
        <span>{lang === 'ar' ? 'المصانع المصرية المعتمدة للتصدير' : 'Verified Export Manufacturers & Suppliers'}</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wholesaleBrands.map((brand) => (
          <div key={brand.id} className="gmt-panel p-6 border border-[color:var(--hairline)] hover:border-cyan-400/50 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={brand.logoImage} alt={brand.nameEn} className="w-14 h-14 rounded-2xl object-cover border border-amber-400/30" />
                  <div>
                    <h4 className="text-xl font-black text-[color:var(--ink)]">{lang === 'ar' ? brand.nameAr : brand.nameEn}</h4>
                    <span className="text-xs font-bold text-amber-400">{lang === 'ar' ? brand.locationAr : brand.locationEn}</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                  MOQ: {brand.moq}
                </span>
              </div>

              <p className="text-xs text-[color:var(--ink-muted)] mt-4 leading-relaxed line-clamp-2">
                {lang === 'ar' ? brand.descriptionAr : brand.descriptionEn}
              </p>

              {/* Specs & Export Countries */}
              <div className="mt-4 p-4 rounded-xl bg-[color:var(--bg-overlay)] border border-[color:var(--hairline)] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[color:var(--ink-muted)]">{lang === 'ar' ? 'ميناء التجميع والشحن:' : 'FOB Shipping Port:'}</span>
                  <span className="font-extrabold text-[color:var(--ink)]">{brand.fobPort}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[color:var(--ink-muted)]">{lang === 'ar' ? 'أسواق التصدير الحالية:' : 'Active Export Markets:'}</span>
                  <span className="font-bold text-cyan-400">{brand.exportMarkets.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[color:var(--ink-muted)]">{lang === 'ar' ? 'الاعتمادات والتراخيص:' : 'Certifications:'}</span>
                  <span className="font-bold text-emerald-400">{brand.certification}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[color:var(--hairline)] flex gap-3">
              <button
                onClick={() => onRequestRfq(brand)}
                className="flex-1 py-3 rounded-xl bg-cyan-400 text-slate-950 text-xs font-black flex items-center justify-center gap-2 hover:bg-cyan-300 transition shadow-lg shadow-cyan-500/20"
              >
                <FileText className="w-4 h-4" />
                <span>{lang === 'ar' ? 'إرسال طلب تسعيرة (Submit RFQ)' : 'Submit Export RFQ'}</span>
              </button>

              <a
                href={`https://wa.me/${brand.whatsappNumber.replace('+', '')}?text=Hi%20${encodeURIComponent(brand.nameEn)}%2C%20I%20found%20you%20on%20e7na%20B2B%20Digital%20Mall.%20We%20want%20to%20inquire%20about%20wholesale%20export.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-extrabold flex items-center justify-center transition"
                title="Direct WhatsApp Inquiry"
              >
                <span>{lang === 'ar' ? 'واتساب للمصنع' : 'Factory WhatsApp'}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
