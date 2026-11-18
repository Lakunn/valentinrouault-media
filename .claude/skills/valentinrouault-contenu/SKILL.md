---
name: valentinrouault-contenu
description: "Créer ou réécrire un contenu pour valentinrouault.com : conseils marketing, SEO et GEO écrits à la première personne par Valentin Rouault (voix, positions, expériences réelles fournies), brief SEO sémantique fondé sur les études, données SERP et UGC, rédaction humanisée, maillage, contrôle algoproof. Pour les articles tirés de la veille, compléter par le skill veille-valeur-ajoutee."
---

# Contenu valentinrouault.com

Média SEO / GEO et marketing **incarné par Valentin** : chaque article se lit comme écrit par un consultant qui a vu des centaines de sites, qui tranche, et qui dit d'où il tient ce qu'il avance. Lire `CLAUDE.md`, la grille commune [`algoproof.md`](algoproof.md) et la fiche de voix [`valentin.md`](valentin.md) avant toute rédaction.

Pour un sujet issu de la veille quotidienne (annonce, étude, déclaration), le skill `veille-valeur-ajoutee` couvre l'amont (choix, angle, vérification, programmation) ; ce skill couvre la rédaction et la voix.

Cycle en sept étapes, **dans l'ordre**. On ne rédige pas avant que Valentin ait validé le brief.

## 0. Carte des mots-clés, veille et volumes (commun aux 4 sites)

- **Sujets de fond** : `config/keywords.yml` (calendrier lisible dans `keywords/calendrier.md`), régénéré le 1er du mois par le workflow « Carte des mots-clés » (`scripts/keyword_map.py`, identique dans les 4 dépôts ; graines, rubriques et exclusions dans `config/keyword_seeds.yml`). Prendre le prochain sujet du calendrier ; `statut: existe_peut_etre` = un article existant couvre peut-être déjà le sujet : vérifier et **mettre à jour** plutôt que créer.
- **Volumes** : la carte prend, dans l'ordre, `config/volumes.yml` (relevés Keyword Surfer), DataForSEO, Bing, sinon l'indice Google Suggest (« à relever »). Pour relever : `python scripts/keyword_map.py --a-relever` donne la liste ; dans le Chrome de Valentin, recherche google.fr de chaque requête, lecture du tableau « Keyword ideas » de Surfer ; **au plus ~30 recherches d'affilée** (au-delà Google affiche un CAPTCHA, qu'on ne résout jamais) ; consigner la formulation la plus recherchée et ses variantes dans `config/volumes.yml`, puis relancer le script (gratuit grâce au cache).
- **Actualité** : `veille/AAAA-MM-JJ.md` et `veille/plan.md` (workflow de veille, `scripts/veille.py` identique dans les 4 dépôts, flux dans `config/veille.yml`). Une règle, un prix ou une formalité qui change : mise à jour datée de l'article concerné avant tout nouvel article.
- Renseigner `keyword` (requête principale de la carte) et `keywords_secondaires` dans le front matter de chaque nouvel article : la carte suivante le marque alors `programme` ou `publie`.
- Récapitulatif chaque lundi par e-mail (n8n, `growww-site/deploy/n8n/`).

## 1. Idée et existant

1. Sources : veille (`veille/AAAA-MM-JJ.md`, `veille/plan.md`), questions de clients et de lecteurs que Valentin rapporte, suggestions et « Autres questions » Google, UGC (étape 2), sujets que ses audits font revenir.
2. Rubriques : `blog` (GEO & IA), `seo`, `contenu-seo`, `actus-seo` et rubriques historiques. Le média reste sur SEO, GEO, contenu, acquisition et conversion : pas de sujet hors ligne pour « prendre du trafic » (cohérence thématique, `algoproof.md` § 1).
3. Chercher dans `content/` et `urls.csv` la même intention : **mettre à jour** plutôt que créer (garder `slug`, `wp_id`, `date`, passer `origin: rewrite`).
4. Livrer 5 à 10 idées en tableau : sujet, requête, intention, rubrique, gain d'information envisagé, **expérience de Valentin qui pourrait l'incarner** (ou « à demander »), modèle de `templates/` (`guide-pilier`, `actualite`, `statistiques`, `comparatif-outils`, `retour-experience`).

Attendre le choix de Valentin.

## 2. Données : SERP, UGC, sources

Depuis `marketing-intelligence` (SERP ~0,002 $, le reste gratuit) :

```bash
cd ../marketing-intelligence
.venv/Scripts/python.exe -m scripts.ugc_collect "cannibalisation seo" --videos 6 --comments 30 --out ../valentinrouault-media/.ugc
.venv/Scripts/python.exe -m scripts.ugc_collect "keyword cannibalization" --lang en --country US --only serp,youtube --out ../valentinrouault-media/.ugc
```

- La SERP française et la SERP américaine se comparent : ce que les ressources anglophones couvrent et que le top 10 français n'a pas est souvent le gain d'information le plus simple.
- UGC SEO : commentaires YouTube du relevé, `site:reddit.com` (r/SEO, r/bigseo, r/TechSEO), fils de discussion Bluesky et LinkedIn que Valentin signale. On y cherche les **questions qui reviennent** et les **croyances fausses** à corriger.
- Sources primaires : Google Search Central (documentation, blog, Search Status Dashboard), Bing Webmaster, documentation des éditeurs d'IA (OpenAI, Anthropic, Perplexity), études identifiables avec auteur, méthode et date (Ahrefs, Semrush, SparkToro, Similarweb, BrightEdge, Seer, études universitaires sur arXiv).
- Les outils du site (`/outils-seo/` : prévision de trafic, PageRank interne, regex Search Console, générateurs hreflang, données structurées, llms.txt) servent de **méthode reproductible** dans l'article.

