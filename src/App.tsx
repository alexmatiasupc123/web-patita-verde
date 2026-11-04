import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  //Search, 
  //User,
   //ShoppingBag,
    Menu, X, Heart, Star, MessageCircle, 
  //ShieldCheck,
   Truck, Sparkles, ArrowRight, Calculator, PawPrint, 
  Flame, 
  //Award, Plus,
   Leaf, Stethoscope//, 
   //Trash2, ChevronRight
} from 'lucide-react';

// --- TYPES & INTERFACES ---
export interface RecetaPlan {
  id: number;
  name: string;
  category: string;
  price180: number;
  price300: number;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
  badgeBg: string;
  flavorTag: string;
  ingredients: string;
  proteinType: 'pollo' | 'pavo' | 'cordero' | 'pescado';
}

/* --- FASE 2: INTERFAZ DEL CARRITO (COMENTADA) ---
export interface CartItem {
  id: string;
  productId: number;
  name: string;
  size: '180g' | '300g';
  price: number;
  quantity: number;
  image: string;
}
*/

export interface MascotaCalculadora {
  nombre: string;
  especie: 'perro' | 'gato';
  edad: 'cachorro' | 'adulto' | 'senior';
  peso: number | '';
  actividad: 'baja' | 'moderada' | 'alta';
  condicion: 'bajo' | 'ideal' | 'sobrepeso';
}

// --- MOCK DATA ---
const RECETAS: RecetaPlan[] = [
  {
    id: 1,
    name: 'Receta Pavo & Verduras Frescas',
    category: 'Comida Natural Cocida',
    price180: 12.90,
    price300: 18.90,
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400',
    badge: 'MÁS VENDIDO',
    badgeBg: 'bg-[#EC2CC2]', 
    flavorTag: 'Pavo Magro & Camote',
    ingredients: 'Pechuga de pavo, camote, zanahoria, espinaca, aceite de oliva, suplemento vitamínico.',
    proteinType: 'pavo'
  },
  {
    id: 2,
    name: 'Receta Pollo & Arroz Integral',
    category: 'Nutrición Diaria',
    price180: 10.90,
    price300: 16.90,
    rating: 4.8,
    reviews: 118,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400',
    badge: 'FÓRMULA CLÁSICA',
    badgeBg: 'bg-[#FE4811]', 
    flavorTag: 'Pollo de Corral & Zanahoria',
    ingredients: 'Pollo fresco, arroz integral, arvejas, zapallo, aceite de linaza, vitaminas.',
    proteinType: 'pollo'
  },
  {
    id: 3,
    name: 'Receta Cordero & Cerdo Gourmet',
    category: 'Proteína Especial',
    price180: 14.90,
    price300: 20.90,
    rating: 5.0,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400',
    badge: 'HIPOALERGÉNICO',
    badgeBg: 'bg-[#8247AF]', 
    flavorTag: 'Cordero & Espinacas',
    ingredients: 'Carne de cordero, lomo de cerdo, manzana, espinaca, chía, suplemento mineral.',
    proteinType: 'cordero'
  },
  {
    id: 4,
    name: 'Mix Pescado de Isla & Pollo',
    category: 'Piel & Pelaje Brillante',
    price180: 13.90,
    price300: 19.90,
    rating: 4.9,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400',
    badge: 'RICOS EN OMEGA 3',
    badgeBg: 'bg-[#4450FD]', 
    flavorTag: 'Pescado & Zapallo Macre',
    ingredients: 'Pescado blanco, pollo, zapallo macre, brócoli, aceite de pescado, taurina.',
    proteinType: 'pescado'
  }
];

