import React, { useState } from 'react';
import { 
  Search, 
  User, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  Heart, 
  Star, 
  MessageCircle, 
  Check, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Plus, 
  ArrowRight,
  Calculator,
  PawPrint,
  Flame,
  Award,
  Clock,
  Sparkle
} from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
  badgeBg: string;
  flavorTag: string;
  portionSize: string;
  proteinType: 'pollo' | 'pavo' | 'cordero' | 'pescado';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CalculatorState {
  dogName: string;
  weight: number;
  ageYears: number;
  activityLevel: 'low' | 'medium' | 'high';
}

const BEST_SELLERS: Product[] = [
  {
    id: 1,
    name: 'Receta Pavo & Verduras Frescas',
    category: 'Comida Natural Cocida',
    price: 'S/ 89.90',
    originalPrice: 'S/ 105.00',
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400',
    badge: 'MÁS VENDIDO',
    badgeBg: 'bg-[#EC2CC2]', // Rosa Fucsia
    flavorTag: 'Pavo Magro & Camote',
    portionSize: 'Packs de 300g',
    proteinType: 'pavo'
  },
  {
    id: 2,
    name: 'Receta Pollo & Arroz Integral',
    category: 'Nutrición Diaria',
    price: 'S/ 79.90',
    originalPrice: 'S/ 92.00',
    rating: 4.8,
    reviews: 118,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400',
    badge: 'FÓRMULA CLÁSICA',
    badgeBg: 'bg-[#FE4811]', // Naranja Fuego
    flavorTag: 'Pollo de Corral & Zanahoria',
    portionSize: 'Packs de 300g / 180g',
    proteinType: 'pollo'
  },
  {
    id: 3,
    name: 'Receta Cordero & Cerdo Gourmet',
    category: 'Proteína Especial',
    price: 'S/ 94.90',
    originalPrice: 'S/ 110.00',
    rating: 5.0,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400',
    badge: 'HIPOALERGÉNICO',
    badgeBg: 'bg-[#8247AF]', // Violeta
    flavorTag: 'Cordero & Espinacas',
    portionSize: 'Packs de 300g',
    proteinType: 'cordero'
  },
  {
    id: 4,
    name: 'Mix Pescado de Isla & Pollo',
    category: 'Piel & Pelaje Brillante',
    price: 'S/ 84.90',
    originalPrice: 'S/ 98.00',
    rating: 4.9,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400',
    badge: 'RICOS EN OMEGA 3',
    badgeBg: 'bg-[#4450FD]', // Azul Eléctrico
    flavorTag: 'Pescado & Zapallo Macre',
    portionSize: 'Packs de 180g',
    proteinType: 'pescado'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(3);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  // Calculator State
  const [dogWeight, setDogWeight] = useState<number>(12);
  const [activity, setActivity] = useState<'low' | 'medium' | 'high'>('medium');
  const [calcResult, setCalcResult] = useState<number>(360); // grams per day

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let factor = 0.025; // 2.5% of body weight for medium activity
    if (activity === 'low') factor = 0.02;
    if (activity === 'high') factor = 0.035;

    const grams = Math.round(dogWeight * 1000 * factor);
    setCalcResult(grams);
  };

  const addToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-[#FE4811] selection:text-white">
      
      {/* Injecting Fonts dynamically for Fredoka/Outfit and Montserrat */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700;900&family=Montserrat:wght@400;600;700;900&display=swap');
        
        .font-brand {
          font-family: 'Fredoka', cursive, sans-serif;
        }
        .font-sans {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>

      {}
      <div className="bg-[#266433] text-white text-xs py-2.5 px-4 text-center font-bold tracking-wider flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-4 h-4 text-[#CFD1FC] animate-pulse" />
        <span>
          NUTRICIÓN DE VERDAD • ENVÍO GRATIS A PARTIR DE S/ 79.90 EN LIMA METROPOLITANA. CONOCE MÁS{' '}
          <a href="#planes" className="underline font-black text-[#CFD1FC] hover:text-white transition-colors">
            AQUÍ
          </a>
        </span>
      </div>

      {}
      <nav className="sticky top-0 z-50 bg-[#CFD1FC]/95 backdrop-blur-md border-b border-[#266433]/15 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo PATITA VERDE */}
            <div className="flex items-center gap-8">
              <a href="#" className="flex items-center gap-2 group">
                <div className="bg-[#266433] p-2 rounded-2xl group-hover:rotate-6 transition-transform shadow-md">
                  <PawPrint className="w-7 h-7 text-[#CFD1FC] fill-[#CFD1FC]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-brand font-black text-2xl md:text-3xl text-[#266433] leading-none tracking-tight">
                    PATITA VERDE
                  </span>
                  <span className="text-[10px] font-black text-[#FE4811] tracking-widest uppercase">
                    Nutrición Real • Amor Canino
                  </span>
                </div>
              </a>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-6">
                {['PACKS', 'Tienda', 'Planes Personalizados', 'Nutricionistas', 'Puntos de Venta'].map((item, idx) => (
                  <a
                    key={idx}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`text-sm font-bold transition-all duration-200 ${
                      item === 'PACKS' 
                        ? 'text-white bg-[#FE4811] hover:bg-[#FE4811]/90 px-4 py-1.5 rounded-full font-black shadow-sm hover:scale-105' 
                        : 'text-[#266433] hover:text-[#4450FD]'
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setSearchOpen(!searchOpen)} 
                aria-label="Buscar productos"
                className="p-2.5 text-[#266433] hover:bg-white/60 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <a 
                href="#cuenta" 
                aria-label="Mi Cuenta"
                className="p-2.5 text-[#266433] hover:bg-white/60 rounded-full transition-colors"
              >
                <User className="w-5 h-5" />
              </a>

              <button 
                aria-label="Carrito de compras"
                className="relative p-3 bg-[#266433] text-white rounded-full hover:bg-[#1f5028] transition-all shadow-md hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5 text-[#CFD1FC]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FE4811] text-white font-black rounded-full text-[11px] w-5 h-5 flex items-center justify-center border-2 border-[#CFD1FC]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-3">
              <button 
                aria-label="Ver Carrito"
                className="relative p-2.5 bg-[#266433] text-white rounded-full"
              >
                <ShoppingBag className="w-5 h-5 text-[#CFD1FC]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FE4811] text-white font-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#266433] hover:bg-white/50 rounded-xl"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Collapsible Search Bar */}
        {searchOpen && (
          <div className="bg-[#BEC1E5] border-t border-[#266433]/10 py-3 px-4 transition-all">
            <div className="max-w-md mx-auto relative">
              <input 
                type="text" 
                placeholder="Busca recetas de pavo, pollo, cordero..." 
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#266433] shadow-inner font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>
        )}

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#CFD1FC] border-t border-[#266433]/15 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
            {['PACKS', 'Tienda', 'Planes Personalizados', 'Nutricionistas', 'Puntos de Venta'].map((item, idx) => (
              <a
                key={idx}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="block px-4 py-3 rounded-xl font-extrabold text-[#266433] hover:bg-white/60 text-base"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {}
      <section className="relative bg-[#CFD1FC] overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#266433]/10">
        
        {/* Floating Paw Decorations */}
        <div className="absolute top-12 left-10 text-[#266433]/15 select-none pointer-events-none transform -rotate-12">
          <PawPrint className="w-16 h-16" />
        </div>
        <div className="absolute top-1/2 right-8 text-[#266433]/15 select-none pointer-events-none transform rotate-45">
          <PawPrint className="w-24 h-24" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[520px]">
            
            {/* LEFT COLUMN: Visual Product Showcase */}
            <div className="lg:col-span-7 relative order-2 lg:order-1">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                
                {/* Glow Shape */}
                <div className="absolute w-80 h-80 bg-[#BEC1E5] rounded-full blur-3xl opacity-80 -z-10 animate-pulse" />

                {/* Main Hero Composite Box */}
                <div className="relative w-full rounded-3xl bg-white/60 p-4 sm:p-6 backdrop-blur-md border-2 border-[#266433]/20 shadow-2xl">
                  
                  {/* Hero Dog Banner */}
                  <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 shadow-lg border border-[#266433]/10">
                    <img 
                      src="https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=1000" 
                      alt="Perro feliz Patita Verde" 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#266433]/90 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-[#266433] text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FE4811]" />
                      100% COCIDO & CONGELADO
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[11px] font-extrabold text-[#CFD1FC] uppercase tracking-widest block">
                        Ingredientes Grado Humano
                      </span>
                      <p className="font-brand font-black text-xl sm:text-2xl leading-tight">
                        Nutrición de verdad, amor en cada bocado
                      </p>
                    </div>
                  </div>

                  {/* Recipe Pouches Cards (Flavor Color Scheme) */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    
                    {/* Item 1: Pavo (Rosa Fucsia) */}
                    <div className="bg-white p-3 rounded-2xl shadow-md border border-[#266433]/10 flex flex-col items-center text-center transform -rotate-2 hover:rotate-0 transition-transform">
                      <span className="w-3 h-3 rounded-full bg-[#EC2CC2] mb-1" />
                      <span className="text-[11px] font-black text-[#266433] leading-tight font-brand">Receta Pavo</span>
                      <span className="text-[10px] text-[#FE4811] font-extrabold mt-0.5">300g • S/ 18.90</span>
                    </div>

                    {/* Item 2: Pollo (Naranja Fuego) */}
                    <div className="bg-white p-3 rounded-2xl shadow-md border border-[#266433]/10 flex flex-col items-center text-center transform rotate-2 hover:rotate-0 transition-transform">
                      <span className="w-3 h-3 rounded-full bg-[#FE4811] mb-1" />
                      <span className="text-[11px] font-black text-[#266433] leading-tight font-brand">Receta Pollo</span>
                      <span className="text-[10px] text-[#FE4811] font-extrabold mt-0.5">300g • S/ 16.90</span>
                    </div>

                    {/* Item 3: Cordero (Violeta) */}
                    <div className="bg-white p-3 rounded-2xl shadow-md border border-[#266433]/10 flex flex-col items-center text-center transform -rotate-1 hover:rotate-0 transition-transform">
                      <span className="w-3 h-3 rounded-full bg-[#8247AF] mb-1" />
                      <span className="text-[11px] font-black text-[#266433] leading-tight font-brand">Receta Cordero</span>
                      <span className="text-[10px] text-[#FE4811] font-extrabold mt-0.5">300g • S/ 20.90</span>
                    </div>

                  </div>

                </div>

                {/* Floating Basket Indicator */}
                <div className="absolute -bottom-6 -left-2 sm:left-4 bg-[#266433] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white max-w-xs">
                  <div className="bg-[#FE4811] p-2.5 rounded-xl text-white">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-[#CFD1FC] uppercase tracking-wide block">Pack Quincenal</span>
                    <p className="text-xs font-black text-white font-brand">14 Pouches + Envío Gratis</p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: Brand Messaging */}
            <div className="lg:col-span-5 order-1 lg:order-2 text-left">
              
              <div className="inline-flex items-center gap-2 bg-[#266433] text-white px-4 py-1.5 rounded-full mb-4 shadow-sm">
                <PawPrint className="w-3.5 h-3.5 text-[#CFD1FC]" />
                <span className="text-xs font-black tracking-widest uppercase">
                  PLANES SEMANALES & MENSUALES
                </span>
              </div>

              <h1 className="font-brand text-[#266433] font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none mb-4">
                Packs pensados para consentirlos mejor.
              </h1>

              <p className="text-slate-800 text-base md:text-lg font-medium mb-8 leading-relaxed">
                Comida 100% natural cocida al vacío y congelada. Sin preservantes, formulada por veterinarios especialistas en nutrición canina.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a 
                  href="#packs"
                  className="inline-flex items-center justify-center bg-[#FE4811] hover:bg-[#e03d0d] text-white font-black text-base md:text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 uppercase tracking-wider text-center group font-brand"
                >
                  ¡DESCÚBRELOS AQUÍ!
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>

                <a 
                  href="#calculadora"
                  className="inline-flex items-center justify-center bg-[#266433] hover:bg-[#1f5028] text-white font-bold text-sm px-6 py-4 rounded-full transition-all text-center"
                >
                  <Calculator className="w-4 h-4 mr-2 text-[#CFD1FC]" />
                  Calcular Porción
                </a>
              </div>

              {/* Badges */}
              <div className="mt-10 pt-6 border-t border-[#266433]/15 grid grid-cols-3 gap-2 text-[#266433]">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#FE4811] shrink-0" />
                  <span className="text-xs font-black">100% Fresco</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#FE4811] shrink-0" />
                  <span className="text-xs font-black">Aval Veterinario</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#FE4811] shrink-0" />
                  <span className="text-xs font-black">Cadena de Frío</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {}
      <section className="bg-[#266433] text-white py-6 border-y border-[#1f5028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-white/10">
            <div className="px-2">
              <span className="font-brand block text-[#CFD1FC] font-black text-2xl md:text-3xl">+10,000</span>
              <span className="text-xs text-white/80 font-bold uppercase">Platos Servidos</span>
            </div>
            <div className="px-2">
              <span className="font-brand block text-[#CFD1FC] font-black text-2xl md:text-3xl">0%</span>
              <span className="text-xs text-[#CFD1FC]/80 font-bold uppercase">Preservantes</span>
            </div>
            <div className="px-2">
              <span className="font-brand block text-[#CFD1FC] font-black text-2xl md:text-3xl">4.9 ★</span>
              <span className="text-xs text-white/80 font-bold uppercase">Opinión de Papás Patita</span>
            </div>
            <div className="px-2">
              <span className="font-brand block text-[#CFD1FC] font-black text-2xl md:text-3xl">24/48h</span>
              <span className="text-xs text-white/80 font-bold uppercase">Delivery Refrigerado</span>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="calculadora" className="py-16 bg-[#BEC1E5]/30 border-b border-[#266433]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-[#266433]/15">
            
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="bg-[#CFD1FC] text-[#266433] font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-widest inline-block mb-2">
                RECOMENDADOR DE PLANES
              </span>
              <h2 className="font-brand text-[#266433] font-black text-3xl sm:text-4xl">
                ¿Cuántos gramos necesita tu engreído?
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Calcula la ración diaria exacta según su peso y nivel de actividad.
              </p>
            </div>

            <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div>
                <label className="block text-xs font-extrabold text-[#266433] uppercase tracking-wider mb-2">
                  Peso de tu perro (KG)
                </label>
                <input 
                  type="number" 
                  min="1" 
                  max="70"
                  value={dogWeight}
                  onChange={(e) => setDogWeight(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-[#266433]/20 font-extrabold text-slate-800 focus:outline-none focus:border-[#266433]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#266433] uppercase tracking-wider mb-2">
                  Nivel de Actividad
                </label>
                <select 
                  value={activity}
                  onChange={(e) => setActivity(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-[#266433]/20 font-bold text-slate-800 focus:outline-none focus:border-[#266433]"
                >
                  <option value="low">Tranquilo / Paseos cortos</option>
                  <option value="medium">Actividad Normal (1 hora/día)</option>
                  <option value="high">Súper Activo / Deporte</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#266433] hover:bg-[#1f5028] text-white font-brand font-black py-3.5 px-6 rounded-2xl shadow-md transition-transform hover:scale-105"
              >
                CALCULAR RACIÓN
              </button>
            </form>

            {calcResult && (
              <div className="mt-8 pt-6 border-t border-slate-100 bg-[#CFD1FC]/40 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#FE4811] text-white rounded-2xl">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#266433] uppercase tracking-wide block">Ración Diaria Recomendada</span>
                    <span className="font-brand text-2xl font-black text-[#266433]">{calcResult} Gramos / día</span>
                    <span className="text-xs text-slate-600 block">(Dividido en 2 porciones de {Math.round(calcResult / 2)}g)</span>
                  </div>
                </div>

                <a 
                  href={`https://wa.me/51999999999?text=Hola%20Patita%20Verde,%20mi%20perro%20pesa%20${dogWeight}kg%20y%20necesita%20${calcResult}g%20diarios.%20Quiero%20asesoría.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FE4811] hover:bg-[#e03d0d] text-white font-brand text-xs font-black px-6 py-3 rounded-full shadow-md whitespace-nowrap"
                >
                  PEDIR PLAN POR WHATSAPP
                </a>
              </div>
            )}

          </div>
        </div>
      </section>

      {}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="bg-[#CFD1FC] text-[#266433] font-black text-xs tracking-widest uppercase px-3.5 py-1 rounded-full border border-[#266433]/20">
              RECETAS 100% NATURALES
            </span>
            <h2 className="font-brand text-[#266433] font-black text-3xl sm:text-5xl py-3 uppercase tracking-wide">
              NUESTROS BEST SELLERS
            </h2>
            <div className="w-16 h-1.5 bg-[#FE4811] mx-auto rounded-full mb-3" />
            <p className="text-slate-600 text-sm md:text-base font-medium">
              Alimento cocido al vapor suave para conservar nutrientes y sabor. ¡Ideal para perros exigentes!
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BEST_SELLERS.map((product) => (
              <div 
                key={product.id}
                className="group relative bg-[#F8FAFC] rounded-3xl p-4 border-2 border-slate-100 hover:border-[#266433] transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-white">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    
                    {/* Badge */}
                    <span className={`absolute top-2 left-2 ${product.badgeBg} text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider`}>
                      {product.badge}
                    </span>

                    {/* Wishlist Button */}
                    <button 
                      aria-label="Guardar en favoritos"
                      className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-700 hover:text-[#FE4811] hover:bg-white transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Category */}
                  <span className="text-[11px] font-black text-[#266433] uppercase tracking-wider block mb-1">
                    {product.category}
                  </span>

                  <h3 className="font-brand font-black text-slate-900 text-lg leading-snug mb-1 group-hover:text-[#266433] transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-500 font-bold mb-3">
                    {product.flavorTag} • <span className="text-[#FE4811]">{product.portionSize}</span>
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-black text-slate-700">{product.rating}</span>
                    <span className="text-[11px] text-slate-400">({product.reviews})</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between mt-2">
                  <div>
                    <span className="text-xs text-slate-400 line-through block font-medium">
                      {product.originalPrice}
                    </span>
                    <span className="font-brand text-xl font-black text-[#266433]">
                      {product.price}
                    </span>
                  </div>

                  <button 
                    onClick={addToCart}
                    aria-label={`Añadir ${product.name} al carrito`}
                    className="bg-[#266433] hover:bg-[#FE4811] text-white p-3 rounded-2xl transition-colors duration-200 shadow-md group/btn"
                  >
                    <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {}
      <footer className="bg-[#266433] text-white pt-16 pb-12 border-t border-[#1f5028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <PawPrint className="w-6 h-6 text-[#CFD1FC]" />
                <span className="font-brand font-black text-2xl text-white tracking-tight">
                  PATITA VERDE®
                </span>
              </div>
              <p className="text-xs text-[#CFD1FC]/80 leading-relaxed">
                Alimentación de verdad para tu perro. Recetas cocidas al vapor con ingredientes reales y aval veterinario.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-brand font-black text-sm uppercase tracking-wider mb-4 text-[#CFD1FC]">
                Nuestros Menús
              </h4>
              <ul className="space-y-2.5 text-xs font-bold text-white/90">
                <li><a href="#" className="hover:text-[#CFD1FC]">Recetas de Pollo</a></li>
                <li><a href="#" className="hover:text-[#CFD1FC]">Recetas de Pavo</a></li>
                <li><a href="#" className="hover:text-[#CFD1FC]">Recetas de Cordero</a></li>
                <li><a href="#" className="hover:text-[#CFD1FC]">Packs Mensuales</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-brand font-black text-sm uppercase tracking-wider mb-4 text-[#CFD1FC]">
                Atención al Cliente
              </h4>
              <ul className="space-y-2.5 text-xs font-bold text-white/90">
                <li><a href="#" className="hover:text-[#CFD1FC]">Preguntas Frecuentes</a></li>
                <li><a href="#" className="hover:text-[#CFD1FC]">Zonas de Delivery Lima</a></li>
                <li><a href="#" className="hover:text-[#CFD1FC]">Políticas de Frío</a></li>
                <li><a href="#" className="hover:text-[#CFD1FC]">Libro de Reclamaciones</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-brand font-black text-sm uppercase tracking-wider mb-4 text-[#CFD1FC]">
                Familia Patita Verde
              </h4>
              <p className="text-xs text-white/80 mb-3">Recibe consejos de nutrición canina y 10% OFF en tu primer pedido.</p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="w-full bg-[#1f5028] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#CFD1FC]"
                />
                <button className="w-full bg-[#FE4811] hover:bg-[#e03d0d] text-white font-brand font-black text-xs py-3 rounded-xl transition-colors uppercase tracking-wider">
                  SUSCRIBIRME
                </button>
              </form>
            </div>

          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#CFD1FC]/70 gap-4">
            <p>© 2026 PATITA VERDE. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1.5">
              Hecho con <Heart className="w-3.5 h-3.5 text-[#FE4811] fill-[#FE4811]" /> para perritos felices.
            </p>
          </div>
        </div>
      </footer>

      {}
      <div className="fixed bottom-6 right-6 z-50 flex items-center group">
        
        {/* Tooltip */}
        {showTooltip && (
          <div className="relative bg-white text-slate-800 text-xs font-extrabold px-4 py-2.5 rounded-2xl shadow-2xl mr-3 border-2 border-[#266433]/20 flex items-center gap-2">
            <span>¿Tienes dudas sobre la ración de tu perrito? 👋</span>
            <button 
              onClick={() => setShowTooltip(false)} 
              className="text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Cerrar ayuda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/51999999999" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center border-2 border-white"
        >
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        </a>

      </div>

    </div>
  );
}