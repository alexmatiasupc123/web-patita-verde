import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  //Search, 
  //User,
  //ShoppingBag,
  Menu, X, Heart, Star, MessageCircle, 
  //ShieldCheck,
  //Truck,
  Sparkles, ArrowRight, Calculator, PawPrint, 
  //Flame, 
  //Award, Plus,
  Leaf, Stethoscope, CheckCircle2, Calendar, MapPin, SlidersHorizontal, Truck//, 
  //Trash2, ChevronRight
} from 'lucide-react';

// --- TYPES & INTERFACES ---
export interface RecetaPlan {
  id: number;
  name: string;
  shortName: string;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
  badgeBg: string;
  flavorTag: string;
  ingredients: string;
  proteinType: 'pollo' | 'pavo' | 'cordero';
}

export interface PrecioGramaje {
  gramaje: number;
  label: string;
  especie: 'perro' | 'gato';
  plan7: number;
  plan14: number;
  plan28: number;
  personalizado28: number | null;
}

/* --- FASE 2: INTERFAZ DEL CARRITO (COMENTADA) ---
export interface CartItem {
  id: string;
  productId: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}
*/

export interface MascotaCalculadora {
  nombre: string;
  distrito: string;
  especie: 'perro' | 'gato';
  edad: 'cachorro' | 'adulto' | 'senior';
  peso: number | '';
  actividad: 'baja' | 'moderada' | 'alta';
  condicion: 'bajo' | 'ideal' | 'sobrepeso';
}

// --- DATOS REALES DEL CLIENTE ---
const RECETAS: RecetaPlan[] = [
  {
    id: 1,
    name: 'Receta de Pavo & Verduras',
    shortName: 'Pavo',
    category: 'Proteína Magra • Alta Digestibilidad',
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400',
    badge: 'MÁS VENDIDO',
    badgeBg: 'bg-[#EC2CC2]', 
    flavorTag: 'Pavo seleccionado, vegetales y avena',
    ingredients: 'Carne de pavo, menudencia balanceada, espinaca, vegetales frescos y avena (opción hipoalergénica retirando ingredientes en planes de 28 días).',
    proteinType: 'pavo'
  },
  {
    id: 2,
    name: 'Receta de Pollo Clásica',
    shortName: 'Pollo',
    category: 'Nutrición Diaria Balanceada',
    rating: 4.8,
    reviews: 118,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400',
    badge: 'FÓRMULA CLÁSICA',
    badgeBg: 'bg-[#FE4811]', 
    flavorTag: 'Pollo fresco, vegetales y cereales',
    ingredients: 'Pollo fresco, menudencia balanceada, espinaca, zanahoria, zapallo y avena (opción hipoalergénica retirando ingredientes en planes de 28 días).',
    proteinType: 'pollo'
  },
  {
    id: 3,
    name: 'Mix Cordero & Cerdo Gourmet',
    shortName: 'Mix Cordero & Cerdo',
    category: 'Doble Proteína Especial',
    rating: 5.0,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400',
    badge: 'DOBLE PROTEÍNA',
    badgeBg: 'bg-[#8247AF]', 
    flavorTag: 'Cordero, cerdo y vegetales',
    ingredients: 'Carne de cordero, cerdo magro, menudencia balanceada, espinaca, vegetales y avena (opción hipoalergénica retirando ingredientes en planes de 28 días).',
    proteinType: 'cordero'
  }
];

const PLANES_PRECIOS: PrecioGramaje[] = [
  { gramaje: 200, label: '200g', especie: 'perro', plan7: 65, plan14: 100, plan28: 190, personalizado28: 220 },
  { gramaje: 250, label: '250g', especie: 'perro', plan7: 70, plan14: 110, plan28: 210, personalizado28: 240 },
  { gramaje: 300, label: '300g', especie: 'perro', plan7: 83, plan14: 135, plan28: 260, personalizado28: 290 },
  { gramaje: 450, label: '450g', especie: 'perro', plan7: 95, plan14: 160, plan28: 310, personalizado28: 340 },
  { gramaje: 700, label: '700g', especie: 'perro', plan7: 120, plan14: 210, plan28: 410, personalizado28: 440 },
  { gramaje: 900, label: '900g', especie: 'perro', plan7: 145, plan14: 260, plan28: 500, personalizado28: 530 },
  { gramaje: 1200, label: '1200g', especie: 'perro', plan7: 165, plan14: 300, plan28: 580, personalizado28: 610 },
  { gramaje: 1400, label: '1400g', especie: 'perro', plan7: 190, plan14: 350, plan28: 680, personalizado28: 710 },
  { gramaje: 1600, label: '1600g', especie: 'perro', plan7: 205, plan14: 380, plan28: 740, personalizado28: 770 },
  { gramaje: 1800, label: '1800g', especie: 'perro', plan7: 215, plan14: 400, plan28: 780, personalizado28: 810 },
  { gramaje: 180, label: 'Gato (180g)', especie: 'gato', plan7: 75, plan14: 120, plan28: 200, personalizado28: null }
];

