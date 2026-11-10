---
name: veille-valeur-ajoutee
description: "Transformer la veille SEO/GEO (flux RSS des grands blogs SEO français et internationaux, Bluesky, alertes Google, comptes X) de valentinrouault.com en articles qui apportent de la valeur au-delà des sources : choix du sujet, angle, vérification, données ajoutées, rédaction, programmation d'une publication par jour."
---

# Veille SEO/GEO → articles à valeur ajoutée (valentinrouault.com)

Ce skill complète `guide-canin-contenu` (cycle commun de rédaction et d'humanisation, section « valentinrouault.com »). Il couvre l'amont : partir de ce que publient les autres pour écrire **ce qu'ils n'ont pas écrit**.

Principe directeur : un article tiré de la veille n'est justifié que s'il répond oui à au moins **une** de ces questions.

1. **Contexte français** : la nouveauté arrive-t-elle en France, quand, avec quelles différences (langue, réglementation, droits voisins, marché) ?
2. **Vérification** : peut-on confirmer ou infirmer l'information à la source primaire, ou par un test sur des données réelles ?
3. **Synthèse** : plusieurs sources se contredisent-elles ou se complètent-elles ? Les réunir est-il plus utile que chacune séparément ?
4. **Mise en perspective** : la nouveauté s'inscrit-elle dans une série (déclarations précédentes, mises à jour passées, chiffres d'autres études) ?
5. **Passage à l'action** : peut-on dire précisément quoi vérifier, changer ou surveiller, avec une méthode ?

Si la réponse est non partout, on ne publie pas : on note le sujet dans le plan comme « à surveiller ». Une traduction ou un résumé d'article anglais n'apporte rien, et Google comme les IA le savent.

## 1. Lire la veille du jour

Le workflow GitHub « 4 · Veille » tourne chaque matin (`scripts/veille.py`, sources dans `config/veille.yml`) et commite :

- `veille/AAAA-MM-JJ.md` : les sujets classés, avec leurs sources, le type dominant (annonce, étude, déclaration, débat), les signaux **écart FR** (couvert en anglais, pas encore en français) et **en hausse**, et les contenus du site à mettre à jour ;
- `veille/plan.md` : le plan glissant des 15 meilleurs sujets ;
- `veille/items.json` : l'historique (45 jours).

Pour lancer la veille à la main : workflow « 4 · Veille » dans l'onglet Actions, ou `python scripts/veille.py` en local. Une source injoignable apparaît en fin de rapport : corriger son adresse dans `config/veille.yml` ou la retirer.

## 2. Choisir le sujet du jour

Ordre de priorité :

1. **Source officielle + écart FR** : annonce de Google, Bing ou OpenAI pas encore traitée en français. C'est la plus forte valeur.
2. **Sujet en hausse couvert par 3 sources ou plus** : le public cherche une synthèse.
3. **Étude chiffrée** : relecture critique de la méthode et confrontation à d'autres données.
4. **Déclaration d'un Googler** : la replacer dans l'historique de ses déclarations.

