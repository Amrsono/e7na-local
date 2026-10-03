import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  Package,
  Ship,
  FileCheck,
  Sparkles,
  Settings,
  LogOut,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  MapPin,
  TrendingUp,
  Edit,
  Trash2,
  Eye,
  Globe,
  Sun,
  Moon,
  Download,
  RotateCcw,
  ShoppingBag,
  Phone,
  Mail,
  Layers
} from 'lucide-react';
import { useMall } from '../context/MallContext';
import { GOVERNORATES, CATEGORIES } from '../data/brandsData';
import BrandEditModal from './BrandEditModal';

export default function AdminDashboard({ 
  lang = 'en', 
  setLang, 
  theme = 'dark', 
  setTheme, 
  onBackToMall 
}) {
  const {
    adminUser,
    logoutAdmin,
    brands,
    orders,
    rfqs,
    applications,
    alternatives,
    platformSettings,
    addBrand,
    updateBrand,
    deleteBrand,
    toggleBrandVerification,
    toggleBrandWholesale,
    updateOrderStatus,
    deleteOrder,
    updateRfqStatus,
    deleteRfq,
    approveApplication,
    rejectApplication,
    addAlternative,
    deleteAlternative,
    updatePlatformSettings,
    resetAllDataToDefaults
  } = useMall();

  const ar = lang === 'ar';

  // ── Translations dictionary ─────────────────────────────────────────────────
  const t = {
    // Navbar
    superAdmin: 'SUPER ADMIN',
    subtitle: ar ? 'إدارة المصانع، طلبيات المنافذ، والتصدير عبر طريق الحرير' : 'Egyptian Factories, Outlet Orders & B2B Silk Road Export Operations',
    mallPreview: ar ? 'معاينة المتجر' : 'Mall Preview',
    langToggle: ar ? 'EN' : 'العربية',
    authorized: ar ? 'مفوّض' : 'Authorized',
    // Sidebar
    modules: ar ? 'أقسام الإدارة والتشغيل' : 'OPERATIONAL MODULES',
    overview: ar ? 'الرئيسية والتحليلات' : 'Executive Overview',
    brands: ar ? 'المصانع والبراندات' : 'Brands & Factories',
    orders: ar ? 'طلبات المنافذ' : 'Shopper Orders',
    rfqs: ar ? 'تصدير طريق الحرير' : 'Silk Road RFQs',
    applications: ar ? 'طلبات التسجيل' : 'Onboard Queue',
    alternatives: ar ? 'البديل المحلي AI' : 'AI Matchmaker',
    settings: ar ? 'إعدادات المنصة' : 'Platform Settings',
    newBadge: ar ? 'جديد' : 'new',
    domesticGmv: ar ? 'مبيعات محلية:' : 'Domestic GMV:',
    exportPipeline: ar ? 'خط التصدير:' : 'Export Pipeline:',
    exportBackup: ar ? 'نسخ احتياطي' : 'Export System Backup',
    // Overview KPIs
    verifiedFactories: ar ? 'المصانع والبراندات' : 'Verified Factories',
    verifiedBadge: ar ? 'موثق' : 'Verified',
    b2bReadyBadge: ar ? 'جاهز للتصدير' : 'B2B Ready',
    outletGmv: ar ? 'مبيعات المنافذ (ج.م)' : 'Outlet Orders & GMV',
    totalOrders: ar ? 'إجمالي الطلبات' : 'total orders',
    activeDispatch: ar ? 'جارٍ التجهيز' : 'active dispatch',
    silkPipeline: ar ? 'تصدير طريق الحرير' : 'Silk Road Pipeline',
    bulkInquiries: ar ? 'استفسار جملة' : 'bulk inquiries',
    gccEurope: ar ? 'الخليج وأوروبا' : 'GCC & Europe',
    factoryOnboarding: ar ? 'طلبات الانضمام والتفتيش' : 'Factory Onboarding',
    pendingLabel: ar ? 'معلق' : 'Pending',
    awaitingAudit: ar ? 'بانتظار المراجعة' : 'Awaiting audit review',
    inspectQueue: ar ? 'فحص القائمة' : 'Inspect Queue',
    govNetwork: ar ? 'شبكة 27 محافظة' : '27 Governorates Network',
    govTitle: ar ? 'التوزيع الجغرافي للمصانع والحرف' : 'Governorate & Artisan Heritage Distribution',
    govSub: ar ? 'توزيع المصانع المسجلة حسب تخصص كل محافظة' : 'Registered industrial and artisanal hubs across Egypt',
    factoriesUnit: ar ? 'مصنع' : 'factories',
    sectorTitle: ar ? 'توزيع الكتالوج حسب القطاعات' : 'Sectors & Industrial Verticals',
    brandsUnit: ar ? 'براند' : 'brands',
    feedTitle: ar ? 'سجل العمليات والطلبات' : 'Real-time Feed',
    inquiryFor: ar ? 'استفسار عن:' : 'Inquiry for:',
    origin: ar ? 'المصدر:' : 'Origin:',
    addBrandBtn: ar ? '+ إضافة مصنع جديد' : '+ Add Brand / Factory',
    bannerEdit: ar ? 'تعديل الإعلان' : 'Edit Banner',
    bannerActive: ar ? 'الشريط الإعلاني النشط في واجهة المتجر' : 'Active Mall Announcement Banner',
    // Brands tab
    brandsTitle: ar ? 'إدارة كتالوج المصانع والعلامات التجارية' : 'Brand & Factory Catalog Management',
    showingBrands: (n) => ar ? `إجمالي (${n}) مصنع مسجل مع إمكانية التعديل` : `Showing (${n}) verified Egyptian brands`,
    addBrandBtn2: ar ? '+ إضافة علامة تجارية جديدة' : '+ Add Brand / Factory',
    searchBrands: ar ? 'بحث باسم البراند أو المحافظة...' : 'Search brand name, city, tag...',
    allCats: ar ? 'كل القطاعات' : 'All Categories',
    allGovs: ar ? 'كل المحافظات' : 'All Governorates',
    thBrand: ar ? 'البراند / المصنع' : 'Brand / Factory',
    thCategory: ar ? 'القطاع' : 'Category',
    thGovernorate: ar ? 'المحافظة' : 'Governorate',
    thVerification: ar ? 'التوثيق' : 'Verification',
    thSilkRoad: ar ? 'طريق الحرير (تصدير)' : 'Silk Road (Export)',
    thProducts: ar ? 'منتجات المنفذ' : 'Outlet Products',
    thActions: ar ? 'إجراءات' : 'Actions',
    verifiedToggle: ar ? 'موثق' : 'Verified',
    unverifiedToggle: ar ? 'غير موثق' : 'Unverified',
    b2bToggle: ar ? 'جاهز للتصدير' : 'B2B Ready',
    domesticOnly: ar ? 'محلي فقط' : 'Domestic Only',
    itemsUnit: ar ? 'منتجات' : 'items',
    confirmDeleteBrand: (name) => ar ? `هل أنت متأكد من حذف "${name}" من المتجر؟` : `Are you sure you want to delete "${name}" from the Mall?`,
    // Orders tab
    ordersTitle: ar ? 'طلبات المتسوقين ومنافذ البيع المباشرة' : 'Shopper Orders & Outlet Dispatch Desk',
    ordersSub: ar ? 'متابعة طلبيات المعارض المباشرة، حالات التجهيز والشحن مع مناديب النقل السريع' : 'Manage factory fulfillment, courier dispatch, and customer delivery statuses',
    searchOrders: ar ? 'بحث برقم الطلب، اسم العميل، التليفون...' : 'Search by Order ID, customer, phone, outlet...',
    noOrders: ar ? 'لا توجد طلبيات تطابق الفلتر الحالي' : 'No orders matching current filter',
    factoryLabel: ar ? 'المصنع:' : 'Factory:',
    customerLabel: ar ? 'العميل:' : 'Customer:',
    paymentLabel: ar ? 'طريقة الدفع:' : 'Payment:',
    trackLabel: ar ? 'كود التتبع:' : 'Track:',
    // Order status labels (for filter pills)
    orderStatuses: {
      all: ar ? 'الكل' : 'All',
      confirmed_by_outlet: ar ? 'تم التأكيد' : 'Confirmed',
      preparing: ar ? 'جاري التجهيز' : 'Preparing',
      shipped: ar ? 'تم الشحن' : 'Shipped',
      delivered: ar ? 'تم التوصيل' : 'Delivered',
      cancelled: ar ? 'ملغي' : 'Cancelled',
    },
    // Order status dropdown options
    oStatusConfirmed: ar ? 'تم التأكيد بالمنفذ' : 'Confirmed by Outlet',
    oStatusPreparing: ar ? 'جاري التجهيز بالمصنع' : 'Preparing at Factory',
    oStatusShipped: ar ? 'تم الشحن بالكوريير' : 'Shipped with Courier',
    oStatusDelivered: ar ? 'تم التوصيل للعميل' : 'Delivered to Customer',
    oStatusCancelled: ar ? 'ملغي' : 'Cancelled',
    confirmDeleteOrder: (id) => ar ? `هل تريد حذف الطلب ${id}؟` : `Delete order ${id}?`,
    // RFQs tab
    rfqsTitle: ar ? 'طريق الحرير لتصدير المنتجات المصرية — طلبات الجملة (B2B)' : 'The Egyptian Silk Road — B2B Export Pipeline',
    rfqsSub: ar ? 'إدارة استفسارات الحاويات والشحن للخليج، أوروبا، وأمريكا مباشرة من المصانع المصرية' : 'Manage bulk container quotations, FOB terms, sample dispatch, and export contracts',
    searchRfqs: ar ? 'بحث باسم المشتري أو الشركة أو الدولة...' : 'Search by buyer, company, country, factory...',
    rfqStatuses: {
      all: ar ? 'الكل' : 'All',
      new_inquiry: ar ? 'استفسار جديد' : 'New Inquiry',
      quotation_sent: ar ? 'عرض سعر مرسل' : 'Quotation Sent',
      sample_dispatched: ar ? 'عينة مشحونة' : 'Sample Dispatched',
      contract_signed: ar ? 'عقد موقع' : 'Contract Signed',
      shipped: ar ? 'FOB مشحون' : 'Shipped',
    },
    buyerLabel: ar ? 'المشتري:' : 'Buyer:',
    factoryTarget: ar ? 'المصنع المستهدف:' : 'Factory Target:',
    targetVolume: ar ? 'الكمية المطلوبة:' : 'Target Volume:',
    deliveryPort: ar ? 'ميناء التوصيل:' : 'Delivery Port:',
    estOrderValue: ar ? 'القيمة التقديرية:' : 'Est. Order Value:',
    rfqOptNew: ar ? 'استفسار جديد' : 'New Inquiry',
    rfqOptQuotation: ar ? 'عرض سعر مرسل' : 'Quotation Sent',
    rfqOptSample: ar ? 'عينة مشحونة' : 'Sample Dispatched',
    rfqOptContract: ar ? 'عقد موقع' : 'Contract Executed',
    rfqOptShipped: ar ? 'FOB مشحون' : 'FOB Shipped',
    rfqOptClosed: ar ? 'مغلق' : 'Closed',
    confirmDeleteRfq: (id) => ar ? `هل تريد حذف الاستفسار ${id}؟` : `Delete RFQ ${id}?`,
    // Applications tab
    appsTitle: ar ? 'طلبات تسجيل المصانع والعلامات التجارية الجديدة' : 'Brand Onboarding & Factory Audit Queue',
    appsSub: ar ? 'مراجعة أوراق التأسيس، السجل التجاري، وموقع المصنع لاعتماد النشر في المتجر بنقرة واحدة' : 'Review business registry, factory location, and approve live catalog publishing with 1-click',
    appsPending: (n) => ar ? `${n} طلبات بانتظار المراجعة` : `${n} Applications Pending Review`,
    appStatuses: {
      all: ar ? 'الكل' : 'All',
      pending: ar ? 'معلق' : 'Pending',
      under_review: ar ? 'قيد المراجعة' : 'Under Review',
      approved: ar ? 'معتمد' : 'Approved',
      rejected: ar ? 'مرفوض' : 'Rejected',
    },
    submittedLabel: ar ? 'تاريخ التقديم:' : 'Submitted:',
    locationLabel: ar ? 'الموقع:' : 'Location:',
    commercialRegLabel: ar ? 'السجل التجاري:' : 'Commercial Register:',
    phoneLabel: ar ? 'الهاتف:' : 'Phone:',
    approveBtn: ar ? 'اعتماد ونشر بالمتجر' : 'Approve & Publish to Mall',
    liveInMall: ar ? 'نشط في كتالوج المتجر' : 'Live in Mall Catalog',
    rejectBtn: ar ? 'طلب فحص إضافي' : 'Reject / Request Audit',
    approveAlert: (name) => ar ? `تم اعتماد ونشر "${name}" في المتجر!` : `Brand "${name}" successfully approved and published to the live Mall!`,
    rejectPrompt: ar ? 'أدخل سبب الرفض أو ملاحظات التدقيق:' : 'Enter rejection or audit feedback note:',
    // Alternatives tab
    altTitle: ar ? 'قاعدة بيانات البديل المحلي المصري AI' : 'AI Local Alternative Matchmaker Database',
    altSub: ar ? 'ربط الماركات العالمية بالبدائل المصرية الموثوقة مع الحجج المقنعة للمستهلك' : 'Curate Global Brand vs Egyptian Alternative pairs powering the smart AI matcher',
    addAltBtn: ar ? '+ إضافة بديل محلي جديد' : '+ Add Brand Match',
    addAltModalTitle: ar ? 'إضافة بديل محلي مصري جديد' : 'Add New Egyptian Alternative Match',
    globalBrandLabel: ar ? 'اسم الماركة العالمية' : 'Global Brand Name',
    globalBrandPlaceholder: ar ? 'مثلاً: Nike / Adidas أو Nespresso' : 'e.g. Nike / Adidas or Nespresso',
    categoryLabel: ar ? 'القطاع' : 'Category',
    categoryPlaceholder: ar ? 'موضة، تجميل، قهوة...' : 'Fashion, Beauty, Coffee...',
    localBrandLabel: ar ? 'البراند المحلي' : 'Local Brand',
    reasonEnLabel: ar ? 'سبب التفضيل (بالإنجليزية)' : 'Why Choose Local (English)',
    reasonArLabel: ar ? 'سبب التفضيل (بالعربية)' : 'سبب التفضيل (بالعربية)',
    cancelBtn: ar ? 'إلغاء' : 'Cancel',
    saveMatchBtn: ar ? 'حفظ التطابق' : 'Save Match',
    thGlobalBrand: ar ? 'الماركة العالمية' : 'Global Brand',
    thEgyptianAlt: ar ? 'البديل المصري المحلي' : 'Egyptian Local Alternative',
    thRationale: ar ? 'سبب التفضيل' : 'Value Proposition Rationale',
    thAction: ar ? 'إجراء' : 'Action',
    // Settings tab
    settingsTitle: ar ? 'إعدادات المنصة، الشحن، وإدارة البيانات' : 'Platform, Currency & Operations Configuration',
    settingsSub: ar ? 'التحكم في أسعار شحن المحافظات، الإعلان العام، ونسخ البيانات' : 'Configure platform-wide domestic shipping fees, exchange peg, and live announcement banner',
    settingsSaved: ar ? 'تم حفظ إعدادات المنصة وتطبيقها على كامل المتجر!' : 'Platform settings saved and applied across the entire Mall!',
    logisticsHeading: ar ? '١. الشحن المحلي وسعر الصرف' : '1. Domestic Logistics & Currency Exchange',
    shippingFeeLabel: ar ? 'رسوم الشحن الداخلي القياسية (ج.م)' : 'Standard Domestic Courier Fee (EGP)',
    shippingFeeHint: ar ? 'تُطبَّق على جميع طلبيات المنافذ عند الدفع.' : 'Applied to all factory outlet checkout orders.',
    exchangeRateLabel: ar ? 'سعر تحويل الجنيه إلى الدولار' : 'EGP to USD Exchange Rate',
    exchangeRateHint: ar ? 'يُستخدم لحسابات تصدير طريق الحرير B2B.' : 'Used for international B2B Silk Road export calculations.',
    bannerHeading: ar ? '٢. شريط الإعلانات العام (رأس المتجر)' : '2. Public Announcement Bar (Mall Header)',
    bannerCheckboxLabel: ar ? 'تفعيل شريط العروض العلوي في المتجر' : 'Enable Top Promotion Banner across entire Mall',
    bannerEnLabel: ar ? 'نص الشريط (بالإنجليزية)' : 'Banner Text (English)',
    saveSettingsBtn: ar ? 'حفظ وتطبيق إعدادات المنصة' : 'Save & Update Platform Settings',
    dataHeading: ar ? '٣. نسخ احتياطية وإعادة ضبط البيانات' : '3. System Data Backups & Reset',
    dataDesc: ar ? 'تصدير قاعدة البيانات الكاملة شاملة البراندات المضافة وطلبات المتسوقين واستفسارات طريق الحرير إلى ملف JSON، أو استعادة الإعدادات الافتراضية.' : 'Export the full database including custom added brands, shopper orders, and Silk Road RFQs to a JSON file, or restore default state.',
    downloadDbBtn: ar ? 'تحميل قاعدة البيانات (JSON)' : 'Download Complete Database (JSON)',
    resetBtn: ar ? 'إعادة ضبط البيانات للإعدادات الافتراضية' : 'Reset All Data to Factory Seed Defaults',
    confirmReset: ar ? 'هل تريد إعادة تعيين جميع البراندات والطلبات والاستفسارات للإعدادات الافتراضية؟ لا يمكن التراجع عن هذا الإجراء.' : 'Are you sure you want to reset all brands, orders, and RFQs back to fresh seed defaults? This cannot be undone.',
    resetSuccess: ar ? 'تم إعادة ضبط بيانات النظام بنجاح!' : 'System data reset to default successfully!',
    // Order modal
    orderDetailsLabel: ar ? 'تفاصيل الطلب' : 'Order Details',
    outletFactory: ar ? 'مصنع المنفذ:' : 'Outlet Factory:',
    locationInModal: ar ? 'الموقع:' : 'Location:',
    whatsappLabel: ar ? 'واتساب:' : 'WhatsApp:',
    customerInfo: ar ? 'بيانات العميل:' : 'Customer Information:',
    nameLabel: ar ? 'الاسم:' : 'Name:',
    phoneInModal: ar ? 'الهاتف:' : 'Phone:',
    addressLabel: ar ? 'العنوان:' : 'Address:',
    orderedItems: ar ? 'المنتجات المطلوبة:' : 'Ordered Items:',
    shippingFeeRow: ar ? 'رسوم الشحن:' : 'Shipping Fee:',
    totalDue: ar ? 'الإجمالي:' : 'Total Due:',
    statusLabel: ar ? 'الحالة:' : 'Status:',
    // RFQ modal
    silkRoadRfqLabel: ar ? 'طلب تصدير طريق الحرير' : 'Silk Road RFQ',
    buyerInModal: ar ? 'المشتري:' : 'Buyer:',
    emailPhone: ar ? 'البريد الإلكتروني:' : 'Email:',
    factoryTargetModal: ar ? 'المصنع المستهدف:' : 'Factory Target:',
    qtyRequested: ar ? 'الكمية المطلوبة:' : 'Quantity Requested:',
    destPort: ar ? 'ميناء الوصول:' : 'Destination Port:',
    estValue: ar ? 'القيمة التقديرية:' : 'Estimated Value:',
    // App modal
    brandAppLabel: ar ? 'طلب تسجيل براند' : 'Brand Application',
    categoryInModal: ar ? 'القطاع:' : 'Category:',
    commercialRegModal: ar ? 'السجل التجاري:' : 'Commercial Register:',
    taxCardLabel: ar ? 'البطاقة الضريبية:' : 'Tax Card:',
    websiteLabel: ar ? 'الموقع الإلكتروني:' : 'Website:',
    approveBrandBtn: ar ? 'اعتماد البراند' : 'Approve Brand',
    approveAndPublish: ar ? 'تم الاعتماد والنشر في المتجر!' : 'Approved and published to Mall!',
  };

  // Active Tab
  const [activeTab, setActiveTab] = useState('overview');

  // Modals & Drawers
  const [editingBrand, setEditingBrand] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [viewingRfq, setViewingRfq] = useState(null);
  const [viewingApp, setViewingApp] = useState(null);

  // Filters & Searches
  const [brandSearch, setBrandSearch] = useState('');
  const [brandCatFilter, setBrandCatFilter] = useState('all');
  const [brandGovFilter, setBrandGovFilter] = useState('all');

  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  const [rfqSearch, setRfqSearch] = useState('');
  const [rfqStatusFilter, setRfqStatusFilter] = useState('all');

  const [appStatusFilter, setAppStatusFilter] = useState('all');

  // Alternative modal
  const [isAddAltOpen, setIsAddAltOpen] = useState(false);
  const [newAltGlobal, setNewAltGlobal] = useState('');
  const [newAltLocalId, setNewAltLocalId] = useState(brands[0]?.id || 1);
  const [newAltCategory, setNewAltCategory] = useState('Fashion');
  const [newAltReasonEn, setNewAltReasonEn] = useState('');
  const [newAltReasonAr, setNewAltReasonAr] = useState('');

  // Settings form
  const [settingsForm, setSettingsForm] = useState({ ...platformSettings });
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Computed Metrics
  const totalDomesticGmv = orders.reduce((sum, o) => sum + (o.totalEgp || 0), 0);
  const totalRfqPipelineUsd = rfqs.reduce((sum, r) => sum + (r.estimatedValueUsd || 0), 0);
  const verifiedBrandsCount = brands.filter(b => b.isVerified).length;
  const wholesaleBrandsCount = brands.filter(b => b.isWholesaleReady).length;
  const pendingAppsCount = applications.filter(a => a.status === 'pending').length;
  const pendingOrdersCount = orders.filter(o => o.status === 'confirmed_by_outlet' || o.status === 'preparing').length;

  // Filtered Brands
  const filteredBrands = brands.filter(b => {
    const matchSearch = 
      b.nameEn.toLowerCase().includes(brandSearch.toLowerCase()) ||
      b.nameAr.includes(brandSearch) ||
      b.locationEn.toLowerCase().includes(brandSearch.toLowerCase());
    const matchCat = brandCatFilter === 'all' || b.category === brandCatFilter;
    const matchGov = brandGovFilter === 'all' || b.governorate === brandGovFilter;
    return matchSearch && matchCat && matchGov;
  });

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchSearch = 
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer?.name?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer?.phone?.includes(orderSearch) ||
      o.brandNameEn?.toLowerCase().includes(orderSearch.toLowerCase());
    const matchStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    return matchSearch && matchStatus;
  });

  // Filtered RFQs
  const filteredRfqs = rfqs.filter(r => {
    const matchSearch = 
      r.id.toLowerCase().includes(rfqSearch.toLowerCase()) ||
      r.buyerName.toLowerCase().includes(rfqSearch.toLowerCase()) ||
      r.companyName.toLowerCase().includes(rfqSearch.toLowerCase()) ||
      r.country.toLowerCase().includes(rfqSearch.toLowerCase()) ||
      (r.brandName && r.brandName.toLowerCase().includes(rfqSearch.toLowerCase()));
    const matchStatus = rfqStatusFilter === 'all' || r.status === rfqStatusFilter;
    return matchSearch && matchStatus;
  });

  // Filtered Applications
  const filteredApps = applications.filter(a => {
    return appStatusFilter === 'all' || a.status === appStatusFilter;
  });

  const handleSaveBrand = (brandData) => {
    if (editingBrand?.id) {
      updateBrand(editingBrand.id, brandData);
    } else {
      addBrand(brandData);
    }
    setEditingBrand(null);
  };

  const handleAddAlternativeSubmit = (e) => {
    e.preventDefault();
    if (!newAltGlobal.trim()) return;
    const matchedBrand = brands.find(b => b.id === Number(newAltLocalId)) || brands[0];
    addAlternative({
      globalBrand: newAltGlobal,
      category: newAltCategory,
      localBrandId: matchedBrand?.id || 1,
      localBrandName: matchedBrand?.nameEn || 'Egyptian Brand',
      reasonEn: newAltReasonEn || 'Authentic Egyptian manufacturing with premium local materials.',
      reasonAr: newAltReasonAr || 'صناعة مصرية عالية الجودة بخامات محلية ممتازة.'
    });
    setNewAltGlobal('');
    setNewAltReasonEn('');
    setNewAltReasonAr('');
    setIsAddAltOpen(false);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updatePlatformSettings(settingsForm);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  const toggleLang = () => {
    const next = lang === 'en' ? 'ar' : 'en';
    if (setLang) setLang(next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next;
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    if (setTheme) setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const handleExportJson = () => {
    const data = {
      brands,
      orders,
      rfqs,
      applications,
      alternatives,
      platformSettings,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `e7na_local_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Helper: display RFQ status as localized label
  const rfqStatusLabel = (status) => t.rfqStatuses[status] || status.replace(/_/g, ' ');
  const orderStatusLabel = (status) => t.orderStatuses[status] || status.replace(/_/g, ' ');
  const appStatusLabel = (status) => t.appStatuses[status] || status.replace(/_/g, ' ');

  return (
    <div className="min-h-screen bg-[#060a16] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <header className="h-16 px-4 sm:px-6 bg-[#090f22]/90 border-b border-white/10 backdrop-blur-md flex items-center justify-between sticky top-0 z-40">
        
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-amber-400 to-pink-500 p-[2px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#070c1b] rounded-[14px] flex items-center justify-center font-black text-cyan-400 text-sm">
              e7
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>{ar ? 'لوحة تحكم إحنا لوكال' : 'e7na Local Command Center'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-extrabold uppercase tracking-wider">
                  {t.superAdmin}
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Back to Live Mall Preview Button */}
          <button
            onClick={onBackToMall}
            className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition flex items-center gap-1.5"
            title={t.mallPreview}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">{t.mallPreview}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-400/40 text-xs font-bold text-slate-300 flex items-center gap-1 transition"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.langToggle}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-400/40 text-slate-300 transition"
            title="Theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Admin User Badge */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 text-xs font-bold">
              Ad
            </div>
            <div className="text-left rtl:text-right">
              <div className="text-xs font-bold text-white leading-tight">Admin</div>
              <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t.authorized}</span>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logoutAdmin}
            className="p-2 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
            title={ar ? 'تسجيل الخروج' : 'Log Out Admin'}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar & Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 bg-[#080d1e] border-r rtl:border-r-0 rtl:border-l border-white/10 p-3 sm:p-4 shrink-0 flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-y-auto">
          
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-1.5 hidden lg:block">
            {t.modules}
          </div>

          {/* Overview */}
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition shrink-0 ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4 text-cyan-300" />
              <span>{t.overview}</span>
            </div>
          </button>

          {/* Brands */}
          <button
            onClick={() => setActiveTab('brands')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition shrink-0 ${
              activeTab === 'brands'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>{t.brands}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 font-mono">
              {brands.length}
            </span>
          </button>

          {/* Orders */}
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition shrink-0 ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-emerald-400" />
              <span>{t.orders}</span>
            </div>
            {pendingOrdersCount > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold animate-pulse">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          {/* RFQs */}
          <button
            onClick={() => setActiveTab('rfqs')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition shrink-0 ${
              activeTab === 'rfqs'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Ship className="w-4 h-4 text-cyan-400" />
              <span>{t.rfqs}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
              {rfqs.length}
            </span>
          </button>

          {/* Applications */}
          <button
            onClick={() => setActiveTab('applications')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition shrink-0 ${
              activeTab === 'applications'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileCheck className="w-4 h-4 text-pink-400" />
              <span>{t.applications}</span>
            </div>
            {pendingAppsCount > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/25 text-pink-300 font-mono font-black animate-pulse">
                {pendingAppsCount} {t.newBadge}
              </span>
            )}
          </button>

          {/* Alternatives */}
          <button
            onClick={() => setActiveTab('alternatives')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition shrink-0 ${
              activeTab === 'alternatives'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>{t.alternatives}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 font-mono">
              {alternatives.length}
            </span>
          </button>

          {/* Settings */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition shrink-0 ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-slate-400" />
              <span>{t.settings}</span>
            </div>
          </button>

          {/* Quick Stats sidebar footer */}
          <div className="mt-auto pt-4 border-t border-white/10 hidden lg:block text-xs space-y-2 text-slate-400">
            <div className="flex justify-between items-center text-[11px]">
              <span>{t.domesticGmv}</span>
              <strong className="text-emerald-400 font-mono">{totalDomesticGmv.toLocaleString()} EGP</strong>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span>{t.exportPipeline}</span>
              <strong className="text-cyan-400 font-mono">${totalRfqPipelineUsd.toLocaleString()} USD</strong>
            </div>
            <div className="pt-2">
              <button
                onClick={handleExportJson}
                className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-bold text-slate-300 flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.exportBackup}</span>
              </button>
            </div>
          </div>

        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          
          {/* ================= TAB 1: EXECUTIVE OVERVIEW ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Top Banner Alert (if active) */}
              {platformSettings.bannerActive && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-blue-950/60 to-purple-950/60 border border-cyan-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
                      <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                    </span>
                    <div>
                      <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                        {t.bannerActive}
                      </div>
                      <div className="text-sm font-semibold text-white mt-0.5">
                        {ar ? platformSettings.bannerTextAr : platformSettings.bannerTextEn}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 underline font-bold"
                  >
                    {t.bannerEdit}
                  </button>
                </div>
              )}

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Total Brands */}
                <div className="p-5 rounded-2xl bg-[#0a1126] border border-white/10 relative overflow-hidden group hover:border-amber-400/40 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {t.verifiedFactories}
                    </span>
                    <span className="p-2 rounded-xl bg-amber-400/10 text-amber-400">
                      <Building2 className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="text-3xl font-black text-white mt-2 font-mono">
                    {brands.length}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                    <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {verifiedBrandsCount} {t.verifiedBadge}
                    </span>
                    <span>•</span>
                    <span className="text-cyan-400 font-bold">
                      {wholesaleBrandsCount} {t.b2bReadyBadge}
                    </span>
                  </div>
                </div>

                {/* Domestic Orders & GMV */}
                <div className="p-5 rounded-2xl bg-[#0a1126] border border-white/10 relative overflow-hidden group hover:border-emerald-400/40 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {t.outletGmv}
                    </span>
                    <span className="p-2 rounded-xl bg-emerald-400/10 text-emerald-400">
                      <Package className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="text-3xl font-black text-emerald-300 mt-2 font-mono">
                    {totalDomesticGmv.toLocaleString()} <span className="text-xs font-sans text-slate-400">EGP</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
                    <span>{orders.length} {t.totalOrders}</span>
                    <span className="text-amber-400 font-bold">{pendingOrdersCount} {t.activeDispatch}</span>
                  </div>
                </div>

                {/* Silk Road Wholesale Pipeline */}
                <div className="p-5 rounded-2xl bg-[#0a1126] border border-white/10 relative overflow-hidden group hover:border-cyan-400/40 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {t.silkPipeline}
                    </span>
                    <span className="p-2 rounded-xl bg-cyan-400/10 text-cyan-400">
                      <Ship className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="text-3xl font-black text-cyan-300 mt-2 font-mono">
                    ${totalRfqPipelineUsd.toLocaleString()} <span className="text-xs font-sans text-slate-400">USD</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
                    <span>{rfqs.length} {t.bulkInquiries}</span>
                    <span className="text-cyan-400 font-bold">{t.gccEurope}</span>
                  </div>
                </div>

                {/* Pending Brand Audits */}
                <div className="p-5 rounded-2xl bg-[#0a1126] border border-white/10 relative overflow-hidden group hover:border-pink-400/40 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {t.factoryOnboarding}
                    </span>
                    <span className="p-2 rounded-xl bg-pink-400/10 text-pink-400">
                      <FileCheck className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="text-3xl font-black text-pink-300 mt-2 font-mono">
                    {pendingAppsCount} <span className="text-xs font-sans text-slate-400">{t.pendingLabel}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
                    <span>{t.awaitingAudit}</span>
                    <button
                      onClick={() => setActiveTab('applications')}
                      className="text-pink-400 hover:text-pink-300 font-bold underline"
                    >
                      {t.inspectQueue}
                    </button>
                  </div>
                </div>

              </div>

              {/* Main Visuals & Live Activity Split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Governorate & Sector Coverage Breakdown (2 Cols) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Governorates Distribution Panel */}
                  <div className="p-6 rounded-3xl bg-[#0a1126] border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-cyan-400" />
                          <span>{t.govTitle}</span>
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {t.govSub}
                        </p>
                      </div>
                      <span className="text-xs text-cyan-400 font-mono font-bold">{t.govNetwork}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {GOVERNORATES.filter(g => g.id !== 'all').map(gov => {
                        const count = brands.filter(b => b.governorate === gov.id).length;
                        return (
                          <div 
                            key={gov.id} 
                            onClick={() => { setBrandGovFilter(gov.id); setActiveTab('brands'); }}
                            className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-400/40 cursor-pointer transition flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{gov.icon}</span>
                              <div>
                                <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition">
                                  {ar ? gov.nameAr : gov.nameEn}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  {count} {t.factoriesUnit}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-white">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Category Distribution Bar */}
                  <div className="p-6 rounded-3xl bg-[#0a1126] border border-white/10">
                    <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span>{t.sectorTitle}</span>
                    </h3>

                    <div className="space-y-3">
                      {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
                        const count = brands.filter(b => b.category === cat.id).length;
                        const pct = Math.round((count / (brands.length || 1)) * 100);
                        return (
                          <div key={cat.id} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="flex items-center gap-1.5 text-slate-300">
                                <span>{cat.icon}</span>
                                <span>{ar ? cat.nameAr : cat.nameEn}</span>
                              </span>
                              <span className="text-slate-400 font-mono">{count} {t.brandsUnit} ({pct}%)</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 rounded-full transition-all duration-500"
                                style={{ width: `${Math.max(pct, 5)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Real-time Activity Feed (1 Col) */}
                <div className="p-6 rounded-3xl bg-[#0a1126] border border-white/10 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>{t.feedTitle}</span>
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                      LIVE
                    </span>
                  </div>

                  <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1">
                    
                    {/* Latest Orders */}
                    {orders.slice(0, 3).map(o => (
                      <div 
                        key={o.id} 
                        onClick={() => { setViewingOrder(o); }}
                        className="p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-400/40 cursor-pointer transition text-xs space-y-1"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-mono font-bold text-emerald-400">{o.id}</span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="font-bold text-white">
                          {o.customer?.name} → {o.brandNameEn}
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-400">
                          <span>{o.items?.length || 1} {t.itemsUnit}</span>
                          <strong className="text-white font-mono">{o.totalEgp} EGP</strong>
                        </div>
                      </div>
                    ))}

                    {/* Latest RFQs */}
                    {rfqs.slice(0, 2).map(r => (
                      <div 
                        key={r.id} 
                        onClick={() => { setViewingRfq(r); }}
                        className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 hover:border-cyan-400/40 cursor-pointer transition text-xs space-y-1"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-mono font-bold text-cyan-400">{r.id}</span>
                          <span className="text-[10px] text-cyan-300 font-semibold">{r.country}</span>
                        </div>
                        <div className="font-bold text-white">
                          {r.companyName} ({r.targetQuantity})
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {t.inquiryFor} <strong className="text-amber-400">{r.brandName}</strong>
                        </div>
                      </div>
                    ))}

                    {/* Latest Applications */}
                    {applications.slice(0, 2).map(a => (
                      <div 
                        key={a.id} 
                        onClick={() => { setViewingApp(a); }}
                        className="p-3.5 rounded-2xl bg-pink-950/20 border border-pink-500/20 hover:border-pink-400/40 cursor-pointer transition text-xs space-y-1"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-mono font-bold text-pink-400">{a.id}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-bold">
                            {appStatusLabel(a.status)}
                          </span>
                        </div>
                        <div className="font-bold text-white truncate">
                          {a.brandName}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {t.origin} {a.governorateLabel || a.governorate}
                        </div>
                      </div>
                    ))}

                  </div>

                  {/* Fast Action Buttons */}
                  <div className="mt-auto pt-4 border-t border-white/10 space-y-2">
                    <button
                      onClick={() => setEditingBrand({})}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5 hover:opacity-95 transition"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{t.addBrandBtn}</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ================= TAB 2: BRANDS CATALOG MANAGEMENT ================= */}
          {activeTab === 'brands' && (
            <div className="space-y-6">
              
              {/* Header & Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {t.brandsTitle}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {t.showingBrands(filteredBrands.length)}
                  </p>
                </div>

                <button
                  onClick={() => setEditingBrand({})}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-md shadow-cyan-500/20 flex items-center gap-2 hover:scale-[1.02] transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.addBrandBtn2}</span>
                </button>
              </div>

              {/* Filters Bar */}
              <div className="p-4 rounded-2xl bg-[#0a1126] border border-white/10 flex flex-wrap gap-3 items-center justify-between">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    placeholder={t.searchBrands}
                    className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex gap-2">
                  <select
                    value={brandCatFilter}
                    onChange={(e) => setBrandCatFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none"
                  >
                    <option value="all">{t.allCats}</option>
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{ar ? c.nameAr : c.nameEn}</option>
                    ))}
                  </select>

                  <select
                    value={brandGovFilter}
                    onChange={(e) => setBrandGovFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none"
                  >
                    <option value="all">{t.allGovs}</option>
                    {GOVERNORATES.filter(g => g.id !== 'all').map(g => (
                      <option key={g.id} value={g.id}>{ar ? g.nameAr : g.nameEn}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Brands Table */}
              <div className="rounded-3xl bg-[#0a1126] border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left rtl:text-right text-xs">
                    <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                      <tr>
                        <th className="p-4">{t.thBrand}</th>
                        <th className="p-4">{t.thCategory}</th>
                        <th className="p-4">{t.thGovernorate}</th>
                        <th className="p-4">{t.thVerification}</th>
                        <th className="p-4">{t.thSilkRoad}</th>
                        <th className="p-4">{t.thProducts}</th>
                        <th className="p-4 text-right rtl:text-left">{t.thActions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredBrands.map(brand => (
                        <tr key={brand.id} className="hover:bg-white/5 transition">
                          
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={brand.logoImage} 
                                alt={brand.nameEn} 
                                className="w-10 h-10 rounded-xl object-cover border border-white/10"
                              />
                              <div>
                                <div className="font-bold text-white text-sm">
                                  {ar ? brand.nameAr : brand.nameEn}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  {brand.nameEn !== brand.nameAr ? brand.nameEn : ''} • {ar ? 'تأسس' : 'Est.'} {brand.establishedYear}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-semibold uppercase text-[10px]">
                              {brand.category}
                            </span>
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-1.5 text-slate-300">
                              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                              <span>{ar ? brand.locationAr || brand.locationEn : brand.locationEn}</span>
                            </div>
                          </td>

                          <td className="p-4">
                            <button
                              onClick={() => toggleBrandVerification(brand.id)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition flex items-center gap-1 ${
                                brand.isVerified 
                                  ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/25'
                                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                              }`}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{brand.isVerified ? t.verifiedToggle : t.unverifiedToggle}</span>
                            </button>
                          </td>

                          <td className="p-4">
                            <button
                              onClick={() => toggleBrandWholesale(brand.id)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition flex items-center gap-1 ${
                                brand.isWholesaleReady 
                                  ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/25'
                                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                              }`}
                            >
                              <Ship className="w-3.5 h-3.5" />
                              <span>{brand.isWholesaleReady ? t.b2bToggle : t.domesticOnly}</span>
                            </button>
                          </td>

                          <td className="p-4">
                            <span className="text-slate-300 font-mono">
                              {brand.featuredProducts?.length || 0} {t.itemsUnit}
                            </span>
                          </td>

                          <td className="p-4 text-right rtl:text-left">
                            <div className="flex items-center justify-end rtl:justify-start gap-2">
                              <button
                                onClick={() => setEditingBrand(brand)}
                                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-white border border-white/10 transition"
                                title={ar ? 'تعديل البراند' : 'Edit Brand'}
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(t.confirmDeleteBrand(brand.nameEn))) {
                                    deleteBrand(brand.id);
                                  }
                                }}
                                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition"
                                title={ar ? 'حذف البراند' : 'Delete Brand'}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 3: SHOPPER ORDERS & FACTORY DISPATCH ================= */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {t.ordersTitle}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {t.ordersSub}
                  </p>
                </div>

                <div className="flex gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 font-mono font-bold text-xs">
                    GMV: {totalDomesticGmv.toLocaleString()} EGP
                  </span>
                </div>
              </div>

              {/* Status Tabs & Search */}
              <div className="p-4 rounded-2xl bg-[#0a1126] border border-white/10 flex flex-wrap gap-3 items-center justify-between">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder={t.searchOrders}
                    className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {['all', 'confirmed_by_outlet', 'preparing', 'shipped', 'delivered', 'cancelled'].map(status => (
                    <button
                      key={status}
                      onClick={() => setOrderStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        orderStatusFilter === status
                          ? 'bg-cyan-500 text-slate-950 font-black'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {orderStatusLabel(status)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List / Cards */}
              <div className="space-y-3">
                {filteredOrders.length === 0 ? (
                  <div className="p-12 text-center rounded-3xl bg-[#0a1126] border border-white/10">
                    <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <h3 className="font-bold text-white text-base">{t.noOrders}</h3>
                  </div>
                ) : (
                  filteredOrders.map(order => (
                    <div 
                      key={order.id} 
                      className="p-5 rounded-3xl bg-[#0a1126] border border-white/10 hover:border-cyan-400/30 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      {/* Order info */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-black text-sm text-cyan-400">
                            {order.id}
                          </span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-white/10 text-slate-300">
                            {new Date(order.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="text-xs text-amber-400 font-semibold">
                            {t.factoryLabel} {order.brandNameEn}
                          </span>
                        </div>

                        <div className="text-xs text-slate-300 font-medium">
                          <strong>{t.customerLabel}</strong> {order.customer?.name} ({order.customer?.phone}) • 
                          <span className="text-slate-400 ml-1 rtl:ml-0 rtl:mr-1">
                            {order.customer?.address}, {order.customer?.governorate}
                          </span>
                        </div>

                        {/* Items summary */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {order.items?.map((it, idx) => (
                            <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-slate-300">
                              {it.quantity}x {ar ? it.nameAr || it.nameEn : it.nameEn} ({it.priceEgp} EGP)
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pricing & Courier Tracking */}
                      <div className="flex flex-col md:items-end text-left rtl:text-right shrink-0">
                        <div className="text-base font-black text-emerald-400 font-mono">
                          {order.totalEgp} EGP
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {t.paymentLabel} <span className="uppercase font-semibold text-slate-300">{order.paymentMethod}</span>
                        </div>
                        {order.trackingCode && (
                          <div className="text-[10px] text-cyan-300 font-mono mt-0.5">
                            {t.trackLabel} {order.trackingCode}
                          </div>
                        )}
                      </div>

                      {/* Status Selector & Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-xs font-bold text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                        >
                          <option value="confirmed_by_outlet">{t.oStatusConfirmed}</option>
                          <option value="preparing">{t.oStatusPreparing}</option>
                          <option value="shipped">{t.oStatusShipped}</option>
                          <option value="delivered">{t.oStatusDelivered}</option>
                          <option value="cancelled">{t.oStatusCancelled}</option>
                        </select>

                        <button
                          onClick={() => setViewingOrder(order)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition"
                          title={ar ? 'عرض تفاصيل الطلب' : 'View Full Order Details'}
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(t.confirmDeleteOrder(order.id))) deleteOrder(order.id);
                          }}
                          className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition"
                          title={ar ? 'حذف الطلب' : 'Delete Order'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* ================= TAB 4: SILK ROAD B2B EXPORT RFQS ================= */}
          {activeTab === 'rfqs' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {t.rfqsTitle}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {t.rfqsSub}
                  </p>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono font-bold text-xs">
                  Pipeline: ${totalRfqPipelineUsd.toLocaleString()} USD
                </div>
              </div>

              {/* RFQ Search & Filters */}
              <div className="p-4 rounded-2xl bg-[#0a1126] border border-white/10 flex flex-wrap gap-3 items-center justify-between">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={rfqSearch}
                    onChange={(e) => setRfqSearch(e.target.value)}
                    placeholder={t.searchRfqs}
                    className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {['all', 'new_inquiry', 'quotation_sent', 'sample_dispatched', 'contract_signed', 'shipped'].map(st => (
                    <button
                      key={st}
                      onClick={() => setRfqStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        rfqStatusFilter === st
                          ? 'bg-cyan-500 text-slate-950 font-black'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {rfqStatusLabel(st)}
                    </button>
                  ))}
                </div>
              </div>

              {/* RFQ Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRfqs.map(rfq => (
                  <div 
                    key={rfq.id}
                    className="p-6 rounded-3xl bg-[#0a1126] border border-white/10 hover:border-cyan-400/40 transition space-y-4 relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-black text-cyan-400">
                          {rfq.id}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 uppercase">
                          {rfqStatusLabel(rfq.status)}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white">
                        {rfq.companyName}
                      </h3>
                      <div className="text-xs text-slate-400">
                        {t.buyerLabel} <strong className="text-slate-200">{rfq.buyerName}</strong> • {rfq.country}
                      </div>

                      {/* Export details box */}
                      <div className="mt-3 p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">{t.factoryTarget}</span>
                          <strong className="text-amber-400">{rfq.brandName}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">{t.targetVolume}</span>
                          <strong className="text-white font-mono">{rfq.targetQuantity}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">{t.deliveryPort}</span>
                          <span className="text-slate-300">{rfq.targetPort}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">{t.estOrderValue}</span>
                          <strong className="text-emerald-400 font-mono">${rfq.estimatedValueUsd?.toLocaleString()} USD</strong>
                        </div>
                      </div>

                      {rfq.notes && (
                        <p className="mt-3 text-xs text-slate-300 italic bg-slate-900/60 p-2.5 rounded-xl border border-white/5">
                          "{rfq.notes}"
                        </p>
                      )}
                    </div>

                    {/* Bottom Status Control & Direct Contact */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                      <select
                        value={rfq.status}
                        onChange={(e) => updateRfqStatus(rfq.id, e.target.value)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-bold text-white focus:outline-none"
                      >
                        <option value="new_inquiry">{t.rfqOptNew}</option>
                        <option value="quotation_sent">{t.rfqOptQuotation}</option>
                        <option value="sample_dispatched">{t.rfqOptSample}</option>
                        <option value="contract_signed">{t.rfqOptContract}</option>
                        <option value="shipped">{t.rfqOptShipped}</option>
                        <option value="cancelled">{t.rfqOptClosed}</option>
                      </select>

                      <div className="flex items-center gap-2">
                        {rfq.phone && (
                          <a
                            href={`https://wa.me/${rfq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-400/30 transition text-xs flex items-center gap-1"
                            title="WhatsApp"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {rfq.email && (
                          <a
                            href={`mailto:${rfq.email}?subject=Egyptian Factory Export Quotation - ${rfq.id}`}
                            className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 border border-cyan-400/30 transition text-xs flex items-center gap-1"
                            title="Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => {
                            if (confirm(t.confirmDeleteRfq(rfq.id))) deleteRfq(rfq.id);
                          }}
                          className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= TAB 5: BRAND ONBOARDING QUEUE ================= */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {t.appsTitle}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {t.appsSub}
                  </p>
                </div>

                <span className="text-xs px-3 py-1.5 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-300 font-bold">
                  {t.appsPending(pendingAppsCount)}
                </span>
              </div>

              {/* Status Filter */}
              <div className="flex gap-2 flex-wrap">
                {['all', 'pending', 'under_review', 'approved', 'rejected'].map(st => (
                  <button
                    key={st}
                    onClick={() => setAppStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      appStatusFilter === st
                        ? 'bg-pink-500 text-white font-black'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {appStatusLabel(st)}
                  </button>
                ))}
              </div>

              {/* Applications List */}
              <div className="space-y-4">
                {filteredApps.map(app => (
                  <div
                    key={app.id}
                    className="p-6 rounded-3xl bg-[#0a1126] border border-white/10 hover:border-pink-500/30 transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-black text-pink-400">
                          {app.id}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          app.status === 'pending'
                            ? 'bg-amber-500/15 border border-amber-400/40 text-amber-300'
                            : app.status === 'approved'
                            ? 'bg-emerald-500/15 border border-emerald-400/40 text-emerald-300'
                            : 'bg-white/5 text-slate-400'
                        }`}>
                          {appStatusLabel(app.status)}
                        </span>
                        <span className="text-xs text-slate-400">
                          {t.submittedLabel} {new Date(app.submittedAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white">
                        {app.brandName}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 pt-1">
                        <div>
                          <span className="text-slate-500 block text-[10px]">{t.locationLabel}</span>
                          <strong className="text-cyan-300">{app.factoryLocation}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">{t.commercialRegLabel}</span>
                          <span className="font-mono text-slate-300">{app.commercialRegister || (ar ? 'مقدَّم' : 'Provided')}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">{t.phoneLabel}</span>
                          <span className="font-mono text-slate-300">{app.phone}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed pt-1 bg-slate-900/50 p-2.5 rounded-xl border border-white/5">
                        {app.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full lg:w-auto">
                      {app.status !== 'approved' && (
                        <button
                          onClick={() => {
                            const res = approveApplication(app.id);
                            if (res) alert(t.approveAlert(res.nameEn));
                          }}
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs shadow-md shadow-emerald-500/20 hover:scale-[1.02] transition flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t.approveBtn}</span>
                        </button>
                      )}

                      {app.status === 'approved' && (
                        <div className="px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>{t.liveInMall}</span>
                        </div>
                      )}

                      {app.status !== 'rejected' && app.status !== 'approved' && (
                        <button
                          onClick={() => {
                            const reason = prompt(t.rejectPrompt);
                            if (reason) rejectApplication(app.id, reason);
                          }}
                          className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-slate-400 hover:text-red-300 text-xs font-bold transition"
                        >
                          {t.rejectBtn}
                        </button>
                      )}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= TAB 6: AI LOCAL ALTERNATIVE MATCHMAKER ================= */}
          {activeTab === 'alternatives' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {t.altTitle}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {t.altSub}
                  </p>
                </div>

                <button
                  onClick={() => setIsAddAltOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black text-xs shadow-md shadow-purple-500/20 hover:scale-[1.02] transition flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.addAltBtn}</span>
                </button>
              </div>

              {/* Add Modal */}
              {isAddAltOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                  <div className="w-full max-w-lg rounded-3xl bg-[#090f20] border border-purple-500/30 p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>{t.addAltModalTitle}</span>
                      </h3>
                      <button onClick={() => setIsAddAltOpen(false)} className="text-slate-400 hover:text-white">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleAddAlternativeSubmit} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-300 font-bold mb-1">{t.globalBrandLabel}</label>
                        <input
                          type="text"
                          required
                          value={newAltGlobal}
                          onChange={(e) => setNewAltGlobal(e.target.value)}
                          placeholder={t.globalBrandPlaceholder}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-300 font-bold mb-1">{t.categoryLabel}</label>
                          <input
                            type="text"
                            value={newAltCategory}
                            onChange={(e) => setNewAltCategory(e.target.value)}
                            placeholder={t.categoryPlaceholder}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-300 font-bold mb-1">{t.localBrandLabel}</label>
                          <select
                            value={newAltLocalId}
                            onChange={(e) => setNewAltLocalId(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                          >
                            {brands.map(b => (
                              <option key={b.id} value={b.id}>{b.nameEn} ({b.nameAr})</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-300 font-bold mb-1">{t.reasonEnLabel}</label>
                        <textarea
                          rows={2}
                          value={newAltReasonEn}
                          onChange={(e) => setNewAltReasonEn(e.target.value)}
                          placeholder="Superior Egyptian cotton, local craftsmanship..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-bold mb-1">{t.reasonArLabel}</label>
                        <textarea
                          rows={2}
                          value={newAltReasonAr}
                          onChange={(e) => setNewAltReasonAr(e.target.value)}
                          placeholder="خامات مصرية أصيلة، تصنيع محلي أعلى جودة..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                        />
                      </div>

                      <div className="pt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddAltOpen(false)}
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300"
                        >
                          {t.cancelBtn}
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold"
                        >
                          {t.saveMatchBtn}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Alternatives Table */}
              <div className="rounded-3xl bg-[#0a1126] border border-white/10 overflow-hidden">
                <table className="w-full text-left rtl:text-right text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-4">{t.thGlobalBrand}</th>
                      <th className="p-4">{t.thCategory}</th>
                      <th className="p-4">{t.thEgyptianAlt}</th>
                      <th className="p-4">{t.thRationale}</th>
                      <th className="p-4 text-right rtl:text-left">{t.thAction}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {alternatives.map((alt, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition">
                        <td className="p-4 font-bold text-white">
                          {alt.globalBrand}
                        </td>
                        <td className="p-4 text-slate-400">
                          {alt.category}
                        </td>
                        <td className="p-4 font-bold text-cyan-400">
                          {alt.localBrandName}
                        </td>
                        <td className="p-4 text-slate-300 max-w-md">
                          <div>{ar ? alt.reasonAr : alt.reasonEn}</div>
                        </td>
                        <td className="p-4 text-right rtl:text-left">
                          <button
                            onClick={() => deleteAlternative(idx)}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                            title={ar ? 'حذف' : 'Delete'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ================= TAB 7: PLATFORM SETTINGS & DATA CONTROLS ================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {t.settingsTitle}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {t.settingsSub}
                </p>
              </div>

              {settingsSavedToast && (
                <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.settingsSaved}</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-[#0a1126] border border-white/10 space-y-5 text-xs sm:text-sm">
                
                {/* Financial Controls */}
                <h3 className="font-bold text-white text-sm border-b border-white/10 pb-2">
                  {t.logisticsHeading}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      {t.shippingFeeLabel}
                    </label>
                    <input
                      type="number"
                      value={settingsForm.domesticShippingFee}
                      onChange={(e) => setSettingsForm({ ...settingsForm, domesticShippingFee: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {t.shippingFeeHint}
                    </span>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      {t.exchangeRateLabel}
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      value={settingsForm.egpToUsdRate}
                      onChange={(e) => setSettingsForm({ ...settingsForm, egpToUsdRate: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {t.exchangeRateHint}
                    </span>
                  </div>
                </div>

                {/* Announcement Banner */}
                <h3 className="font-bold text-white text-sm border-b border-white/10 pb-2 pt-3">
                  {t.bannerHeading}
                </h3>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.bannerActive}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bannerActive: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500"
                  />
                  <span className="text-white font-bold">
                    {t.bannerCheckboxLabel}
                  </span>
                </label>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">{t.bannerEnLabel}</label>
                  <input
                    type="text"
                    value={settingsForm.bannerTextEn}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bannerTextEn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">نص الشريط الإعلاني (بالعربية)</label>
                  <input
                    type="text"
                    value={settingsForm.bannerTextAr}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bannerTextAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white font-black text-xs shadow-md shadow-cyan-500/20 hover:scale-[1.01] transition"
                  >
                    {t.saveSettingsBtn}
                  </button>
                </div>

              </form>

              {/* Data Tools */}
              <div className="p-6 rounded-3xl bg-[#0a1126] border border-white/10 space-y-4 text-xs">
                <h3 className="font-bold text-white text-sm border-b border-white/10 pb-2">
                  {t.dataHeading}
                </h3>

                <p className="text-slate-400">
                  {t.dataDesc}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleExportJson}
                    className="px-4 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 font-bold flex items-center gap-2 transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t.downloadDbBtn}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(t.confirmReset)) {
                        resetAllDataToDefaults();
                        alert(t.resetSuccess);
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold flex items-center gap-2 transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{t.resetBtn}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* Brand Edit / Create Modal */}
      {editingBrand !== null && (
        <BrandEditModal
          brand={editingBrand}
          lang={lang}
          onClose={() => setEditingBrand(null)}
          onSave={handleSaveBrand}
        />
      )}

      {/* Order Details Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl bg-[#090f20] border border-cyan-500/30 p-6 space-y-4 text-left rtl:text-right">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-cyan-400 font-mono font-bold block uppercase">{t.orderDetailsLabel}</span>
                <h3 className="text-lg font-black text-white">{viewingOrder.id}</h3>
              </div>
              <button onClick={() => setViewingOrder(null)} className="p-2 text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="font-bold text-white">{t.outletFactory} {viewingOrder.brandNameEn}</div>
                <div className="text-slate-400">{t.locationInModal} {viewingOrder.brandLocationEn}</div>
                {viewingOrder.brandWhatsapp && (
                  <div className="text-emerald-400 font-mono">{t.whatsappLabel} {viewingOrder.brandWhatsapp}</div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="font-bold text-white">{t.customerInfo}</div>
                <div className="text-slate-300">{t.nameLabel} {viewingOrder.customer?.name}</div>
                <div className="text-slate-300">{t.phoneInModal} {viewingOrder.customer?.phone}</div>
                <div className="text-slate-300">{t.addressLabel} {viewingOrder.customer?.address}, {viewingOrder.customer?.governorate}</div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-white">{t.orderedItems}</div>
                {viewingOrder.items?.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-slate-900 border border-white/5">
                    <span>{it.quantity}x {ar ? it.nameAr || it.nameEn : it.nameEn}</span>
                    <strong className="text-emerald-400 font-mono">{it.priceEgp * it.quantity} EGP</strong>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t border-white/10 font-bold">
                  <span>{t.shippingFeeRow}</span>
                  <span>{viewingOrder.shippingFeeEgp || 60} EGP</span>
                </div>
                <div className="flex justify-between font-black text-sm text-cyan-400">
                  <span>{t.totalDue}</span>
                  <span>{viewingOrder.totalEgp} EGP</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <span className="text-slate-400">{t.statusLabel}</span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 font-bold">
                  {orderStatusLabel(viewingOrder.status)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RFQ Details Modal */}
      {viewingRfq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl bg-[#090f20] border border-cyan-500/30 p-6 space-y-4 text-left rtl:text-right">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-cyan-400 font-mono font-bold block uppercase">{t.silkRoadRfqLabel}</span>
                <h3 className="text-lg font-black text-white">{viewingRfq.id}</h3>
              </div>
              <button onClick={() => setViewingRfq(null)} className="p-2 text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="font-bold text-white">{viewingRfq.companyName}</div>
                <div className="text-slate-300">{t.buyerInModal} {viewingRfq.buyerName} ({viewingRfq.country})</div>
                <div className="text-slate-400">{t.emailPhone} {viewingRfq.email} • {t.phoneInModal} {viewingRfq.phone}</div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 space-y-1">
                <div>{t.factoryTargetModal} <strong className="text-amber-400">{viewingRfq.brandName}</strong></div>
                <div>{t.qtyRequested} <strong className="text-white font-mono">{viewingRfq.targetQuantity}</strong></div>
                <div>{t.destPort} <span className="text-slate-300">{viewingRfq.targetPort}</span></div>
                <div>{t.estValue} <strong className="text-emerald-400 font-mono">${viewingRfq.estimatedValueUsd?.toLocaleString()} USD</strong></div>
              </div>

              {viewingRfq.notes && (
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5 italic text-slate-300">
                  "{viewingRfq.notes}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Application Details Modal */}
      {viewingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl bg-[#090f20] border border-pink-500/30 p-6 space-y-4 text-left rtl:text-right">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-pink-400 font-mono font-bold block uppercase">{t.brandAppLabel}</span>
                <h3 className="text-lg font-black text-white">{viewingApp.id}</h3>
              </div>
              <button onClick={() => setViewingApp(null)} className="p-2 text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-bold text-white text-base">{viewingApp.brandName}</h4>
                <div className="text-slate-400">{t.categoryInModal} {viewingApp.category} • {t.locationLabel} {viewingApp.factoryLocation}</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div>{t.commercialRegModal} <span className="font-mono text-cyan-300">{viewingApp.commercialRegister}</span></div>
                <div>{t.taxCardLabel} <span className="font-mono text-cyan-300">{viewingApp.taxCard}</span></div>
                <div>{t.phoneInModal} <span className="font-mono text-slate-300">{viewingApp.phone}</span></div>
                {viewingApp.websiteUrl && <div>{t.websiteLabel} <a href={viewingApp.websiteUrl} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{viewingApp.websiteUrl}</a></div>}
              </div>

              <p className="p-3 rounded-xl bg-slate-900 border border-white/5 text-slate-300 leading-relaxed">
                {viewingApp.description}
              </p>

              {viewingApp.status !== 'approved' && (
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      approveApplication(viewingApp.id);
                      setViewingApp(null);
                      alert(t.approveAndPublish);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold"
                  >
                    {t.approveBrandBtn}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
