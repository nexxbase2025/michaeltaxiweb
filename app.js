
const WA_NUMBER = "12039478462";
const CALL_TEL  = "tel:+12039478462";

const dict = {
  es: {
    slogan: "Tu viaje, a tiempo y seguro",
    nav_services: "Servicios",
    nav_auction: "Subastas",
    nav_reviews: "Calificar",
    nav_contact: "Pedir servicio",
    nav_music: "Música",
    btn_whatsapp: "WhatsApp (203)",

    hero_title: "Traslados profesionales dentro y fuera del estado",
    hero_sub: "Aeropuertos, delivery, prueba del DMV, jump start, lockout y más. Respuesta rápida por WhatsApp.",
    btn_book: "Pedir servicio",
    btn_services: "Ver servicios",
    b1: "Disponible",
    b2: "Confiable",
    b3: "Ubicación",

    services_title: "Servicios",
    services_sub: "Elige tu servicio. Cada tarjeta tiene imagen JPG/PNG reemplazable.",

    svc_airports_t: "Traslados a los Aeropuertos",
    svc_airports_d: "Puntuales, cómodos y con coordinación por WhatsApp desde/hacia cualquier aeropuerto.",
    svc_delivery_t: "Delivery",
    svc_delivery_d: "Comida, medicina, bebidas y más. Entrega rápida con confirmación.",
    svc_dmv_t: "Vehículo para Prueba del DMV",
    svc_dmv_d: "Renta de vehículo para tu road test. Agenda con tiempo.",
    svc_jump_t: "Jump Start",
    svc_jump_d: "¿Batería descargada? Te ayudamos a encender tu carro rápido.",
    svc_lock_t: "Lockout",
    svc_lock_d: "Si dejaste las llaves dentro, abrimos tu vehículo con herramientas propias.",

    auction_title: "Te ayudamos a comprar tu vehículo en subastas",
    auction_sub: "No importa si no tienes licencia de dealer: te guiamos para comprar seguro y a buen precio.",
    auction_b1: "Opciones amplias y precios accesibles.",
    auction_b2: "Acompañamiento paso a paso.",
    auction_b3: "Asesoría para elegir mejor.",
    auction_cta: "Quiero información",

    reviews_title: "Calificar en Google",
    reviews_btn: "Calificar en Google",
    reviews_note: "Abre Google Maps y deja estrellitas en segundos.",

    form_title: "Pedir servicio",
    form_name: "Nombre",
    form_last: "Apellido",
    form_addr: "Dirección",
    form_service: "¿Qué servicio necesitas?",
    form_location: "Ubicación actual (opcional)",
    form_loc: "Agregar mi ubicación actual",
    form_send: "Enviar por WhatsApp",

    music_title: "Música",

    designed_by: "Diseñado por",

    wa_welcome: "¿A dónde te llevamos o qué servicio necesitas?",
    wa_call: "Llamar",
    wa_msg: "Mensaje",
  },

  en: {
    slogan: "On time. Safe. Professional.",
    nav_services: "Services",
    nav_auction: "Auctions",
    nav_reviews: "Rate",
    nav_contact: "Request service",
    nav_music: "Music",
    btn_whatsapp: "WhatsApp (203)",

    hero_title: "Professional rides in and out of state",
    hero_sub: "Airports, delivery, DMV road test car, jump start, lockout and more. Fast replies on WhatsApp.",
    btn_book: "Request service",
    btn_services: "View services",
    b1: "Available",
    b2: "Reliable",
    b3: "Location",

    services_title: "Services",
    services_sub: "Pick your service. Each card has a replaceable JPG/PNG image.",

    svc_airports_t: "Airport Transfers",
    svc_airports_d: "On-time, comfortable rides coordinated via WhatsApp to/from any airport.",
    svc_delivery_t: "Delivery",
    svc_delivery_d: "Food, medicine, beverages and more. Fast delivery with confirmation.",
    svc_dmv_t: "DMV Road Test Car",
    svc_dmv_d: "Car rental for your road test. Schedule ahead.",
    svc_jump_t: "Jump Start",
    svc_jump_d: "Dead battery? We’ll get your car started fast.",
    svc_lock_t: "Lockout",
    svc_lock_d: "Keys locked inside? We can open your vehicle with proper tools.",

    auction_title: "We help you buy a vehicle at auctions",
    auction_sub: "No dealer license? No problem—guidance to buy safely at a good price.",
    auction_b1: "Wide options and affordable prices.",
    auction_b2: "Step-by-step guidance.",
    auction_b3: "Help choosing better.",
    auction_cta: "I want info",

    reviews_title: "Rate on Google",
    reviews_btn: "Rate on Google",
    reviews_note: "Open Google Maps and leave stars in seconds.",

    form_title: "Request service",
    form_name: "First name",
    form_last: "Last name",
    form_addr: "Address",
    form_service: "What service do you need?",
    form_location: "Current location (optional)",
    form_loc: "Add my current location",
    form_send: "Send via WhatsApp",

    music_title: "Music",

    designed_by: "Designed by",

    wa_welcome: "Where are we taking you, or what service do you need?",
    wa_call: "Call",
    wa_msg: "Message",
  }
};