Avant de créer un article, regarder la ligne « Mettre à jour plutôt que créer » : si un article existant couvre la même intention, **le mettre à jour** (garder slug, `wp_id` et `date` ; WordPress enregistre la date de modification à la synchro, et une ligne en italique en tête d'article indique ce qui a changé) au lieu de créer un doublon qui cannibaliserait.

Écarter : les rumeurs à source unique non officielle, les annonces sans effet en France ni pour les lecteurs du site, les sujets déjà traités sans élément nouveau.

## 3. Construire l'angle à valeur ajoutée

Le rapport propose trois pistes par type. Les transformer en un angle unique, formulé en une phrase : « Ce que [fait] change pour [public] en France, et comment le vérifier sur son site. »

Selon le type :

- **Annonce** : date et pays de disponibilité, différences pour la France, captures ou observations sur des SERP françaises, ce qu'il faut faire, ne pas faire, surveiller à 30 jours.
- **Étude** : échantillon, pays, période, définition des métriques ; ce que l'étude prouve et ne prouve pas ; comparaison avec au moins deux autres sources ; transposition prudente au marché français.
- **Déclaration** : citation exacte à la source primaire (lien vers le post ou la page), déclarations antérieures sur le même sujet, ce qui est confirmé, interprété ou inconnu.
- **Débat** : positions en présence avec leurs données, ce que les faits permettent de trancher, un test que le lecteur peut reproduire.

## 4. Ajouter de la donnée, pas du texte

Chaque article tiré de la veille contient au moins **un** de ces apports, signalé clairement dans le texte :

- un **tableau de synthèse** qui croise plusieurs sources (dates, chiffres, pays, conditions) ;
- une **chronologie** des annonces ou déclarations sur le sujet ;
- une **vérification** sur données publiques (SERP françaises, documentation officielle, changelog) ;
- une **méthode** pas à pas pour mesurer l'effet sur son propre site (filtres Search Console, outils de `/outils-seo/`) ;
- un **calcul** à partir des chiffres publiés (ordre de grandeur, part de marché, effet en France).

Règle absolue : aucune expérience, aucun test, aucun client inventé. Si une vérification n'a pas été faite, on ne l'écrit pas. Chaque chiffre a une source datée, sinon il est retiré.

## 5. Vérifier

- Remonter **à la source primaire** de chaque fait (blog officiel, documentation, étude originale, post de l'auteur). Un média qui reprend un autre média n'est pas une source.
- Une recherche web par fait important, en privilégiant la date la plus récente.
- Dater toute affirmation qui peut changer (« en novembre 2026 »).
- Citer les sources en fin d'article (« Sources : … »), au format du dépôt.

## 6. Rédiger

Suivre le skill `guide-canin-contenu` pour le format (front matter complet, L'essentiel, maillage interne en liens relatifs, FAQ si utile) et l'humanisation. Choisir le modèle dans `templates/` : `actualite.md` pour une annonce, `statistiques.md` pour une étude, `guide-pilier.md` pour une synthèse.

Spécificités de ce skill :

- Le titre annonce l'apport, pas la nouvelle : « AI Mode arrive dans 40 pays : ce qui change (et ne change pas) pour la France » plutôt que « Google étend AI Mode ».
- Le premier paragraphe dit en deux phrases ce qui s'est passé et ce que l'article apporte en plus.
- Une section « Ce que nous ne savons pas encore » quand l'information est incomplète.
- Pas de paraphrase longue d'un article source : 15 mots cités au maximum par source, le reste reformulé.

Avant de pousser : `python scripts/validate.py` et `python scripts/style_check.py --strict <fichiers>`.

## 7. Programmer une publication par jour

- Un article par jour au maximum, publié à **7 h 30, heure de Paris**.
- Dans le front matter : `status: future` et `date: 'AAAA-MM-JJT07:30:00'` (heure du site). WordPress publie seul à l'heure dite ; le déploiement envoie l'article dès le push.
- Vérifier les dates déjà prises : `grep -l "status: future" content/posts/*.md` puis lire leur `date`. Prendre le premier jour libre.
- Une actualité à fort enjeu (annonce officielle, core update) peut passer avant les autres : décaler alors les articles programmés suivants d'un jour.
- Mettre à jour la décision dans le rapport de veille du jour (`[x] article`, `[x] mise à jour` ou `[x] ignorer`).

## 8. Après publication

- Ajouter des liens vers le nouvel article depuis 2 ou 3 articles existants proches (maillage), sans changer leurs slugs.
- Si le sujet évolue (déploiement en France, correction de Google), mettre à jour l'article, avec une ligne en tête qui signale la mise à jour, plutôt que d'en écrire un nouveau.

## Sources suivies (rappel)

Le détail est dans `config/veille.yml` :

- **Officielles** : Google Search Central, Search Status Dashboard, blog Google Search, Bing Webmaster, OpenAI.
- **Internationales** : Search Engine Roundtable, Search Engine Land, Search Engine Journal, Ahrefs, Semrush, Moz, SparkToro, Growth Memo, Aleyda Solis, iPullRank.
- **Françaises** : Abondance, WebRankInfo, Blog du Modérateur, Siècle Digital, Journal du Net, Google Actualités FR.
- **Bluesky** : John Mueller, Barry Schwartz, Lily Ray, Aleyda Solis, Glenn Gabe, Rand Fishkin (flux RSS publics).
- **Alertes Google** : flux RSS à ajouter dans `google_alerts`.
- **X** : comptes des Googlers (SearchLiaison, John Mueller, Gary Illyes, Martin Splitt, Search Central) et des principaux experts, suivis seulement si le secret `X_BEARER_TOKEN` est configuré. Sinon, Search Engine Roundtable relaie leurs déclarations chaque jour.
