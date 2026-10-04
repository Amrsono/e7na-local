import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Trash2, 
  Building2, 
  CheckCircle2, 
  Ship, 
  Tag
} from 'lucide-react';
import { GOVERNORATES, CATEGORIES } from '../data/brandsData';

export default function BrandEditModal({ brand, lang = 'en', onClose, onSave }) {
  const isEditing = Boolean(brand?.id);

  const [formData, setFormData] = useState({
    nameEn: brand?.nameEn || '',
    nameAr: brand?.nameAr || '',
    taglineEn: brand?.taglineEn || '',
    taglineAr: brand?.taglineAr || '',
    category: brand?.category || 'fashion',
    governorate: brand?.governorate || 'cairo',
    locationEn: brand?.locationEn || '',
    locationAr: brand?.locationAr || '',
    descriptionEn: brand?.descriptionEn || '',
    descriptionAr: brand?.descriptionAr || '',
    isVerified: brand?.isVerified ?? true,
    isWholesaleReady: brand?.isWholesaleReady ?? true,
    moq: brand?.moq || '100 units',
    fobPort: brand?.fobPort || 'Alexandria Port',
    exportMarkets: brand?.exportMarkets?.join(', ') || 'UAE, Saudi Arabia, Germany',
    priceRangeEgp: brand?.priceRangeEgp || '500 - 2,500 EGP',
    priceRangeUsd: brand?.priceRangeUsd || '$15 - $80 USD',
    rating: brand?.rating || 4.9,
    reviewsCount: brand?.reviewsCount || 120,
    establishedYear: brand?.establishedYear || 2020,
    directUrl: brand?.directUrl || '',
    whatsappNumber: brand?.whatsappNumber || '+201000000000',
    instagramHandle: brand?.instagramHandle || '',
    logoImage: brand?.logoImage || 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=200&q=80',
    coverImage: brand?.coverImage || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    featuredProducts: brand?.featuredProducts || [
      {
        nameEn: "Signature Product",
        nameAr: "المنتج المميز",
        priceEgp: 950,
        priceUsd: 30,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
      }
    ]
  });

  const [newProdNameEn, setNewProdNameEn] = useState('');
  const [newProdNameAr, setNewProdNameAr] = useState('');
  const [newProdPriceEgp, setNewProdPriceEgp] = useState(500);
  const [newProdPriceUsd, setNewProdPriceUsd] = useState(16);
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80');

  const handleAddProduct = () => {
    if (!newProdNameEn.trim()) return;
    const prod = {
      nameEn: newProdNameEn,
      nameAr: newProdNameAr || newProdNameEn,
      priceEgp: Number(newProdPriceEgp) || 500,
      priceUsd: Number(newProdPriceUsd) || 16,
      image: newProdImage || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'
    };

    setFormData(prev => ({
      ...prev,
      featuredProducts: [...prev.featuredProducts, prod]
    }));

    setNewProdNameEn('');
    setNewProdNameAr('');
  };

  const handleRemoveProduct = (index) => {
    setFormData(prev => ({
      ...prev,
      featuredProducts: prev.featuredProducts.filter((_, idx) => idx !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const exportMarketsArray = formData.exportMarkets
      .split(',')
      .map(m => m.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      exportMarkets: exportMarketsArray,
      rating: parseFloat(formData.rating),
      reviewsCount: parseInt(formData.reviewsCount, 10),
      establishedYear: parseInt(formData.establishedYear, 10)
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto overflow-x-hidden animate-in fade-in duration-200" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-white/15 bg-[#090f1e] shadow-2xl relative overflow-hidden min-w-0 text-left rtl:text-right">
        
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                {isEditing 
                  ? (lang === 'ar' ? `تعديل بيانات البراند: ${brand.nameAr}` : `Edit Brand: ${brand.nameEn}`)
                  : (lang === 'ar' ? 'إضافة مصنع أو علامة تجارية جديدة' : 'Add New Egyptian Brand / Factory')}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ar' ? 'التحكم في بيانات العرض بالمتجر، إتاحة التصدير، ومنتجات المعرض' : 'Manage catalog presentation, export readiness, and outlet boutique products'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* Status Switches */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-wrap gap-6 items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isVerified}
                onChange={(e) => setFormData(prev => ({ ...prev, isVerified: e.target.checked }))}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400"
              />
              <div>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>{lang === 'ar' ? 'علامة مصنع مصري معتمد (Verified Badge)' : 'Verified Egyptian Brand Badge'}</span>
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {lang === 'ar' ? 'تظهر شارة التوثيق الذهبية/السماوية في واجهة المتجر' : 'Displays verification checkmark in mall catalog'}
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isWholesaleReady}
                onChange={(e) => setFormData(prev => ({ ...prev, isWholesaleReady: e.target.checked }))}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400"
              />
              <div>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Ship className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'ar' ? 'جاهز للتصدير والجملة (Silk Road B2B)' : 'Wholesale & Export Ready (Silk Road)'}</span>
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {lang === 'ar' ? 'إتاحة استقبال طلبيات الحاويات وطلبات RFQ الدولية' : 'Enables international bulk container inquiries'}
                </span>
              </div>
            </label>
          </div>

          {/* Names & Taglines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Brand Name (English)</label>
              <input
                type="text"
                required
                value={formData.nameEn}
                onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
                placeholder="e.g. In Your Shoe"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">اسم العلامة التجارية (بالعربية)</label>
              <input
                type="text"
                required
                value={formData.nameAr}
                onChange={(e) => setFormData(prev => ({ ...prev, nameAr: e.target.value }))}
                placeholder="مثال: إن يور شو"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Tagline (English)</label>
              <input
                type="text"
                value={formData.taglineEn}
                onChange={(e) => setFormData(prev => ({ ...prev, taglineEn: e.target.value }))}
                placeholder="e.g. Bold Egyptian Streetwear & Apparel"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">الوصف المختصر (بالعربية)</label>
              <input
                type="text"
                value={formData.taglineAr}
                onChange={(e) => setFormData(prev => ({ ...prev, taglineAr: e.target.value }))}
                placeholder="مثال: أزياء الشارع المصرية بخامات القطن الممتاز"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Category, Governorate & Origin */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Category (القطاع)</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.nameEn} ({cat.nameAr})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Governorate (المحافظة)</label>
              <select
                value={formData.governorate}
                onChange={(e) => setFormData(prev => ({ ...prev, governorate: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              >
                {GOVERNORATES.filter(g => g.id !== 'all').map(gov => (
                  <option key={gov.id} value={gov.id}>
                    {gov.icon} {gov.nameEn} ({gov.nameAr})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Established Year (سنة التأسيس)</label>
              <input
                type="number"
                value={formData.establishedYear}
                onChange={(e) => setFormData(prev => ({ ...prev, establishedYear: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Full Story / Description (English)</label>
              <textarea
                rows={3}
                value={formData.descriptionEn}
                onChange={(e) => setFormData(prev => ({ ...prev, descriptionEn: e.target.value }))}
                placeholder="Detailed craft or industrial heritage story..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">القصة الكاملة / الوصف (بالعربية)</label>
              <textarea
                rows={3}
                value={formData.descriptionAr}
                onChange={(e) => setFormData(prev => ({ ...prev, descriptionAr: e.target.value }))}
                placeholder="قصة التصنيع والتراث الحرفي..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Wholesale Export Specs */}
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-4">
            <h4 className="font-bold text-cyan-300 flex items-center gap-2">
              <Ship className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'ar' ? 'مواصفات التصدير وموانئ الشحن' : 'Export & B2B Wholesale Specifications'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Minimum Order Qty (MOQ)</label>
                <input
                  type="text"
                  value={formData.moq}
                  onChange={(e) => setFormData(prev => ({ ...prev, moq: e.target.value }))}
                  placeholder="e.g. 100 units"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">FOB Shipping Port</label>
                <input
                  type="text"
                  value={formData.fobPort}
                  onChange={(e) => setFormData(prev => ({ ...prev, fobPort: e.target.value }))}
                  placeholder="e.g. Alexandria Port / Damietta"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Export Markets (comma separated)</label>
                <input
                  type="text"
                  value={formData.exportMarkets}
                  onChange={(e) => setFormData(prev => ({ ...prev, exportMarkets: e.target.value }))}
                  placeholder="UAE, Saudi Arabia, Germany"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Price Range (EGP)</label>
                <input
                  type="text"
                  value={formData.priceRangeEgp}
                  onChange={(e) => setFormData(prev => ({ ...prev, priceRangeEgp: e.target.value }))}
                  placeholder="450 - 1,800 EGP"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Price Range (USD)</label>
                <input
                  type="text"
                  value={formData.priceRangeUsd}
                  onChange={(e) => setFormData(prev => ({ ...prev, priceRangeUsd: e.target.value }))}
                  placeholder="$15 - $60 USD"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>
            </div>
          </div>

          {/* Contact & Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">WhatsApp Export Number</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                placeholder="+201099887766"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Official Website</label>
              <input
                type="text"
                value={formData.directUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, directUrl: e.target.value }))}
                placeholder="https://brand.com"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Instagram Handle</label>
              <input
                type="text"
                value={formData.instagramHandle}
                onChange={(e) => setFormData(prev => ({ ...prev, instagramHandle: e.target.value }))}
                placeholder="@brand"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
              />
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Logo Image URL</label>
              <input
                type="text"
                value={formData.logoImage}
                onChange={(e) => setFormData(prev => ({ ...prev, logoImage: e.target.value }))}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Cover Image URL</label>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
              />
            </div>
          </div>

          {/* Featured Products List */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-pink-400" />
                <span>{lang === 'ar' ? 'منتجات المعرض المتاحة للشراء المباشر' : 'Featured Outlet Products'} ({formData.featuredProducts.length})</span>
              </h4>
            </div>

            {/* Existing products */}
            <div className="space-y-2">
              {formData.featuredProducts.map((prod, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-white/5">
                  <div className="flex items-center gap-3">
                    <img 
                      src={prod.image} 
                      alt={prod.nameEn} 
                      className="w-12 h-12 rounded-lg object-cover border border-white/10"
                    />
                    <div>
                      <div className="font-bold text-white text-xs">{prod.nameEn} - {prod.nameAr}</div>
                      <div className="text-[11px] text-amber-400 font-semibold mt-0.5">
                        {prod.priceEgp} EGP / ${prod.priceUsd} USD
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(idx)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add product sub-form */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-cyan-500/20 space-y-2">
              <div className="text-xs font-bold text-cyan-300">
                {lang === 'ar' ? '+ إضافة منتج جديد للعلامة' : '+ Add Product to this Outlet'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Product Name (English)"
                  value={newProdNameEn}
                  onChange={(e) => setNewProdNameEn(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs"
                />
                <input
                  type="text"
                  placeholder="اسم المنتج (بالعربية)"
                  value={newProdNameAr}
                  onChange={(e) => setNewProdNameAr(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs"
                />
                <input
                  type="number"
                  placeholder="Price (EGP)"
                  value={newProdPriceEgp}
                  onChange={(e) => setNewProdPriceEgp(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs"
                />
                <input
                  type="number"
                  placeholder="Price (USD)"
                  value={newProdPriceUsd}
                  onChange={(e) => setNewProdPriceUsd(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Product Image URL"
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-white text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
                >
                  {lang === 'ar' ? 'إضافة المنتج' : 'Add Item'}
                </button>
              </div>
            </div>

          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold hover:bg-white/10 transition"
            >
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white font-black shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{lang === 'ar' ? 'حفظ ونشر التعديلات' : 'Save & Publish to Mall'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
