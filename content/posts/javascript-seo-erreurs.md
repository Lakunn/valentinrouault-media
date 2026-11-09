---
title: "JavaScript et SEO : les 4 erreurs qui font perdre des positions (et comment les corriger)"
slug: javascript-seo-erreurs
status: publish
date: '2025-10-01T13:24:57'
origin: rewrite
wp_id: 446
categories:
- seo-technique
- ai-seo
- seo
dek: "Rendu côté client excessif, ressources bloquées, erreurs de script, scripts tiers trop lourds : les quatre problèmes JavaScript que l'on retrouve le plus souvent en audit, et pourquoi ils pénalisent aussi la visibilité dans les IA."
seo_title: "JavaScript et SEO : 4 erreurs qui coûtent des positions"
meta_description: "JavaScript et SEO : rendu côté client, ressources bloquées, erreurs de script, scripts tiers. Symptômes, corrections et impact sur les robots des IA."
essentiel:
  - "Le contenu important (titre, texte principal, liens) doit être **présent dans le HTML renvoyé par le serveur**, pas seulement après exécution du JavaScript."
  - "Googlebot exécute le JavaScript, mais en différé ; **la plupart des robots des IA ne l'exécutent pas**, et ne voient donc pas un contenu chargé côté client."
  - "Les fichiers JS et CSS nécessaires au rendu ne doivent pas être bloqués dans le robots.txt."
  - "Les scripts tiers (tests A/B, chat, publicité, bannières) dégradent souvent les Core Web Vitals : il faut les inventorier et les charger plus tard."
---

JavaScript rend les sites plus riches et plus interactifs. Mal maîtrisé, il retarde ou empêche l'indexation, dégrade les performances et rend des contenus invisibles. Corriger ces problèmes est le travail des développeurs, mais savoir les reconnaître évite des mois de positions perdues.

Voici les quatre erreurs que je rencontre le plus souvent en audit. Pour les recommandations officielles de Google, voir [les bonnes pratiques JavaScript SEO selon Martin Splitt](/bonnes-pratiques-javascript-seo/).

## 1. Trop de rendu côté client

Avec le rendu côté client (CSR), le serveur envoie une page presque vide, et le JavaScript la remplit dans le navigateur. Googlebot sait exécuter le JavaScript, mais le rendu intervient dans un second temps, et un rendu lent ou en erreur peut laisser une partie du contenu de côté.

**Un enjeu nouveau avec les IA.** Les robots des assistants (ceux d'OpenAI ou d'Anthropic, par exemple) n'exécutent généralement pas le JavaScript : une analyse publiée par Vercel fin 2024 l'a montré à partir de ses données de trafic. Un contenu qui n'existe qu'après rendu côté client est donc invisible pour eux.

**Symptômes :**

- dans l'outil d'inspection d'URL de la Search Console, le HTML exploré est presque vide ou le contenu manque ;
- des pages explorées mais non indexées, alors qu'elles semblent complètes dans le navigateur ;
- le texte principal absent du code source (Ctrl+U), présent seulement dans l'inspecteur.

**Corrections :**

- **rendu côté serveur (SSR) ou génération statique** pour les pages qui doivent se classer : la plupart des frameworks le proposent (Next.js, Nuxt, SvelteKit, Remix, Astro) ;
- **pré-rendu** des gabarits stratégiques (catégories, fiches produits, articles) si une refonte complète n'est pas envisageable ;
- garder le JavaScript pour l'interactivité (*hydratation partielle*, architecture en « îlots »).

Le rendu dynamique (servir une version différente aux robots) est aujourd'hui présenté par Google comme une solution de contournement, pas comme une solution recommandée.

## 2. Des ressources bloquées dans le robots.txt

Un `robots.txt` qui interdit `/assets/`, `/static/`, `/dist/` ou `/wp-includes/` empêche Googlebot de charger les fichiers nécessaires au rendu. Il voit alors une page cassée.

**À vérifier :**

- les règles `Disallow` héritées d'anciennes versions du site ;
- le **rapport robots.txt** de la Search Console (paramètres) et l'outil d'inspection d'URL, qui liste les ressources que Google n'a pas pu charger ;
- le code de réponse des fichiers JS et CSS clés (200 attendu).

