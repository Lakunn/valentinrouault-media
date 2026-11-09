---
title: "Search Console : comment lire le rapport « IA générative » (AI Overviews et AI Mode)"
slug: search-console-rapport-ia
status: publish
date: 2026-11-09T08:00:00
origin: new
categories: [actus-seo, blog]
dek: "Google mesure enfin, dans la Search Console, les impressions de vos pages dans les AI Overviews et l'AI Mode. Ce que montre ce rapport, ses limites, et comment l'exploiter."
seo_title: "Rapport IA générative de la Search Console : le mode d'emploi"
meta_description: "Le rapport IA générative de la Search Console mesure vos impressions dans les AI Overviews et l'AI Mode. Ce qu'il montre, ses limites et comment l'exploiter."
essentiel:
  - "Annoncé le **3 juin 2026**, le rapport isole les impressions d'un site dans les **AI Overviews**, l'**AI Mode** et les fonctions IA de **Discover**. Il est disponible pour tous les sites depuis la fin de l'été 2026."
  - "Les données commencent au **18 mai 2026**, sans historique antérieur."
  - "Il montre des **impressions** par page, pays, appareil et date, mais **ni les clics ni les requêtes**."
  - "Ce ne sont pas des données nouvelles : ces impressions étaient déjà comptées, mélangées, dans le rapport Performances classique."
---

Pendant deux ans, la question « mon site apparaît-il dans les AI Overviews ? » n'avait pas de réponse officielle. On recoupait des outils tiers, des captures d'écran et des intuitions. Depuis juin 2026, Google fournit une première réponse dans la Search Console. Elle est partielle, mais elle existe.

## Ce que Google a lancé

Le 3 juin 2026, Google a annoncé des rapports de performance dédiés à l'**IA générative** dans la Search Console. Le déploiement a d'abord concerné une partie des sites, puis il a été étendu à tous les sites à la fin de l'été 2026.

Deux rapports distincts :

| Rapport | Surfaces couvertes |
|---|---|
| IA générative dans la recherche | AI Overviews et AI Mode |
| IA générative dans Discover | Fonctions IA de Discover |

Les données démarrent le **18 mai 2026**. Aucune donnée plus ancienne n'est disponible.

## Ce que le rapport montre

- les impressions de vos pages dans ces fonctionnalités ;
- la répartition par page, pays, appareil et date.

C'est suffisant pour répondre à des questions concrètes : quelles pages Google reprend-il dans ses réponses IA ? Cette visibilité progresse-t-elle ? Est-elle concentrée sur quelques contenus ou répartie ?

## Ce qu'il ne montre pas

- **Les clics.** On ne sait pas combien de visites viennent spécifiquement des réponses IA.
- **Les requêtes.** On ne sait pas sur quelles recherches la page est apparue.
- **Les autres assistants.** ChatGPT, Perplexity, Claude ou Copilot ne sont évidemment pas couverts.

Autre point important : ces impressions ne sont **pas nouvelles**. Depuis 2025, Google les compte déjà dans le rapport Performances classique, mélangées aux résultats traditionnels. Le nouveau rapport les isole, il ne s'y ajoute pas.

## Comment l'exploiter

### 1. Repérer les pages déjà reprises

Triez les pages par impressions IA. Ce sont vos contenus que Google juge déjà utiles pour construire ses réponses. Vérifiez qu'ils sont à jour, exacts et bien reliés au reste du site.

### 2. Comparer avec les performances classiques

Pour une même page, mettez en regard les impressions IA et l'évolution des clics dans le rapport Performances. Une page très présente dans les réponses IA dont les clics baissent illustre le phénomène du [zéro clic](/zero-click-searches/). Il faut alors se demander ce que le visiteur trouve sur la page qu'il ne trouve pas dans la réponse.

### 3. Identifier les absents

Les pages stratégiques qui n'apparaissent jamais sont les priorités : réponse directe en tête de page, sections autoportantes, données précises et sourcées. Méthode détaillée : [le guide du SEO pour les IA](/seo-ia/).

### 4. Compléter avec les autres sources

- **Bing Webmaster Tools** propose depuis février 2026 un rapport « AI Performance » : nombre de citations de vos pages dans Copilot et dans les résumés IA de Bing, pages citées et requêtes à l'origine des citations. Comme celui de Google, il ne donne pas les clics.
- Dans votre outil d'analytics, isolez les visites venant des assistants (chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com). ChatGPT a longtemps ajouté `utm_source=chatgpt.com` aux liens qu'il cite. Depuis le passage à GPT-6, en octobre 2026, plusieurs analyses ont constaté qu'une partie des liens arrive sans ce paramètre ni site référent : ces visites sont alors comptées en accès direct. Surveillez donc aussi l'évolution du trafic direct sur les pages souvent citées.
- Pour ChatGPT, Perplexity et les autres, un panel de requêtes testées régulièrement reste nécessaire.

## Une précision sur l'option de blocage

En parallèle de ce rapport, Google a introduit un réglage qui permet d'exclure son contenu des fonctionnalités d'IA générative. Ce réglage, disponible pour tous les sites depuis le 31 août 2026, se trouve dans les paramètres de la Search Console, à la rubrique « IA générative de la recherche ». Il s'applique à toute la propriété, et non page par page. C'est un choix binaire, qui retire le site de ces surfaces sans garantie de gain ailleurs. À réserver aux cas où l'exposition dans les réponses IA nuit clairement au modèle économique du site.

<section class="faq" markdown="1">

## Questions fréquentes

### Où trouver le rapport ?

Dans la section Performances de la Search Console. Si vous ne le voyez pas, vérifiez que vous consultez une propriété avec un volume de recherche suffisant et des données postérieures au 18 mai 2026.

### Une impression IA veut-elle dire que ma page est citée ?

Elle signifie que la page a été affichée dans une fonctionnalité d'IA générative. Le rapport ne précise pas la position ni la forme de cet affichage.

### Pourquoi mes impressions IA varient-elles beaucoup ?

Les réponses générées changent selon la requête, l'utilisateur et le moment, et Google fait évoluer ces fonctionnalités en continu. Il faut lire des tendances sur plusieurs semaines.

</section>
