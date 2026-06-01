/* =========================================
   Essencial Piatã 507 — JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll ─────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── Mobile menu ───────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger?.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // ── Copy WiFi ─────────────────────────────
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.copy;
      navigator.clipboard.writeText(target).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✓ Copiado';
        btn.style.background = 'rgba(37,211,102,0.25)';
        btn.style.borderColor = 'rgba(37,211,102,0.5)';
        btn.style.color = '#25D366';
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2000);
      }).catch(() => {
        alert('Senha: #sejabemvindo#');
      });
    });
  });

  // ── Nearby tabs ───────────────────────────
  const nearbyTabs = document.querySelectorAll('.nearby-tab');
  const nearbyPanels = document.querySelectorAll('.nearby-panel');

  nearbyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      nearbyTabs.forEach(t => t.classList.remove('active'));
      nearbyPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      target?.classList.add('active');
    });
  });

  // ── Itinerary tabs ────────────────────────
  const itinTabs = document.querySelectorAll('.itin-tab');
  const itinPanels = document.querySelectorAll('.itin-panel');

  itinTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      itinTabs.forEach(t => t.classList.remove('active'));
      itinPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      target?.classList.add('active');
    });
  });

  // ── FAQ accordion ─────────────────────────
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Area schedule editor ──────────────────
  document.querySelectorAll('.area-edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const timeEl = btn.previousElementSibling;
      const current = timeEl.textContent;
      const newTime = prompt('Informe o novo horário:', current);
      if (newTime && newTime.trim()) {
        timeEl.textContent = newTime.trim();
        btn.textContent = '✓ Salvo';
        setTimeout(() => btn.textContent = '✏️ Editar', 1500);
      }
    });
  });

  // ── Lightbox ──────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src || '';
      const label = item.querySelector('.gallery-label')?.textContent || '';
      if (src) {
        lightboxImg.src = src;
        lightboxImg.alt = label;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  function closeLightbox() {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ── Tide table ────────────────────────────
  function generateTideTable() {
    const tbody = document.getElementById('tideBody');
    if (!tbody) return;

    const today = new Date();
    const entries = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dateStr = d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });

      // Simulated times — would be replaced by FEMAR API
      const lowTimes = ['04:23', '16:47'];
      const highTimes = ['10:15', '22:38'];

      const lowShift = (i * 47) % 60;
      const highShift = (i * 52) % 60;

      function addMinutes(time, mins) {
        const [h, m] = time.split(':').map(Number);
        const total = h * 60 + m + mins;
        return `${String(Math.floor(total / 60) % 24).padStart(2,'0')}:${String(total % 60).padStart(2,'0')}`;
      }

      entries.push({
        date: dateStr,
        low: lowTimes.map(t => addMinutes(t, lowShift)).join(' / '),
        lowH: (0.2 + (i * 0.07)).toFixed(1),
        high: highTimes.map(t => addMinutes(t, highShift)).join(' / '),
        highH: (1.8 + (i * 0.05)).toFixed(1),
      });
    }

    tbody.innerHTML = entries.map(e => `
      <tr>
        <td>${e.date}</td>
        <td class="tide-low">🔵 ${e.low} (${e.lowH}m)</td>
        <td class="tide-high">🟠 ${e.high} (${e.highH}m)</td>
      </tr>
    `).join('');
  }

  generateTideTable();

  // ── Animate on scroll ─────────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ── Echo card feedback ────────────────────
  document.querySelectorAll('.echo-card').forEach(card => {
    card.addEventListener('click', () => {
      card.style.borderColor = 'rgba(0,202,255,0.6)';
      card.style.background = 'linear-gradient(135deg, rgba(0,202,255,0.08), rgba(14,27,42,0.9))';
      setTimeout(() => {
        card.style.borderColor = '';
        card.style.background = '';
      }, 600);
    });
  });

  // ── Smooth year in footer ─────────────────
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
