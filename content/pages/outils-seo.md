---
title: "Outils SEO et GEO gratuits"
slug: outils-seo
status: publish
origin: new
dek: "Quatre outils simples, sans inscription : prévisualiser un résultat Google, régler l'accès des robots d'IA, isoler le trafic des assistants dans GA4 et estimer l'effet des AI Overviews sur une page."
seo_title: "Outils SEO et GEO gratuits : SERP, robots IA, GA4"
meta_description: "Aperçu SERP, générateur robots.txt pour les robots d'IA, canal « Assistants IA » pour GA4, estimation de l'effet des AI Overviews : quatre outils gratuits."
essentiel:
  - "Tout se calcule **dans votre navigateur** : aucune donnée n'est envoyée ni conservée."
  - "Chaque outil cite la source de ses repères, avec sa date."
  - "Ce sont des **aides à la décision** : vos données de la Search Console restent la référence."
---

Quatre outils que j'utilise moi-même au quotidien. Ils répondent à des questions précises, sans compte à créer.

## Aperçu dans Google

Saisissez un titre et une méta-description pour voir comment ils risquent de s'afficher sur ordinateur. Google coupe selon la largeur en pixels, pas selon le nombre de caractères : un titre en majuscules est tronqué bien plus tôt qu'un titre en minuscules.

[vr_serp]

Pour écrire des titres qui donnent envie de cliquer, voir [comment rédiger un article qui se positionne](/redaction-article-premier-google/).

## Règles robots.txt pour les robots d'IA

Chaque éditeur d'IA utilise plusieurs robots : certains collectent des pages pour entraîner les modèles, d'autres alimentent la recherche et les citations. Bloquer les premiers n'empêche pas d'être cité, bloquer les seconds, si. Par défaut, l'outil autorise les robots de recherche et bloque ceux d'entraînement : c'est le réglage que je conseille à la plupart des sites éditoriaux.

[vr_robots_ia]

Le contexte complet est dans [comment être cité par les IA](/seo-ia/) et dans l'article sur [le fichier llms.txt](/llms-txt/).

## Canal « Assistants IA » dans GA4

Par défaut, GA4 range les visites venues de ChatGPT, Perplexity ou Gemini dans le canal « Referral », mélangées aux liens classiques. Cet outil génère l'expression régulière à coller dans un groupe de canaux personnalisé.

[vr_ga4_ia]

Pour interpréter ces visites, voir [ChatGPT contre Google](/google-vs-chatgpt-tendances/) et [les taux de conversion par canal](/benchmark-conversion-marketing/).

## Estimer l'effet des AI Overviews sur une page

Indiquez les clics mensuels d'une page, sa position moyenne et la part de ses requêtes qui affichent un AI Overview. L'outil applique les baisses de taux de clic mesurées par Ahrefs pour chaque position.

[vr_aio]

Les AI Overviews sont arrivés en France le 22 juillet 2026. Pour mesurer leur effet réel sur votre site, croisez cette estimation avec [le rapport IA générative de la Search Console](/search-console-rapport-ia/) et lisez [les recherches zéro clic](/zero-click-searches/).

## Sources des repères

- Largeurs d'affichage des résultats : ordres de grandeur observés sur ordinateur (environ 580 px pour le titre, 920 px pour la description). Google n'en publie pas.
- Robots d'IA : documentation officielle d'OpenAI, d'Anthropic, de Google, d'Apple, de Perplexity, de Common Crawl et de Meta, consultée en novembre 2026.
- Baisse du taux de clic : Ahrefs, « Update: AI Overviews Reduce Clicks by 58% », février 2026, données de décembre 2025 sur 300 000 mots-clés.
