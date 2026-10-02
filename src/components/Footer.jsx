import React from 'react';
import { Globe, Building2, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer({ lang }) {
  return (
    <footer className="border-t border-[color:var(--hairline)] mt-24 bg-[color:var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs sm:text-sm">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2 text-xl font-black gmt-gradient-text">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>{lang === 'ar' ? 'إحنا (e7na)' : 'e7na Local Mall'}</span>
          </div>
          <p className="text-[color:var(--ink-muted)] leading-relaxed">
            {lang === 'ar'
              ? 'المنصة الرقمية الوطنية لربط وتصدير منتجات وتراث العلامات التجارية المصرية للعالم.'
              : 'The national digital mall & export linking hub for 100% authentic Egyptian brands.'}
          </p>
          <div className="pt-2 text-xs font-semibold text-amber-400">
            {lang === 'ar' ? 'صُنع بحب في جمهورية مصر العربية' : 'Made with Pride in Egypt'}
          </div>
        </div>

        {/* Col 2: Sectors & Hubs */}
        <div>
          <h4 className="font-extrabold text-[color:var(--ink)] mb-3 uppercase tracking-wider text-xs">
            {lang === 'ar' ? 'القلاع الصناعية' : 'Industrial Hubs'}
          </h4>
          <ul className="space-y-2 text-[color:var(--ink-muted)]">
            <li>{lang === 'ar' ? '🧶 قلعة النسيج بالمحلة الكبرى' : '🧶 Mahalla Textile Citadel'}</li>
            <li>{lang === 'ar' ? '🪑 صناعة الأثاث بدمياط' : '🪑 Damietta Furniture Hub'}</li>
            <li>{lang === 'ar' ? '🏺 قرية خزف تونس بالفيوم' : '🏺 Fayoum Tunis Pottery'}</li>
            <li>{lang === 'ar' ? '🌴 خيرات وزيوت واحة سيوة' : '🌴 Siwa Oasis Bio-oils'}</li>
            <li>{lang === 'ar' ? '💼 دباغة الجلود بالروبيكاني' : '💼 Robbiki Leather Tannery'}</li>
          </ul>
        </div>

        {/* Col 3: Export & Silk Road */}
        <div>
          <h4 className="font-extrabold text-[color:var(--ink)] mb-3 uppercase tracking-wider text-xs">
            {lang === 'ar' ? 'خدمات التصدير بالجملة' : 'Wholesale Silk Road'}
          </h4>
          <ul className="space-y-2 text-[color:var(--ink-muted)]">
            <li>{lang === 'ar' ? 'طلب عروض الأسعار (RFQ)' : 'Submit B2B Export RFQ'}</li>
            <li>{lang === 'ar' ? 'التصنيع للغير والتغليف OEM' : 'OEM Private Labeling'}</li>
            <li>{lang === 'ar' ? 'الشحن البحري من الموانئ المصرية' : 'FOB Sea Container Shipping'}</li>
            <li>{lang === 'ar' ? 'شهادات ECOCERT و ISO' : 'ISO & ECOCERT Certification'}</li>
          </ul>
        </div>

        {/* Col 4: Corporate Offices */}
        <div>
          <h4 className="font-extrabold text-[color:var(--ink)] mb-3 uppercase tracking-wider text-xs">
            {lang === 'ar' ? 'المكاتب الإقليمية والتواصل' : 'Regional Offices'}
          </h4>
          <div className="space-y-2 text-[color:var(--ink-muted)] text-xs">
            <div>🇪🇬 Cairo, Egypt — Main Brand Registry</div>
            <div>🇦🇪 Abu Dhabi, UAE — GCC Export Desk</div>
            <div>🇪🇸 Madrid, Spain — European Distribution</div>
            <div className="pt-2 font-bold text-amber-400">export@e7na-local.com</div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[color:var(--hairline)] py-6 text-center text-xs text-[color:var(--ink-subtle)] space-y-1">
        <div>© 2026 e7na Digital Mall. All rights reserved. Designed to empower local Egyptian manufacturing.</div>
      </div>
    </footer>
  );
}