const ZONAS_DELIVERY = [
  {
    dia: 'Lunes y Jueves',
    color: 'bg-[#1E293B] text-white',
    distritos: ['Callao', 'La Perla', 'Bellavista', 'La Punta', 'Breña', 'San Miguel', 'Magdalena', 'Pueblo Libre', 'Jesús María', 'Lince', 'San Juan de Miraflores', 'Villa El Salvador', 'Villa María del Triunfo', 'Cercado de Lima']
  },
  {
    dia: 'Martes',
    color: 'bg-[#FE4811] text-white',
    distritos: ['Ate', 'San Luis', 'San Borja', 'La Molina', 'Surco', 'Cieneguilla', 'Santa Anita', 'Lurigancho']
  },
  {
    dia: 'Miércoles',
    color: 'bg-[#266433] text-white',
    distritos: ['Chorrillos', 'Barranco', 'Miraflores', 'San Isidro', 'Surquillo', 'La Victoria', 'Rímac', 'Comas', 'El Agustino', 'Independencia', 'Los Olivos', 'Puente Piedra', 'San Juan de Lurigancho', 'San Martín de Porres']
  },
  {
    dia: 'Viernes',
    color: 'bg-[#FE4811] text-white',
    distritos: ['Ate', 'San Luis', 'San Borja', 'La Molina', 'Surco', 'Cieneguilla', 'Santa Anita', 'Lurigancho', 'Independencia', 'Los Olivos', 'Puente Piedra', 'San Juan de Lurigancho', 'San Martín de Porres', 'Comas', 'Rímac', 'El Agustino']
  },
  {
    dia: 'Sábado',
    color: 'bg-[#266433] text-white',
    distritos: ['Chorrillos', 'Barranco', 'Miraflores', 'San Isidro', 'Surquillo', 'La Victoria']
  }
];

// Lista única y ordenada alfabéticamente de todos los distritos para la calculadora
const TODOS_DISTRITOS = Array.from(
  new Set(ZONAS_DELIVERY.flatMap((z) => z.distritos))
).sort((a, b) => a.localeCompare(b, 'es'));

// Helper para obtener los días de reparto de un distrito seleccionado
const getDiasRepartoPorDistrito = (distrito: string): string => {
  if (!distrito) return '';
  if (distrito === 'Otro') return 'Consultar cobertura por WhatsApp';
  const dias = ZONAS_DELIVERY.filter((z) => z.distritos.includes(distrito)).map((z) => z.dia);
  return dias.length > 0 ? dias.join(' / ') : 'Consultar cobertura por WhatsApp';
};

const WHATSAPP_NUMBER = '51999999999';

// Componente para scrollear hacia arriba al cambiar de ruta
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