function preferredLang(){
  const lang = (navigator.language || "en").toLowerCase();
  return lang.startsWith("es") ? "es" : "en";
}

function applyI18n(lang){
  const t = dict[lang] || dict.en;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.textContent = t[key];
  });

  const waMsg = document.getElementById("waMsg");
  const waCall = document.getElementById("waCall");
  if (waCall) waCall.href = CALL_TEL;
  if (waMsg) waMsg.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.wa_welcome)}`;
}

/* Drawer menu (IDs reales del index) */
function setupDrawer(){
  const drawer = document.getElementById("drawer");
  const openBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("drawerClose");
  const backdrop = document.getElementById("drawerBackdrop");

  if(!drawer || !openBtn || !closeBtn || !backdrop) return;

  const open = () => {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden","false");
    openBtn.setAttribute("aria-expanded","true");
    document.body.style.overflow = "hidden"; // evita “traba” rara en móviles
  };

  const close = () => {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden","true");
    openBtn.setAttribute("aria-expanded","false");
    document.body.style.overflow = "";
  };

  openBtn.addEventListener("click",(e)=>{ e.stopPropagation(); open(); });
  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);

  drawer.querySelectorAll("a.navlink").forEach(a=>{
    a.addEventListener("click",(e)=>{
      const href = a.getAttribute("href");
      const target = href ? document.querySelector(href) : null;
      if(!target) return;
      e.preventDefault();
      close();
      setTimeout(()=>{
        const y = target.getBoundingClientRect().top + window.pageYOffset - 84;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        history.replaceState(null,"",href);
      }, 10);
    });
  });

  document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") close(); });
}

/* WhatsApp bubble */
function setupWhatsAppPop(){
  const fab = document.getElementById("waFab");
  const pop = document.getElementById("waPop");
  if(!fab || !pop) return;

  const close = () => {
    pop.classList.remove("open");
    pop.setAttribute("aria-hidden","true");
  };

  fab.addEventListener("click",(e)=>{
    e.stopPropagation();
    const isOpen = pop.classList.contains("open");
    if(isOpen) close();
    else{
      pop.classList.add("open");
      pop.setAttribute("aria-hidden","false");
    }
  });

  document.addEventListener("click", close);
  pop.addEventListener("click",(e)=>e.stopPropagation());
}

/* Booking form */
function setupBookingForm(){
  const form = document.getElementById("bookingForm");
  if(!form) return;

  const nameEl = document.getElementById("bkName");
  const lastEl = document.getElementById("bkLast");
  const addrEl = document.getElementById("bkAddr");
  const svcEl  = document.getElementById("bkService");
  const locEl  = document.getElementById("bkLoc");
  const locBtn = document.getElementById("bkLocBtn");

  locBtn?.addEventListener("click", ()=>{
    if(!navigator.geolocation){
      if(locEl) locEl.value = "Ubicación no disponible.";
      return;
    }
    if(locEl) locEl.value = "Obteniendo ubicación…";
    navigator.geolocation.getCurrentPosition(
      (pos)=>{
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        if(locEl) locEl.value = `https://maps.google.com/?q=${lat},${lng}`;
      },
      ()=>{ if(locEl) locEl.value = "No se pudo obtener la ubicación."; },
      { enableHighAccuracy:true, timeout:9000, maximumAge:0 }
    );
  });

  form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const name = (nameEl?.value || "").trim();
    const last = (lastEl?.value || "").trim();
    const addr = (addrEl?.value || "").trim();
    const svc  = (svcEl?.value || "").trim();
    const loc  = (locEl?.value || "").trim();

    const lines = [];
    lines.push("MICHAEL TAXI — Solicitud de servicio");
    if(name || last) lines.push(`Nombre: ${name} ${last}`.trim());
    if(svc) lines.push(`Servicio: ${svc}`);
    if(addr) lines.push(`Dirección: ${addr}`);
    if(loc) lines.push(`Ubicación: ${loc}`);

    const msg = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank", "noopener");
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  applyI18n(preferredLang());
  setupDrawer();
  setupWhatsAppPop();
  setupBookingForm();
});