**Correction :** retirer les blocages sur les ressources nécessaires au rendu. Le robots.txt sert à contrôler l'exploration de pages, pas à cacher des fichiers techniques.

## 3. Des erreurs JavaScript qui cassent le rendu

Une erreur de syntaxe, une dépendance manquante ou un conflit entre scripts peut interrompre le rendu, pour les robots comme pour les visiteurs.

**Comment les repérer :**

- la console des outils de développement du navigateur, sur la version en production ;
- l'outil d'inspection d'URL (capture du rendu et messages de la console) ;
- un outil de suivi des erreurs côté utilisateur (RUM) pour voir les erreurs réelles.

**Corrections :**

- tests automatisés avant mise en production ;
- chargement conditionnel des *polyfills* ;
- suppression des scripts en double et découpage du code (*code splitting*).

## 4. Des scripts tiers trop lourds

Chat, tests A/B, cartes de chaleur, lecteurs vidéo, publicité, outils d'analytics, bannières de consentement : chaque intégration ajoute du JavaScript, souvent via un gestionnaire de balises.

**Pourquoi c'est pénalisant :**

- **le fil principal est saturé** : des tâches longues retardent l'interactivité et dégradent l'**INP** et parfois le **LCP** ;
- **l'affichage est retardé** si un script est chargé de façon bloquante dans le `<head>` ;
- **la mise en page bouge** quand des éléments sont injectés tardivement (**CLS**) ;
- **un service tiers lent ou en panne** peut ralentir toute la page ;
- **des tests A/B ou bannières mal configurés** peuvent masquer du contenu ou modifier des balises au moment où le robot passe.

Ces problèmes sont visibles dans PageSpeed Insights et dans l'onglet Lighthouse des outils de développement.

![Diagnostic des scripts tiers dans PageSpeed Insights](https://valentinrouault.com/wp-content/uploads/2025/10/capture-page-speed-insights.png)

**Les intégrations les plus risquées :** tests A/B côté client (scintillement, réécritures tardives), enregistrements de sessions, widgets de chat et carrousels tiers, scripts publicitaires, lecteurs vidéo externes, bannières de consentement mal intégrées.

**Corrections :**

- **inventaire** régulier des balises, avec un responsable pour chacune, et suppression des balises orphelines ;
- **chargement différé** : `defer` sur tout script non critique, chargement des widgets à la première interaction ou à l'arrivée dans l'écran ;
- **déclencheurs ciblés** dans le gestionnaire de balises plutôt que « toutes les pages » ;
- **versions allégées** des intégrations (lecteurs vidéo légers, par exemple) ;
- **tests A/B côté serveur** quand c'est possible ;
- **un budget de performance** (poids et temps d'exécution des scripts tiers) vérifié avant chaque mise en production.

## La checklist « JavaScript compatible SEO »

- Le titre, le texte principal et les liens sont-ils dans le **HTML initial** ?
- Les fichiers JS et CSS nécessaires sont-ils **accessibles** (200, non bloqués) ?
- La console de production est-elle **sans erreur bloquante** ?
- Les **scripts tiers** sont-ils inventoriés et chargés en différé ?
- L'indexation réelle a-t-elle été **vérifiée** (inspection d'URL, rapport d'indexation, logs) ?

Voir aussi : [comprendre l'indexation Google](/indexation-google/).

<section class="faq" markdown="1">

## Questions fréquentes

### Google indexe-t-il les sites en JavaScript ?

Oui, Googlebot exécute le JavaScript. Mais le rendu intervient après l'exploration, et toute erreur ou lenteur peut faire manquer du contenu. Un HTML initial complet reste la solution la plus fiable.

### Les robots de ChatGPT voient-ils le contenu chargé en JavaScript ?

En général non : les robots des principaux assistants récupèrent le HTML sans exécuter le JavaScript. Le contenu doit donc être présent dans la réponse du serveur.

### Un site WordPress est-il concerné ?

Moins qu'une application JavaScript, puisque WordPress génère le HTML côté serveur. Mais les constructeurs de pages, extensions et scripts tiers peuvent ajouter beaucoup de JavaScript : le point 4 s'applique pleinement.

</section>
