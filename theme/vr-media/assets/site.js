// Menu mobile + repli du sommaire sur petit écran. Aucune dépendance.
(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  var toc = document.querySelector('.toc details');
  if (toc && window.matchMedia('(max-width: 1000px)').matches) {
    toc.removeAttribute('open');
  }

  // Lecture : tableaux défilants sur mobile, barre de progression, section active du sommaire.
  var prose = document.querySelector('.single .prose, article .prose');
  if (prose) {
    Array.prototype.forEach.call(prose.querySelectorAll('table'), function (t) {
      if (t.parentElement.classList.contains('table-wrap')) return;
      var w = document.createElement('div');
      w.className = 'table-wrap';
      t.parentNode.insertBefore(w, t);
      w.appendChild(t);
    });
  }
  if (document.body.classList.contains('single-post') && prose) {
    var bar = document.createElement('div');
    bar.className = 'read-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    var tick = false;
    var update = function () {
      var r = prose.getBoundingClientRect();
      var total = r.height - window.innerHeight * 0.6;
      var done = Math.min(Math.max(-r.top / (total > 0 ? total : 1), 0), 1);
      bar.style.transform = 'scaleX(' + done + ')';
      tick = false;
    };
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }
  var tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    Array.prototype.forEach.call(tocLinks, function (a) { map[decodeURIComponent(a.getAttribute('href').slice(1))] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting || !map[en.target.id]) return;
        Array.prototype.forEach.call(tocLinks, function (a) { a.classList.remove('is-active'); });
        map[en.target.id].classList.add('is-active');
      });
    }, { rootMargin: '0px 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { var h = document.getElementById(id); if (h) obs.observe(h); });
  }

  // Lecteur YouTube léger : l'iframe n'est chargée qu'au clic.
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('.yt-lite-btn');
    if (!b) return;
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + b.getAttribute('data-yt') + '?autoplay=1&rel=0';
    f.title = b.getAttribute('aria-label');
    f.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    b.replaceWith(f);
  });

  // Consentement cookies (voir inc/consent.php)
  var box = document.getElementById('vr-consent');
  var has = /(?:^|; )vr_consent=(granted|denied)/.test(document.cookie);
  function save(v) {
    document.cookie = 'vr_consent=' + v + '; max-age=' + (60 * 60 * 24 * 182) + '; path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
    if (typeof window.gtag === 'function') { window.gtag('consent', 'update', {analytics_storage: v}); }
    if (box) { box.hidden = true; }
  }
  if (box) {
    if (!has) { box.hidden = false; }
    box.addEventListener('click', function (e) {
      var v = e.target && e.target.getAttribute('data-consent');
      if (v) { save(v); }
    });
  }
  document.addEventListener('click', function (e) {
    if (e.target && e.target.closest && e.target.closest('[data-consent-open]')) {
      e.preventDefault();
      if (box) { box.hidden = false; }
    }
  });
})();
