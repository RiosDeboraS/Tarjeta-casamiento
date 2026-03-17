import React, { useState, useEffect} from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, Sparkles, MessageCircle, Wallet } from "lucide-react";

// ==========================
// 🍃 DarkPetalsLayer (Efecto de hojas)
// ==========================
function DarkPetalsLayer() {
  const petals = React.useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -100, x: `${p.left}vw`, rotate: 0, opacity: 0 }}
          animate={{
            y: "110vh",
            x: [`${p.left}vw`, `${p.left + 5}vw`, `${p.left - 5}vw`],
            rotate: 360,
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          className="absolute"
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 6 10 6 15C6 18.3137 8.68629 21 12 21C15.3137 21 18 18.3137 18 15C18 10 12 2 12 2Z" fill="#2D3528" opacity="0.6"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ==========================
// ✨ Lógica del Temporizador
// ==========================
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ días: 0, horas: 0, min: 0, seg: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-09-26T21:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          días: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          min: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seg: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16 max-w-lg mx-auto py-10">
      {Object.entries(timeLeft).map(([label, val]) => (
        <div key={label} className="text-center border border-[#BFA17E]/10 rounded-xl p-4 md:p-6 bg-[#0A0C08]/20 shadow-sm backdrop-blur-sm">
          <motion.div 
            key={val}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extralight text-[#FDF7E3] mb-1"
          >
            {val}
          </motion.div>
          <div className="text-[9px] md:text-[11px] tracking-widest text-[#BFA17E] opacity-70 uppercase font-bold">{label}</div>
        </div>
      ))}
    </div>
  );
}

const GoldenDivider = () => (
  <div className="flex items-center justify-center my-20 gap-4 opacity-40">
    <div className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-[#BFA17E]" />
    <Sparkles className="w-3 h-3 text-[#BFA17E]" />
    <div className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-[#BFA17E]" />
  </div>
);

// ==========================
// ✨ IntroTrees
// ==========================
function IntroTrees({ children }) {
  const [open, setOpen] = useState(false);
  const [openFinished, setOpenFinished] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOpen(true), 1500); 
    const t2 = setTimeout(() => setOpenFinished(true), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0F110E] overflow-hidden">
      <AnimatePresence>
        {!openFinished && (
          <motion.div className="fixed inset-0 z-[9999] flex" exit={{ opacity: 0 }}>
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: open ? "-100%" : 0 }}
              transition={{ duration: 3, ease: [0.7, 0, 0.3, 1] }}
              className="flex-1 bg-[#0A0C08] border-r border-[#BFA17E]/10 relative overflow-hidden"
            >
               <DarkPetalsLayer />
            </motion.div>
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: open ? "100%" : 0 }}
              transition={{ duration: 3, ease: [0.7, 0, 0.3, 1] }}
              className="flex-1 bg-[#0A0C08] border-l border-[#BFA17E]/10 relative overflow-hidden"
            >
               <DarkPetalsLayer />
            </motion.div>
            {!open && (
              <motion.div className="absolute inset-0 flex items-center justify-center z-[100]">
                 <div className="text-center">
                    <span className="text-[#BFA17E] tracking-[0.5em] text-[10px] uppercase mb-4 block">Mágico Destino</span>
                    <h1 className="text-6xl md:text-8xl font-script text-[#FDF7E3] drop-shadow-[0_0_20px_rgba(191,161,126,0.8)] px-4">Kevin & Debora</h1>
                 </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div animate={{ opacity: open ? 1 : 0 }} transition={{ duration: 2.5 }}>
        {children}
      </motion.div>
    </div>
  );
}

// ==========================
// ✨ App Component
// ==========================
export default function App() {
  return (
    <IntroTrees>
      <div className="relative min-h-screen bg-[#0F110E] text-[#FDF7E3] font-light selection:bg-[#BFA17E]/30">
        <DarkPetalsLayer />
        
        <div className="fixed inset-6 md:inset-8 border border-[#BFA17E]/15 pointer-events-none z-50" />

        <main className="max-w-4xl mx-auto pt-32 pb-40 px-6 relative z-10">
          
          <section className="text-center mb-28">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#BFA17E] mb-12 opacity-80 font-bold">NUESTRA BODA</h2>
            <h1 className="text-6xl md:text-6xl font-script text-[#FDF7E3] mb-4 drop-shadow-[0_2px_15px_rgba(191,161,126,0.6)]">Kevin & Debora</h1>
            <p className="text-xs uppercase tracking-[0.6em] opacity-50 mt-8">Septiembre 26 . 2026</p>
          </section>

          <GoldenDivider />

          {/* CONTADOR FUNCIONAL & FECHA - Letras Fuertes */}
          <section className="mb-28 px-4">
            <CountdownTimer />
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 py-10 border-y border-[#BFA17E]/10 bg-[#0A0C08]/20 backdrop-blur-sm rounded-xl">
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-[#BFA17E] opacity-70" />
                <span className="text-[15px] tracking-[0.3em] uppercase font-bold">26 . 09 . 2026</span>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="w-5 h-5 text-[#BFA17E] opacity-70" />
                <span className="text-[11px] tracking-[0.3em] uppercase font-bold">20:00 Horas</span>
              </div>
            </div>
          </section>

          <GoldenDivider />

         {/* PRECIOS - Corregido y Centrado */}
<section className="mb-28 text-center px-4 flex justify-center">
  <div className="border border-[#BFA17E]/10 bg-[#161A13]/40 backdrop-blur-md p-10 md:p-16 w-full max-w-2xl rounded-2xl shadow-xl">
    <Wallet className="w-6 h-6 mx-auto mb-10 text-[#BFA17E] opacity-40" />
    <h3 className="text-[11px] md:text-xs uppercase tracking-[0.5em] text-[#BFA17E] mb-16 font-bold">
      Valor de la Tarjeta
    </h3>

    <div className="space-y-10 max-w-md mx-auto">
      <div className="flex justify-between items-end border-b border-[#BFA17E]/10 pb-5">
        <span className="text-xs md:text-sm uppercase tracking-[0.2em] opacity-80 font-bold text-left">
          Adultos
        </span>
        <span className="text-3xl font-serif font-light text-[#FDF7E3] leading-none">
          $90.000
        </span>
      </div>
      
      <div className="flex justify-between items-end border-b border-[#BFA17E]/10 pb-5">
        <div className="text-left">
          <span className="text-xs md:text-sm uppercase tracking-[0.2em] opacity-80 font-bold block">
            Niños
          </span>
          <span className="text-[10px] opacity-50 italic font-light block mt-1">
            (4 a 11 años inclusive)
          </span>
        </div>
        <span className="text-3xl font-serif font-light text-[#FDF7E3] leading-none">
          $70.000
        </span>
      </div>
    </div>
  </div>
</section>

<GoldenDivider />

{/* SECCIÓN: MENÚ DEL SERVICIO - Limpieza de etiquetas y espaciado */}
<section className="mb-28 text-center px-4">
  <h3 className="text-6xl md:text-7xl font-script text-[#FDF7E3] mb-12 drop-shadow-[0_2px_10px_rgba(191,161,126,0.4)]">
    Menú de Boda
  </h3>

  <div className="max-w-2xl mx-auto space-y-12">
    
    {/* I. Recepción */}
    <div className="group">
      <span className="text-[10px] uppercase tracking-[0.5em] text-[#BFA17E] font-bold block mb-2 opacity-60">I. Recepción</span>
      <h4 className="text-xl md:text-2xl font-serif text-[#FDF7E3] tracking-widest uppercase mb-3">Entrada</h4>
      <p className="text-xs md:text-sm text-[#FDF7E3]/70 font-light italic leading-relaxed">
        Tabla de fiambres, variedad de empanadas y sandwiches de miga.
      </p>
    </div>

    {/* II. Brindis */}
    <div className="group">
      <div className="h-[1px] w-8 bg-[#BFA17E]/20 mx-auto mb-8" />
      <span className="text-[10px] uppercase tracking-[0.5em] text-[#BFA17E] font-bold block mb-2 opacity-60">II. Brindis</span>
      <h4 className="text-xl md:text-2xl font-serif text-[#FDF7E3] tracking-widest uppercase mb-3">Barra de Tragos Libre</h4>
      
      <div className="text-xs md:text-sm text-[#FDF7E3]/70 font-light italic leading-relaxed space-y-4">
        <p>
          Vino Tinto Malbec (Alma Mora/Trumpeter) - Vino blanco dulce (Cosecha tardía/Dilema) - Cerveza Heineken - 
          Refrescos y Aguas.
        </p>
        <p className="text-[#BFA17E] not-italic font-bold tracking-widest uppercase text-[10px]">
          Barra Libre
        </p>
        <p>
          Fernet Branca con Coca - Gancia con Sprite - Campari con naranja - 
          Gintonic de frutos rojos y lima - Daikiris de frutilla y durazno 
          - Mojito - Cuba Libre.
        </p>
      </div>
    </div>

    {/* III. Plato Principal */}
    <div className="group border-y border-[#BFA17E]/10 py-10 my-10 bg-[#0A0C08]/10 backdrop-blur-sm">
      <span className="text-[10px] uppercase tracking-[0.5em] text-[#BFA17E] font-bold block mb-2 opacity-60">III. El Banquete</span>
      <h4 className="text-xl md:text-2xl font-serif text-[#FDF7E3] tracking-widest uppercase mb-3">Plato Principal</h4>
      <p className="text-xs md:text-sm text-[#FDF7E3]/70 font-light italic leading-relaxed">
        Vacío al horno con papas a la crema Verdeo.
      </p>
    </div>

    {/* IV. Postre */}
    <div className="group">
      <span className="text-[10px] uppercase tracking-[0.5em] text-[#BFA17E] font-bold block mb-2 opacity-60">IV. Dulce Final</span>
      <h4 className="text-xl md:text-2xl font-serif text-[#FDF7E3] tracking-widest uppercase mb-3">Postre</h4>
      <p className="text-xs md:text-sm text-[#FDF7E3]/70 font-light italic leading-relaxed">
        Delicias artesanales: Shots de Cheesecake, Tiramisú y Chocotorta. <br/>
        Bocaditos Selva Negra y Chajá. Tarteletitas Lemon Pie y Frutal.
      </p>
      <div className="h-[1px] w-8 bg-[#BFA17E]/20 mx-auto mt-8" />
    </div>

    {/* V. Trasnoche */}
    <div className="group pt-4">
      <span className="text-[10px] uppercase tracking-[0.5em] text-[#BFA17E] font-bold block mb-2 opacity-60">V. Energía</span>
      <h4 className="text-xl md:text-2xl font-serif text-[#FDF7E3] tracking-widest uppercase mb-3">Plato de Trasnoche</h4>
      <p className="text-xs md:text-sm text-[#FDF7E3]/70 font-light italic leading-relaxed">
        Para recargar fuerzas y seguir celebrando hasta el amanecer: <br/>
        Sandwiches de bondiola.
      </p>
    </div>

    {/* IMPORTANTE */}
    <div className="mt-16 pt-8 border-t border-[#BFA17E]/5">
      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#BFA17E] font-bold opacity-70">
        Importante
      </p>
      <p className="text-[10px] md:text-xs text-[#FDF7E3]/50 italic mt-3 max-w-md mx-auto leading-relaxed">
        Si tienes alguna restricción alimentaria (celíaco, vegano o alergias), por favor infórmanos al confirmar tu asistencia.
      </p>
    </div>
  </div>
</section>

          

          {/* MASCOTAS GRANDES - Trazos Dorados */}
          <section className="mb-28 text-center px-4 relative group">
             {/* Resplandor radial de fondo */}
            <div className="absolute inset-x-0 top-1/2 top-1/2 w-48 h-48 bg-[#BFA17E]/10 blur-[100px] rounded-full mx-auto scale-110 pointer-events-none z-0" />
          
            <div className="relative z-10">
              <img 
                src="src/public/img/Gemini_Generated_Image_gupdhfgupdhfgupd.svg" 
                className="w-full max-w-xl mx-auto opacity-100 transition-all duration-1000 transform group-hover:scale-[1.03]" 
                style={{
                    // Esto aplica un tinte dorado y resplandor al SVG
                    filter: "sepia(1) saturate(3) hue-rotate(-20deg) brightness(0.9) contrast(1.1) drop-shadow(0 0 12px rgba(191,161,126,0.6))",
                }}
                alt="Mascotas Mágicas"
              />
            </div>
          </section>

          <GoldenDivider />

          {/* UBICACIÓN & WHATSAPP - Diseño Simétrico y Elevado */}
<section className="grid md:grid-cols-2 gap-6 md:gap-8 text-center px-4 max-w-5xl mx-auto mb-28">
  
  {/* Tarjeta de Ubicación */}
  <div className="group p-10 border border-[#BFA17E]/10 bg-[#161A13]/30 backdrop-blur-md rounded-2xl flex flex-col items-center justify-between transition-all duration-500 hover:border-[#BFA17E]/30">
    <div>
      <MapPin className="w-6 h-6 mx-auto mb-6 text-[#BFA17E] opacity-50 group-hover:scale-110 transition-transform" />
      <h4 className="text-[10px] md:text-xs uppercase tracking-[0.5em] mb-6 text-[#BFA17E] font-bold">
        Ubicación
      </h4>
      <p className="text-xs md:text-sm leading-relaxed text-[#FDF7E3] opacity-80 uppercase tracking-[0.2em] font-light mb-8">
        Salón De Campo<br />
        <span className="text-[10px] opacity-60">Diamante, Entre Ríos</span>
      </p>
    </div>
    
    <a 
      href="https://www.google.com/maps/dir//Sal%C3%B3n+de+Eventos+%22De+Campo%22,+W9CM%2BV9,+Diamante,+Entre+R%C3%ADos/@-32.0693124,-60.637184,14z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x95b5cd006e53f0d9:0x82769ce655794512!2m2!1d-60.616563!2d-32.077816?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D" 
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full max-w-[220px] text-[9px] uppercase tracking-[0.4em] py-4 px-6 border border-[#BFA17E]/20 bg-[#BFA17E]/5 hover:bg-[#BFA17E]/20 transition-all font-bold text-[#FDF7E3] rounded-sm"
    >
      Ver en Mapa
    </a>
  </div>

  {/* Tarjeta de WhatsApp */}
  <div className="group p-10 border border-[#BFA17E]/10 bg-[#161A13]/30 backdrop-blur-md rounded-2xl flex flex-col items-center justify-between transition-all duration-500 hover:border-[#BFA17E]/30">
    <div>
      <MessageCircle className="w-6 h-6 mx-auto mb-6 text-[#BFA17E] opacity-50 group-hover:scale-110 transition-transform" />
      <h4 className="text-[10px] md:text-xs uppercase tracking-[0.5em] mb-6 text-[#BFA17E] font-bold">
        Asistencia
      </h4>
      <p className="text-xs md:text-sm leading-relaxed text-[#FDF7E3] opacity-80 uppercase tracking-[0.2em] font-light mb-8">
        Por favor confirmar<br />
        <span className="text-[10px] opacity-60">antes del 10 de Julio</span>
      </p>
    </div>

    <a 
      href="https://wa.me/5493434620534?text=Hola!%20Confirmo%20mi%20asistencia%20para%20la%20boda%20de%20Kevin%20y%20Debora."
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full max-w-[220px] text-[9px] uppercase tracking-[0.4em] py-4 px-6 border border-[#BFA17E]/20 bg-[#BFA17E]/5 hover:bg-[#BFA17E]/20 transition-all font-bold text-[#FDF7E3] rounded-sm shadow-[0_0_15px_rgba(191,161,126,0.05)]"
    >
      Confirmar por WhatsApp
    </a>
  </div>

</section>

        </main>

       <footer className="pb-16 pt-12 text-center flex flex-col items-center">
  {/* Siglas de la Boda - Ligeramente más pequeñas */}
  <div className="opacity-30 text-[14px] md:text-[16px] tracking-[0.8em] uppercase text-[#BFA17E] font-serif mb-10">
    K & D . MMXXVI
  </div>

  {/* Tu Firma - Estilo Micro-minimal */}
  <div className="flex flex-col items-center opacity-40 hover:opacity-70 transition-opacity duration-500">
    <div className="h-[0.5px] w-6 bg-[#BFA17E]/30 mb-4" />
    <a 
      href="https://github.com/tu-usuario" // Puedes cambiar el link
      target="_blank" 
      rel="noopener noreferrer"
      className="text-center"
    >
      <p className="text-[8px] tracking-[0.3em] uppercase text-[#FDF7E3] font-light">
        Dev. Rios Debora Sabrina
      </p>
      <span className="text-[7px] tracking-[0.2em] uppercase text-[#BFA17E]/60 mt-0.5 block">
        Software Developer
      </span>
    </a>
  </div>
</footer>
      </div>
    </IntroTrees>
  );
}