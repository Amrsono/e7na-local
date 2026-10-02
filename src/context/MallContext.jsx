import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const MallContext = createContext(null);

const STORAGE_KEY_AUTH = 'e7na_mall_customer';
const STORAGE_KEY_ORDERS = 'e7na_mall_orders';
const STORAGE_KEY_BASKETS = 'e7na_mall_baskets';

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

  // Past Orders per Outlet
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Baskets keyed by brandId: { [brandId]: [ { nameEn, nameAr, priceEgp, priceUsd, image, quantity } ] }
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
  const [latestCompletedOrder, setLatestCompletedOrder] = useState(null);

  // Sync to localStorage
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
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BASKETS, JSON.stringify(outletBaskets));
    } catch (e) {
      console.error('Error saving baskets:', e);
    }
  }, [outletBaskets]);

  // Add Product to Outlet Basket
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

  // Update item quantity in an outlet basket
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

  // Remove item from outlet basket
  const removeFromOutletBasket = (brandId, productNameEn) => {
    setOutletBaskets((prev) => {
      const currentItems = prev[brandId] || [];
      return {
        ...prev,
        [brandId]: currentItems.filter((i) => i.nameEn !== productNameEn)
      };
    });
  };

  // Clear specific outlet's basket
  const clearOutletBasket = (brandId) => {
    setOutletBaskets((prev) => {
      const next = { ...prev };
      delete next[brandId];
      return next;
    });
  };

  // Calculate total items across all outlet baskets
  const totalBasketItemsCount = Object.values(outletBaskets).reduce((acc, items) => {
    return acc + (items ? items.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0);
  }, 0);

  // Trigger Checkout Attempt from Outlet Basket
  // NOTE: This implements the key requirement:
  // "no login is required until customer enters a specific outlet and add to basket and attempt to place an order"
  const attemptPlaceOrder = (brand) => {
    setAuthCheckoutBrand(brand);
    setIsAuthCheckoutOpen(true);
  };

  // Authenticate / Login Customer (can be triggered at checkout or directly)
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

  // Log Out Customer (reverts back to open Mall Guest Mode)
  const logoutCustomer = () => {
    setCustomer(null);
  };

  // Complete and confirm the order with the specific brand outlet
  const confirmOutletOrder = (brand, customerInfo, paymentMethod = 'cod') => {
    const brandId = brand.id;
    const items = outletBaskets[brandId] || [];
    if (items.length === 0) return null;

    // Ensure customer is saved/logged in
    const activeCustomer = loginCustomer(customerInfo);

    const subtotalEgp = items.reduce((acc, it) => acc + (it.priceEgp * it.quantity), 0);
    const subtotalUsd = items.reduce((acc, it) => acc + (it.priceUsd * it.quantity), 0);
    const shippingFeeEgp = 60; // Standard domestic courier dispatch
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
      status: 'confirmed_by_outlet', // 'confirmed_by_outlet' | 'preparing' | 'shipped'
      statusLabelEn: 'Confirmed by Factory Outlet',
      statusLabelAr: 'تم تأكيد الطلب وتوجيهه لمصنع المعرض'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearOutletBasket(brandId);
    setLatestCompletedOrder(newOrder);

    // Trigger confetti
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
        orders,
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
        latestCompletedOrder,
        setLatestCompletedOrder,
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
