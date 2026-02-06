
const WA_NUMBER = "12039478462";
const CALL_TEL  = "tel:+12039478462";

const dict = {
  es: {
    slogan: "Tu viaje, a tiempo y seguro",
    nav_special: "Servicios Especiales",
    nav_contact: "Pedir servicio",
    hero_title: "Traslados profesionales dentro y fuera del estado",
    hero_sub: "Aeropuertos, delivery, prueba del DMV, jump start, lockout y más. Respuesta rápida por WhatsApp.",
    btn_book: "Pedir servicio",
    btn_call: "Llamar ahora",

    contact_title: "Pedir servicio",
    f_name: "Nombre",
    f_last: "Apellido",
    f_address: "Dirección",
    f_service: "Servicio",
    f_location: "Ubicación actual",
    btn_location: "Agregar ubicación",
    btn_send: "Enviar por WhatsApp",
    privacy: "Solo usaremos esta información para coordinar tu servicio.",

    wa_welcome: "¿A dónde te llevamos o qué servicio necesitas?",
    wa_call: "Llamar",
    wa_msg: "Mensaje",
  },
  en: {
    slogan: "On time. Safe. Professional.",
    nav_special: "Special Services",
    nav_contact: "Request service",
    hero_title: "Professional rides in and out of state",
    hero_sub: "Airports, delivery, DMV road test car, jump start, lockout and more. Fast replies on WhatsApp.",
    btn_book: "Request service",
    btn_call: "Call now",

    contact_title: "Request service",
    f_name: "First name",
    f_last: "Last name",
    f_address: "Address",
    f_service: "Service",
    f_location: "Current location",
    btn_location: "Add location",
    btn_send: "Send via WhatsApp",
    privacy: "We only use this info to coordinate your service.",

    wa_welcome: "Where are we taking you, or what service do you need?",
    wa_call: "Call",
    wa_msg: "Message",
  }
};

function preferredLang(){
  const l = (navigator.language || "en").toLowerCase();
  return l.startsWith("es") ? "es" : "en";
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

function setupHamburger(){
  const btn = document.getElementById("menuToggle");
  const menu = document.getElementById("mainMenu") || document.querySelector(".menu");
  if(!btn || !menu) return;

  const close = () => {
    menu.classList.remove("open");
    btn.setAttribute("aria-expanded","false");
  };

  btn.addEventListener("click", (e)=>{
    e.stopPropagation();
    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("click", close);
  menu.addEventListener("click", (e)=> e.stopPropagation());

  menu.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click", (e)=>{
      const id = a.getAttribute("href");
      const target = document.querySelector(id);
      if(!target) return;
      e.preventDefault();
      close();
      const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({top: Math.max(0,y), behavior:"smooth"});
      history.replaceState(null,"",id);
    });
  });
}

function setupLangToggle(){
  const btn = document.getElementById("langToggle");
  if(!btn) return;
  btn.addEventListener("click", ()=>{
    const next = document.documentElement.lang === "es" ? "en" : "es";
    applyI18n(next);
  });
}

function setupWhatsAppPop(){
  const fab = document.getElementById("waFab");
  const pop = document.getElementById("waPop");
  if(!fab || !pop) return;

  const close = () => {
    pop.classList.remove("open");
    pop.setAttribute("aria-hidden","true");
  };

  fab.addEventListener("click", (e)=>{
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

function setupBookingForm(){
  const form = document.getElementById("bookForm");
  if(!form) return;

  const locBtn = document.getElementById("getLocation");
  const locField = document.getElementById("locField");

  locBtn?.addEventListener("click", ()=>{
    if(!navigator.geolocation){
      if(locField) locField.value = "Ubicación no disponible.";
      return;
    }
    if(locField) locField.value = "Obteniendo ubicación…";
    navigator.geolocation.getCurrentPosition(
      (pos)=>{
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        if(locField) locField.value = `https://maps.google.com/?q=${lat},${lng}`;
      },
      ()=>{
        if(locField) locField.value = "No se pudo obtener la ubicación.";
      },
      {enableHighAccuracy:true, timeout:9000, maximumAge:0}
    );
  });

  form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const data = new FormData(form);
    const name = (data.get("name")||"").toString().trim();
    const last = (data.get("last")||"").toString().trim();
    const address = (data.get("address")||"").toString().trim();
    const service = (data.get("service")||"").toString().trim();
    const location = (data.get("location")||"").toString().trim();

    const lines = [];
    lines.push("MICHAEL TAXI — Solicitud de servicio");
    lines.push(`Nombre: ${name} ${last}`.trim());
    if(service) lines.push(`Servicio: ${service}`);
    if(address) lines.push(`Dirección: ${address}`);
    if(location) lines.push(`Ubicación: ${location}`);

    const msg = encodeURIComponent(lines.join("\\n"));
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank", "noopener");
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  applyI18n(preferredLang());
  setupHamburger();
  setupLangToggle();
  setupWhatsAppPop();
  setupBookingForm();

  const year = document.getElementById("year");
  if(year) year.textContent = new Date().getFullYear();
});
