// Aplica el tema y pone la cabecera en todas las páginas.
// Va en el <head> sin defer para que el tema se ponga antes de pintar.
// Usa la misma clave de localStorage que la web ("theme").
(function () {
  var root = document.documentElement;

  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  } catch (e) {}

  // Ruta de la raíz del sitio, a partir de dónde está este script
  var base = new URL('../', document.currentScript.src).href;
  var local = location.hostname === 'localhost';
  var web = local ? 'http://localhost:4321/es/' : 'https://cesaenv.github.io/es/';

  // En local el tema se coge de la web en marcha (npm run dev); si no está, el publicado
  var theme = document.querySelector('link[href="https://cesaenv.github.io/theme.css"]');
  if (local && theme) {
    theme.onerror = function () {
      theme.onerror = null;
      theme.href = 'https://cesaenv.github.io/theme.css';
    };
    theme.href = 'http://localhost:4321/theme.css';
  }

  function isDark() {
    return root.dataset.theme !== 'light';
  }

  // Si se cambia el tema en otra página (el menú con las vistas previas), se cambia aquí también
  window.addEventListener('storage', function (e) {
    if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) root.dataset.theme = e.newValue;
  });

  function build() {
    
    var path = location.pathname.replace(/\/index\.html$/, '/');
    var atMenu = path === new URL(base).pathname;
    var header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML =
      '<div class="container bar">' +
      '<a class="brand" href="' + web + '"><span aria-hidden="true">C. Sáenz Villalta</span>' +
      '<span class="sr-only">Celia Sáenz Villalta</span></a>' +
      '<nav aria-label="Principal"><a href="' + base + '"' + (atMenu ? ' aria-current="page"' : '') + '>Spikes</a></nav>' +
      '<button type="button" class="theme" aria-label="Cambiar entre tema claro y oscuro" title="Cambiar entre tema claro y oscuro">' +
      '<svg class="sun" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="1.8"></circle><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>' +
      '<svg class="moon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path></svg>' +
      '</button></div>';
    document.body.insertBefore(header, document.body.firstChild);

    var button = header.querySelector('.theme');
    function sync() {
      button.setAttribute('aria-pressed', String(isDark()));
    }
    button.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
      sync();
    });
    sync();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
