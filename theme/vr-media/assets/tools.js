/* Outils SEO et GEO de valentinrouault.com. Aucune dépendance, aucune donnée envoyée. */
(function () {
  'use strict';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmt(n, d) { return Number(n).toLocaleString('fr-FR', { maximumFractionDigits: d || 0 }); }
  function val(form, name) { var el = form.elements[name]; return el ? String(el.value || '').trim() : ''; }
  function lines(text) { return text.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean); }
  function num(s) { var n = parseFloat(String(s || '').replace(/\s/g, '').replace(',', '.')); return isNaN(n) ? null : n; }
  function isUrl(s) { return /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(s); }
  function error(box, msg) { box.innerHTML = '<p class="vr-error">' + esc(msg) + '</p>'; }
  function notes(list) {
    return list.length ? '<ul class="vr-notes">' + list.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>' : '';
  }
  function codeBlock(text) {
    return '<pre class="vr-code"><code>' + esc(text) + '</code></pre>'
      + '<button type="button" class="btn btn-ghost vr-copy">Copier</button>';
  }

  /* ------------------------------------------------ 1. Données structurées */
  function schemaToggle(form) {
    var type = val(form, 'type');
    Array.prototype.forEach.call(form.querySelectorAll('.vr-field'), function (f) {
      var scoped = /\bfor-/.test(f.className);
      f.classList.toggle('is-hidden', scoped && !f.classList.contains('for-' + type));
    });
  }
  function clean(obj) {
    Object.keys(obj).forEach(function (k) {
      var v = obj[k];
      if (v && typeof v === 'object' && !Array.isArray(v)) { clean(v); if (!Object.keys(v).length) delete obj[k]; }
      else if (v === '' || v === null || v === undefined || (Array.isArray(v) && !v.length)) delete obj[k];
    });
    return obj;
  }
  function ent(type, name) { return name ? { '@type': type, name: name } : ''; }
  function schema(form, box) {
    var t = val(form, 'type'), warn = [], data = { '@context': 'https://schema.org', '@type': t };
    var sameAs = lines(val(form, 'sameas')).filter(isUrl);
    if (t === 'Article') {
      data.headline = val(form, 'name');
      data.image = val(form, 'image');
      data.datePublished = val(form, 'published');
      data.dateModified = val(form, 'modified') || val(form, 'published');
      data.author = ent('Person', val(form, 'author'));
      data.publisher = ent('Organization', val(form, 'publisher'));
      data.mainEntityOfPage = val(form, 'url');
      if (!data.headline) warn.push('Le titre (headline) est indispensable.');
      if (data.headline && data.headline.length > 110) warn.push('Titre de plus de 110 caractères : Google peut le tronquer.');
      if (!data.image) warn.push('Ajoutez une image : elle est recommandée pour les résultats enrichis d\'article.');
      if (!data.datePublished) warn.push('Ajoutez la date de publication.');
      if (!val(form, 'author')) warn.push('Indiquez un auteur identifiable : c\'est un signal de fiabilité pour Google comme pour les IA.');
    } else if (t === 'Organization' || t === 'LocalBusiness') {
      data.name = val(form, 'name');
      data.url = val(form, 'url');
      data.logo = val(form, 'logo');
      data.image = val(form, 'image');
      data.description = val(form, 'description');
      data.telephone = val(form, 'phone');
      data.sameAs = sameAs;
      if (t === 'LocalBusiness') {
        data.address = { '@type': 'PostalAddress', streetAddress: val(form, 'street'), postalCode: val(form, 'postal'), addressLocality: val(form, 'city'), addressCountry: 'FR' };
        data.openingHours = val(form, 'hours') ? val(form, 'hours').split(/\s*,\s*/) : '';
        if (!val(form, 'street') || !val(form, 'city')) warn.push('L\'adresse complète est nécessaire pour un établissement local.');
        warn.push('Remplacez « LocalBusiness » par le type le plus précis possible si vous le connaissez (Restaurant, Dentist, Store…).');
      }
      if (!data.name) warn.push('Le nom est indispensable.');
      if (!sameAs.length) warn.push('Ajoutez vos profils officiels (sameAs) : LinkedIn, Wikipédia, Google Business Profile…');
    } else if (t === 'Product') {
      data.name = val(form, 'name');
      data.image = val(form, 'image');
      data.description = val(form, 'description');
      data.sku = val(form, 'sku');
      data.brand = ent('Brand', val(form, 'brand'));
      var price = num(val(form, 'price'));
      data.offers = price === null ? '' : { '@type': 'Offer', url: val(form, 'url'), price: price.toFixed(2), priceCurrency: 'EUR', availability: 'https://schema.org/' + val(form, 'availability') };
      var rating = num(val(form, 'rating')), count = num(val(form, 'reviews'));
      if (rating !== null && count) data.aggregateRating = { '@type': 'AggregateRating', ratingValue: rating, reviewCount: Math.round(count) };
      if (!data.name) warn.push('Le nom du produit est indispensable.');
      if (price === null && rating === null) warn.push('Google demande au moins un prix (offers) ou des avis (aggregateRating) pour afficher un résultat enrichi produit.');
      if (rating !== null && (rating < 1 || rating > 5)) warn.push('La note doit être comprise entre 1 et 5.');
    } else if (t === 'Person') {
      data.name = val(form, 'name');
      data.url = val(form, 'url');
      data.image = val(form, 'image');
      data.description = val(form, 'description');
      data.jobTitle = val(form, 'jobtitle');
      data.worksFor = ent('Organization', val(form, 'worksfor'));
      data.sameAs = sameAs;
      if (!data.name) warn.push('Le nom est indispensable.');
    } else if (t === 'BreadcrumbList') {
      var items = lines(val(form, 'crumbs')).map(function (l, i) {
        var p = l.split('|').map(function (x) { return x.trim(); });
        if (!isUrl(p[1] || '')) warn.push('Ligne ' + (i + 1) + ' : adresse manquante ou invalide.');
        return { '@type': 'ListItem', position: i + 1, name: p[0], item: p[1] || '' };
      });
      if (items.length < 2) warn.push('Un fil d\'Ariane compte au moins deux étapes.');
      data.itemListElement = items;
    }
    clean(data);
    var json = JSON.stringify(data, null, 2);
    box.innerHTML = '<p>À coller dans le <code>&lt;head&gt;</code> de la page, ou dans le champ prévu par votre CMS :</p>'
      + codeBlock('<script type="application/ld+json">\n' + json + '\n</script>')
      + notes(warn)
      + '<p class="vr-note">Vérifiez ensuite la page publiée avec le <a href="https://search.google.com/test/rich-results" rel="noopener" target="_blank">test des résultats enrichis de Google</a> et le <a href="https://validator.schema.org/" rel="noopener" target="_blank">validateur Schema.org</a>. '
      + 'Les informations balisées doivent être visibles sur la page.</p>';
  }

  /* ------------------------------------------------------- 2. Hreflang */
  var COMMON_MISTAKES = { 'en-uk': 'en-gb', 'fr-uk': 'fr-gb', 'jp': 'ja', 'cz': 'cs', 'se': 'sv', 'dk': 'da', 'gr': 'el', 'cn': 'zh', 'kr': 'ko' };
  function hreflang(form, box) {
    var rows = lines(val(form, 'versions'));
    if (!rows.length) return error(box, 'Indiquez au moins deux versions de la page.');
    var warn = [], seenCode = {}, seenUrl = {}, entries = [];
    rows.forEach(function (l, i) {
      var p = l.split('|').map(function (x) { return x.trim(); });
      var code = (p[0] || '').toLowerCase().replace('_', '-'), url = p[1] || '';
      if (COMMON_MISTAKES[code]) warn.push('Ligne ' + (i + 1) + ' : « ' + code + ' » n\'est pas valide, utilisez « ' + COMMON_MISTAKES[code] + ' ».');
      else if (!/^[a-z]{2,3}(-([a-z]{2}|[a-z]{4}))?$/.test(code)) warn.push('Ligne ' + (i + 1) + ' : code « ' + code + ' » invalide. Format attendu : langue (fr) ou langue-pays (fr-be).');
      if (!/^https:\/\//i.test(url)) warn.push('Ligne ' + (i + 1) + ' : l\'adresse doit être complète et en https.');
      if (seenCode[code]) warn.push('Le code « ' + code + ' » apparaît deux fois.');
      if (seenUrl[url]) warn.push('L\'adresse ' + url + ' apparaît pour deux codes différents.');
      seenCode[code] = seenUrl[url] = true;
      entries.push({ code: COMMON_MISTAKES[code] || code, url: url });
    });
    var xd = val(form, 'xdefault');
    if (xd) entries.push({ code: 'x-default', url: xd });
    else warn.push('Pas de x-default : conseillé si vous avez une page de choix du pays ou une version internationale.');
    if (entries.length < 2) warn.push('Une seule version : les balises hreflang n\'ont d\'intérêt qu\'à partir de deux.');
    var langs = {};
    entries.forEach(function (e) { var l = e.code.split('-')[0]; if (e.code.indexOf('-') > 0) langs[l] = langs[l] || 'region'; else langs[l] = 'generic'; });
    Object.keys(langs).forEach(function (l) {
      if (langs[l] === 'region' && l !== 'x') warn.push('Pensez à une version « ' + l + ' » générique (sans pays) pour les internautes ' + l + ' des autres pays, ou utilisez x-default.');
    });
    var tags = entries.map(function (e) { return '<link rel="alternate" hreflang="' + e.code + '" href="' + e.url + '" />'; }).join('\n');
    var xml = entries.filter(function (e) { return e.code !== 'x-default'; }).map(function (e) {
      return '<url>\n  <loc>' + e.url + '</loc>\n' + entries.map(function (o) {
        return '  <xhtml:link rel="alternate" hreflang="' + o.code + '" href="' + o.url + '" />';
      }).join('\n') + '\n</url>';
    }).join('\n');
    box.innerHTML = '<p><strong>Option 1 :</strong> dans le <code>&lt;head&gt;</code> de <strong>chacune</strong> des pages listées, y compris la page elle-même :</p>'
      + codeBlock(tags)
      + '<p><strong>Option 2 :</strong> dans le sitemap XML (déclarer <code>xmlns:xhtml="http://www.w3.org/1999/xhtml"</code> sur la balise urlset) :</p>'
      + codeBlock(xml)
      + (warn.length ? '<p><strong>Points à corriger :</strong></p>' + notes(warn) : '<p class="vr-ok">Aucune erreur détectée dans la liste.</p>')
      + '<p class="vr-note">Chaque version doit renvoyer vers toutes les autres, et chaque adresse doit répondre en 200, sans redirection, avec une balise canonical vers elle-même. Les balises hreflang sont ignorées par Bing, qui se fie à la balise <code>content-language</code> et à la langue du contenu.</p>';
  }

  /* -------------------------------------------- 3. Prévision de trafic */
  // Taux de clic par position : SISTRIX, étude sur 80 millions de mots-clés (2020), avant les AI Overviews.
  var CTR = [0.285, 0.157, 0.110, 0.080, 0.072, 0.051, 0.040, 0.032, 0.028, 0.025];
  // Baisse du taux de clic quand un AI Overview s'affiche : Ahrefs, février 2026 (données de décembre 2025).
  // Mesurées : position 1 −58 %, position 2 −50,8 %, position 10 −19,4 %. Positions 3 à 9 : interpolation linéaire.
  function aioDrop(pos) {
    if (pos <= 1) return 0.58;
    if (pos === 2) return 0.508;
    return 0.508 + (0.194 - 0.508) * (pos - 2) / 8;
  }
  function ctrAt(pos) { return pos >= 1 && pos <= 10 ? CTR[Math.round(pos) - 1] : 0; }
  function trafic(form, box) {
    var rows = lines(val(form, 'keywords'));
    if (!rows.length) return error(box, 'Collez au moins un mot-clé avec son volume.');
    var target = parseInt(val(form, 'target'), 10) || 1;
    var aio = Math.min(Math.max(num(val(form, 'aio')) || 0, 0), 100) / 100;
    var tot = { now: 0, then: 0, value: 0 }, body = '', skipped = 0, hasCpc = false;
    rows.forEach(function (l) {
      var p = l.split(/\t|;/).map(function (x) { return x.trim(); });
      var kw = p[0], vol = num(p[1]), pos = num(p[2]), cpc = num(p[3]);
      if (!kw || vol === null) { skipped++; return; }
      var factor = function (ps) { return ps >= 1 && ps <= 10 ? 1 - aio * aioDrop(Math.round(ps)) : 1; };
      var now = pos ? vol * ctrAt(pos) * factor(pos) : 0;
      var best = pos && pos < target ? pos : target;
      var then = vol * ctrAt(best) * factor(best);
      var gain = Math.max(then - now, 0);
      var value = cpc ? gain * cpc : 0;
      if (cpc) hasCpc = true;
      tot.now += now; tot.then += then; tot.value += value;
      body += '<tr><td>' + esc(kw) + '</td><td>' + fmt(vol) + '</td><td>' + (pos ? fmt(pos, 1) : '–') + '</td><td>' + fmt(now) + '</td><td>' + fmt(then) + '</td><td>+' + fmt(gain) + '</td>'
        + (cpc ? '<td>' + fmt(value) + ' €</td>' : '<td>–</td>') + '</tr>';
    });
    if (!body) return error(box, 'Aucune ligne lisible. Format attendu : mot-clé ; volume ; position ; CPC.');
    box.innerHTML = '<p class="vr-big">+' + fmt(tot.then - tot.now) + ' clics par mois</p>'
      + '<p>De <strong>' + fmt(tot.now) + '</strong> à <strong>' + fmt(tot.then) + '</strong> clics mensuels estimés en position ' + target
      + (hasCpc ? ', soit environ <strong>' + fmt(tot.value) + ' €</strong> par mois en équivalent achat de mots-clés.' : '.') + '</p>'
      + '<div class="vr-table-wrap"><table class="vr-table"><thead><tr><th>Mot-clé</th><th>Volume</th><th>Position</th><th>Clics actuels</th><th>Clics visés</th><th>Gain</th><th>Valeur</th></tr></thead><tbody>' + body + '</tbody></table></div>'
      + (skipped ? '<p class="vr-error">' + skipped + ' ligne(s) ignorée(s) : volume absent ou illisible.</p>' : '')
      + '<p class="vr-note">Ordre de grandeur, pas une promesse. Taux de clic par position : SISTRIX (80 millions de mots-clés, 2020, avant les AI Overviews). '
      + 'Au-delà de la position 10, les clics sont comptés à zéro. Effet des AI Overviews : Ahrefs, février 2026 (−58 % en position 1, −50,8 % en position 2, −19,4 % en position 10, positions intermédiaires interpolées). '
      + 'Votre taux de clic réel dépend de votre marque, de vos titres et de ce que Google affiche autour : comparez avec la Search Console.</p>';
  }

  /* ------------------------------------- 4. Regex pour la Search Console */
  function reEscape(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function regex(form, box) {
    var brand = lines(val(form, 'brand')).map(function (b) { return reEscape(b.toLowerCase()); });
    var cities = lines(val(form, 'city')).map(function (c) { return reEscape(c.toLowerCase()); });
    var n = parseInt(val(form, 'minwords'), 10) || 5;
    var blocks = [];
    if (brand.length) {
      var br = '(?i)(' + brand.join('|') + ')';
      blocks.push(['Requêtes de marque', 'Correspond à l\'expression régulière', br]);
      blocks.push(['Requêtes hors marque', 'Ne correspond pas à l\'expression régulière', br]);
    }
    blocks.push(['Questions (français et anglais)', 'Correspond à l\'expression régulière',
      '(?i)^(comment|pourquoi|quand|quel|quelle|quels|quelles|où|ou trouver|combien|qui|que|quoi|est-ce|est ce|peut-on|faut-il|dois-je|how|what|why|when|which|where|who|can|is|are|does)(\\s|$)']);
    blocks.push(['Comparaisons et choix', 'Correspond à l\'expression régulière',
      '(?i)(\\svs\\.?\\s|versus|comparatif|comparaison|meilleur|meilleure|top [0-9]+|avis|alternative|ou bien|best|review)']);
    blocks.push(['Intention d\'achat', 'Correspond à l\'expression régulière',
      '(?i)(prix|tarif|acheter|achat|pas cher|promo|code promo|soldes|devis|commander|livraison|abonnement|price|buy|cheap)']);
    blocks.push(['Recherches locales', 'Correspond à l\'expression régulière',
      '(?i)(près de moi|pres de moi|autour de moi|à proximité|a proximite|near me' + (cities.length ? '|' + cities.join('|') : '') + ')']);
    blocks.push(['Longue traîne (' + n + ' mots et plus)', 'Correspond à l\'expression régulière', '^(\\S+\\s+){' + (n - 1) + ',}\\S+$']);
    box.innerHTML = '<p>Dans la Search Console : <em>Performances › + Ajouter un filtre › Requête › Expression régulière personnalisée</em>, puis choisissez l\'option indiquée.</p>'
      + blocks.map(function (b) {
        return '<p class="vr-regex-title"><strong>' + esc(b[0]) + '</strong> · ' + esc(b[1]) + '</p>' + codeBlock(b[2]);
      }).join('')
      + '<p class="vr-note">La Search Console utilise la syntaxe RE2, limitée à 4 096 caractères. Les requêtes très rares sont masquées par Google pour des raisons de confidentialité : les totaux filtrés restent inférieurs au total du site.</p>';
  }

  /* --------------------------------------------------------- 5. llms.txt */
  function llms(form, box) {
    var site = val(form, 'site'), summary = val(form, 'summary');
    if (!site || !summary) return error(box, 'Le nom du site et le résumé sont obligatoires.');
    var sections = {}, order = [], warn = [];
    lines(val(form, 'pages')).forEach(function (l, i) {
      var p = l.split('|').map(function (x) { return x.trim(); });
      if (p.length < 3) { warn.push('Ligne ' + (i + 1) + ' ignorée : il faut au moins section | titre | adresse.'); return; }
      if (!isUrl(p[2])) warn.push('Ligne ' + (i + 1) + ' : adresse invalide (' + p[2] + ').');
      var sec = p[0] || 'Pages';
      if (!sections[sec]) { sections[sec] = []; order.push(sec); }
      sections[sec].push('- [' + p[1] + '](' + p[2] + ')' + (p[3] ? ': ' + p[3] : ''));
    });
    order.sort(function (a, b) { return (a.toLowerCase() === 'optional') - (b.toLowerCase() === 'optional'); });
    var out = '# ' + site + '\n\n> ' + summary.replace(/\s+/g, ' ') + '\n';
    var details = val(form, 'details');
    if (details) out += '\n' + details + '\n';
    order.forEach(function (s) { out += '\n## ' + (s.toLowerCase() === 'optional' ? 'Optional' : s) + '\n\n' + sections[s].join('\n') + '\n'; });
    if (!order.length) warn.push('Aucune page listée : le fichier aura peu d\'intérêt sans liens vers vos contenus clés.');
    box.innerHTML = '<p>Enregistrez ce texte dans un fichier <code>llms.txt</code> à la racine du site (<code>https://votresite.fr/llms.txt</code>) :</p>'
      + codeBlock(out) + notes(warn)
      + '<p class="vr-note">Format proposé sur llmstxt.org. Aucun moteur ne s\'est engagé à l\'utiliser : c\'est un complément, pas un levier de classement. Le point complet est dans l\'article sur le <a href="/llms-txt/">fichier llms.txt</a>.</p>';
  }

  var TOOLS = { schema: schema, hreflang: hreflang, trafic: trafic, regex: regex, llms: llms };

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
    var id = tool.getAttribute('data-tool'), fn = TOOLS[id];
    var form = tool.querySelector('form');
    var box = tool.querySelector('.vr-tool-result');
    if (!fn || !form || !box) return;
    if (id === 'schema') {
      schemaToggle(form);
      form.elements.type.addEventListener('change', function () { schemaToggle(form); box.innerHTML = ''; });
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); fn(form, box); });
    if (tool.hasAttribute('data-live')) form.addEventListener('input', function () { fn(form, box); });
  });
})();
