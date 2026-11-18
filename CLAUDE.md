# Règles pour travailler sur ce dépôt

Ce dépôt pilote le site WordPress valentinrouault.com (média SEO / GEO). Lire README.md pour le fonctionnement.

## Interdits absolus

- **Ne jamais changer un slug existant** (nom de fichier, champ `slug`, slug de rubrique dans config/site.yml). Pas de 301, jamais.
- Ne jamais supprimer un fichier de content/ dont l'URL figure dans urls.csv. Un contenu à retirer se réécrit, il ne disparaît pas.
- Ne jamais éditer urls.csv à la main.
- Ne pas augmenter `per_page` dans config/site.yml sans vérifier que toutes les URL paginées de urls.csv resteront en 200.

- Toutes les pages statiques (content/pages) sont réécrites intégralement : aucune ne garde le contenu de l'ancien site. Une page `origin: import` bloque le déploiement.
- Un doublon se consolide par `canonical_overrides` (config/site.yml), jamais par une redirection ni une suppression.

## Écriture

Les sujets de fond viennent de la carte des mots-clés (`config/keywords.yml`, `keywords/calendrier.md`), régénérée le 1er du mois ; l'actualité, de `veille/`. Voir l'étape 0 du skill de contenu.

**Suivre le skill `valentinrouault-contenu`** pour toute création ou réécriture (voix de Valentin dans `valentin.md`, grille `algoproof.md`), et **`veille-valeur-ajoutee`** pour les articles tirés de la veille.

- Français, première personne (Valentin) et vouvoiement du lecteur, ton éditorial (média, pas agence) : aucune offre commerciale, aucun appel à « prendre rendez-vous ». Aucune expérience inventée.
- Chaque affirmation datable est datée ; chaque chiffre a une source identifiable, sinon il est retiré.
- Front matter obligatoire : title, slug, status, dek, seo_title (30–65 car.), meta_description (110–160 car.), essentiel (3–4 points), categories pour les articles.
- Maillage interne en liens relatifs (`/slug/`), vers des URL existantes uniquement.
- Une FAQ, si utile, dans `<section class="faq" markdown="1">` avec des H3.
- Un article réécrit passe à `origin: rewrite` et garde son `wp_id` et sa `date`.

## Avant de pousser

- `python scripts/validate.py` sans erreur (front matter, pagination, liens internes cassés).
- `python scripts/style_check.py --strict <fichiers modifiés>` sans alerte bloquante (tirets longs, formules d'IA, emojis, typographie).
- Images locales dans `content/media/`, insérées en `![alt](media/fichier.webp)` : la synchro les téléverse.
- Vidéo YouTube : URL seule sur sa ligne (lecteur léger chargé au clic).
