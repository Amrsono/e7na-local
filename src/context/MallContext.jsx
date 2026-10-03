import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BRANDS, ALTERNATIVES_MAPPING } from '../data/brandsData';

const MallContext = createContext(null);

const STORAGE_KEY_AUTH = 'e7na_mall_customer';
const STORAGE_KEY_ORDERS = 'e7na_mall_orders';
const STORAGE_KEY_BASKETS = 'e7na_mall_baskets';
const STORAGE_KEY_ADMIN_AUTH = 'e7na_admin_auth';
const STORAGE_KEY_BRANDS = 'e7na_mall_brands';
const STORAGE_KEY_RFQS = 'e7na_mall_rfqs';
const STORAGE_KEY_APPLICATIONS = 'e7na_mall_applications';
const STORAGE_KEY_ALTERNATIVES = 'e7na_mall_alternatives';
const STORAGE_KEY_SETTINGS = 'e7na_mall_settings';

// Seed initial orders for admin demonstration
const SEED_ORDERS = [
  {
    id: "E7NA-INY-8192",
    brandId: 1,
    brandNameEn: "In Your Shoe",
    brandNameAr: "إن يور شو",
    brandLocationEn: "New Cairo, Cairo",
    brandLocationAr: "القاهرة الجديدة، القاهرة",
    brandWhatsapp: "+201099887766",
    brandLogo: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=200&q=80",
    items: [
      { nameEn: "Pharaonic Graphic Hoodie", nameAr: "هودي بنقوش فرعونية", priceEgp: 1250, priceUsd: 40, quantity: 2, image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80" },
      { nameEn: "Egyptian Cotton Sweatpants", nameAr: "بنطال قطن مصري", priceEgp: 850, priceUsd: 28, quantity: 1, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80" }
    ],
    subtotalEgp: 3350,
    subtotalUsd: 108,
    shippingFeeEgp: 60,
    totalEgp: 3410,
    paymentMethod: "cod",
    customer: {
      name: "كريم الدسوقي",
      phone: "+20 102 334 5566",
      email: "karim.desouky@example.com",
      address: "عمارة 14، شارع النصر، المعادي",
      governorate: "القاهرة (Cairo)"
    },
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: "preparing",
    statusLabelEn: "Preparing at Factory",
    statusLabelAr: "جاري تجهيز الطلب بمصنع المعرض",
    trackingCode: "EG-POST-449102"
  },
  {
    id: "E7NA-COT-3921",
    brandId: 2,
    brandNameEn: "Cottonique Giza Home",
    brandNameAr: "كوتونيك جيزة هوم",
    brandLocationEn: "El Mahalla El Kubra, Gharbia",
    brandLocationAr: "المحلة الكبرى، الغربية",
    brandWhatsapp: "+201288776655",
    brandLogo: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=200&q=80",
    items: [
      { nameEn: "Royal Giza 88 Duvet Set 1000TC", nameAr: "طقم لحاف قطن جيزة ملائكي", priceEgp: 4800, priceUsd: 155, quantity: 1, image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80" }
    ],
    subtotalEgp: 4800,
    subtotalUsd: 155,
    shippingFeeEgp: 60,
    totalEgp: 4860,
    paymentMethod: "card",
    customer: {
      name: "ندى الشناوي",
      phone: "+20 111 889 9001",
      email: "nada.elshinnawy@example.com",
      address: "برج الفيروز، شارع فوزي معاذ، سموحة",
      governorate: "الإسكندرية (Alexandria)"
    },
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: "shipped",
    statusLabelEn: "Shipped with Courier",
    statusLabelAr: "تم تسليم الشحنة لشركة النقل السريع",
    trackingCode: "BOSTA-882910"
  },
  {
    id: "E7NA-NEF-4412",
    brandId: 3,
    brandNameEn: "Nefertari Natural Botanicals",
    brandNameAr: "نفرتاري للزيوت ومستحضرات التجميل الطبيعية",
    brandLocationEn: "Giza / Cairo",
    brandLocationAr: "الجيزة / القاهرة",
    brandWhatsapp: "+201122334455",
    brandLogo: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=200&q=80",
    items: [
      { nameEn: "Virgin Black Seed Elixir Oil", nameAr: "زيت حبة البركة البكر الممتاز", priceEgp: 420, priceUsd: 14, quantity: 3, image: "https://images.unsplash.com/photo-1608248597261-e4d0947c6b8e?auto=format&fit=crop&w=600&q=80" },
      { nameEn: "Egyptian Camel Milk & Honey Soap", nameAr: "صابون لبن الإبل وعسل النحل", priceEgp: 190, priceUsd: 6, quantity: 2, image: "https://images.unsplash.com/photo-1607006482172-3ba577b21a8d?auto=format&fit=crop&w=600&q=80" }
    ],
    subtotalEgp: 1640,
    subtotalUsd: 54,
    shippingFeeEgp: 60,
    totalEgp: 1700,
    paymentMethod: "cod",
    customer: {
      name: "أحمد عبد الفتاح",
      phone: "+20 122 456 7890",
      email: "ahmed.fatah@example.com",
      address: "كمبوند بيفرلي هيلز، فيلا 210",
      governorate: "الجيزة (Giza)"
    },
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: "delivered",
    statusLabelEn: "Delivered to Customer",
    statusLabelAr: "تم تسليم الطلب للعميل بنجاح",
    trackingCode: "ARAMEX-66129"
  }
];

// Seed B2B Wholesale Silk Road RFQ Leads
const SEED_RFQS = [
  {
    id: "RFQ-2026-AE-101",
    buyerName: "Sultan Al-Ketbi",
    companyName: "Gulf Retail Partners LLC",
    country: "United Arab Emirates",
    email: "sultan@gulfretail.ae",
    phone: "+971 50 123 4567",
    brandId: 1,
    brandName: "In Your Shoe",
    targetQuantity: "1 Container (20ft) / 3,000 Pcs",
    targetPort: "Jebel Ali Port, Dubai",
    notes: "Looking to stock authentic Egyptian cotton streetwear across 14 concept boutiques in Dubai and Abu Dhabi malls for Winter season.",
    status: "quotation_sent",
    statusLabel: "Quotation & FOB Terms Dispatched",
    estimatedValueUsd: 75000,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
  },
  {
    id: "RFQ-2026-SA-204",
    buyerName: "Fahad Al-Husseini",
    companyName: "Al-Riyadh Hospitality Supplies",
    country: "Saudi Arabia",
    email: "fahad@riyadh-hotels.sa",
    phone: "+966 55 987 6543",
    brandId: 2,
    brandName: "Cottonique Giza Home",
    targetQuantity: "800 Luxury Duvet Sets & 2,500 Towels",
    targetPort: "Jeddah Islamic Sea Port",
    notes: "Outfitting 2 new luxury boutique hotels in Al-Ula and Riyadh. Need Giza 88 luxury certified cotton with custom embroidered crests.",
    status: "sample_dispatched",
    statusLabel: "Material Swatches Dispatched via DHL",
    estimatedValueUsd: 92000,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: "RFQ-2026-DE-308",
    buyerName: "Helena Schneider",
    companyName: "BioMarkt Naturwaren GmbH",
    country: "Germany",
    email: "schneider@biomarkt-muc.de",
    phone: "+49 89 234 5678",
    brandId: 7,
    brandName: "Siwa Organic Treasures",
    targetQuantity: "2 x 20ft Containers Cold-Pressed Virgin Olive Oil",
    targetPort: "Hamburg Port, Germany",
    notes: "Seeking certified organic cold-pressed olive oil bottles (500ml and 1L) with EU organic laboratory test certificates.",
    status: "new_inquiry",
    statusLabel: "New Inbound Inquiry",
    estimatedValueUsd: 48000,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: "RFQ-2026-FR-412",
    buyerName: "Laurent Mercier",
    companyName: "Galeries d'Art Méditerranéen",
    country: "France",
    email: "l.mercier@art-paris.fr",
    phone: "+33 1 45 67 89 00",
    brandId: 5,
    brandName: "Tunis Fayoum Ceramics",
    targetQuantity: "500 pieces hand-painted terracotta bowls & vases",
    targetPort: "Marseille Port, France",
    notes: "Curating a dedicated Egyptian heritage artisanal exhibit in Le Marais, Paris. Require artisanal packaging.",
    status: "contract_signed",
    statusLabel: "Export Contract Executed",
    estimatedValueUsd: 22500,
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
  }
];

// Seed Brand Onboarding Applications submitted by Egyptian Factory Owners
const SEED_APPLICATIONS = [
  {
    id: "APP-701",
    brandName: "أخميم للحرير والكتان اليدوي (Akhmim Heritage Weavers)",
    category: "crafts",
    governorate: "sohag",
    governorateLabel: "سوهاج (Sohag)",
    websiteUrl: "https://akhmim-weavers.eg",
    phone: "+20 101 928 3746",
    isWholesale: true,
    commercialRegister: "CR-99210-SOHAG",
    taxCard: "TX-440-129-881",
    factoryLocation: "قرية أخميم النسيجية، سوهاج",
    establishedYear: 1996,
    description: "جمعية تعاونية تضم أكثر من 80 ناسج وناسجة على الأنوال اليدوية القديمة بأخميم، ننتج أوشحة من الحرير الطبيعي الصافي، ومفارش كتان مصري عالي الجودة معتمد تراثياً.",
    status: "pending",
    submittedAt: new Date(Date.now() - 3600000 * 8).toISOString()
  },
  {
    id: "APP-702",
    brandName: "حرفيو جرانيت ورخام أسوان (Aswan Granite & Basalt Crafts)",
    category: "crafts",
    governorate: "aswan",
    governorateLabel: "أسوان (Aswan)",
    websiteUrl: "https://aswangranite.com",
    phone: "+20 112 345 9876",
    isWholesale: true,
    commercialRegister: "CR-77412-ASWAN",
    taxCard: "TX-891-201-332",
    factoryLocation: "المنطقة الحرفية، الشلال، أسوان",
    establishedYear: 2012,
    description: "ورش ومحاجر متخصصة في تشكيل الجرانيت الأسواني الوردي والأسود والبازلت في أواني طهي يدوية، هاونات صلبة، وألواح تقديم طعام للمطاعم والفنادق العالمية.",
    status: "pending",
    submittedAt: new Date(Date.now() - 3600000 * 20).toISOString()
  },
  {
    id: "APP-703",
    brandName: "أعشاب ومورينجا وادي النيل (Nile Valley Organic Herbals)",
    category: "food",
    governorate: "fayoum",
    governorateLabel: "الفيوم (Fayoum)",
    websiteUrl: "https://nilevalleyherbals.eg",
    phone: "+20 128 765 4321",
    isWholesale: true,
    commercialRegister: "CR-55410-FYM",
    taxCard: "TX-302-881-990",
    factoryLocation: "أرض الاستصلاح العضوي، يوسف الصديق، الفيوم",
    establishedYear: 2019,
    description: "مزارع ومجففات عضوية لأوراق المورينجا، الكركديه الأسواني، والبابونج الطبيعي بعبوات تصديرية وشهادة خلو من المبيدات.",
    status: "under_review",
    submittedAt: new Date(Date.now() - 3600000 * 36).toISOString()
  }
];

const DEFAULT_SETTINGS = {
  domesticShippingFee: 60,
  egpToUsdRate: 0.032,
  bannerActive: true,
  bannerTextEn: "✨ Egypt's Local Industry Support Month: Free domestic shipping on factory outlet orders over 1,000 EGP!",
  bannerTextAr: "✨ شهر دعم الصناعة المصرية: شحن مجاني لكافة محافظات مصر على طلبيات منافذ المصانع فوق ١٠٠٠ ج.م!",
  activeExportPorts: ["Alexandria Sea Port", "Damietta Sea Port", "Ain Sokhna Port", "Port Said", "Cairo Air Cargo"]
};

export function MallProvider({ children }) {
  // Customer Authentication state (null if guest browsing)
  const [customer, setCustomer] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Admin Authentication state
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_AUTH);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Dynamic Brands Catalog (initialized with default BRANDS)
  const [brands, setBrands] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BRANDS);
      return saved ? JSON.parse(saved) : BRANDS;
    } catch {
      return BRANDS;
    }
  });

  // Past Orders per Outlet
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      return saved ? JSON.parse(saved) : SEED_ORDERS;
    } catch {
      return SEED_ORDERS;
    }
  });

  // Silk Road B2B Wholesale RFQs
  const [rfqs, setRfqs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RFQS);
      return saved ? JSON.parse(saved) : SEED_RFQS;
    } catch {
      return SEED_RFQS;
    }
  });

  // Brand Onboarding Applications Queue
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
      return saved ? JSON.parse(saved) : SEED_APPLICATIONS;
    } catch {
      return SEED_APPLICATIONS;
    }
  });

  // AI Alternatives Matchmaker database
  const [alternatives, setAlternatives] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ALTERNATIVES);
      return saved ? JSON.parse(saved) : ALTERNATIVES_MAPPING;
    } catch {
      return ALTERNATIVES_MAPPING;
    }
  });

  // Platform and Financial Settings
  const [platformSettings, setPlatformSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Baskets keyed by brandId
  const [outletBaskets, setOutletBaskets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BASKETS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // UI Modals state
  const [activeOutletBasketBrand, setActiveOutletBasketBrand] = useState(null);
  const [isAuthCheckoutOpen, setIsAuthCheckoutOpen] = useState(false);
  const [authCheckoutBrand, setAuthCheckoutBrand] = useState(null);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [latestCompletedOrder, setLatestCompletedOrder] = useState(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      if (customer) {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(customer));
      } else {
        localStorage.removeItem(STORAGE_KEY_AUTH);
      }
    } catch (e) {
      console.error('Error saving customer auth:', e);
    }
  }, [customer]);

  useEffect(() => {
    try {
      if (adminUser) {
        localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, JSON.stringify(adminUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
      }
    } catch (e) {
      console.error('Error saving admin auth:', e);
    }
  }, [adminUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BRANDS, JSON.stringify(brands));
    } catch (e) {
      console.error('Error saving brands:', e);
    }
  }, [brands]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RFQS, JSON.stringify(rfqs));
    } catch (e) {
      console.error('Error saving RFQs:', e);
    }
  }, [rfqs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(applications));
    } catch (e) {
      console.error('Error saving applications:', e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ALTERNATIVES, JSON.stringify(alternatives));
    } catch (e) {
      console.error('Error saving alternatives:', e);
    }
  }, [alternatives]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(platformSettings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  }, [platformSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BASKETS, JSON.stringify(outletBaskets));
    } catch (e) {
      console.error('Error saving baskets:', e);
    }
  }, [outletBaskets]);

  // ================= ADMIN AUTHENTICATION =================
  // Required: Username: Admin, Password: Password@26
  const loginAdmin = (username, password) => {
    const cleanUser = (username || '').trim();
    const cleanPass = (password || '').trim();

    if (cleanUser.toLowerCase() === 'admin' && cleanPass === 'Password@26') {
      const user = {
        isLoggedIn: true,
        username: 'Admin',
        role: 'SUPER_ADMIN',
        roleLabel: 'مدير عام منصة إحنا لوكال للتصدير والمعارض',
        roleLabelEn: 'Super Admin (Mall & Export Director)',
        loginTimestamp: new Date().toISOString()
      };
      setAdminUser(user);
      setIsAdminLoginModalOpen(false);

      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      return { success: true };
    }
    return { 
      success: false, 
      error: 'Invalid username or password.' 
    };
  };

  const logoutAdmin = () => {
    setAdminUser(null);
  };

  // ================= BRANDS CRUD =================
  const addBrand = (newBrandData) => {
    const newId = brands.length > 0 ? Math.max(...brands.map(b => b.id)) + 1 : 1;
    const brand = {
      id: newId,
      rating: 5.0,
      reviewsCount: 1,
      isVerified: true,
      isWholesaleReady: true,
      establishedYear: new Date().getFullYear(),
      coverImage: newBrandData.coverImage || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
      logoImage: newBrandData.logoImage || "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=200&q=80",
      featuredProducts: newBrandData.featuredProducts || [],
      exportMarkets: newBrandData.exportMarkets || ["UAE", "Saudi Arabia", "Germany"],
      ...newBrandData
    };
    setBrands(prev => [brand, ...prev]);
    return brand;
  };

  const updateBrand = (brandId, updatedFields) => {
    setBrands(prev => prev.map(b => b.id === brandId ? { ...b, ...updatedFields } : b));
  };

  const deleteBrand = (brandId) => {
    setBrands(prev => prev.filter(b => b.id !== brandId));
    clearOutletBasket(brandId);
  };

  const toggleBrandVerification = (brandId) => {
    setBrands(prev => prev.map(b => b.id === brandId ? { ...b, isVerified: !b.isVerified } : b));
  };

  const toggleBrandWholesale = (brandId) => {
    setBrands(prev => prev.map(b => b.id === brandId ? { ...b, isWholesaleReady: !b.isWholesaleReady } : b));
  };

  // ================= ORDERS DISPATCH =================
  const updateOrderStatus = (orderId, newStatus, customNotes = '') => {
    const statusLabels = {
      confirmed_by_outlet: { en: 'Confirmed by Factory Outlet', ar: 'تم تأكيد الطلب وتوجيهه لمصنع المعرض' },
      preparing: { en: 'Preparing at Factory', ar: 'جاري تجهيز وتعبئة المنتجات بالمصنع' },
      shipped: { en: 'Shipped with Domestic Courier', ar: 'تم الشحن مع مندوب التوصيل السريع' },
      delivered: { en: 'Delivered to Customer', ar: 'تم التوصيل للعميل واستلام الدفع' },
      cancelled: { en: 'Cancelled by Outlet Admin', ar: 'تم إلغاء الطلب من الإدارة' }
    };

    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status: newStatus,
          statusLabelEn: statusLabels[newStatus]?.en || newStatus,
          statusLabelAr: statusLabels[newStatus]?.ar || newStatus,
          adminNotes: customNotes || ord.adminNotes,
          updatedAt: new Date().toISOString()
        };
      }
      return ord;
    }));
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  // ================= B2B WHOLESALE RFQS =================
  const submitRfq = (rfqData) => {
    const id = `RFQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newRfq = {
      id,
      buyerName: rfqData.buyerName,
      companyName: rfqData.companyName || 'Private Buyer',
      country: rfqData.country || 'International',
      email: rfqData.email,
      phone: rfqData.phone,
      brandId: rfqData.brandId || null,
      brandName: rfqData.brandName || 'General Egyptian Factories Inquiry',
      targetQuantity: rfqData.targetQuantity || '1 Container',
      targetPort: rfqData.targetPort || 'FOB Alexandria Port',
      notes: rfqData.notes || '',
      status: 'new_inquiry',
      statusLabel: 'New Inbound Inquiry',
      estimatedValueUsd: rfqData.estimatedValueUsd || 35000,
      createdAt: new Date().toISOString()
    };

    setRfqs(prev => [newRfq, ...prev]);
    return newRfq;
  };

  const updateRfqStatus = (rfqId, newStatus, quotationDetails = '') => {
    const labels = {
      new_inquiry: 'New Inbound Inquiry',
      quotation_sent: 'Quotation & FOB Terms Dispatched',
      sample_dispatched: 'Samples Dispatched via Courier',
      contract_signed: 'Contract Executed & Production Commenced',
      shipped: 'Shipped from Egyptian Port',
      cancelled: 'Closed / Inactive'
    };

    setRfqs(prev => prev.map(r => {
      if (r.id === rfqId) {
        return {
          ...r,
          status: newStatus,
          statusLabel: labels[newStatus] || newStatus,
          quotationDetails: quotationDetails || r.quotationDetails,
          updatedAt: new Date().toISOString()
        };
      }
      return r;
    }));
  };

  const deleteRfq = (rfqId) => {
    setRfqs(prev => prev.filter(r => r.id !== rfqId));
  };

  // ================= BRAND ONBOARDING APPLICATIONS =================
  const submitApplication = (appData) => {
    const id = `APP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp = {
      id,
      brandName: appData.brandName,
      category: appData.category || 'fashion',
      governorate: appData.governorate || 'cairo',
      governorateLabel: appData.governorateLabel || appData.governorate,
      websiteUrl: appData.websiteUrl || '',
      phone: appData.phone || '',
      isWholesale: appData.isWholesale ?? true,
      description: appData.description || '',
      commercialRegister: appData.commercialRegister || `CR-${Math.floor(10000 + Math.random() * 90000)}`,
      taxCard: appData.taxCard || `TX-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`,
      factoryLocation: appData.factoryLocation || `${appData.governorate}, Egypt`,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    setApplications(prev => [newApp, ...prev]);
    return newApp;
  };

  const approveApplication = (appId) => {
    const app = applications.find(a => a.id === appId);
    if (!app) return null;

    // Convert applicant directly into a verified Brand
    const createdBrand = addBrand({
      nameEn: app.brandName,
      nameAr: app.brandName,
      taglineEn: `Authentic Egyptian Manufacturing from ${app.governorate}`,
      taglineAr: `صناعة مصرية أصيلة موثقة بمحافظة ${app.governorate}`,
      category: app.category,
      governorate: app.governorate,
      locationEn: `${app.governorate.charAt(0).toUpperCase() + app.governorate.slice(1)}, Egypt`,
      locationAr: `${app.governorateLabel || app.governorate}، مصر`,
      descriptionEn: app.description,
      descriptionAr: app.description,
      isVerified: true,
      isWholesaleReady: app.isWholesale,
      moq: '50 units',
      fobPort: 'Alexandria Port',
      priceRangeEgp: '500 - 3,500 EGP',
      priceRangeUsd: '$15 - $110 USD',
      directUrl: app.websiteUrl || 'https://e7nalocal.com',
      whatsappNumber: app.phone || '+201000000000',
      instagramHandle: `@${app.brandName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      featuredProducts: [
        {
          nameEn: "Signature Artisan Product",
          nameAr: "منتج المصنع المميز",
          priceEgp: 950,
          priceUsd: 30,
          image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
        }
      ]
    });

    // Mark application as approved
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'approved', approvedBrandId: createdBrand.id } : a));

    return createdBrand;
  };

  const rejectApplication = (appId, reason = 'Did not meet current verified factory accreditation standards') => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'rejected', rejectionReason: reason } : a));
  };

  // ================= AI ALTERNATIVES MAPPING =================
  const addAlternative = (item) => {
    setAlternatives(prev => [item, ...prev]);
  };

  const deleteAlternative = (index) => {
    setAlternatives(prev => prev.filter((_, idx) => idx !== index));
  };

  // ================= PLATFORM SETTINGS =================
  const updatePlatformSettings = (newSettings) => {
    setPlatformSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetAllDataToDefaults = () => {
    setBrands(BRANDS);
    setOrders(SEED_ORDERS);
    setRfqs(SEED_RFQS);
    setApplications(SEED_APPLICATIONS);
    setAlternatives(ALTERNATIVES_MAPPING);
    setPlatformSettings(DEFAULT_SETTINGS);
    setOutletBaskets({});
    localStorage.removeItem(STORAGE_KEY_BRANDS);
    localStorage.removeItem(STORAGE_KEY_ORDERS);
    localStorage.removeItem(STORAGE_KEY_RFQS);
    localStorage.removeItem(STORAGE_KEY_APPLICATIONS);
    localStorage.removeItem(STORAGE_KEY_ALTERNATIVES);
    localStorage.removeItem(STORAGE_KEY_SETTINGS);
    localStorage.removeItem(STORAGE_KEY_BASKETS);
  };

  // ================= BASKET OPERATIONS =================
  const addToOutletBasket = (brand, product, quantity = 1) => {
    if (!brand || !product) return;
    const brandId = brand.id;

    setOutletBaskets((prev) => {
      const currentItems = prev[brandId] ? [...prev[brandId]] : [];
      const existingIdx = currentItems.findIndex((item) => item.nameEn === product.nameEn);

      if (existingIdx > -1) {
        currentItems[existingIdx] = {
          ...currentItems[existingIdx],
          quantity: currentItems[existingIdx].quantity + quantity
        };
      } else {
        currentItems.push({
          ...product,
          quantity: Math.max(1, quantity),
          outletBrandId: brand.id,
          outletBrandNameEn: brand.nameEn,
          outletBrandNameAr: brand.nameAr
        });
      }

      return {
        ...prev,
        [brandId]: currentItems
      };
    });
  };

  const updateOutletItemQuantity = (brandId, productNameEn, delta) => {
    setOutletBaskets((prev) => {
      const currentItems = prev[brandId] ? [...prev[brandId]] : [];
      const updated = currentItems
        .map((item) => {
          if (item.nameEn === productNameEn) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);

      return {
        ...prev,
        [brandId]: updated
      };
    });
  };

  const removeFromOutletBasket = (brandId, productNameEn) => {
    setOutletBaskets((prev) => {
      const currentItems = prev[brandId] || [];
      return {
        ...prev,
        [brandId]: currentItems.filter((i) => i.nameEn !== productNameEn)
      };
    });
  };

  const clearOutletBasket = (brandId) => {
    setOutletBaskets((prev) => {
      const next = { ...prev };
      delete next[brandId];
      return next;
    });
  };

  const totalBasketItemsCount = Object.values(outletBaskets).reduce((acc, items) => {
    return acc + (items ? items.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0);
  }, 0);

  const attemptPlaceOrder = (brand) => {
    setAuthCheckoutBrand(brand);
    setIsAuthCheckoutOpen(true);
  };

  const loginCustomer = (customerData) => {
    const updated = {
      isLoggedIn: true,
      name: customerData.name || 'عمر مصطفى',
      phone: customerData.phone || '+20 100 123 4567',
      email: customerData.email || 'customer@e7na.local',
      address: customerData.address || 'شارع التسعين، التجمع الخامس',
      governorate: customerData.governorate || 'القاهرة (Cairo)',
      loginTimestamp: new Date().toISOString()
    };
    setCustomer(updated);
    return updated;
  };

  const logoutCustomer = () => {
    setCustomer(null);
  };

  const confirmOutletOrder = (brand, customerInfo, paymentMethod = 'cod') => {
    const brandId = brand.id;
    const items = outletBaskets[brandId] || [];
    if (items.length === 0) return null;

    const activeCustomer = loginCustomer(customerInfo);

    const subtotalEgp = items.reduce((acc, it) => acc + (it.priceEgp * it.quantity), 0);
    const subtotalUsd = items.reduce((acc, it) => acc + (it.priceUsd * it.quantity), 0);
    const shippingFeeEgp = platformSettings.domesticShippingFee || 60;
    const totalEgp = subtotalEgp + shippingFeeEgp;

    const orderNumber = `E7NA-${brand.nameEn.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: orderNumber,
      brandId: brand.id,
      brandNameEn: brand.nameEn,
      brandNameAr: brand.nameAr,
      brandLocationEn: brand.locationEn,
      brandLocationAr: brand.locationAr,
      brandWhatsapp: brand.whatsappNumber,
      brandLogo: brand.logoImage,
      items: [...items],
      subtotalEgp,
      subtotalUsd,
      shippingFeeEgp,
      totalEgp,
      paymentMethod,
      customer: activeCustomer,
      createdAt: new Date().toISOString(),
      status: 'confirmed_by_outlet',
      statusLabelEn: 'Confirmed by Factory Outlet',
      statusLabelAr: 'تم تأكيد الطلب وتوجيهه لمصنع المعرض',
      trackingCode: `E7NA-EXP-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearOutletBasket(brandId);
    setLatestCompletedOrder(newOrder);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    return newOrder;
  };

  return (
    <MallContext.Provider
      value={{
        customer,
        adminUser,
        brands,
        orders,
        rfqs,
        applications,
        alternatives,
        platformSettings,
        outletBaskets,
        totalBasketItemsCount,
        activeOutletBasketBrand,
        setActiveOutletBasketBrand,
        isAuthCheckoutOpen,
        setIsAuthCheckoutOpen,
        authCheckoutBrand,
        setAuthCheckoutBrand,
        isAccountModalOpen,
        setIsAccountModalOpen,
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
        latestCompletedOrder,
        setLatestCompletedOrder,
        // Actions
        loginAdmin,
        logoutAdmin,
        addBrand,
        updateBrand,
        deleteBrand,
        toggleBrandVerification,
        toggleBrandWholesale,
        updateOrderStatus,
        deleteOrder,
        submitRfq,
        updateRfqStatus,
        deleteRfq,
        submitApplication,
        approveApplication,
        rejectApplication,
        addAlternative,
        deleteAlternative,
        updatePlatformSettings,
        resetAllDataToDefaults,
        addToOutletBasket,
        updateOutletItemQuantity,
        removeFromOutletBasket,
        clearOutletBasket,
        attemptPlaceOrder,
        loginCustomer,
        logoutCustomer,
        confirmOutletOrder
      }}
    >
      {children}
    </MallContext.Provider>
  );
}

export function useMall() {
  const context = useContext(MallContext);
  if (!context) {
    throw new Error('useMall must be used within a MallProvider');
  }
  return context;
}