// --- SUB-COMPONENTS (VIEWS) ---
const HomeView = ({ handleWhatsAppOrder }: { handleWhatsAppOrder: (msg: string) => void }) => (
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
                    COMIDA DISEÑADA POR VETERINARIOS
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-extrabold text-[#CFD1FC] uppercase tracking-widest block">Combina hasta 2 sabores por plan</span>
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
                    <span className="text-[11px] font-black text-[#266433] leading-tight font-fantony">Mix Cordero & Cerdo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 text-left">
            <div className="inline-flex items-center gap-2 bg-[#266433] text-white px-4 py-1.5 rounded-full mb-4 shadow-sm">
              <Stethoscope className="w-3.5 h-3.5 text-[#CFD1FC]" />
              <span className="text-xs font-black tracking-widest uppercase">DISEÑADA POR VETERINARIOS</span>
            </div>
            <h1 className="font-fantony text-[#266433] font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none mb-4">
              Packs pensados para consentirlos mejor.
            </h1>
            <p className="text-slate-800 text-base md:text-lg font-medium mb-6 leading-relaxed font-montserrat">
              Alimento natural cocido, diseñado por veterinarios. Planes de <strong>7, 14 y 28 días</strong> donde puedes combinar hasta <strong>2 sabores</strong> según el peso y actividad de tu engreído.
            </p>
            <div className="bg-white/80 border border-[#266433]/20 rounded-2xl p-3.5 mb-7 flex items-center gap-3 shadow-sm">
              <div className="bg-[#FE4811] text-white p-2 rounded-xl shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-[#266433] font-montserrat">
                ¡Promoción activa! Por la compra de tu plan accedes a una <span className="underline">Teleconsulta Veterinaria</span>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/calculadora" className="inline-flex justify-center items-center bg-[#FE4811] hover:bg-[#e03e0a] text-white font-black text-sm px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform font-montserrat">
                <Calculator className="w-4 h-4 mr-2" />
                CALCULAR PLAN IDEAL
              </Link>
              <Link to="/planes" className="inline-flex justify-center items-center bg-white border-2 border-[#266433] text-[#266433] hover:bg-[#CFD1FC]/50 font-black text-sm px-6 py-4 rounded-full transition-colors font-montserrat">
                VER PLANES Y PRECIOS
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
            <h3 className="font-fantony font-black text-[#266433] text-lg mb-2">Combina 2 Sabores</h3>
            <p className="text-sm text-slate-600 font-medium font-montserrat">Elige hasta dos recetas distintas (Pavo, Pollo o Mix Cordero & Cerdo) dentro de tu mismo plan.</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#CFD1FC]/50 rounded-full flex items-center justify-center mb-4 text-[#4450FD]"><SlidersHorizontal className="w-7 h-7" /></div>
            <h3 className="font-fantony font-black text-[#266433] text-lg mb-2 leading-snug">Planes Personalizados (Hipoalergénicos)</h3>
            <p className="text-sm text-slate-600 font-medium font-montserrat">Podemos retirar alguno de los ingredientes de nuestras recetas en planes de 28 días.</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#FE4811]/10 rounded-full flex items-center justify-center mb-4 text-[#FE4811]"><Calculator className="w-7 h-7" /></div>
            <h3 className="font-fantony font-black text-[#266433] text-lg mb-2">200g hasta 1800g</h3>
            <p className="text-sm text-slate-600 font-medium font-montserrat">Raciones diarias exactas para perros desde 200g hasta 1.8kg, y presentación especial de 180g para gatos.</p>
          </div>
          <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#266433]/10 rounded-full flex items-center justify-center mb-4 text-[#266433]"><Stethoscope className="w-7 h-7" /></div>
            <h3 className="font-fantony font-black text-[#266433] text-lg mb-2">
              Dise<span className="font-montserrat font-black">ñ</span>ada por Veterinarios
            </h3>
            <p className="text-sm text-slate-600 font-medium font-montserrat">Fórmulas respaldadas por nuestro doctor veterinario, incluyendo acceso a teleconsulta con tu plan.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#F8FAFC] py-16 lg:py-24 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="bg-[#CFD1FC] text-[#266433] font-black text-xs tracking-widest uppercase px-3.5 py-1 rounded-full border border-[#266433]/20 font-montserrat">NUESTRAS 3 RECETAS</span>
            <h2 className="font-fantony text-[#266433] font-black text-3xl sm:text-4xl py-3 uppercase tracking-wide">Sabores Disponibles</h2>
          </div>
          <Link to="/planes" className="hidden sm:flex items-center text-[#FE4811] font-black text-sm hover:underline font-montserrat">
            Ver tabla de precios <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RECETAS.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl p-5 border-2 border-slate-100 hover:border-[#266433] transition-all duration-300 hover:shadow-xl flex flex-col">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-50">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <span className={`absolute top-3 left-3 ${product.badgeBg} text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase font-montserrat`}>
                  {product.badge}
                </span>
              </div>
              <span className="text-[11px] font-black text-[#266433] uppercase tracking-wider block mb-1 font-montserrat">{product.category}</span>
              <h3 className="font-fantony font-black text-slate-900 text-xl leading-snug mb-1">{product.name}</h3>
              <p className="text-xs text-slate-500 font-bold mb-3 font-montserrat">{product.flavorTag}</p>
              <p className="text-xs text-slate-600 mb-4 font-montserrat leading-relaxed">{product.ingredients}</p>
              <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block font-montserrat">Planes desde</span>
                  <span className="font-fantony text-xl font-black text-[#266433]">S/ 65.00</span>
                </div>
                <button 
                  onClick={() => handleWhatsAppOrder(`¡Hola Patita Verde! 🐾 Me interesa la ${product.name}. ¿Me ayudan a elegir el gramaje y plan ideal?`)} 
                  className="bg-[#266433] hover:bg-[#25D366] text-white px-4 py-2.5 rounded-xl transition-colors shadow-md flex items-center gap-2 text-xs font-black font-montserrat"
                >
                  <MessageCircle className="w-4 h-4" /> Consultar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const PlanesView = ({ handleWhatsAppOrder }: { handleWhatsAppOrder: (msg: string) => void }) => {
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>(['Pavo']);

  const toggleFlavor = (shortName: string) => {
    setSelectedFlavors(prev => {
      if (prev.includes(shortName)) {
        return prev.length > 1 ? prev.filter(f => f !== shortName) : prev;
      }
      if (prev.length >= 2) {
        return [prev[1], shortName];
      }
      return [...prev, shortName];
    });
  };

  const flavorsLabel = selectedFlavors.join(' + ');

  return (
    <section className="bg-[#F8FAFC] py-12 lg:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-[#CFD1FC] text-[#266433] font-black text-xs tracking-widest uppercase px-3.5 py-1 rounded-full font-montserrat">COMIDA DISEÑADA POR VETERINARIOS</span>
          <h1 className="font-fantony text-[#266433] font-black text-4xl sm:text-5xl py-3 uppercase">Nuestras Recetas y Planes</h1>
          <div className="w-16 h-1.5 bg-[#FE4811] mx-auto rounded-full mb-4" />
          <p className="text-slate-600 font-medium font-montserrat">
            Contamos con <strong>3 sabores naturales</strong> (Pavo, Pollo y Mix Cordero & Cerdo) en presentaciones desde <strong>200g hasta 1800g</strong> para perros, y <strong>180g</strong> para gatos. Puedes combinar hasta <strong>2 sabores</strong> en tu plan.
          </p>
        </div>

        {/* 1. LAS 3 RECETAS Y SELECTOR DE COMBINACIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {RECETAS.map((receta) => {
            const isSelected = selectedFlavors.includes(receta.shortName);
            return (
              <div 
                key={receta.id} 
                onClick={() => toggleFlavor(receta.shortName)}
                className={`bg-white rounded-3xl p-5 border-2 transition-all cursor-pointer flex flex-col ${isSelected ? 'border-[#266433] shadow-xl ring-2 ring-[#266433]/20' : 'border-slate-100 hover:border-[#CFD1FC]'}`}
              >
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                  <img src={receta.image} alt={receta.name} className="w-full h-full object-cover" />
                  <span className={`absolute top-2.5 left-2.5 ${receta.badgeBg} text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md uppercase font-montserrat`}>
                    {receta.badge}
                  </span>
                  <div className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase font-montserrat ${isSelected ? 'bg-[#266433] text-white' : 'bg-white/90 text-slate-600'}`}>
                    {isSelected ? '✓ Seleccionado' : '+ Combinar'}
                  </div>
                </div>
                <h3 className="font-fantony font-black text-[#266433] text-xl leading-tight mb-2">{receta.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-montserrat mb-3">{receta.ingredients}</p>
                <div className="mt-auto pt-2 flex items-center justify-between text-xs font-bold text-[#266433] font-montserrat">
                  <span>Clic para incluir en tu mix</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BARRA DE COMBINACIÓN ACTIVA */}
        <div className="bg-[#CFD1FC]/50 border-2 border-[#266433]/20 rounded-2xl p-4 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 font-montserrat">
          <div className="flex items-center gap-3">
            <PawPrint className="w-6 h-6 text-[#266433] shrink-0" />
            <div>
              <span className="text-xs font-black uppercase text-[#266433] block">Sabores seleccionados para tu pedido (máx. 2):</span>
              <span className="text-base font-black text-slate-900">{flavorsLabel}</span>
            </div>
          </div>
          <Link to="/calculadora" className="text-xs font-black bg-[#FE4811] text-white px-4 py-2.5 rounded-full hover:bg-[#e03e0a] transition-colors shrink-0">
            ¿No sabes qué gramaje elegir? Usa la Calculadora →
          </Link>
        </div>

        {/* 2. TABLA DE PRECIOS POR GRAMAJE */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-slate-100 overflow-hidden mb-14">
          <div className="p-6 sm:p-8 bg-[#266433] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-fantony font-black text-2xl sm:text-3xl uppercase">Tarifario Oficial por Gramaje</h2>
              <p className="text-xs sm:text-sm text-[#CFD1FC] font-montserrat mt-1">
                Todos los planes incluyen acceso a una <strong>Teleconsulta Veterinaria</strong>. El Plan de 7 días aplica solo para nuevos clientes.
              </p>
            </div>
            <span className="bg-[#FE4811] text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider self-start md:self-center font-montserrat">
              Precios en Soles (S/)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-montserrat">
              <thead>
                <tr className="bg-slate-100 text-slate-800 text-xs uppercase font-black border-b border-slate-200">
                  <th className="py-4 px-4 sm:px-6">Gramaje Diario</th>
                  <th className="py-4 px-4 bg-slate-900 text-white">
                    Plan 7 días
                    <span className="block text-[10px] font-normal text-[#CFD1FC] normal-case">(Solo nuevos clientes)</span>
                  </th>
                  <th className="py-4 px-4">Plan 14 días</th>
                  <th className="py-4 px-4 bg-[#CFD1FC]/40 text-[#266433]">Plan 28 días</th>
                  <th className="py-4 px-4">
                    Personalizados (Hipoalergénicos)
                    <span className="block text-[10px] font-bold text-[#FE4811] normal-case">(Solo 28 días)</span>
                  </th>
                  <th className="py-4 px-4 text-center">Pedir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {PLANES_PRECIOS.map((row) => (
                  <tr key={row.label} className={row.especie === 'gato' ? 'bg-[#CFD1FC]/25 font-bold' : 'hover:bg-slate-50 transition-colors'}>
                    <td className="py-3.5 px-4 sm:px-6 font-fantony font-black text-[#266433] text-base">
                      {row.label}
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900">S/ {row.plan7}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-700">S/ {row.plan14}</td>
                    <td className="py-3.5 px-4 font-black text-[#266433] bg-[#CFD1FC]/15">S/ {row.plan28}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      {row.personalizado28 ? `S/ ${row.personalizado28}` : <span className="text-xs text-slate-400">No aplica</span>}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleWhatsAppOrder(`¡Hola Patita Verde! 🐾 Quiero cotizar el plan de *${row.label}* en sabor(es): *${flavorsLabel}*. ¿Me brindan información para iniciar?`)}
                        className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black px-3.5 py-2 rounded-xl shadow-sm transition-transform hover:scale-105"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Elegir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. PLANES PERSONALIZADOS (HIPOALERGÉNICOS) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#266433]/15 shadow-lg mb-14 font-montserrat">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-2/3">
              <span className="bg-[#FE4811]/10 text-[#FE4811] font-black text-xs uppercase px-3 py-1 rounded-full">OPCIONES HIPOALERGÉNICAS</span>
              <h3 className="font-fantony font-black text-[#266433] text-2xl sm:text-3xl mt-3 mb-3">Planes Personalizados (Hipoalergénicos - 28 días)</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                En nuestros <strong>planes de 28 días</strong> podemos retirar alguno de los ingredientes de nuestra receta base si tu mascota presenta intolerancia o alergia alimentaria:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                  <strong className="text-[#266433] block mb-1">Sin Menudencia</strong>
                  <span className="text-slate-600">Retiramos la menudencia de la receta base.</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                  <strong className="text-[#266433] block mb-1">Sin Espinaca</strong>
                  <span className="text-slate-600">Retiramos la espinaca de la receta base.</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                  <strong className="text-[#266433] block mb-1">Sin Avena</strong>
                  <span className="text-slate-600">Retiramos la avena de la receta base.</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 w-full bg-[#CFD1FC]/35 p-6 rounded-2xl border border-[#266433]/20 text-center">
              <Stethoscope className="w-10 h-10 text-[#266433] mx-auto mb-3" />
              <h4 className="font-fantony font-black text-[#266433] text-lg mb-2">Consulta Hipoalergénica</h4>
              <p className="text-xs text-slate-700 mb-4">Indícanos qué ingrediente de nuestras recetas debemos retirar para tu plan de 28 días.</p>
              <button
                onClick={() => handleWhatsAppOrder(`¡Hola Patita Verde! 🐾 Me interesa un *Plan Personalizado (Hipoalergénico) de 28 días* retirando un ingrediente en sabor(es): *${flavorsLabel}*.`)}
                className="w-full bg-[#266433] hover:bg-[#1f5028] text-white font-black text-xs py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> CONSULTAR PLAN HIPOALERGÉNICO
              </button>
            </div>
          </div>
        </div>

        {/* 4. CRONOGRAMA DE REPARTO */}
        <div id="zonas-delivery" className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-100 shadow-lg font-montserrat">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-6 h-6 text-[#FE4811]" />
            <h3 className="font-fantony font-black text-[#266433] text-2xl sm:text-3xl uppercase">Zonas y Días de Reparto</h3>
          </div>
          <p className="text-sm text-slate-600 mb-6">Consulta el día de entrega correspondiente a tu distrito en Lima Metropolitana y Callao:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {ZONAS_DELIVERY.map((zona) => (
              <div key={zona.dia} className="rounded-2xl border border-slate-200 overflow-hidden flex flex-col bg-[#F8FAFC]">
                <div className={`${zona.color} py-3 px-4 font-fantony font-black text-center text-sm uppercase tracking-wide flex items-center justify-center gap-1.5`}>
                  <Calendar className="w-4 h-4" /> {zona.dia}
                </div>
                <ul className="p-4 space-y-1.5 text-xs font-bold text-slate-700 flex-1">
                  {zona.distritos.map((distrito) => (
                    <li key={distrito} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#266433]" />
                      {distrito}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const NutricionistasView = ({ handleWhatsAppOrder }: { handleWhatsAppOrder: (msg: string) => void }) => (
  <section className="bg-white py-12 lg:py-20 min-h-screen">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="bg-[#CFD1FC] text-[#266433] font-black text-xs tracking-widest uppercase px-3.5 py-1 rounded-full font-montserrat">COMIDA DISEÑADA POR VETERINARIOS</span>
        <h1 className="font-fantony text-[#266433] font-black text-4xl sm:text-5xl py-3 uppercase">Respaldo Veterinario</h1>
        <p className="text-slate-600 font-medium font-montserrat">
          Nuestras recetas están formuladas y supervisadas por un médico veterinario especialista, cuidando el balance nutricional de perros y gatos.
        </p>
      </div>

      {/* PROMOCIÓN TELECONSULTA */}
      <div className="bg-[#CFD1FC]/45 border-2 border-[#266433]/20 rounded-3xl p-8 sm:p-10 mb-12 font-montserrat">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 bg-[#FE4811] text-white text-xs font-black px-3.5 py-1 rounded-full uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Beneficio Exclusivo por tu Plan
            </div>
            <h2 className="font-fantony font-black text-[#266433] text-2xl sm:text-3xl mb-3">
              Teleconsulta Veterinaria incluida con tu compra
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed mb-5">
              Contamos con un doctor veterinario que cubre nuestras teleconsultas para orientarte sobre la transición alimentaria, porciones ideales y opciones hipoalergénicas de nuestras recetas en planes de 28 días.
            </p>
            <ul className="space-y-2.5 text-xs font-bold text-[#266433]">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FE4811]" /> Evaluación de peso, etapa de vida y nivel de actividad.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FE4811]" /> Guía de transición progresiva de croquetas a alimento natural cocido.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#FE4811]" /> Orientación para retirar ingredientes específicos en planes hipoalergénicos de 28 días.</li>
            </ul>
          </div>
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#266433]/15 shadow-md text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#266433]/10 flex items-center justify-center text-[#266433] mb-4">
              <Stethoscope className="w-10 h-10" />
            </div>
            <h3 className="font-fantony font-black text-[#266433] text-xl mb-1">Área Veterinaria</h3>
            <p className="text-xs text-slate-500 font-bold mb-5">Patita Verde • Nutrición Clínica</p>
            <button
              onClick={() => handleWhatsAppOrder('¡Hola Patita Verde! 🐾 Quisiera información sobre los planes y el acceso a la *Teleconsulta Veterinaria*.')}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs py-3.5 px-4 rounded-full shadow-md transition-transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> CONSULTAR POR WHATSAPP
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CalculadoraView = () => {
  const [calcData, setCalcData] = useState<MascotaCalculadora>({
    nombre: '', distrito: '', especie: 'perro', edad: 'adulto', peso: 12, actividad: 'moderada', condicion: 'ideal'
  });
  const [calcResult, setCalcResult] = useState<number>(0);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>(['Pavo', 'Pollo']);
  const [esPersonalizado, setEsPersonalizado] = useState<boolean>(false);

  const diasRepartoDistrito = getDiasRepartoPorDistrito(calcData.distrito);

  const toggleFlavor = (shortName: string) => {
    setSelectedFlavors(prev => {
      if (prev.includes(shortName)) {
        return prev.length > 1 ? prev.filter(f => f !== shortName) : prev;
      }
      if (prev.length >= 2) {
        return [prev[1], shortName];
      }
      return [...prev, shortName];
    });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (calcData.especie === 'gato') {
      setCalcResult(180);
      setEsPersonalizado(false);
      return;
    }
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

  // Encontrar la presentación comercial más cercana de la tabla oficial
  const getRecommendedTier = (): PrecioGramaje => {
    if (calcData.especie === 'gato') {
      return PLANES_PRECIOS.find(p => p.especie === 'gato')!;
    }
    const dogTiers = PLANES_PRECIOS.filter(p => p.especie === 'perro');
    return dogTiers.reduce((prev, curr) =>
      Math.abs(curr.gramaje - calcResult) < Math.abs(prev.gramaje - calcResult) ? curr : prev
    );
  };

  const recommendedTier = calcResult > 0 ? getRecommendedTier() : null;
  const flavorsText = selectedFlavors.join(' + ');

  return (
    <section className="bg-[#BEC1E5]/20 py-12 lg:py-20 min-h-screen font-montserrat">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#266433]/15">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#4450FD] text-white px-3 py-1 rounded-full mb-3 shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-black tracking-widest uppercase">COMIDA DISEÑADA POR VETERINARIOS</span>
            </div>
            <h1 className="font-fantony text-[#266433] font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight">Calculadora Nutricional</h1>
            <p className="text-slate-600 font-medium mt-3">Calcula el gramaje diario ideal según el peso y actividad de tu mascota, conoce tu día de reparto y cotiza su plan al instante.</p>
          </div>

          <form onSubmit={handleCalculate} className="space-y-6">
            {/* Selector Perro / Gato */}
            <div>
              <label className="block text-xs font-black text-[#266433] uppercase tracking-wider mb-2">¿Para quién es el plan?</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => { setCalcData({ ...calcData, especie: 'perro' }); setCalcResult(0); }}
                  className={`py-3.5 px-4 rounded-2xl font-black text-sm border-2 transition-all ${calcData.especie === 'perro' ? 'bg-[#266433] text-white border-[#266433]' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                >
                  🐶 Perro (200g - 1800g)
                </button>
                <button
                  type="button"
                  onClick={() => { setCalcData({ ...calcData, especie: 'gato' }); setCalcResult(0); }}
                  className={`py-3.5 px-4 rounded-2xl font-black text-sm border-2 transition-all ${calcData.especie === 'gato' ? 'bg-[#266433] text-white border-[#266433]' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                >
                  🐱 Gato (Presentación 180g)
                </button>
              </div>
            </div>

            {/* Nombre y Distrito juntos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-[#266433] uppercase tracking-wider mb-2">Nombre de tu mascota</label>
                <input type="text" placeholder="Ej. Max, Luna..." value={calcData.nombre} onChange={(e) => setCalcData({...calcData, nombre: e.target.value})} className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:outline-none focus:border-[#266433] font-bold text-slate-800 transition-colors"/>
              </div>

              <div>
                <label className="block text-xs font-black text-[#266433] uppercase tracking-wider mb-2">Distrito de entrega *</label>
                <select
                  required
                  value={calcData.distrito}
                  onChange={(e) => setCalcData({ ...calcData, distrito: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:outline-none focus:border-[#266433] font-bold text-slate-800 appearance-none"
                >
                  <option value="">Selecciona tu distrito...</option>
                  {TODOS_DISTRITOS.map((distrito) => (
                    <option key={distrito} value={distrito}>{distrito}</option>
                  ))}
                  <option value="Otro">Otro distrito de Lima / Callao</option>
                </select>
                {calcData.distrito && (
                  <p className="mt-2 text-xs font-extrabold text-[#266433] flex items-center gap-1.5 bg-[#CFD1FC]/40 px-3 py-1.5 rounded-xl">
                    <Truck className="w-4 h-4 text-[#FE4811] shrink-0" />
                    <span>Reparto en {calcData.distrito}: <strong className="text-[#FE4811]">{diasRepartoDistrito}</strong></span>
                  </p>
                )}
              </div>

              {calcData.especie === 'perro' && (
                <>
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
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-[#266433] uppercase tracking-wider mb-2">Nivel de Actividad</label>
                    <select value={calcData.actividad} onChange={(e) => setCalcData({...calcData, actividad: e.target.value as any})} className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:outline-none focus:border-[#266433] font-bold text-slate-800 appearance-none">
                      <option value="baja">Baja (Paseos cortos, duerme mucho)</option>
                      <option value="moderada">Moderada (1 hora de paseo al día)</option>
                      <option value="alta">Alta (Muy activo, corre, deportista)</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            {/* Combinación de hasta 2 sabores */}
            <div>
              <label className="block text-xs font-black text-[#266433] uppercase tracking-wider mb-2">
                Elige hasta 2 sabores para combinar en tu plan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {RECETAS.map((r) => {
                  const active = selectedFlavors.includes(r.shortName);
                  return (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => toggleFlavor(r.shortName)}
                      className={`p-3 rounded-2xl border-2 text-xs font-black transition-all flex items-center justify-between ${active ? 'border-[#266433] bg-[#CFD1FC]/30 text-[#266433]' : 'border-slate-200 bg-slate-50 text-slate-600'}`}
                    >
                      <span>{r.shortName}</span>
                      <span>{active ? '✓' : '+'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Opción Plan Personalizado Hipoalergénico (solo Perros) */}
            {calcData.especie === 'perro' && (
              <label className="flex items-start gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={esPersonalizado}
                  onChange={(e) => setEsPersonalizado(e.target.checked)}
                  className="mt-1 accent-[#266433] w-4 h-4"
                />
                <span className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-[#266433] block">Planes Personalizados (Hipoalergénicos - 28 días)</strong>
                  Podemos retirar alguno de los ingredientes (como menudencia, espinaca o avena) en planes de 28 días.
                </span>
              </label>
            )}

            <button type="submit" className="w-full bg-[#FE4811] hover:bg-[#e03e0a] text-white font-fantony font-black text-lg py-4 px-6 rounded-2xl shadow-xl transition-transform hover:scale-[1.02] flex justify-center items-center gap-2">
              <Calculator className="w-5 h-5" /> CALCULAR RACIÓN Y VER PRECIOS
            </button>
          </form>

          {calcResult > 0 && recommendedTier && (
            <div className="mt-10 animate-fade-in border-t-2 border-dashed border-slate-200 pt-8">
              <div className="bg-[#CFD1FC]/40 rounded-3xl p-6 md:p-8 border-2 border-[#266433]/20 text-center">
                <h3 className="font-fantony font-black text-[#266433] text-2xl mb-1">
                  {calcData.nombre ? `Plan ideal para ${calcData.nombre}` : 'Tu plan recomendado'}
                </h3>
                <p className="text-xs font-bold text-slate-600 mb-3">
                  {calcData.especie === 'perro'
                    ? `Cálculo estimado: ${calcResult}g/día • Presentación recomendada: ${recommendedTier.label}`
                    : 'Presentación especial para gatos: 180g'}
                </p>

                <div className="text-4xl sm:text-5xl font-fantony font-black text-[#FE4811] my-3">
                  Presentación {recommendedTier.label}
                </div>
                <p className="text-xs font-black text-[#266433] uppercase mb-4">
                  Sabores: {flavorsText} {esPersonalizado ? '• Plan Hipoalergénico (28 días)' : ''}
                </p>

                {calcData.distrito && (
                  <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#266433]/20 text-xs font-extrabold text-[#266433] mb-6 shadow-sm">
                    <MapPin className="w-4 h-4 text-[#FE4811]" />
                    <span>Distrito: <strong>{calcData.distrito}</strong> • Días de reparto: <strong className="text-[#FE4811]">{diasRepartoDistrito}</strong></span>
                  </div>
                )}

                {/* Tarjetas de precios según tabla oficial */}
                {esPersonalizado && recommendedTier.personalizado28 ? (
                  <div className="max-w-sm mx-auto bg-white p-5 rounded-2xl border-2 border-[#266433] mb-6 shadow-md">
                    <span className="text-xs font-black text-[#FE4811] uppercase block">Plan Personalizado (Hipoalergénico) • 28 días</span>
                    <span className="font-fantony font-black text-3xl text-[#266433] block my-1">S/ {recommendedTier.personalizado28}</span>
                    <span className="text-[11px] text-slate-500 font-bold">Incluye Teleconsulta Veterinaria</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                      <span className="text-[11px] font-black text-slate-800 uppercase block">Plan 7 días</span>
                      <span className="text-[10px] text-[#FE4811] font-bold block mb-1">(Nuevos clientes)</span>
                      <span className="font-fantony font-black text-2xl text-[#266433]">S/ {recommendedTier.plan7}</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                      <span className="text-[11px] font-black text-slate-800 uppercase block">Plan 14 días</span>
                      <span className="text-[10px] text-slate-400 font-bold block mb-1">Quincenal</span>
                      <span className="font-fantony font-black text-2xl text-[#266433]">S/ {recommendedTier.plan14}</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border-2 border-[#266433] shadow-md">
                      <span className="text-[11px] font-black text-[#266433] uppercase block">Plan 28 días</span>
                      <span className="text-[10px] text-[#266433] font-bold block mb-1">Mensual + Teleconsulta</span>
                      <span className="font-fantony font-black text-2xl text-[#266433]">S/ {recommendedTier.plan28}</span>
                    </div>
                  </div>
                )}

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `¡Hola Patita Verde! 🐾 Usé la calculadora nutricional.\n` +
                    `• Mascota: ${calcData.especie.toUpperCase()}${calcData.nombre ? ` (${calcData.nombre})` : ''}\n` +
                    (calcData.distrito ? `• Distrito: ${calcData.distrito} (Reparto: ${diasRepartoDistrito})\n` : '') +
                    (calcData.especie === 'perro' ? `• Peso: ${calcData.peso}kg | Actividad: ${calcData.actividad}\n` : '') +
                    `• Presentación: ${recommendedTier.label}\n` +
                    `• Sabores: ${flavorsText}\n` +
                    (esPersonalizado ? `• Modalidad: Plan Personalizado (Hipoalergénico) 28 días (S/ ${recommendedTier.personalizado28})\n` : '') +
                    `Quisiera solicitar mi plan y coordinar la teleconsulta veterinaria.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-sm px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105 gap-2 uppercase tracking-wide"
                >
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

  const addToCart = (receta: RecetaPlan, size: string) => {
    const newItem: CartItem = {
      id: `${receta.id}-${size}-${Date.now()}`, productId: receta.id, name: receta.name, size, price: 0, quantity: 1, image: receta.image
    };
    setCart(prev => [...prev, newItem]);
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  */

  // --- FASE 1: Redirección directa a WhatsApp
  const handleWhatsAppOrder = (customMessage: string) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(customMessage)}`, '_blank');
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
        <Stethoscope className="w-4 h-4 text-[#CFD1FC] shrink-0" />
        <span>
          COMIDA DISEÑADA POR VETERINARIOS • TELECONSULTA INCLUIDA CON TU PLAN. CONOCE MÁS{' '}
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
                  src="/img/Logotipos-sinslogan-01.png" 
                  alt="Logo Patita Verde" 
                  className="h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
                />
              </Link>

              {/* Desktop Links */}
              <div className="hidden lg:flex items-center space-x-2">
                <Link to="/" className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${getNavClass('/')}`}>Inicio</Link>
                <Link to="/planes" className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${getNavClass('/planes')}`}>Nuestros Planes</Link>
                <Link to="/nutricionistas" className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${getNavClass('/nutricionistas')}`}>Veterinario</Link>
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
            <Link to="/nutricionistas" className="block w-full text-left px-4 py-3 rounded-xl font-extrabold text-[#266433] hover:bg-white/60">Veterinario</Link>
            <Link to="/calculadora" className="block w-full text-left px-4 py-3 rounded-xl font-extrabold bg-[#FE4811] text-white shadow-md">Calculadora de Porciones</Link>
          </div>
        )}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomeView handleWhatsAppOrder={handleWhatsAppOrder} />} />
          <Route path="/planes" element={<PlanesView handleWhatsAppOrder={handleWhatsAppOrder} />} />
          <Route path="/nutricionistas" element={<NutricionistasView handleWhatsAppOrder={handleWhatsAppOrder} />} />
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
              <p className="text-xs text-[#CFD1FC]/80 leading-relaxed max-w-xs font-montserrat">
                Comida diseñada por veterinarios. Recetas naturales de Pavo, Pollo y Mix Cordero & Cerdo para perros y gatos.
              </p>
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
                <li><Link to="/planes#zonas-delivery" className="hover:text-[#CFD1FC]">Zonas y Días de Reparto</Link></li>
                <li><Link to="/nutricionistas" className="hover:text-[#CFD1FC]">Teleconsulta Veterinaria</Link></li>                
                <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#CFD1FC]">Contacto WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#CFD1FC]/70 gap-4 font-montserrat">
            <p>© 2026 PATITA VERDE. Desarrollado por ALXSOLUTIONS.</p>
            <p className="flex items-center gap-1.5">Hecho con <Heart className="w-3.5 h-3.5 text-[#FE4811] fill-[#FE4811]" /> para perritos y gatitos felices.</p>
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
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
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
              </div>
            )}
          </div>
        </div>
      )}
      */}
    </div>
  );
}