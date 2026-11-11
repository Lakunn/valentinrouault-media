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
  function codeBlock(text, filename, mime) {
    return '<div class="vr-codebox"><pre class="vr-code"><code>' + esc(text) + '</code></pre>'
      + '<div class="vr-actions"><button type="button" class="btn btn-ghost vr-copy">Copier</button>'
      + (filename ? '<button type="button" class="btn btn-ghost vr-dl" data-file="' + esc(filename) + '" data-mime="' + esc(mime || 'text/plain') + '">Télécharger ' + esc(filename) + '</button>' : '')
      + '</div></div>';
  }
  function download(name, text, mime) {
    var blob = new Blob([text], { type: (mime || 'text/plain') + ';charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function csvCell(v) { v = String(v); return /[;"\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }

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
    } else if (t === 'FAQPage') {
      var qa = lines(val(form, 'faq')).map(function (l, i) {
        var p = l.split('|').map(function (x) { return x.trim(); });
        if (!p[1]) warn.push('Ligne ' + (i + 1) + ' : réponse manquante (format : question | réponse).');
        return { '@type': 'Question', name: p[0], acceptedAnswer: { '@type': 'Answer', text: p[1] || '' } };
      });
      if (!qa.length) warn.push('Ajoutez au moins une question.');
      data.mainEntity = qa;
      warn.push('Depuis le 7 mai 2026, Google n\'affiche plus de résultats enrichis FAQ. Ce balisage ne sert qu\'à décrire la page aux moteurs et aux assistants, et seulement si questions et réponses sont visibles telles quelles.');
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
      + codeBlock('<script type="application/ld+json">\n' + json + '\n</script>', 'schema-' + t.toLowerCase() + '.json', 'application/ld+json')
      + notes(warn)
      + '<p class="vr-note">Vérifiez ensuite la page publiée avec le <a href="https://search.google.com/test/rich-results" rel="noopener" target="_blank">test des résultats enrichis de Google</a> et le <a href="https://validator.schema.org/" rel="noopener" target="_blank">validateur Schema.org</a>. '
      + 'Les informations balisées doivent être visibles sur la page.</p>';
  }

  /* ------------------------------------------------------- 2. Hreflang */
  var COMMON_MISTAKES = { 'en-uk': 'en-gb', 'fr-uk': 'fr-gb', 'jp': 'ja', 'cz': 'cs', 'se': 'sv', 'dk': 'da', 'gr': 'el', 'cn': 'zh', 'kr': 'ko' };
  function hreflang(form, box) {
    var raw = val(form, 'versions'), rows;
    var found = raw.match(/<link[^>]+>/gi) || raw.match(/<xhtml:link[^>]+>/gi);
    if (found) {
      // Balises existantes collées depuis le code source : on les relit pour les auditer.
      var seen = {};
      rows = found.map(function (tag) {
        var h = (tag.match(/hreflang=["']([^"']+)["']/i) || [])[1], u = (tag.match(/href=["']([^"']+)["']/i) || [])[1];
        return h && u ? h + ' | ' + u : '';
      }).filter(function (r) { if (!r || seen[r]) return false; seen[r] = 1; return true; });
      var xdRow = rows.filter(function (r) { return /^x-default\s*\|/i.test(r); })[0];
      rows = rows.filter(function (r) { return r !== xdRow; });
      if (xdRow && !val(form, 'xdefault')) form.elements.xdefault.value = xdRow.split('|')[1].trim();
    } else {
      rows = lines(raw);
    }
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
      + codeBlock(tags, 'hreflang.html', 'text/html')
      + '<p><strong>Option 2 :</strong> dans le sitemap XML (déclarer <code>xmlns:xhtml="http://www.w3.org/1999/xhtml"</code> sur la balise urlset) :</p>'
      + codeBlock('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + xml + '\n</urlset>', 'sitemap-hreflang.xml', 'application/xml')
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
  function splitRow(l) {
    // Point-virgule ou tabulation (exports Semrush, Ahrefs, copier-coller de tableur), sinon CSV à virgules (export Search Console).
    var parts = /\t|;/.test(l) ? l.split(/\t|;/) : l.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
    return parts.map(function (x) { return x.trim().replace(/^"|"$/g, ''); });
  }
  function trafic(form, box) {
    var rows = lines(val(form, 'keywords'));
    if (!rows.length) return error(box, 'Collez au moins un mot-clé avec son volume.');
    var target = parseInt(val(form, 'target'), 10) || 1;
    var aio = Math.min(Math.max(num(val(form, 'aio')) || 0, 0), 100) / 100;
    // Colonnes par défaut : mot-clé ; volume ; position ; CPC. Un en-tête d'export est reconnu et remappé.
    var col = { kw: 0, vol: 1, pos: 2, cpc: 3 }, source = '';
    var head = splitRow(rows[0]).map(function (h) { return h.toLowerCase(); });
    if (num(head[1]) === null && head.length > 1) {
      rows.shift();
      var find = function (re) { for (var i = 0; i < head.length; i++) { if (re.test(head[i])) return i; } return -1; };
      var k = find(/requ[eê]te|keyword|mot/), v = find(/volume|search vol/), im = find(/impression/), ps = find(/position/), c = find(/cpc|co[uû]t/);
      if (k >= 0) col.kw = k;
      if (v >= 0) col.vol = v; else if (im >= 0) { col.vol = im; source = 'impressions'; }
      col.pos = ps; col.cpc = c;
    }
    var factor = function (ps) { return ps >= 1 && ps <= 10 ? 1 - aio * aioDrop(Math.round(ps)) : 1; };
    var data = [], skipped = 0, hasCpc = false, tot = { now: 0, then: 0, value: 0 };
    rows.forEach(function (l) {
      var p = splitRow(l);
      var kw = p[col.kw], vol = num(p[col.vol]), pos = col.pos >= 0 ? num(p[col.pos]) : null, cpc = col.cpc >= 0 ? num(p[col.cpc]) : null;
      if (!kw || vol === null) { skipped++; return; }
      var now = pos ? vol * ctrAt(pos) * factor(pos) : 0;
      var best = pos && pos < target ? pos : target;
      var then = vol * ctrAt(best) * factor(best);
      var gain = Math.max(then - now, 0), value = cpc ? gain * cpc : 0;
      if (cpc) hasCpc = true;
      // Priorité : déjà en page 1 ou 2 (positions 4 à 20) avec un gain réel = effort modéré, effet rapide.
      var prio = pos && pos > target && pos <= 20 && gain >= 10 ? (pos <= 10 ? 'Rapide' : 'Moyen terme') : (!pos || pos > 20 ? 'Long terme' : '–');
      tot.now += now; tot.then += then; tot.value += value;
      data.push({ kw: kw, vol: vol, pos: pos, now: now, then: then, gain: gain, value: value, cpc: cpc, prio: prio });
    });
    if (!data.length) return error(box, 'Aucune ligne lisible. Format attendu : mot-clé ; volume ; position ; CPC.');
    data.sort(function (a, b) { return b.gain - a.gain; });
    var quick = data.filter(function (d) { return d.prio === 'Rapide'; });
    var quickGain = quick.reduce(function (s, d) { return s + d.gain; }, 0);
    var body = data.map(function (d) {
      return '<tr><td>' + esc(d.kw) + '</td><td>' + fmt(d.vol) + '</td><td>' + (d.pos ? fmt(d.pos, 1) : '–') + '</td><td>' + fmt(d.now) + '</td><td>' + fmt(d.then) + '</td><td><strong>+' + fmt(d.gain) + '</strong></td>'
        + '<td>' + (d.cpc ? fmt(d.value) + ' €' : '–') + '</td><td><span class="vr-tag vr-tag-' + (d.prio === 'Rapide' ? 'ok' : d.prio === 'Moyen terme' ? 'mid' : 'low') + '">' + d.prio + '</span></td></tr>';
    }).join('');
    var csv = ['Mot-clé;Volume;Position;Clics actuels;Clics visés;Gain;Valeur (€);Priorité'].concat(data.map(function (d) {
      return [d.kw, d.vol, d.pos || '', Math.round(d.now), Math.round(d.then), Math.round(d.gain), Math.round(d.value), d.prio].map(csvCell).join(';');
    })).join('\n');
    box.innerHTML = '<div class="vr-kpis"><div><p class="vr-big">+' + fmt(tot.then - tot.now) + '</p><p>clics par mois en position ' + target + '</p></div>'
      + '<div><p class="vr-big">' + quick.length + '</p><p>gains rapides (déjà en page 1), pour +' + fmt(quickGain) + ' clics</p></div>'
      + (hasCpc ? '<div><p class="vr-big">' + fmt(tot.value) + ' €</p><p>par mois en équivalent publicitaire</p></div>' : '')
      + '</div>'
      + '<p>De <strong>' + fmt(tot.now) + '</strong> à <strong>' + fmt(tot.then) + '</strong> clics mensuels estimés. Le tableau est trié par gain : commencez par les lignes « Rapide ».</p>'
      + (source === 'impressions' ? '<p class="vr-note">Export Search Console détecté : les impressions servent de volume. Elles sous-estiment la demande réelle quand la page est loin dans les résultats.</p>' : '')
      + '<div class="vr-table-wrap"><table class="vr-table"><thead><tr><th>Mot-clé</th><th>Volume</th><th>Position</th><th>Clics actuels</th><th>Clics visés</th><th>Gain</th><th>Valeur</th><th>Priorité</th></tr></thead><tbody>' + body + '</tbody></table></div>'
      + '<div class="vr-actions"><button type="button" class="btn btn-ghost vr-dl" data-file="prevision-trafic.csv" data-mime="text/csv" data-text="' + esc(csv) + '">Télécharger le tableau (CSV)</button></div>'
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
    var topic = lines(val(form, 'topic')).map(function (t) { return reEscape(t.toLowerCase()); });
    if (topic.length) blocks.push(['Votre thématique', 'Correspond à l\'expression régulière', '(?i)(' + topic.join('|') + ')']);
    blocks.push(['Longue traîne (' + n + ' mots et plus)', 'Correspond à l\'expression régulière', '^(\\S+\\s+){' + (n - 1) + ',}\\S+$']);
    // Test sur une liste de requêtes collée par l'utilisateur.
    var sample = lines(val(form, 'sample')).map(function (l) { return splitRow(l)[0]; }).filter(function (q) { return q && !/^(requ[eê]tes?|top queries|query)$/i.test(q); });
    function hits(re, negate) {
      var js;
      try { js = new RegExp(re.replace(/^\(\?i\)/, ''), /^\(\?i\)/.test(re) ? 'i' : ''); } catch (e) { return null; }
      return sample.filter(function (q) { return negate ? !js.test(q) : js.test(q); });
    }
    box.innerHTML = '<p>Dans la Search Console : <em>Performances › + Ajouter un filtre › Requête › Expression régulière personnalisée</em>, puis choisissez l\'option indiquée.</p>'
      + blocks.map(function (b) {
        var test = '';
        if (sample.length) {
          var h = hits(b[2], /Ne correspond pas/.test(b[1]));
          if (h) test = '<p class="vr-test"><strong>' + h.length + '</strong> requête(s) sur ' + sample.length + ' (' + fmt(100 * h.length / sample.length) + ' %)'
            + (h.length ? ' · ex. : ' + h.slice(0, 4).map(function (q) { return '<code>' + esc(q) + '</code>'; }).join(', ') : '') + '</p>';
        }
        return '<p class="vr-regex-title"><strong>' + esc(b[0]) + '</strong> · ' + esc(b[1]) + '</p>' + codeBlock(b[2]) + test;
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
      + codeBlock(out, 'llms.txt', 'text/plain') + notes(warn)
      + '<p class="vr-note">Format proposé sur llmstxt.org. Aucun moteur ne s\'est engagé à l\'utiliser : c\'est un complément, pas un levier de classement. Le point complet est dans l\'article sur le <a href="/llms-txt/">fichier llms.txt</a>.</p>';
  }


  /* --------------------------------- 6. Intention et thèmes (repris de growww) */
  // Mots déclencheurs : mêmes listes que le moteur de growww (analysis/seed_keywords.py), validées sur des milliers de requêtes.
  function fold(t) { return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' '); }
  function kset(str) { var o = {}; str.split(/\s+/).forEach(function (w) { if (w) o[w] = 1; }); return o; }
  var K_ACHAT = kset('prix tarif tarifs cout devis acheter achat vente vendre commander commande promo location louer livraison reserver reservation abonnement buy price prices cost cheap deal deals order shop sale rent hire quote booking discount coupon soldes');
  var K_COMP = kset('meilleur meilleure meilleurs meilleures avis comparatif comparaison top classement test vs versus alternative alternatives best review reviews compare comparison');
  var K_INFO = kset('comment pourquoi quoi quel quelle quels quelles quand combien faut definition guide tuto tutoriel astuce astuces conseil conseils idee idees exemple exemples signification how why what when which who tutorial tips ideas examples meaning');
  var LOCAL_RE = /(pres de chez moi|autour de moi|a proximite|near me|nearby|\bartisan|\binstallateur|\bdepann|\breparateur)/;
  var STOP = kset('de du des la le les un une et a au aux en pour par sur avec sans dans ou d l the of for to in on and with est ce que qui son sa ses mon ma mes votre vos');
  var INTENTS = { info: 'Information', comp: 'Comparaison', achat: 'Achat', local: 'Prestataire local', nav: 'Navigation', mixte: 'Mixte' };
  function intentOf(kw, brands, cities) {
    var f = fold(kw), toks = f.split(/[^a-z0-9]+/).filter(Boolean), has = function (set) { return toks.some(function (t) { return set[t]; }); };
    if (brands.some(function (b) { return b && (' ' + f + ' ').indexOf(' ' + b + ' ') > -1; })) return ['nav', 'contient votre marque'];
    if (LOCAL_RE.test(f) || cities.some(function (c) { return c && (' ' + f + ' ').indexOf(' ' + c + ' ') > -1; })) return ['local', 'lieu ou recherche de prestataire'];
    if (/\?\s*$/.test(kw) || (toks[0] && K_INFO[toks[0]])) return ['info', 'question'];
    if (has(K_ACHAT) || f.indexOf('pas cher') > -1) return ['achat', 'mot d\'achat'];
    if (has(K_COMP)) return ['comp', 'mot de comparaison'];
    if (has(K_INFO)) return ['info', 'mot d\'information'];
    return ['mixte', 'aucun mot déclencheur'];
  }
  function stem(w) { return w.length > 4 ? w.replace(/(ements|ement|ations|ation|eurs|euse|eux|es|s|x)$/, '') : w; }
  function topicTokens(kw, ignore) {
    return fold(kw).split(/[^a-z0-9]+/).filter(function (t) { return t.length > 2 && !STOP[t] && !K_ACHAT[t] && !K_COMP[t] && !K_INFO[t] && !ignore[t]; }).map(stem);
  }
  function intention(form, box) {
    var rows = lines(val(form, 'keywords'));
    if (!rows.length) return error(box, 'Collez au moins un mot-clé.');
    var brands = lines(val(form, 'brands')).map(fold), cities = lines(val(form, 'cities')).map(fold);
    var head = splitRow(rows[0]);
    if (head.length > 1 && num(head[1]) === null && /mot|keyword|requ/i.test(head[0])) rows.shift();
    var data = rows.map(function (l) { var p = splitRow(l); return { kw: p[0], vol: num(p[1]) || 0 }; }).filter(function (d) { return d.kw; });
    // Le mot présent dans plus de 60 % des requêtes est le sujet commun (ex. « seo ») : on ne regroupe pas dessus.
    var df = {};
    data.forEach(function (d) { d.toks = topicTokens(d.kw, {}); var seen = {}; d.toks.forEach(function (t) { if (!seen[t]) { df[t] = (df[t] || 0) + 1; seen[t] = 1; } }); });
    var common = {}; Object.keys(df).forEach(function (t) { if (data.length >= 5 && df[t] / data.length > 0.6) common[t] = 1; });
    data.forEach(function (d) {
      var it = intentOf(d.kw, brands, cities); d.intent = it[0]; d.why = it[1];
      var cand = d.toks.filter(function (t) { return !common[t] && df[t] >= 2; });
      cand.sort(function (a, b) { return df[b] - df[a]; });
      d.theme = cand[0] || (d.toks.filter(function (t) { return !common[t]; })[0]) || 'autres';
    });
    // Thèmes d'une seule requête regroupés dans « autres ».
    var tc = {}; data.forEach(function (d) { tc[d.theme] = (tc[d.theme] || 0) + 1; });
    var label = {}; data.forEach(function (d) { if (tc[d.theme] < 2) d.theme = 'autres'; });
    data.forEach(function (d) { if (d.theme !== 'autres' && !label[d.theme]) { var w = fold(d.kw).split(/[^a-z0-9]+/).filter(function (x) { return stem(x) === d.theme; })[0]; label[d.theme] = w || d.theme; } });
    var useVol = data.some(function (d) { return d.vol; });
    var byI = {}, byT = {};
    data.forEach(function (d) {
      var k = useVol ? d.vol : 1;
      byI[d.intent] = (byI[d.intent] || 0) + k;
      var t = byT[d.theme] = byT[d.theme] || { n: 0, v: 0, i: {} }; t.n++; t.v += d.vol; t.i[d.intent] = (t.i[d.intent] || 0) + 1;
    });
    var total = Object.keys(byI).reduce(function (s, k) { return s + byI[k]; }, 0) || 1;
    var bars = Object.keys(INTENTS).filter(function (k) { return byI[k]; }).map(function (k) {
      var pc = 100 * byI[k] / total;
      return '<div class="vr-bar"><span>' + INTENTS[k] + '</span><b style="width:' + Math.max(pc, 1).toFixed(1) + '%"></b><em>' + fmt(pc) + ' %</em></div>';
    }).join('');
    var themes = Object.keys(byT).sort(function (a, b) { return a === 'autres' ? 1 : b === 'autres' ? -1 : (byT[b].v - byT[a].v) || (byT[b].n - byT[a].n); });
    var tRows = themes.map(function (t) {
      var x = byT[t], dom = Object.keys(x.i).sort(function (a, b) { return x.i[b] - x.i[a]; })[0];
      return '<tr><td><strong>' + esc(t === 'autres' ? 'Autres' : label[t]) + '</strong></td><td>' + x.n + '</td><td>' + (useVol ? fmt(x.v) : '–') + '</td><td>' + INTENTS[dom] + '</td></tr>';
    }).join('');
    data.sort(function (a, b) { return a.theme === b.theme ? b.vol - a.vol : (themes.indexOf(a.theme) - themes.indexOf(b.theme)); });
    var csv = ['Mot-clé;Volume;Intention;Raison;Thème'].concat(data.map(function (d) {
      return [d.kw, d.vol || '', INTENTS[d.intent], d.why, d.theme === 'autres' ? 'Autres' : label[d.theme]].map(csvCell).join(';');
    })).join('\n');
    var kRows = data.slice(0, 300).map(function (d) {
      return '<tr><td>' + esc(d.kw) + '</td><td>' + (d.vol ? fmt(d.vol) : '–') + '</td><td><span class="vr-tag vr-i-' + d.intent + '">' + INTENTS[d.intent] + '</span></td><td>' + esc(d.theme === 'autres' ? 'Autres' : label[d.theme]) + '</td></tr>';
    }).join('');
    box.innerHTML = '<p class="vr-regex-title"><strong>Répartition des intentions</strong> · ' + (useVol ? 'pondérée par le volume' : 'en nombre de requêtes') + '</p><div class="vr-bars">' + bars + '</div>'
      + '<p class="vr-regex-title"><strong>' + (function (k) { return k + (k > 1 ? ' thèmes' : ' thème'); })(themes.length - (byT.autres ? 1 : 0)) + '</strong> · un thème = une page ou un groupe de pages à prévoir</p>'
      + '<div class="vr-table-wrap"><table class="vr-table"><thead><tr><th>Thème</th><th>Requêtes</th><th>Volume</th><th>Intention dominante</th></tr></thead><tbody>' + tRows + '</tbody></table></div>'
      + '<div class="vr-actions"><button type="button" class="btn btn-ghost vr-dl" data-file="mots-cles-classes.csv" data-mime="text/csv" data-text="' + esc(csv) + '">Télécharger le classement complet (CSV)</button></div>'
      + '<details class="vr-details"><summary>Voir les ' + data.length + ' requêtes</summary><div class="vr-table-wrap"><table class="vr-table"><thead><tr><th>Mot-clé</th><th>Volume</th><th>Intention</th><th>Thème</th></tr></thead><tbody>' + kRows + '</tbody></table></div></details>'
      + '<p class="vr-note">Classement par les mots de la requête, sans IA : c\'est un premier tri. Pour une requête ambiguë (« Mixte »), la page de résultats de Google tranche : regardez ce qui s\'y classe avant de choisir le format de page.</p>';
  }

  /* ---------------------------------------------- 7. PageRank interne (growww) */
  function normUrl(u, base) {
    u = String(u || '').trim().replace(/^"|"$/g, '');
    if (!u) return '';
    try { var x = new URL(u, base || 'https://exemple.fr/'); x.hash = ''; return x.href; } catch (e) { return u; }
  }
  function shortUrl(u) { try { var x = new URL(u); return (x.pathname + x.search) || '/'; } catch (e) { return u; } }
  function pagerank(form, box) {
    var rows = lines(val(form, 'links'));
    if (!rows.length) return error(box, 'Collez la liste des liens internes (page source, page de destination).');
    var home = normUrl(val(form, 'home')), base = home || undefined;
    var head = splitRow(rows[0]).map(function (h) { return h.toLowerCase(); });
    var si = 0, di = 1;
    if (!/^https?:|^\//.test(head[0])) {
      rows.shift();
      head.forEach(function (h, i) { if (/^(source|from|de|page source)$/.test(h)) si = i; if (/^(destination|target|to|vers|address|adresse|page de destination)$/.test(h)) di = i; });
    }
    var out = {}, nodes = {}, edges = 0;
    rows.forEach(function (l) {
      var p = splitRow(l), s = normUrl(p[si], base), d = normUrl(p[di], base);
      if (!s || !d || s === d) return;
      nodes[s] = nodes[d] = 1;
      out[s] = out[s] || {};
      if (!out[s][d]) { out[s][d] = 1; edges++; }
    });
    lines(val(form, 'pages')).forEach(function (u) { u = normUrl(u, base); if (u) nodes[u] = 1; });
    var ids = Object.keys(nodes), n = ids.length;
    if (n < 2) return error(box, 'Il faut au moins deux pages reliées.');
    if (n > 20000) return error(box, 'Plus de 20 000 pages : découpez l\'export par répertoire.');
    var idx = {}; ids.forEach(function (u, i) { idx[u] = i; });
    var outs = ids.map(function (u) { return Object.keys(out[u] || {}).map(function (d) { return idx[d]; }); });
    var inc = ids.map(function () { return 0; }); outs.forEach(function (o) { o.forEach(function (j) { inc[j]++; }); });
    var a = 0.85, pr = ids.map(function () { return 1 / n; });
    for (var it = 0; it < 60; it++) {
      var nx = ids.map(function () { return (1 - a) / n; }), dangling = 0;
      for (var i = 0; i < n; i++) {
        if (!outs[i].length) { dangling += pr[i]; continue; }
        var share = a * pr[i] / outs[i].length;
        for (var k = 0; k < outs[i].length; k++) nx[outs[i][k]] += share;
      }
      var dsh = a * dangling / n, diff = 0;
      for (i = 0; i < n; i++) { nx[i] += dsh; diff += Math.abs(nx[i] - pr[i]); }
      pr = nx;
      if (diff < 1e-9) break;
    }
    // Profondeur en clics depuis l'accueil.
    var start = home && idx[home] !== undefined ? idx[home] : ids.reduce(function (b, u, i) { return shortUrl(u).length < shortUrl(ids[b]).length ? i : b; }, 0);
    var depth = ids.map(function () { return -1; }); depth[start] = 0;
    var q = [start];
    while (q.length) { var c = q.shift(); outs[c].forEach(function (j) { if (depth[j] < 0) { depth[j] = depth[c] + 1; q.push(j); } }); }
    var max = Math.max.apply(null, pr);
    var data = ids.map(function (u, i) { return { u: u, pr: pr[i], score: Math.round(100 * pr[i] / max), inl: inc[i], outl: outs[i].length, d: depth[i] }; });
    data.sort(function (x, y) { return y.pr - x.pr; });
    var orphans = data.filter(function (x) { return !x.inl && x.u !== ids[start]; });
    var deep = data.filter(function (x) { return x.d > 3; });
    var unreach = data.filter(function (x) { return x.d < 0; });
    var bottom = data.slice(-Math.min(15, Math.floor(n / 5)));
    var row = function (x) { return '<tr><td title="' + esc(x.u) + '">' + esc(shortUrl(x.u)) + '</td><td><strong>' + x.score + '</strong></td><td>' + x.inl + '</td><td>' + x.outl + '</td><td>' + (x.d < 0 ? 'inaccessible' : x.d) + '</td></tr>'; };
    var thead = '<thead><tr><th>Page</th><th>Score (sur 100)</th><th>Liens reçus</th><th>Liens émis</th><th>Clics depuis l\'accueil</th></tr></thead>';
    var csv = ['URL;Score;PageRank;Liens reçus;Liens émis;Profondeur'].concat(data.map(function (x) { return [x.u, x.score, x.pr.toFixed(6), x.inl, x.outl, x.d < 0 ? '' : x.d].map(csvCell).join(';'); })).join('\n');
    box.innerHTML = '<div class="vr-kpis"><div><p class="vr-big">' + fmt(n) + '</p><p>pages, ' + fmt(edges) + ' liens internes</p></div>'
      + '<div><p class="vr-big">' + orphans.length + '</p><p>page(s) orpheline(s), sans aucun lien reçu</p></div>'
      + '<div><p class="vr-big">' + (deep.length + unreach.length) + '</p><p>page(s) à plus de 3 clics de l\'accueil ou inaccessibles</p></div></div>'
      + '<p class="vr-regex-title"><strong>Les pages qui concentrent le plus de popularité interne</strong></p>'
      + '<div class="vr-table-wrap"><table class="vr-table">' + thead + '<tbody>' + data.slice(0, 20).map(row).join('') + '</tbody></table></div>'
      + '<p>Vérifiez que ce sont bien vos pages stratégiques. Si une page légale ou un tag arrive en tête, c\'est souvent un lien de menu ou de pied de page à revoir.</p>'
      + (orphans.length ? '<p class="vr-regex-title"><strong>Pages orphelines</strong> · aucune page du site ne les cite</p><div class="vr-table-wrap"><table class="vr-table">' + thead + '<tbody>' + orphans.slice(0, 50).map(row).join('') + '</tbody></table></div>' : '')
      + '<p class="vr-regex-title"><strong>Les pages les moins soutenues</strong> · candidates à des liens depuis vos pages fortes</p>'
      + '<div class="vr-table-wrap"><table class="vr-table">' + thead + '<tbody>' + bottom.map(row).join('') + '</tbody></table></div>'
      + '<div class="vr-actions"><button type="button" class="btn btn-ghost vr-dl" data-file="pagerank-interne.csv" data-mime="text/csv" data-text="' + esc(csv) + '">Télécharger toutes les pages (CSV)</button></div>'
      + '<p class="vr-note">Calcul local, dans votre navigateur : rien n\'est envoyé. Même méthode que le PageRank d\'origine (facteur d\'amortissement 0,85), appliquée à votre seul maillage interne. Le score ne tient pas compte des liens externes ni de la position du lien dans la page : c\'est une mesure de structure, pas une prévision de classement.</p>';
  }

  var TOOLS = { schema: schema, hreflang: hreflang, trafic: trafic, regex: regex, llms: llms, intention: intention, pagerank: pagerank };

  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.vr-copy, .vr-dl') : null;
    if (!b) return;
    var pre = b.closest('.vr-codebox') && b.closest('.vr-codebox').querySelector('pre');
    var text = b.getAttribute('data-text') || (pre && pre.textContent) || '';
    if (b.classList.contains('vr-dl')) { download(b.getAttribute('data-file'), (b.getAttribute('data-mime') === 'text/csv' ? '\ufeff' : '') + text, b.getAttribute('data-mime')); return; }
    if (!text || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(function () {
      b.textContent = 'Copié';
      setTimeout(function () { b.textContent = 'Copier'; }, 1500);
    });
  });

  // Mémorise la saisie dans ce navigateur uniquement (rien n'est envoyé).
  function store(id) {
    return {
      get: function () { try { return JSON.parse(localStorage.getItem('vr-tool-' + id) || 'null'); } catch (e) { return null; } },
      set: function (v) { try { localStorage.setItem('vr-tool-' + id, JSON.stringify(v)); } catch (e) {} },
      clear: function () { try { localStorage.removeItem('vr-tool-' + id); } catch (e) {} }
    };
  }
  function fields(form) {
    return Array.prototype.filter.call(form.elements, function (el) { return el.name && el.type !== 'checkbox' && el.type !== 'submit' && el.type !== 'button'; });
  }

  Array.prototype.forEach.call(document.querySelectorAll('.vr-tool'), function (tool) {
    var id = tool.getAttribute('data-tool'), fn = TOOLS[id];
    var form = tool.querySelector('form');
    var box = tool.querySelector('.vr-tool-result');
    if (!fn || !form || !box) return;
    var st = store(id), saved = st.get();
    if (saved) fields(form).forEach(function (el) { if (saved[el.name] !== undefined) el.value = saved[el.name]; });
    form.addEventListener('input', function () {
      var v = {};
      fields(form).forEach(function (el) { v[el.name] = el.value; });
      st.set(v);
    });

    // Boutons « Exemple » et « Effacer » à côté du bouton principal.
    var submit = form.querySelector('button[type="submit"]');
    var bar = document.createElement('div');
    bar.className = 'vr-actions vr-form-actions';
    submit.parentNode.insertBefore(bar, submit);
    bar.appendChild(submit);
    var ex = document.createElement('button');
    ex.type = 'button'; ex.className = 'btn btn-ghost'; ex.textContent = 'Remplir avec l\u2019exemple';
    ex.addEventListener('click', function () {
      fields(form).forEach(function (el) {
        var f = el.closest('.vr-field');
        if (f && f.classList.contains('is-hidden')) return;
        if (el.tagName !== 'SELECT' && el.placeholder) el.value = el.placeholder.replace(/^ex\.\s*/i, '').replace(/\u2026$/, '');
      });
      if (id === 'schema' && form.elements.published && !form.elements.published.value) form.elements.published.value = new Date().toISOString().slice(0, 10);
      form.dispatchEvent(new Event('input'));
      fn(form, box);
    });
    var clr = document.createElement('button');
    clr.type = 'button'; clr.className = 'btn btn-ghost'; clr.textContent = 'Effacer';
    clr.addEventListener('click', function () {
      fields(form).forEach(function (el) { if (el.tagName !== 'SELECT') el.value = ''; });
      st.clear(); box.innerHTML = '';
    });
    bar.appendChild(ex); bar.appendChild(clr);

    if (id === 'schema') {
      schemaToggle(form);
      form.elements.type.addEventListener('change', function () { schemaToggle(form); box.innerHTML = ''; });
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      fn(form, box);
      if (box.getBoundingClientRect().top > window.innerHeight) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    if (tool.hasAttribute('data-live')) form.addEventListener('input', function () { fn(form, box); });
  });
})();
