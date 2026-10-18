import React, { useState, useEffect } from 'react';
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  Heart,
  Star,
  CheckCircle,
  MessageCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react';

// ==========================================
// TYPESCRIPT INTERFACES
// ==========================================

export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'packs' | 'food' | 'snacks' | 'hygiene' | 'cans';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  tag?: string;
  imageBg: string;
  badgeColor: string;
  description: string;
  dogImage?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  author: string;
  petName: string;
  petBreed: string;
  comment: string;
  rating: number;
  avatarBg: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  bgGradient: string;
}

// ==========================================
// MOCK DATA
// ==========================================

const NAV_ITEMS: NavItem[] = [
  { id: '1', label: 'PACKS', href: '#packs', badge: 'POPULAR' },
  { id: '2', label: 'Tienda', href: '#tienda' },
  { id: '3', label: 'Planes Personalizados', href: '#planes' },
  { id: '4', label: 'Sobre Nosotros', href: '#nosotros' },
  { id: '5', label: 'Puntos de Venta', href: '#puntos' }
];

const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Pack Super Canino Bark',
    category: 'packs',
    price: 129.90,
    originalPrice: 155.00,
    rating: 4.9,
    reviewsCount: 142,
    tag: 'MÁS VENDIDO',
    imageBg: 'bg-teal-100',
    badgeColor: 'bg-rose-500 text-white',
    description: 'Incluye 2 kg de alimento BARF Res, 1 Snack Larga Duración y 1 Toallita Húmeda.',
    dogImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-2',
    name: 'Alimento Natural Res 900g',
    category: 'food',
    price: 45.00,
    rating: 4.8,
    reviewsCount: 89,
    tag: '100% NATURAL',
    imageBg: 'bg-emerald-100',
    badgeColor: 'bg-emerald-700 text-white',
    description: 'Carne fresca seleccionada con suplementos y vitaminas naturales.',
    dogImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-3',
    name: 'Alimento Pollo Completo 900g',
    category: 'food',
    price: 42.00,
    rating: 4.9,
    reviewsCount: 112,
    imageBg: 'bg-teal-50',
    badgeColor: 'bg-slate-900 text-white',
    description: 'Formulado con pechuga de pollo y vegetales ricos en fibra.',
    dogImage: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-4',
    name: 'Snacks Long Lasting Pollo',
    category: 'snacks',
    price: 24.90,
    originalPrice: 29.90,
    rating: 4.7,
    reviewsCount: 64,
    tag: 'PROMO',
    imageBg: 'bg-emerald-200',
    badgeColor: 'bg-rose-500 text-white',
    description: 'Premios entretenidos de masticación prolongada para salud dental.',
    dogImage: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-5',
    name: 'Toallitas Húmedas Natural Home',
    category: 'hygiene',
    price: 18.50,
    rating: 4.9,
    reviewsCount: 203,
    imageBg: 'bg-sky-100',
    badgeColor: 'bg-sky-700 text-white',
    description: 'Hipoalergénicas con aloe vera para patitas y pelaje suave.',
    dogImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'prod-6',
    name: 'Lata Húmeda Salmón Vital 400g',
    category: 'cans',
    price: 19.90,
    rating: 4.8,
    reviewsCount: 78,
    tag: 'OMEGA 3',
    imageBg: 'bg-amber-100',
    badgeColor: 'bg-amber-800 text-white',
    description: 'Salmón fresco ideal para piel sensible y pelaje brillante.',
    dogImage: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&q=80&w=400'
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Camila Rossi',
    petName: 'Bruno',
    petBreed: 'Golden Retriever',
    comment: 'Cambiamos a los packs de comida natural y el pelaje de Bruno brilla muchísimo más. ¡Le encanta!',
    rating: 5,
    avatarBg: 'bg-teal-500'
  },
  {
    id: 't2',
    author: 'Renzo Mendoza',
    petName: 'Samba',
    petBreed: 'French Bulldog',
    comment: 'Sus problemas digestivos desaparecieron por completo. El servicio de entrega es rapidísimo.',
    rating: 5,
    avatarBg: 'bg-rose-500'
  },
  {
    id: 't3',
    author: 'Valeria Thorne',
    petName: 'Milo & Coco',
    petBreed: 'Mestizos',
    comment: 'Los snacks de larga duración los mantienen entretenidos por horas. ¡Super recomendado!',
    rating: 5,
    avatarBg: 'bg-emerald-600'
  }
];

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {
  // State management
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Total item count in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Cart total price calculation
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 79.9;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);
  const hasFreeShipping = cartSubtotal >= freeShippingThreshold;

  // Notification Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart handlers
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((i) => i.product.id === product.id);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    showToast(`¡${product.name} agregado al carrito!`);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Filter products by category & search query
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Hero auto slider effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-rose-500 selection:text-white relative overflow-x-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-emerald-400/30 animate-bounce">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ==========================================
          1. TOP ANNOUNCEMENT BAR
      ========================================== */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-slate-800">
        <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          ENVÍO GRATIS A PARTIR DE S/ 79.90.{' '}
          <a
            href="#tienda"
            className="underline font-bold text-emerald-400 hover:text-emerald-300 transition-colors ml-1"
          >
            DESCUBRE MÁS AQUÍ
          </a>
        </span>
      </div>

      {/* ==========================================
          2. STICKY HEADER / NAVBAR
      ========================================== */}
      <header className="sticky top-0 z-40 bg-teal-400/95 backdrop-blur-md shadow-sm border-b border-teal-500/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-1 group">
            <span className="font-black text-3xl md:text-4xl text-slate-900 tracking-tighter transition-transform group-hover:scale-105">
              BARKER
            </span>
            <span className="text-xs font-bold text-slate-900 self-start mt-1">®</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="font-bold text-sm tracking-wide text-slate-900 hover:text-slate-700 relative py-1 transition-colors group"
              >
                {item.label}
                {item.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-extrabold bg-rose-500 text-white rounded-full uppercase">
                    {item.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full text-slate-900 hover:bg-teal-500/30 transition-colors focus:outline-none"
              aria-label="Buscar productos"
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Account Icon */}
            <button
              className="p-2.5 rounded-full text-slate-900 hover:bg-teal-500/30 transition-colors hidden sm:flex focus:outline-none"
              aria-label="Mi Cuenta"
              onClick={() => showToast('Inicia sesión para gestionar tus pedidos')}
            >
              <User className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full text-slate-900 hover:bg-teal-500/30 transition-colors relative focus:outline-none group"
              aria-label="Ver Carrito"
            >
              <ShoppingBag className="w-6 h-6 stroke-[2.5] group-hover:scale-110 transition-transform" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-teal-400 shadow-md animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full text-slate-900 hover:bg-teal-500/30 md:hidden focus:outline-none"
              aria-label="Abrir Menú"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[2.5]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-teal-400 border-t border-teal-500/30 px-6 py-6 space-y-4 animate-fadeIn">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block font-black text-lg text-slate-900 hover:text-slate-700 py-2 border-b border-teal-500/20"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 flex items-center justify-between text-slate-900 font-bold">
              <span>Atención al Cliente</span>
              <a
                href="https://wa.me/#"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-black"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ==========================================
          3. HERO BANNER SECTION
      ========================================== */}
      <section className="relative bg-emerald-400 overflow-hidden min-h-[620px] flex items-center py-12 md:py-20 border-b border-emerald-500/30">
        
        {/* Background Decorative Accent Shapes (+ Graphics & Waves) */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-10 left-12 text-slate-900 text-6xl font-light">
            +
          </div>
          <div className="absolute top-1/2 left-1/3 text-slate-900 text-5xl font-light">
            +
          </div>
          <div className="absolute bottom-16 left-1/4 text-slate-900 text-7xl font-light">
            +
          </div>
          <div className="absolute top-20 right-20 text-slate-900 text-6xl font-light">
            +
          </div>
          <div className="absolute bottom-10 right-1/3 text-slate-900 text-4xl font-light">
            +
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: Visual Product Showcase & Foreground Basket */}
            <div className="lg:col-span-7 relative order-2 lg:order-1 flex justify-center items-center">
              
              {/* Product Layout Wrapper */}
              <div className="relative w-full max-w-lg aspect-square sm:aspect-[4/3] flex items-center justify-center">
                
                {/* Background Soft Glow */}
                <div className="absolute inset-0 bg-emerald-300/60 rounded-full blur-3xl scale-95" />

                {/* Floating Product Cards Simulation */}
                
                {/* Main Package - BARF Res */}
                <div className="absolute top-2 left-2 sm:left-6 w-44 sm:w-56 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl rotate-[-6deg] hover:rotate-0 transition-transform duration-500 z-10 border border-emerald-300/30">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black bg-rose-500 px-2 py-0.5 rounded text-white uppercase">
                      CARNE DE RES
                    </span>
                    <span className="text-xs font-bold text-emerald-400">900g</span>
                  </div>
                  <div className="font-black text-xl tracking-tight mb-2 text-teal-300">
                    BARKER
                  </div>
                  <div className="text-[11px] text-slate-300 mb-3">
                    ALIMENTO COMPLETO BARF
                  </div>
                  <div className="w-full h-24 rounded-lg overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400"
                      alt="Dog happy"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Secondary Package - Pollo Completo */}
                <div className="absolute top-20 left-24 sm:left-40 w-40 sm:w-52 bg-teal-100 text-slate-900 rounded-2xl p-4 shadow-2xl rotate-[8deg] hover:rotate-0 transition-transform duration-500 z-20 border-2 border-slate-900">
                  <div className="text-[10px] font-black bg-slate-900 text-white px-2 py-0.5 rounded inline-block mb-1">
                    POLLO
                  </div>
                  <div className="font-black text-lg tracking-tight text-slate-900">
                    BARKER
                  </div>
                  <div className="text-[10px] text-slate-700 font-bold mb-2">
                    NATURAL HOME
                  </div>
                  <div className="w-full h-20 rounded-md overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=300"
                      alt="Dog 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Snack Container */}
                <div className="absolute top-6 right-2 sm:right-6 w-28 sm:w-36 bg-amber-200 text-slate-900 rounded-xl p-3 shadow-xl rotate-[-12deg] z-10 border border-slate-800">
                  <div className="text-[9px] font-black uppercase text-amber-900">
                    LONG LASTING
                  </div>
                  <div className="font-black text-sm text-slate-900">SNACKS</div>
                  <div className="text-[10px] font-bold text-amber-800">100% Vacuno</div>
                </div>

                {/* Cans & Wipes */}
                <div className="absolute bottom-16 right-8 sm:right-16 w-32 bg-sky-200 text-slate-900 rounded-lg p-3 shadow-lg rotate-[15deg] z-20 border border-slate-900">
                  <div className="font-black text-xs">NATURAL HOME</div>
                  <div className="text-[9px] font-semibold text-slate-700">Toallas Húmedas</div>
                </div>

                {/* Shopping Basket Foreground Icon Overlay */}
                <div className="absolute -bottom-6 -left-4 sm:left-0 z-30 bg-slate-900 text-white p-5 rounded-3xl shadow-2xl border-4 border-emerald-400 flex items-center gap-4 animate-pulse">
                  <ShoppingBag className="w-10 h-10 text-emerald-400 stroke-[2.5]" />
                  <div>
                    <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Lleva tu Pack
                    </p>
                    <p className="text-base font-black text-white">
                      Ahorra hasta un 20%
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: Brand Headline and Primary CTA */}
            <div className="lg:col-span-5 order-1 lg:order-2 text-center lg:text-left space-y-6">
              
              {/* Secondary Brand Title */}
              <div className="inline-flex items-center gap-2 bg-slate-900/10 px-4 py-1.5 rounded-full text-slate-900 font-extrabold text-xs tracking-widest uppercase">
                <Sparkles className="w-4 h-4 text-slate-900" />
                Alimentación Natural Premium
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Packs pensados para <span className="underline decoration-rose-500 decoration-wavy decoration-2">consentirlos</span> mejor
              </h1>

              <p className="text-slate-800 font-medium text-base sm:text-lg max-w-lg mx-auto lg:mx-0">
                Nutrición 100% fresca, balanceada y deliciosa. Diseñada por veterinarios para darles más años de vida y felicidad.
              </p>

              {/* Primary Call to Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#best-sellers"
                  className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white font-black text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all duration-300 uppercase tracking-wider text-center flex items-center justify-center gap-3 border-2 border-rose-400/50"
                >
                  ¡DESCÚBRELOS AQUÍ!
                  <ChevronRight className="w-6 h-6 stroke-[3]" />
                </a>
              </div>

              {/* Features List */}
              <div className="pt-4 grid grid-cols-3 gap-2 text-left border-t border-slate-900/10">
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-slate-900 shrink-0" />
                  <span>Sin preservantes</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                  <CheckCircle className="w-4 h-4 text-slate-900 shrink-0" />
                  <span>Formula BARF</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                  <Truck className="w-4 h-4 text-slate-900 shrink-0" />
                  <span>Delivery express</span>
                </div>
              </div>

              {/* Carousel Dot Indicators */}
              <div className="flex items-center justify-center lg:justify-start gap-2 pt-2">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeSlide === idx
                        ? 'w-8 bg-slate-900'
                        : 'w-2 bg-slate-900/30 hover:bg-slate-900/50'
                    }`}
                    aria-label={`Ir al banner ${idx + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          4. CATEGORY QUICK SELECTOR BAR
      ========================================== */}
      <section className="bg-slate-900 py-6 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-rose-500 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Todos los productos
            </button>
            <button
              onClick={() => setSelectedCategory('packs')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'packs'
                  ? 'bg-rose-500 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Packs Promocionales
            </button>
            <button
              onClick={() => setSelectedCategory('food')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'food'
                  ? 'bg-rose-500 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Alimento BARF
            </button>
            <button
              onClick={() => setSelectedCategory('snacks')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'snacks'
                  ? 'bg-rose-500 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Snacks y Premios
            </button>
            <button
              onClick={() => setSelectedCategory('hygiene')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'hygiene'
                  ? 'bg-rose-500 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Higiene Natural
            </button>
            <button
              onClick={() => setSelectedCategory('cans')}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'cans'
                  ? 'bg-rose-500 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Comida Enlatada
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. BEST SELLERS PRODUCT GRID SECTION
      ========================================== */}
      <section id="best-sellers" className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full">
              Favoritos de la comunidad
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mt-3">
              Nuestros Best Sellers
            </h2>
            <div className="w-20 h-1.5 bg-emerald-400 mx-auto mt-4 rounded-full" />
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500 font-bold text-lg">
                No se encontraron productos en esta categoría.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-black uppercase hover:bg-slate-800 transition-colors"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group relative"
                >
                  {/* Badge */}
                  {product.tag && (
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className={`text-[10px] font-black px-3 py-1 rounded-full shadow-sm tracking-wider uppercase ${product.badgeColor}`}
                      >
                        {product.tag}
                      </span>
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={() => showToast(`Guardado ${product.name} en favoritos`)}
                    className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-slate-700 hover:text-rose-500 hover:bg-white transition-colors"
                    aria-label="Agregar a favoritos"
                  >
                    <Heart className="w-5 h-5 stroke-[2]" />
                  </button>

                  {/* Product Visual Container */}
                  <div
                    className={`relative w-full h-64 ${product.imageBg} p-6 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500`}
                  >
                    {/* Dog Background Thumbnail */}
                    {product.dogImage && (
                      <img
                        src={product.dogImage}
                        alt={product.name}
                        className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                    
                    {/* Overlay Label Mockup */}
                    <div className="absolute inset-x-4 bottom-4 bg-slate-900/85 backdrop-blur-md text-white p-3 rounded-2xl border border-white/20 text-center">
                      <p className="font-black text-sm tracking-wide text-emerald-400 uppercase">
                        {product.name}
                      </p>
                      <p className="text-[10px] text-slate-300">
                        Fórmula 100% Fresca & Nutritiva
                      </p>
                    </div>
                  </div>

                  {/* Product Info & Action */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-amber-400 stroke-none"
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-slate-700 ml-1">
                          {product.rating} ({product.reviewsCount})
                        </span>
                      </div>

                      <h3 className="font-black text-lg text-slate-900 leading-snug group-hover:text-emerald-600 transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-slate-600 text-xs mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Add to Cart Button */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-slate-900">
                            S/ {product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs font-bold text-slate-400 line-through">
                              S/ {product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-600">
                          Stock Disponible
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="bg-slate-900 hover:bg-emerald-500 text-white font-black px-4 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-emerald-500/20 active:scale-95 text-xs uppercase"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View All Store Banner */}
          <div className="mt-16 bg-emerald-100 rounded-3xl p-8 sm:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-emerald-300/60 shadow-lg">
            <div className="space-y-2">
              <span className="text-xs font-black bg-emerald-700 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                Nutrición Personalizada
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                ¿No sabes qué alimento elegir para tu peludo?
              </h3>
              <p className="text-slate-700 text-sm max-w-xl font-medium">
                Responde nuestro test interactivo de 2 minutos y te recomendaremos el plan perfecto según su edad, peso y actividad física.
              </p>
            </div>
            <a
              href="#planes"
              className="bg-slate-900 hover:bg-slate-800 text-white font-black px-8 py-4 rounded-full text-sm uppercase tracking-wider shrink-0 transition-all shadow-xl hover:scale-105"
            >
              CREAR PLAN PERSONALIZADO
            </a>
          </div>

        </div>
      </section>

      {/* ==========================================
          6. TESTIMONIALS SECTION
      ========================================== */}
      <section className="bg-slate-900 py-16 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">
              Comunidad BARKER
            </span>
            <h2 className="text-3xl font-black tracking-tight mt-2 text-white">
              Lo que dicen sus humanos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm italic mb-6">"{t.comment}"</p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-700/60">
                  <div className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center font-black text-white text-sm`}>
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">{t.author}</p>
                    <p className="text-xs text-emerald-400 font-medium">
                      Humano de <span className="font-bold">{t.petName}</span> ({t.petBreed})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          7. FOOTER SECTION
      ========================================== */}
      <footer className="bg-slate-950 text-slate-400 text-sm pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
            
            {/* Brand Col */}
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-1">
                <span className="font-black text-3xl text-white tracking-tighter">
                  BARKER
                </span>
                <span className="text-xs font-bold text-emerald-400">®</span>
              </a>
              <p className="text-xs text-slate-400 leading-relaxed">
                Alimentación biológicamente apropiada para perros y gatos. Ingredientes 100% naturales, frescos y sin químicos añadidos.
              </p>
            </div>

            {/* Links 1 */}
            <div>
              <h4 className="font-black text-white uppercase text-xs tracking-wider mb-4">
                Navegación
              </h4>
              <ul className="space-y-2 text-xs font-medium">
                <li><a href="#packs" className="hover:text-emerald-400 transition-colors">Packs Especiales</a></li>
                <li><a href="#tienda" className="hover:text-emerald-400 transition-colors">Tienda Completa</a></li>
                <li><a href="#planes" className="hover:text-emerald-400 transition-colors">Planes Mensuales</a></li>
                <li><a href="#puntos" className="hover:text-emerald-400 transition-colors">Puntos de Venta</a></li>
              </ul>
            </div>

            {/* Links 2 */}
            <div>
              <h4 className="font-black text-white uppercase text-xs tracking-wider mb-4">
                Atención al Cliente
              </h4>
              <ul className="space-y-2 text-xs font-medium">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Preguntas Frecuentes</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Políticas de Envío</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Libro de Reclamaciones</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-black text-white uppercase text-xs tracking-wider mb-4">
                Únete al Club Barker
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                Recibe 10% de descuento en tu primera compra y consejos de salud canina.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); showToast('¡Suscrito con éxito!'); }} className="space-y-2">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs py-2.5 rounded-xl uppercase tracking-wider transition-colors"
                >
                  Suscribirme
                </button>
              </form>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} BARKER Peru. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <span>Arequipa - Lima - Cusco</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ==========================================
          8. FLOATING SUPPORT WIDGET (WHATSAPP)
      ========================================== */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Help Tooltip */}
        <div className="hidden sm:flex bg-white text-slate-900 text-xs font-black px-4 py-2 rounded-2xl shadow-xl border border-slate-100 items-center gap-2 animate-pulse">
          <span>¿Necesitas ayuda con tu pedido? 👋</span>
        </div>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/#"
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-7 h-7 stroke-[2.5]" />
        </a>
      </div>

      {/* ==========================================
          9. SHOPPING CART DRAWER (SIDE MODAL)
      ========================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slideLeft">
            
            {/* Drawer Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-emerald-400" />
                <h3 className="font-black text-lg uppercase tracking-wider">
                  Tu Carrito ({cartItemCount})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-emerald-50 p-4 border-b border-emerald-100">
              {hasFreeShipping ? (
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>¡Felicidades! Tienes envío GRATIS garantizado.</span>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-bold text-slate-700 mb-1">
                    Te faltan <span className="text-rose-500 font-black">S/ {freeShippingRemaining.toFixed(2)}</span> para envío GRATIS
                  </p>
                  <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-slate-400 space-y-4">
                  <ShoppingBag className="w-16 h-16 mx-auto stroke-1 text-slate-300" />
                  <p className="font-bold text-slate-600">Tu carrito está vacío</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-rose-500 text-white font-black px-6 py-3 rounded-full text-xs uppercase tracking-wider hover:bg-rose-600 transition-colors"
                  >
                    Ir a la tienda
                  </button>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 items-center"
                  >
                    <div className={`w-16 h-16 rounded-xl ${product.imageBg} flex items-center justify-center shrink-0 overflow-hidden`}>
                      {product.dogImage && (
                        <img
                          src={product.dogImage}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-sm text-slate-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        S/ {product.price.toFixed(2)} c/u
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black text-slate-900 px-1">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-black text-sm text-slate-900">
                        S/ {(product.price * quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 mt-1"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>S/ {cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Envío</span>
                    <span>{hasFreeShipping ? 'GRATIS' : 'S/ 10.00'}</span>
                  </div>
                  <div className="flex justify-between font-black text-lg text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total</span>
                    <span className="text-rose-600">
                      S/ {(cartSubtotal + (hasFreeShipping ? 0 : 10)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    alert('¡Gracias por tu compra! Procesando pedido de demostración.');
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-sm py-4 rounded-full shadow-lg uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  FINALIZAR COMPRA
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ==========================================
          10. SEARCH OVERLAY MODAL
      ========================================== */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl relative">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-black text-xl text-slate-900 mb-4 uppercase">
              Buscar en BARKER
            </h3>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busca comida BARF, snacks, toallitas..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-100 rounded-2xl text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                autoFocus
              />
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2">
              {PRODUCTS.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    addToCart(p);
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${p.imageBg} flex items-center justify-center font-black text-xs text-slate-700`}>
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-sm text-slate-900">{p.name}</p>
                      <p className="text-xs text-slate-500">S/ {p.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-rose-500 hover:underline">
                    + Agregar
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}