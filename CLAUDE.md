# Règles pour travailler sur ce dépôt

Ce dépôt pilote le site WordPress valentinrouault.com (média SEO / GEO). Lire README.md pour le fonctionnement.

## Interdits absolus

- **Ne jamais changer un slug existant** (nom de fichier, champ `slug`, slug de rubrique dans config/site.yml). Pas de 301, jamais.
- Ne jamais supprimer un fichier de content/ dont l'URL figure dans urls.csv. Un contenu à retirer se réécrit, il ne disparaît pas.
- Ne jamais éditer urls.csv à la main.
- Ne pas augmenter `per_page` dans config/site.yml sans vérifier que toutes les URL paginées de urls.csv resteront en 200.

## Écriture

- Français, vouvoiement, ton éditorial (média, pas agence) : aucune offre commerciale, aucun appel à « prendre rendez-vous ».
- Chaque affirmation datable est datée ; chaque chiffre a une source identifiable, sinon il est retiré.
- Front matter obligatoire : title, slug, status, dek, seo_title (30–65 car.), meta_description (110–160 car.), essentiel (3–4 points), categories pour les articles.
- Maillage interne en liens relatifs (`/slug/`), vers des URL existantes uniquement.
- Une FAQ, si utile, dans `<section class="faq" markdown="1">` avec des H3.
- Un article réécrit passe à `origin: rewrite` et garde son `wp_id` et sa `date`.

## Avant de pousser

`python scripts/validate.py` doit passer sans erreur.
