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
})();
