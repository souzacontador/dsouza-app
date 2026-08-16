/* ============================================================
   DSouza — PWA vanilla · app.js
   - Registra el Service Worker
   - Gestiona el botón "Instalar app" (beforeinstallprompt)
   - Contador de ejemplo
   - Indicador de estado de conexión
   ============================================================ */

'use strict';

// ---------- Año en el footer ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Contador ----------
(() => {
  const counterEl = document.getElementById('counter');
  const plusBtn = document.getElementById('btn-plus');
  const minusBtn = document.getElementById('btn-minus');
  if (!counterEl) return;

  let count = 0;
  const render = () => { counterEl.textContent = String(count); };

  plusBtn?.addEventListener('click', () => { count++; render(); });
  minusBtn?.addEventListener('click', () => { count--; render(); });
  render();
})();

// ---------- Estado de conexión ----------
(() => {
  const netEl = document.getElementById('net-status');
  if (!netEl) return;

  const update = () => {
    const online = navigator.onLine;
    netEl.classList.toggle('is-offline', !online);
    netEl.title = online ? 'En línea' : 'Sin conexión';
  };

  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();
})();

// ---------- Botón de instalación (PWA) ----------
(() => {
  const installBtn = document.getElementById('btn-install');
  if (!installBtn) return;

  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.hidden = false;
  });

  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.hidden = true;
  });

  window.addEventListener('appinstalled', () => {
    installBtn.hidden = true;
    deferredPrompt = null;
  });
})();

// ---------- Service Worker ----------
(() => {
  const swStatus = document.getElementById('sw-status');
  const setStatus = (msg) => { if (swStatus) swStatus.textContent = msg; };

  if (!('serviceWorker' in navigator)) {
    setStatus('Service Worker no soportado en este navegador.');
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(() => setStatus('✔ Service Worker activo — la app funciona sin conexión.'))
      .catch((err) => {
        console.error('Error al registrar el Service Worker:', err);
        setStatus('No se pudo activar el modo sin conexión.');
      });
  });
})();
