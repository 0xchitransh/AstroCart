'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import type { Category, Product } from '@/data/products';

export type CartItem = Product & {
  size: string;
  cartId: string;
};

export type OverlayType =
  | 'cart'
  | 'config'
  | 'checkout'
  | 'quickview'
  | 'search'
  | 'menu'
  | 'policy';

type OverlayState = { type: OverlayType; product?: Product; section?: string } | null;

/** 'all', 'saved', or a stone slug (e.g. 'ruby', 'plain-band') */
export type CollectionFilter = string;
export type CategoryFilter = 'all' | Category;

type StoreValue = {
  cart: CartItem[];
  cartTotal: number;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;

  overlay: OverlayState;
  openOverlay: (type: OverlayType, extra?: { product?: Product; section?: string }) => void;
  closeOverlay: () => void;

  wishlist: string[];
  toggleWishlist: (product: Product) => void;

  filter: CollectionFilter;
  setFilter: (filter: CollectionFilter) => void;
  category: CategoryFilter;
  setCategory: (category: CategoryFilter) => void;
  /** Applies collection filters and scrolls to the product grid. */
  showCollection: (filter?: CollectionFilter, category?: CategoryFilter) => void;

  toast: string | null;
  showToast: (message: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

/* Wishlist persistence: a tiny external store backed by localStorage. */
const WISHLIST_KEY = 'astrocart:wishlist';
const EMPTY_WISHLIST: string[] = [];
const wishlistListeners = new Set<() => void>();
let wishlistRaw: string | null = null;
let wishlistCache: string[] = EMPTY_WISHLIST;

function readWishlist(): string[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(WISHLIST_KEY);
  } catch {
    return wishlistCache;
  }
  if (raw === wishlistRaw) return wishlistCache;
  wishlistRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    wishlistCache = Array.isArray(parsed)
      ? parsed.filter((v): v is string => typeof v === 'string')
      : EMPTY_WISHLIST;
  } catch {
    wishlistCache = EMPTY_WISHLIST;
  }
  return wishlistCache;
}

function writeWishlist(next: string[]) {
  try {
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: keep the in-memory value for this session */
    wishlistRaw = JSON.stringify(next);
    wishlistCache = next;
  }
  wishlistListeners.forEach((l) => l());
}

function subscribeWishlist(cb: () => void) {
  wishlistListeners.add(cb);
  window.addEventListener('storage', cb);
  return () => {
    wishlistListeners.delete(cb);
    window.removeEventListener('storage', cb);
  };
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [overlay, setOverlay] = useState<OverlayState>(null);
  // Server snapshot is empty, so hydration always matches; the saved list appears right after.
  const wishlist = useSyncExternalStore(subscribeWishlist, readWishlist, () => EMPTY_WISHLIST);
  const [filter, setFilter] = useState<CollectionFilter>('all');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cartSeq = useRef(0);

  // Lock page scroll while any overlay is open.
  useEffect(() => {
    document.body.style.overflow = overlay ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [overlay]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  const addToCart = useCallback((product: Product, size: string) => {
    cartSeq.current += 1;
    const cartId = `${Date.now()}-${cartSeq.current}`;
    setCart((prev) => [...prev, { ...product, size, cartId }]);
    setOverlay({ type: 'cart' });
  }, []);

  const removeFromCart = useCallback((cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const openOverlay = useCallback<StoreValue['openOverlay']>((type, extra) => {
    setOverlay({ type, ...extra });
  }, []);

  const closeOverlay = useCallback(() => setOverlay(null), []);

  const toggleWishlist = useCallback(
    (product: Product) => {
      const current = readWishlist();
      const saved = current.includes(product.id);
      writeWishlist(saved ? current.filter((id) => id !== product.id) : [...current, product.id]);
      showToast(saved ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`);
    },
    [showToast],
  );

  const showCollection = useCallback((next: CollectionFilter = 'all', nextCategory: CategoryFilter = 'all') => {
    setFilter(next);
    setCategory(nextCategory);
    setOverlay(null);
    // Wait a frame so the overlay releases the body scroll lock first.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId('collection')));
  }, []);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);

  const value = useMemo<StoreValue>(
    () => ({
      cart,
      cartTotal,
      addToCart,
      removeFromCart,
      clearCart,
      overlay,
      openOverlay,
      closeOverlay,
      wishlist,
      toggleWishlist,
      filter,
      setFilter,
      category,
      setCategory,
      showCollection,
      toast,
      showToast,
    }),
    [
      cart,
      cartTotal,
      addToCart,
      removeFromCart,
      clearCart,
      overlay,
      openOverlay,
      closeOverlay,
      wishlist,
      toggleWishlist,
      filter,
      category,
      showCollection,
      toast,
      showToast,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
