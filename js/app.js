/* Essencial Piatã 507 — app.js v2 */
document.addEventListener('DOMContentLoaded', () => {

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', scrollY > 50), {passive:true});

  // Mobile menu
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  burger?.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const s = burger.querySelectorAll('span');
    const open = mobileNav.classList.contains('open');
    s[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    s[1].style.opacity = open ? '0' : '';
    s[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
  }));

  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✓ Copiado!';
        btn.style.cssText = 'background:rgba(34,197,94,.2);border-color:rgba(34,197,94,.4);color:#22c55e';
        setTimeout(() => { btn.textContent = orig; btn.style.cssText = ''; }, 2000);
      }).catch(() => alert('Senha: #sejabemvindo#'));
    });
  });

  // Generic tabs
  function initTabs(tabSel, panelSel) {
    const tabs = document.querySelectorAll(tabSel);
    const panels = document.querySelectorAll(panelSel);
    tabs.forEach(t => t.addEventListener('click', () => {
      tabs.forEach(x => x.classList.remove('active'));
      panels.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      document.getElementById(t.dataset.target)?.classList.add('active');
    }));
  }
  initTabs('.food-tab', '.food-panel');
  initTabs('.itin-tab', '.itin-panel');

  // FAQ
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Area schedule edit
  document.querySelectorAll('.area-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const timeEl = btn.previousElementSibling;
      const nv = prompt('Novo horário:', timeEl.textContent);
      if (nv?.trim()) { timeEl.textContent = nv.trim(); btn.textContent = '✓ Salvo'; setTimeout(() => btn.textContent = '✏️ Editar', 1500); }
    });
  });

  // Alexa card ripple
  document.querySelectorAll('.alexa-card').forEach(c => {
    c.addEventListener('click', () => {
      c.style.borderColor = 'rgba(56,209,245,.7)';
      setTimeout(() => c.style.borderColor = '', 500);
    });
  });

  // Weather (Open-Meteo - free, no key)
  async function loadWeather() {
    const el = document.getElementById('weatherCard');
    if (!el) return;
    try {
      const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-12.97&longitude=-38.51&current=temperature_2m,apparent_temperature,wind_speed_10m,weathercode,is_day&daily=sunrise,sunset&timezone=America%2FBahia&forecast_days=1');
      const d = await r.json();
      const c = d.current;
      const codes = {0:'☀️ Céu limpo',1:'🌤️ Quase limpo',2:'⛅ Parcialmente nublado',3:'☁️ Nublado',45:'🌫️ Neblina',48:'🌫️ Neblina',51:'🌦️ Garoa',53:'🌦️ Garoa moderada',61:'🌧️ Chuva leve',63:'🌧️ Chuva moderada',71:'❄️ Neve',80:'🌦️ Pancadas',81:'🌧️ Chuvas',95:'⛈️ Tempestade'};
      const desc = codes[c.weathercode] || '🌡️ Clima';
      const sunrise = new Date(d.daily.sunrise[0]).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
      const sunset = new Date(d.daily.sunset[0]).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
      el.innerHTML = `
        <div class="weather-city">📍 Piatã · Salvador · BA</div>
        <div class="weather-temp">${Math.round(c.temperature_2m)}<span>°C</span></div>
        <div class="weather-desc">${desc}</div>
        <div class="weather-details">
          <div class="wd-item"><div class="wd-icon">🌡️</div><div class="wd-label">Sensação</div><div class="wd-value">${Math.round(c.apparent_temperature)}°C</div></div>
          <div class="wd-item"><div class="wd-icon">💨</div><div class="wd-label">Vento</div><div class="wd-value">${Math.round(c.wind_speed_10m)} km/h</div></div>
          <div class="wd-item"><div class="wd-icon">🌅</div><div class="wd-label">Nascer do sol</div><div class="wd-value">${sunrise}</div></div>
          <div class="wd-item"><div class="wd-icon">🌇</div><div class="wd-label">Pôr do sol</div><div class="wd-value">${sunset}</div></div>
        </div>
        ${buildTide()}
      `;
    } catch(e) {
      el.innerHTML = `<div class="weather-loading">🌊 Dados de clima indisponíveis no momento</div>${buildTide()}`;
    }
  }

  function buildTide() {
    // Simulated tide — ready for FEMAR API integration
    const now = new Date();
    const base = [
      {time:'05:12', h:0.3, type:'low'},
      {time:'11:28', h:2.1, type:'high'},
      {time:'17:45', h:0.4, type:'low'},
      {time:'23:52', h:1.9, type:'high'},
    ];
    const shifted = base.map(t => {
      const [hh,mm] = t.time.split(':').map(Number);
      const total = hh*60 + mm + (now.getDate() * 47 % 60);
      return {...t, time: `${String(Math.floor(total/60)%24).padStart(2,'0')}:${String(total%60).padStart(2,'0')}`};
    });
    const items = shifted.map(t => `
      <div class="tide-item">
        <div class="tide-item-time ${t.type==='low'?'tide-low-c':'tide-high-c'}">${t.type==='low'?'🔵':'🟠'} ${t.time}</div>
        <div class="tide-item-label">${t.type==='low'?'Maré Baixa':'Maré Alta'} ${t.h}m</div>
      </div>`).join('');
    return `<div class="tide-mini"><div class="tide-mini-title">🌊 Tábua de Maré — Hoje em Piatã</div><div class="tide-items">${items}</div></div>`;
  }

  loadWeather();

  // Fade-in on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e,i) => { if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('show'),i*70); io.unobserve(e.target); }});
  }, {threshold:.08, rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.fi').forEach(el => io.observe(el));

  // Year
  const y = document.getElementById('yr');
  if(y) y.textContent = new Date().getFullYear();

  // Primeiros passos — scroll to section
  document.querySelectorAll('.step-card[data-goto]').forEach(c => {
    c.addEventListener('click', () => {
      document.getElementById(c.dataset.goto)?.scrollIntoView({behavior:'smooth'});
    });
  });
});
