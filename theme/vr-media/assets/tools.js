/* Outils SEO et GEO de valentinrouault.com. Aucune dépendance, aucune donnée envoyée. */
(function () {
  'use strict';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmt(n) { return Math.round(n).toLocaleString('fr-FR'); }
  function val(form, name) { var el = form.elements[name]; return el ? String(el.value || '').trim() : ''; }
  function checked(form, name) {
    return Array.prototype.slice.call(form.querySelectorAll('input[name="' + name + '"]:checked')).map(function (i) { return i.value; });
  }
  function error(box, msg) { box.innerHTML = '<p class="vr-error">' + esc(msg) + '</p>'; }

  function codeBlock(text) {
    return '<pre class="vr-code"><code>' + esc(text) + '</code></pre>'
      + '<button type="button" class="btn btn-ghost vr-copy">Copier</button>';
  }

  /* ------------------------------------------------------------ Aperçu SERP */
  // Google tronque selon la largeur affichée, pas selon le nombre de caractères.
  // Repères usuels sur ordinateur : environ 580 px pour le titre (Arial 20 px)
  // et environ 920 px pour la description (Arial 14 px). Ce sont des ordres de grandeur.
  var canvas = document.createElement('canvas');
  function width(text, font) {
    var ctx = canvas.getContext('2d');
    ctx.font = font;
    return ctx.measureText(text).width;
  }
  function truncate(text, font, max) {
    if (width(text, font) <= max) return { text: text, cut: false };
    var out = text;
    while (out.length && width(out + ' …', font) > max) out = out.slice(0, -1);
    return { text: out.replace(/\s+\S*$/, '') + ' …', cut: true };
  }
  function serp(form, box) {
    var t = val(form, 'title'), d = val(form, 'desc'), u = val(form, 'url');
    if (!t && !d) { box.innerHTML = ''; return; }
    var tf = '20px Arial', df = '14px Arial';
    var tw = width(t, tf), dw = width(d, df);
    var tt = truncate(t || 'Titre de la page', tf, 580);
    var dd = truncate(d || 'Description de la page.', df, 920);
    var host = u.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/');
    var crumb = host[0] ? esc(host[0]) + (host.length > 1 ? ' › ' + esc(host.slice(1).join(' › ')) : '') : 'exemple.fr';
    var html = '<div class="vr-serp"><p class="vr-serp-url">' + crumb + '</p>'
      + '<p class="vr-serp-title">' + esc(tt.text) + '</p>'
      + '<p class="vr-serp-desc">' + esc(dd.text) + '</p></div>';
    html += '<ul class="vr-metrics">';
    html += '<li class="' + (tt.cut ? 'is-warn' : (t.length && t.length < 30 ? 'is-warn' : 'is-ok')) + '">Titre : ' + t.length + ' caractères, environ ' + fmt(tw) + ' px sur 580'
      + (tt.cut ? ', <strong>tronqué</strong>' : '') + (t.length && t.length < 30 ? ', un peu court' : '') + '</li>';
    html += '<li class="' + (dd.cut ? 'is-warn' : (d.length && d.length < 110 ? 'is-warn' : 'is-ok')) + '">Description : ' + d.length + ' caractères, environ ' + fmt(dw) + ' px sur 920'
      + (dd.cut ? ', <strong>tronquée</strong>' : '') + (d.length && d.length < 110 ? ', un peu courte' : '') + '</li>';
    html += '</ul><p class="vr-note">Google réécrit souvent les titres et les descriptions, et la largeur affichée varie selon l\'appareil. '
      + 'Visez un titre complet sous 580 px et placez l\'information importante au début.</p>';
    box.innerHTML = html;
  }

  /* --------------------------------------------------------- Robots IA */
  var ALL_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
    'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'meta-externalagent'];
  function robots(form, box) {
    var allowed = checked(form, 'bots');
    var lines = ['# Robots d\'IA : règles générées sur valentinrouault.com', ''];
    ALL_BOTS.forEach(function (b) {
      lines.push('User-agent: ' + b);
      lines.push(allowed.indexOf(b) > -1 ? 'Allow: /' : 'Disallow: /');
      lines.push('');
    });
    var sm = val(form, 'sitemap');
    if (sm) lines.push('Sitemap: ' + sm);
    var html = '<p>À ajouter à votre fichier robots.txt, <strong>sans supprimer</strong> les règles existantes pour Googlebot et les autres moteurs :</p>'
      + codeBlock(lines.join('\n').trim());
    var notes = [];
    if (allowed.indexOf('OAI-SearchBot') === -1) notes.push('OAI-SearchBot bloqué : vos pages ne pourront pas apparaître dans les réponses de recherche de ChatGPT.');
    if (allowed.indexOf('Claude-SearchBot') === -1) notes.push('Claude-SearchBot bloqué : vos pages seront moins visibles dans les recherches de Claude.');
    notes.push('Google-Extended ne règle ni l\'indexation ni les AI Overviews. Pour sortir des AI Overviews et du Mode IA, Google propose un réglage dédié dans la Search Console (Paramètres, IA générative de la recherche).');
    notes.push('OpenAI indique que les règles peuvent ne pas s\'appliquer à ChatGPT-User, qui agit à la demande d\'un utilisateur. Un changement de robots.txt met environ 24 heures à être pris en compte.');
    html += '<ul class="vr-notes">' + notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>';
    box.innerHTML = html;
  }

  /* ----------------------------------------------------------- GA4 IA */
  function ga4(form, box) {
    var src = checked(form, 'src');
    if (!src.length) return error(box, 'Cochez au moins un assistant.');
    var re = '.*(' + src.join('|') + ').*';
    box.innerHTML = '<p>Dans GA4 : <em>Administration › Paramètres des données › Groupes de canaux</em>, créez un groupe personnalisé, '
      + 'ajoutez un canal « Assistants IA » avec la condition <strong>Source</strong> + <strong>correspond à l\'expression régulière</strong>, '
      + 'et placez-le <strong>avant</strong> le canal « Referral ».</p>'
      + codeBlock(re)
      + '<p class="vr-note">Une partie du trafic des assistants arrive sans référent et reste comptée en accès direct. '
      + 'Ce canal donne un minimum, pas un total.</p>';
  }

  /* ----------------------------------------------------- AI Overviews */
  // Baisse du taux de clic par position quand un AI Overview s'affiche.
  // Source : Ahrefs, « Update: AI Overviews Reduce Clicks by 58% », février 2026 (données de décembre 2025).
  var DROP = { 1: 0.58, 2: 0.508, 3: 0.464, 4: 0.388, 5: 0.326, 6: 0.305, 7: 0.297, 8: 0.288, 9: 0.297, 10: 0.194 };
  function aio(form, box) {
    var clics = parseFloat(val(form, 'clics'));
    var pos = parseInt(val(form, 'pos'), 10) || 1;
    var part = parseFloat(val(form, 'part'));
    if (!clics || clics < 1) return error(box, 'Indiquez le nombre de clics mensuels de la page.');
    if (isNaN(part) || part < 0 || part > 100) return error(box, 'Indiquez une part comprise entre 0 et 100 %.');
    var share = part / 100, drop = DROP[pos];
    // Les clics actuels mélangent déjà requêtes avec et sans AI Overview si la page est en France depuis juillet 2026.
    // L'estimation porte sur un scénario : la part indiquée passe sous AI Overview par rapport à une situation sans.
    var after = clics * (1 - share * drop);
    box.innerHTML = '<p class="vr-big">' + fmt(clics - after) + ' clics en moins par mois</p>'
      + '<p>soit environ <strong>' + fmt(after) + '</strong> clics au lieu de ' + fmt(clics) + ' (−' + Math.round(share * drop * 100) + ' %).</p>'
      + '<p class="vr-note">Ordre de grandeur calculé avec les baisses de taux de clic mesurées par Ahrefs sur 300 000 mots-clés '
      + '(−58 % en position 1, −19,4 % en position 10, données de décembre 2025). Votre secteur et vos requêtes peuvent s\'en écarter nettement : '
      + 'comparez avec vos propres données de la Search Console avant et après le 22 juillet 2026.</p>';
  }

  var TOOLS = { serp: serp, robots: robots, ga4: ga4, aio: aio };

  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.vr-copy') : null;
    if (!b) return;
    var code = b.previousElementSibling && b.previousElementSibling.textContent;
    if (!code || !navigator.clipboard) return;
    navigator.clipboard.writeText(code).then(function () {
      b.textContent = 'Copié';
      setTimeout(function () { b.textContent = 'Copier'; }, 1500);
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll('.vr-tool'), function (tool) {
    var fn = TOOLS[tool.getAttribute('data-tool')];
    var form = tool.querySelector('form');
    var box = tool.querySelector('.vr-tool-result');
    if (!fn || !form || !box) return;
    form.addEventListener('submit', function (e) { e.preventDefault(); fn(form, box); });
    if (tool.hasAttribute('data-live')) form.addEventListener('input', function () { fn(form, box); });
  });
})();