// Componente para scrollear hacia arriba al cambiar de ruta
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- SUB-COMPONENTS (VIEWS) ---
const HomeView = ({ handleWhatsAppOrder }: { handleWhatsAppOrder: any }) => (
  <>
    <section className="relative bg-[#CFD1FC] overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#266433]/10">
      <div className="absolute top-12 left-10 text-[#266433]/15 select-none pointer-events-none transform -rotate-12">
        <PawPrint className="w-16 h-16" />
      </div>
      <div className="absolute top-1/2 right-8 text-[#266433]/15 select-none pointer-events-none transform rotate-45">
        <PawPrint className="w-24 h-24" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[520px]">
          <div className="lg:col-span-7 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute w-80 h-80 bg-[#BEC1E5] rounded-full blur-3xl opacity-80 -z-10 animate-pulse" />
              <div className="relative w-full rounded-3xl bg-white/60 p-4 sm:p-6 backdrop-blur-md border-2 border-[#266433]/20 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 shadow-lg border border-[#266433]/10">
                  <img src="https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=1000" alt="Perro feliz Patita Verde" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#266433]/90 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-[#266433] text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FE4811]" />
                    100% COCIDO & CONGELADO
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-extrabold text-[#CFD1FC] uppercase tracking-widest block">Ingredientes Grado Humano</span>
                    <p className="font-fantony font-black text-xl sm:text-2xl leading-tight">Nutrición de verdad, amor en cada bocado</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-white p-3 rounded-2xl shadow-md border border-[#266433]/10 flex flex-col items-center text-center transform -rotate-2">
                    <span className="w-3 h-3 rounded-full bg-[#EC2CC2] mb-1" />
                    <span className="text-[11px] font-black text-[#266433] leading-tight font-fantony">Receta Pavo</span>
                  </div>
                  <div className="bg-white p-3 rounded-2xl shadow-md border border-[#266433]/10 flex flex-col items-center text-center transform rotate-2">
                    <span className="w-3 h-3 rounded-full bg-[#FE4811] mb-1" />
                    <span className="text-[11px] font-black text-[#266433] leading-tight font-fantony">Receta Pollo</span>
                  </div>
                  <div className="bg-white p-3 rounded-2xl shadow-md border border-[#266433]/10 flex flex-col items-center text-center transform -rotate-1">
                    <span className="w-3 h-3 rounded-full bg-[#8247AF] mb-1" />
                    <span className="text-[11px] font-black text-[#266433] leading-tight font-fantony">Receta Cordero</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 text-left">
            <div className="inline-flex items-center gap-2 bg-[#266433] text-white px-4 py-1.5 rounded-full mb-4 shadow-sm">
              <PawPrint className="w-3.5 h-3.5 text-[#CFD1FC]" />
              <span className="text-xs font-black tracking-widest uppercase">PLANES SEMANALES & MENSUALES</span>
            </div>
            <h1 className="font-fantony text-[#266433] font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none mb-4">
              Packs pensados para consentirlos mejor.
            </h1>
            <p className="text-slate-800 text-base md:text-lg font-medium mb-8 leading-relaxed font-montserrat">
              Alimento natural, cocido al vacío y congelado. Sin preservantes, formulado por veterinarios para mayor salud y vitalidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/calculadora" className="inline-flex justify-center items-center bg-[#FE4811] hover:bg-[#e03e0a] text-white font-black text-sm px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform font-montserrat">
                <Calculator className="w-4 h-4 mr-2" />
                CALCULAR PLAN IDEAL
              </Link>
              <Link to="/planes" className="inline-flex justify-center items-center bg-white border-2 border-[#266433] text-[#266433] hover:bg-[#CFD1FC]/50 font-black text-sm px-6 py-4 rounded-full transition-colors font-montserrat">
                VER RECETAS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#BEC1E5]/40 rounded-full flex items-center justify-center mb-4 text-[#266433]"><Leaf className="w-7 h-7" /></div>
            <h3 className="font-fantony font-black text-[#266433] text-lg mb-2">100% Natural</h3>
            <p className="text-sm text-slate-600 font-medium font-montserrat">Ingredientes de grado humano, sin harinas, químicos ni preservantes artificiales.</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#CFD1FC]/50 rounded-full flex items-center justify-center mb-4 text-[#4450FD]"><Flame className="w-7 h-7" /></div>
            <h3 className="font-fantony font-black text-[#266433] text-lg mb-2">Cocido & Congelado</h3>
            <p className="text-sm text-slate-600 font-medium font-montserrat">Cocción al vapor suave que elimina bacterias manteniendo nutrientes intactos.</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#FE4811]/10 rounded-full flex items-center justify-center mb-4 text-[#FE4811]"><Calculator className="w-7 h-7" /></div>
            <h3 className="font-fantony font-black text-[#266433] text-lg mb-2">Porciones Exactas</h3>
            <p className="text-sm text-slate-600 font-medium font-montserrat">Empaques listos para servir. Calculamos la ración ideal según su peso.</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#266433]/10 rounded-full flex items-center justify-center mb-4 text-[#266433]"><Stethoscope className="w-7 h-7" /></div>
            <h3 className="font-fantony font-black text-[#266433] text-lg mb-2">Aval Veterinario</h3>
            <p className="text-sm text-slate-600 font-medium font-montserrat">Formulaciones certificadas por especialistas en nutrición animal.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#F8FAFC] py-16 lg:py-24 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="bg-[#CFD1FC] text-[#266433] font-black text-xs tracking-widest uppercase px-3.5 py-1 rounded-full border border-[#266433]/20 font-montserrat">LOS FAVORITOS</span>
            <h2 className="font-fantony text-[#266433] font-black text-3xl sm:text-4xl py-3 uppercase tracking-wide">Platos Estrella</h2>
          </div>
          <Link to="/planes" className="hidden sm:flex items-center text-[#FE4811] font-black text-sm hover:underline font-montserrat">
            Ver menú completo <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RECETAS.slice(0, 4).map((product) => (
            <div key={product.id} className="bg-white rounded-3xl p-4 border-2 border-slate-100 hover:border-[#266433] transition-all duration-300 hover:shadow-xl flex flex-col">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-50">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <span className={`absolute top-2 left-2 ${product.badgeBg} text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md uppercase font-montserrat`}>
                  {product.badge}
                </span>
              </div>
              <span className="text-[11px] font-black text-[#266433] uppercase tracking-wider block mb-1 font-montserrat">{product.category}</span>
              <h3 className="font-fantony font-black text-slate-900 text-lg leading-snug mb-1">{product.name}</h3>
              <p className="text-xs text-slate-500 font-bold mb-3 font-montserrat">{product.flavorTag}</p>
              <div className="mt-auto pt-3 flex items-center justify-between">
                <span className="font-fantony text-xl font-black text-[#266433]">S/ {product.price300.toFixed(2)}</span>
                {/* Modificado para redirigir a WhatsApp en Fase 1 */}
                <button onClick={() => handleWhatsAppOrder(product.name, '300g')} className="bg-[#266433] hover:bg-[#25D366] text-white p-2.5 rounded-xl transition-colors shadow-md">
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const PlanesView = ({ handleWhatsAppOrder }: { handleWhatsAppOrder: any }) => (
  <section className="bg-[#F8FAFC] py-12 lg:py-20 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="bg-[#CFD1FC] text-[#266433] font-black text-xs tracking-widest uppercase px-3.5 py-1 rounded-full font-montserrat">NUESTROS PLANES</span>
        <h1 className="font-fantony text-[#266433] font-black text-4xl sm:text-5xl py-3 uppercase">Menú 100% Natural</h1>
        <div className="w-16 h-1.5 bg-[#FE4811] mx-auto rounded-full mb-3" />
        <p className="text-slate-600 font-medium font-montserrat">Elige la receta favorita de tu engreído. Empaques listos para descongelar y servir.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
        {RECETAS.map((receta) => (
          <div key={receta.id} className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 flex flex-col sm:flex-row gap-6 hover:shadow-2xl hover:border-[#CFD1FC] transition-all">
            <div className="w-full sm:w-2/5 relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img src={receta.image} alt={receta.name} className="w-full h-full object-cover" />
              </div>
              <span className={`absolute top-2 left-2 ${receta.badgeBg} text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md uppercase font-montserrat`}>
                {receta.badge}
              </span>
            </div>
            
            <div className="w-full sm:w-3/5 flex flex-col">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                </div>
                <span className="text-xs text-slate-500 font-bold font-montserrat">({receta.reviews} reseñas)</span>
              </div>
              
              <h3 className="font-fantony font-black text-[#266433] text-2xl leading-tight mb-2">{receta.name}</h3>
              
              <div className="flex flex-wrap gap-2 mb-4 font-montserrat">
                <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2 py-1 rounded-md uppercase">Fresco</span>
                <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2 py-1 rounded-md uppercase">Cocido</span>
              </div>
              
              <p className="text-xs text-slate-600 mb-4 leading-relaxed font-montserrat"><strong className="text-slate-800">Ingredientes:</strong> {receta.ingredients}</p>
              
              <div className="mt-auto space-y-3 font-montserrat">
                {/* Modificados para abrir WhatsApp en lugar de agregar a carrito en Fase 1 */}
                <div className="flex items-center justify-between p-3 border-2 border-slate-100 rounded-xl hover:border-[#25D366] cursor-pointer group" onClick={() => handleWhatsAppOrder(receta.name, '180g')}>
                  <div>
                    <span className="block font-black text-slate-900 text-sm group-hover:text-[#25D366] transition-colors">Empaque Pequeño (180g)</span>
                    <span className="text-xs text-slate-500 font-medium">Ideal para perros pequeños o gatos</span>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="font-fantony font-black text-[#FE4811] text-lg">S/ {receta.price180.toFixed(2)}</span>
                    <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-[#25D366] group-hover:text-white transition-colors"><MessageCircle className="w-4 h-4"/></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border-2 border-[#266433]/20 bg-[#CFD1FC]/20 rounded-xl hover:border-[#25D366] hover:bg-white cursor-pointer group transition-all" onClick={() => handleWhatsAppOrder(receta.name, '300g')}>
                  <div>
                    <span className="block font-black text-[#266433] text-sm group-hover:text-[#25D366]">Empaque Regular (300g)</span>
                    <span className="text-xs text-[#266433]/70 font-bold group-hover:text-[#25D366]/70">Mejor valor nutricional/precio</span>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="font-fantony font-black text-[#266433] text-xl">S/ {receta.price300.toFixed(2)}</span>
                    <div className="bg-[#266433] text-white p-2 rounded-lg group-hover:bg-[#25D366] transition-colors"><MessageCircle className="w-4 h-4"/></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const NutricionistasView = () => (
  <section className="bg-white py-12 lg:py-20 min-h-screen">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="bg-[#CFD1FC] text-[#266433] font-black text-xs tracking-widest uppercase px-3.5 py-1 rounded-full font-montserrat">RESPALDO CIENTÍFICO</span>
        <h1 className="font-fantony text-[#266433] font-black text-4xl sm:text-5xl py-3 uppercase">Equipo Veterinario</h1>
        <p className="text-slate-600 font-medium font-montserrat">Nuestras recetas no son improvisadas. Han sido formuladas y aprobadas por médicos veterinarios especialistas en nutrición de mascotas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-slate-100 text-center">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#266433] mb-6">
            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300" alt="Dra. Vet" className="w-full h-full object-cover"/>
          </div>
          <h3 className="font-fantony font-black text-[#266433] text-2xl">Dra. María Fernanda Ríos</h3>
          <p className="text-[#FE4811] font-bold text-sm mb-4 font-montserrat">CMVP 10234 • Especialista en Nutrición Canina</p>
          <p className="text-slate-600 text-sm leading-relaxed font-montserrat">"Recomiendo Patita Verde porque el proceso de cocción suave elimina el riesgo bacteriano de la dieta BARF cruda, pero mantiene intactos los nutrientes esenciales y aminoácidos que tu perro necesita."</p>
        </div>
        <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-slate-100 text-center">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#4450FD] mb-6">
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300" alt="Dr. Vet" className="w-full h-full object-cover"/>
          </div>
          <h3 className="font-fantony font-black text-[#266433] text-2xl">Dr. Carlos Mendoza</h3>
          <p className="text-[#FE4811] font-bold text-sm mb-4 font-montserrat">CMVP 08452 • Gastroenterología Veterinaria</p>
          <p className="text-slate-600 text-sm leading-relaxed font-montserrat">"La transición de croquetas a comida natural cocida resuelve el 80% de problemas de alergias en piel y sensibilidades estomacales. La formulación de estas recetas tiene el balance exacto."</p>
        </div>
      </div>
    </div>
  </section>
);

const CalculadoraView = () => {
  const [calcData, setCalcData] = useState<MascotaCalculadora>({
    nombre: '', especie: 'perro', edad: 'adulto', peso: 12, actividad: 'moderada', condicion: 'ideal'
  });
  const [calcResult, setCalcResult] = useState<number>(0);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!calcData.peso) return;
    let baseFactor = 0.025;
    if (calcData.actividad === 'baja') baseFactor = 0.02;
    if (calcData.actividad === 'alta') baseFactor = 0.035;
    if (calcData.edad === 'cachorro') baseFactor *= 1.5;
    if (calcData.edad === 'senior') baseFactor *= 0.85;
    if (calcData.condicion === 'sobrepeso') baseFactor *= 0.8;
    if (calcData.condicion === 'bajo') baseFactor *= 1.2;
    setCalcResult(Math.round(Number(calcData.peso) * 1000 * baseFactor));
  };

  return (
    <section className="bg-[#BEC1E5]/20 py-12 lg:py-20 min-h-screen font-montserrat">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#266433]/15">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#4450FD] text-white px-3 py-1 rounded-full mb-3 shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-black tracking-widest uppercase">¡NUEVO MÓDULO INTELIGENTE!</span>
            </div>
            <h1 className="font-fantony text-[#266433] font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight">Calculadora Nutricional</h1>
            <p className="text-slate-600 font-medium mt-3">Descubre cuántos gramos de comida Patita Verde necesita al día tu engreído y obtén tu plan recomendado.</p>
          </div>

          <form onSubmit={handleCalculate} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-[#266433] uppercase tracking-wider mb-2">Nombre de tu mascota</label>
                <input type="text" placeholder="Ej. Max, Luna..." value={calcData.nombre} onChange={(e) => setCalcData({...calcData, nombre: e.target.value})} className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:outline-none focus:border-[#266433] font-bold text-slate-800 transition-colors"/>
              </div>
              <div>
                <label className="block text-xs font-black text-[#266433] uppercase tracking-wider mb-2">Peso Actual (KG) *</label>
                <input type="number" min="1" max="90" step="0.1" required placeholder="Ej. 12" value={calcData.peso} onChange={(e) => setCalcData({...calcData, peso: Number(e.target.value)})} className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:outline-none focus:border-[#FE4811] font-black text-slate-800 transition-colors"/>
              </div>
              <div>
                <label className="block text-xs font-black text-[#266433] uppercase tracking-wider mb-2">Etapa de Vida</label>
                <select value={calcData.edad} onChange={(e) => setCalcData({...calcData, edad: e.target.value as any})} className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:outline-none focus:border-[#266433] font-bold text-slate-800 appearance-none">
                  <option value="cachorro">Cachorro (Menos de 1 año)</option>
                  <option value="adulto">Adulto (1 a 7 años)</option>
                  <option value="senior">Senior (Más de 7 años)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-[#266433] uppercase tracking-wider mb-2">Nivel de Actividad</label>
                <select value={calcData.actividad} onChange={(e) => setCalcData({...calcData, actividad: e.target.value as any})} className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:outline-none focus:border-[#266433] font-bold text-slate-800 appearance-none">
                  <option value="baja">Baja (Paseos cortos, duerme mucho)</option>
                  <option value="moderada">Moderada (1 hora de paseo al día)</option>
                  <option value="alta">Alta (Muy activo, corre, deportista)</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full bg-[#FE4811] hover:bg-[#e03e0a] text-white font-fantony font-black text-lg py-4 px-6 rounded-2xl shadow-xl transition-transform hover:scale-[1.02] flex justify-center items-center gap-2">
              <Calculator className="w-5 h-5" /> CALCULAR RACIÓN DIARIA
            </button>
          </form>

          {calcResult > 0 && (
            <div className="mt-10 animate-fade-in border-t-2 border-dashed border-slate-200 pt-8">
              <div className="bg-[#CFD1FC]/40 rounded-3xl p-6 md:p-8 border-2 border-[#266433]/20 text-center">
                <h3 className="font-fantony font-black text-[#266433] text-2xl mb-2">
                  ¡Listo! {calcData.nombre ? `${calcData.nombre} necesita:` : 'Tu mascota necesita:'}
                </h3>
                <div className="text-5xl font-fantony font-black text-[#FE4811] my-4 drop-shadow-sm">
                  {calcResult} <span className="text-2xl text-[#266433]">Gramos / día</span>
                </div>
                <p className="text-slate-700 font-bold mb-6">
                  Recomendamos dividir esta ración en <span className="text-[#4450FD]">2 comidas de {Math.round(calcResult/2)}g</span> al día.
                </p>
                <a href={`https://wa.me/51999999999?text=Hola%20Patita%20Verde!%20Acabo%20de%20usar%20su%20calculadora.%20Mi%20perrito${calcData.nombre ? ` ${calcData.nombre}` : ''}%20pesa%20${calcData.peso}kg%20y%20necesita%20${calcResult}g%20diarios.%20Quiero%20solicitar%20un%20plan.`}
                   target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center justify-center w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-sm px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105 gap-2 uppercase tracking-wide">
                  <MessageCircle className="w-5 h-5" /> SOLICITAR PLAN POR WHATSAPP
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// --- MAIN APP (Layout & Router) ---
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  //const [searchOpen, setSearchOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  /* --- FASE 2: ESTADOS DEL CARRITO COMENTADOS --- 
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (receta: RecetaPlan, size: '180g' | '300g') => {
    const price = size === '180g' ? receta.price180 : receta.price300;
    const newItem: CartItem = {
      id: `${receta.id}-${size}-${Date.now()}`, productId: receta.id, name: receta.name, size, price, quantity: 1, image: receta.image
    };
    setCart(prev => [...prev, newItem]);
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  */

  // --- FASE 1: Redirección directa a WhatsApp
  const handleWhatsAppOrder = (productName: string, size: string) => {
    const text = `¡Hola Patita Verde! 🐾 Quiero pedir la ${productName} en presentación de ${size}. ¿Me ayudan con mi pedido?`;
    window.open(`https://wa.me/51999999999?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Helper para clases activas en Navbar
  const getNavClass = (path: string) => {
    return location.pathname === path 
      ? 'bg-white/60 text-[#266433]' 
      : 'text-[#266433] hover:text-[#4450FD]';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-montserrat text-slate-900 selection:bg-[#FE4811] selection:text-white">
      
      {/* Estilos utilitarios y animaciones */}
      <style>{`
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* TOPBAR */}
      <div className="bg-[#266433] text-white text-xs py-2.5 px-4 text-center font-bold tracking-wider flex items-center justify-center gap-2 shadow-inner">
        <Truck className="w-4 h-4 text-[#CFD1FC]" />
        <span>
          NUTRICIÓN DE VERDAD • ENVÍO GRATIS A PARTIR DE S/ 79.90. DESCUBRE MÁS{' '}
          <Link to="/planes" className="underline font-black text-[#CFD1FC] hover:text-white transition-colors">AQUÍ</Link>
        </span>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-[#CFD1FC]/95 backdrop-blur-md border-b border-[#266433]/15 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex items-center gap-6 lg:gap-10">
              <Link to="/" className="flex items-center gap-2 group text-left">
                <img 
                  src="img/Logotipos-sinslogan-01.png" 
                  alt="Logo Patita Verde" 
                  className="h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
                />
              </Link>

              {/* Desktop Links */}
              <div className="hidden lg:flex items-center space-x-2">
                <Link to="/" className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${getNavClass('/')}`}>Inicio</Link>
                <Link to="/planes" className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${getNavClass('/planes')}`}>Nuestros Planes</Link>
                <Link to="/nutricionistas" className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${getNavClass('/nutricionistas')}`}>Nutricionistas</Link>
                <Link to="/calculadora" className={`relative px-4 py-2 rounded-full text-sm font-black transition-colors shadow-sm ${location.pathname === '/calculadora' ? 'bg-[#FE4811] text-white' : 'bg-white text-[#FE4811] hover:bg-[#FE4811] hover:text-white border border-[#FE4811]/20'}`}>
                  Calculadora
                  <span className="absolute -top-2 -right-2 bg-[#4450FD] text-white text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider">¡Nuevo!</span>
                </Link>
              </div>
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* --- FASE 2: BOTONES DE BUSCADOR, USUARIO Y CARRITO COMENTADOS --- */}
              {/* 
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2.5 text-[#266433] hover:bg-white/60 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2.5 text-[#266433] hover:bg-white/60 rounded-full transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button onClick={() => setCartOpen(true)} className="relative p-3 bg-[#266433] text-white rounded-full hover:bg-[#1f5028] transition-all shadow-md hover:scale-105">
                <ShoppingBag className="w-5 h-5 text-[#CFD1FC]" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FE4811] text-white font-black rounded-full text-[11px] w-5 h-5 flex items-center justify-center border-2 border-[#CFD1FC]">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button> 
              */}
            </div>

            {/* Mobile Toggle */}
            <div className="flex md:hidden items-center gap-3">
              {/* --- FASE 2: BOTÓN DE CARRITO MÓVIL COMENTADO --- */}
              {/* 
              <button onClick={() => setCartOpen(true)} className="relative p-2.5 bg-[#266433] text-white rounded-full shadow-md">
                <ShoppingBag className="w-4 h-4 text-[#CFD1FC]" />
                {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-[#FE4811] text-white font-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{cart.length}</span>}
              </button>
              */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-[#266433] bg-white/50 rounded-xl">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#CFD1FC] border-t border-[#266433]/15 px-4 pt-3 pb-6 space-y-2 shadow-2xl absolute w-full left-0">
            <Link to="/" className="block w-full text-left px-4 py-3 rounded-xl font-extrabold text-[#266433] hover:bg-white/60">Inicio</Link>
            <Link to="/planes" className="block w-full text-left px-4 py-3 rounded-xl font-extrabold text-[#266433] hover:bg-white/60">Nuestros Planes</Link>
            <Link to="/nutricionistas" className="block w-full text-left px-4 py-3 rounded-xl font-extrabold text-[#266433] hover:bg-white/60">Nutricionistas</Link>
            <Link to="/calculadora" className="block w-full text-left px-4 py-3 rounded-xl font-extrabold bg-[#FE4811] text-white shadow-md">Calculadora de Porciones</Link>
          </div>
        )}
      </nav>

      <main>
        <Routes>
          {/* Se pasa handleWhatsAppOrder en vez de addToCart */}
          <Route path="/" element={<HomeView handleWhatsAppOrder={handleWhatsAppOrder} />} />
          <Route path="/planes" element={<PlanesView handleWhatsAppOrder={handleWhatsAppOrder} />} />
          <Route path="/nutricionistas" element={<NutricionistasView />} />
          <Route path="/calculadora" element={<CalculadoraView />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#266433] text-white pt-16 pb-12 border-t border-[#1f5028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <PawPrint className="w-6 h-6 text-[#CFD1FC]" />
                <span className="font-fantony font-black text-2xl text-white tracking-tight">PATITA VERDE®</span>
              </div>
              <p className="text-xs text-[#CFD1FC]/80 leading-relaxed max-w-xs font-montserrat">Alimentación de verdad para tu perro. Recetas cocidas al vapor con ingredientes reales y aval veterinario.</p>
            </div>
            <div>
              <h4 className="font-fantony font-black text-sm uppercase tracking-wider mb-4 text-[#CFD1FC]">Enlaces Rápidos</h4>
              <ul className="space-y-2.5 text-xs font-bold text-white/90 font-montserrat">
                <li><Link to="/" className="hover:text-[#CFD1FC]">Inicio</Link></li>
                <li><Link to="/planes" className="hover:text-[#CFD1FC]">Nuestros Planes</Link></li>
                <li><Link to="/calculadora" className="hover:text-[#CFD1FC]">Calculadora</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-fantony font-black text-sm uppercase tracking-wider mb-4 text-[#CFD1FC]">Atención al Cliente</h4>
              <ul className="space-y-2.5 text-xs font-bold text-white/90 font-montserrat">
                <li><a href="#" className="hover:text-[#CFD1FC]">Preguntas Frecuentes</a></li>                
                <li><a href="#" className="hover:text-[#CFD1FC]">Contacto</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#CFD1FC]/70 gap-4 font-montserrat">
            <p>© 2026 PATITA VERDE. Desarrollado por ALXSOLUTIONS.</p>
            <p className="flex items-center gap-1.5">Hecho con <Heart className="w-3.5 h-3.5 text-[#FE4811] fill-[#FE4811]" /> para perritos felices.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center group">
        {showTooltip && (
          <div className="relative bg-white text-slate-800 text-xs font-extrabold px-4 py-2.5 rounded-2xl shadow-2xl mr-3 border-2 border-[#266433]/20 flex items-center gap-2 animate-fade-in hidden sm:flex font-montserrat">
            <span>¿Necesitas ayuda con la porción de tu mascota? 👋</span>
            <button onClick={() => setShowTooltip(false)} className="text-slate-400 hover:text-slate-600 p-0.5">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        <a href="https://wa.me/51999999999" target="_blank" rel="noopener noreferrer"
           className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center border-2 border-white relative">
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-[#FE4811] rounded-full border-2 border-white animate-ping" />
        </a>
      </div>

      {/* --- FASE 2: MODAL DEL CARRITO DE COMPRAS (COMENTADO) --- */}
      {/* 
      {cartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-fade-in font-montserrat">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#F8FAFC]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#266433]" />
                <h2 className="font-fantony font-black text-[#266433] text-xl">Tu Carrito</h2>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-800 shadow-sm border border-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                  <ShoppingBag className="w-16 h-16 mb-4 text-slate-200" />
                  <p className="font-bold text-lg text-slate-600">Tu carrito está vacío</p>
                  <Link to="/planes" onClick={() => setCartOpen(false)} className="mt-4 text-[#FE4811] font-black underline">Ver Planes</Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map(item => (
                    <li key={item.id} className="flex gap-4 p-3 border border-slate-100 rounded-2xl bg-white shadow-sm">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-fantony font-black text-slate-800 text-sm leading-tight">{item.name}</h4>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase mt-1 inline-block">{item.size}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-black text-[#266433]">S/ {item.price.toFixed(2)}</span>
                          <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-100 bg-[#F8FAFC]">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-slate-600">Subtotal:</span>
                  <span className="font-fantony font-black text-2xl text-[#266433]">S/ {cartTotal.toFixed(2)}</span>
                </div>
                <button onClick={() => alert('¡Listo para la Fase 2: Pasarela de Pagos!')} className="w-full bg-[#FE4811] hover:bg-[#e03e0a] text-white font-fantony font-black py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex justify-center items-center gap-2">
                  PROCEDER AL PAGO <ChevronRight className="w-5 h-5" />
                </button>
                <p className="text-center text-[10px] text-slate-500 font-bold uppercase mt-3 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#266433]"/> Compra 100% Segura
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      */}
    </div>
  );
}