## 3. Fact-checking

Tableau de faits : affirmation, source primaire (lien), date, statut (**officiel**, **étude**, **observation de Valentin**, **opinion**). Chaque statut se voit dans le texte : « Google l'écrit dans sa documentation », « l'étude d'Ahrefs (juillet 2026, 331 000 pages) montre une corrélation, pas une cause », « en audit, je le vois régulièrement », « mon avis : … ». Un chiffre sans source datée est retiré. Une déclaration de Googler est citée à la source (post, vidéo, documentation), avec la date.

## 4. Brief

Suivre `algoproof.md` § 2, puis :

```
Requête principale / intention / requêtes secondaires :
Lecteur visé (rédacteur, responsable marketing, e-commerçant, consultant, développeur) et son niveau :
SERP FR et US : formats, blocs, AI Overview et sources citées :
Entités attendues (rapports, métriques, systèmes Google, outils, notions) :
Sous-questions (SERP, suggestions, UGC) → H2/H3 :
Ce que le top 10 dit déjà :
GAIN D'INFORMATION (au moins un, nommé : méthode testable, donnée, synthèse d'études, cas réel) :
Position de Valentin (ce qu'il recommande, ce qu'il trouve surestimé) :
Expérience réelle utilisée (ligne de valentin.md ou message de Valentin) ou « aucune » :
Faits sourcés et leur statut :
Méthode « comment le vérifier sur votre site » :
Plan H2/H3 avec la réponse attendue sous chaque titre :
Liens internes sortants (3 à 6) / pages à modifier pour lier ce contenu (2 à 4) :
Médias (captures Search Console, schémas, tableaux) :
seo_title / meta_description :
```

## 5. Rédaction : la voix de Valentin

Format du dépôt : front matter `title`, `slug`, `status`, `date`, `origin`, `categories`, `dek`, `seo_title` (30 à 65 car.), `meta_description` (110 à 160 car.), `essentiel` (3 à 4 points), `sources` ; FAQ dans `<section class="faq" markdown="1">` avec des H3 ; liens internes relatifs.

Personnification (détail dans `valentin.md`) :

- **Je** pour l'auteur, **vous** pour le lecteur. Le chapô dit en une ou deux phrases la réponse et pourquoi Valentin est placé pour en parler (« J'ai corrigé ce problème sur des sites de quelques centaines à plusieurs centaines de milliers de pages »), seulement si c'est vrai et fourni.
- **Une prise de position par article au minimum**, assumée et argumentée ; et un « ce que je ne sais pas » quand c'est le cas.
- **Expériences réelles uniquement** : celles de `valentin.md` ou d'un message de Valentin, anonymisées sauf les marques citables. Sans expérience disponible, écrire à partir des sources et **demander** à Valentin un cas pour la prochaine version. Ne jamais inventer un client, un chiffre de trafic, un test ou une capture.
- **Le geste concret** : chaque recommandation dit où cliquer, quel filtre, quelle regex, quel seuil, et combien de temps attendre avant de juger.
- **Les trois niveaux étiquetés** : ce que dit Google, ce que montrent les études, ce que Valentin en pense.
- **Média, pas agence** : aucune offre, aucun « contactez-moi pour un audit », aucune mise en avant d'Ads Up au-delà de la page à propos.
- Réponse dans la première phrase sous chaque H2 ; sections autoportantes pour les IA ; tableaux pour comparer ; listes numérotées pour les méthodes.

Interdits propres au SEO (en plus de `style_check.py`) : « le SEO est mort », « game changer », « booster votre visibilité », « dans le paysage numérique actuel », « contenu de qualité » sans définition, « les algorithmes de Google » comme explication passe-partout, listes de « 10 astuces » sans hiérarchie, conclusions qui résument. Test du nom propre : remplacez « cannibalisation » par « maillage interne » ; si un paragraphe reste vrai, il est vide.

## 6. Maillage et médias

- 3 à 6 liens internes contextuels, 2 à 4 liens entrants ajoutés (même commit), lien vers le guide pilier de la rubrique et vers l'outil concerné de `/outils-seo/`.
- Captures réelles (Search Console, SERP) fournies par Valentin ou faites sur des données publiques, floutées si un site client apparaît ; schémas SVG pour un mécanisme ; images dans `content/media/` (WebP, 1600 px max).
- Vidéo YouTube seulement si elle vient d'une source primaire (Google Search Central, conférence) : URL seule sur sa ligne.

## 7. Contrôle et livraison

1. Contrôle final de `algoproof.md` § 4, plus : la voix est celle de `valentin.md`, aucune expérience n'est inventée, chaque statut de fait est visible.
2. `python scripts/style_check.py --strict content/posts/<slug>.md` sans alerte bloquante ; traiter les alertes « vocabulaire IA », « transitions » et « moule ».
3. `python scripts/validate.py` sans erreur.
4. Après validation par Valentin : `status: publish`, ou `status: future` à 7 h 30 (règle d'une publication par jour du skill `veille-valeur-ajoutee`). Le push sur `main` publie : le demander avant.
5. Ajouter à `valentin.md` toute nouvelle expérience fournie par Valentin pendant l'article.
6. Rendre : URL, tableau des sources avec statut, gain d'information, liens ajoutés, alertes restantes.
