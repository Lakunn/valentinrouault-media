---
title: "llms.txt : à quoi sert ce fichier, et faut-il vraiment en publier un ?"
slug: llms-txt
status: publish
date: 2026-11-09T09:00:00
origin: new
categories: [blog]
dek: "Présenté comme le « robots.txt des IA », le fichier llms.txt fait beaucoup parler. Ce qu'il est, ce qu'il n'est pas, et ce que disent les données en 2026."
seo_title: "llms.txt : à quoi ça sert et faut-il en publier un ? (2026)"
meta_description: "llms.txt expliqué : origine, format, adoption en 2026, position de Google et des éditeurs d'IA, et dans quels cas il est utile d'en publier un."
essentiel:
  - "llms.txt est une **convention proposée en septembre 2024** par Jeremy Howard (Answer.AI) : un fichier Markdown à la racine du site qui résume ses contenus pour les modèles de langage."
  - "En 2026, **aucun grand éditeur d'IA** (OpenAI, Google, Anthropic) ne s'est publiquement engagé à le lire pour construire ses réponses. Google l'a comparé à la balise meta keywords."
  - "Ce n'est **ni un signal de classement, ni un outil de blocage** : le contrôle des robots IA passe par robots.txt."
  - "Il reste utile pour les **documentations techniques** consultées par des agents de code, et il ne coûte presque rien à publier."
---

Depuis 2025, une ligne revient dans beaucoup d'audits GEO : « ajouter un fichier llms.txt ». Le conseil est souvent présenté comme une évidence. Il mérite d'être examiné de plus près, parce qu'il mélange une idée intéressante et une promesse non tenue.

## Ce qu'est llms.txt

Le format a été proposé en septembre 2024 par Jeremy Howard, cofondateur d'Answer.AI, et il est documenté sur [llmstxt.org](https://llmstxt.org/). L'idée est simple : publier, à l'adresse `/llms.txt`, un fichier en Markdown qui présente le site et liste ses pages essentielles, avec une phrase de description pour chacune.

Le raisonnement de départ tient debout. Une page web est encombrée de menus, de scripts et de publicités, et la fenêtre de contexte d'un modèle est limitée. Un index propre en Markdown lui permettrait d'aller droit au contenu utile.

Une variante, `llms-full.txt`, contient le texte intégral des pages dans un seul fichier.

### À quoi ressemble un fichier llms.txt

```
# Nom du site

> Une phrase qui résume le site.

## Guides
- [Guide du SEO pour les IA](https://exemple.fr/seo-ia/): méthode complète du GEO
- [Guide du netlinking](https://exemple.fr/netlinking/): obtenir des liens et des citations

## Articles récents
- [Titre](https://exemple.fr/article/): description en une phrase
```

## Ce que llms.txt n'est pas

- **Pas un standard officiel.** C'est une proposition communautaire, sans organisme de normalisation ni engagement des grands acteurs.
- **Pas un outil de blocage.** Pour autoriser ou refuser GPTBot, ClaudeBot, Google-Extended ou PerplexityBot, c'est le fichier `robots.txt` qui fait foi.
- **Pas un signal de classement.** Il ne fait pas monter une page dans Google, et rien ne montre qu'il augmente les citations dans les réponses des assistants.

## Ce que disent les données en 2026

Plusieurs études d'adoption ont été publiées depuis 2025. Elles convergent sur un point : le fichier est surtout présent sur les sites tech et les documentations de développeurs, beaucoup moins sur les sites marchands et les médias. L'étude la plus citée, menée par SE Ranking sur environ 300 000 domaines, mesure une adoption autour de 10 %.

Côté lecture, le constat est plus net encore. Aucun des grands éditeurs (OpenAI, Google, Anthropic) n'a déclaré utiliser les fichiers llms.txt des sites tiers pour ses réponses, et les analyses de logs montrent peu de requêtes de leurs robots sur ce fichier. Chez Google, John Mueller l'a publiquement comparé à la balise meta keywords, abandonnée depuis longtemps.

Certaines entreprises d'IA publient leur propre llms.txt pour leur documentation. C'est une autre chose : publier le sien ne veut pas dire lire celui des autres.

Il faut aussi se méfier des chiffres spectaculaires sur la hausse des citations après l'ajout d'un llms.txt : ils proviennent généralement d'éditeurs d'outils, sans méthode publiée, et les sites qui adoptent le fichier soignent aussi le reste de leur GEO.

## Alors, faut-il en publier un ?

**Oui, si :**

- vous publiez une **documentation technique** ou une API : les agents de code et certains outils de développement l'utilisent réellement ;
- votre CMS ou votre thème le génère **automatiquement** : le coût est nul ;
- vous voulez disposer d'un index propre de vos contenus de référence, utile aussi pour vos propres outils.

**Ne comptez pas dessus pour :**

- apparaître dans ChatGPT, Perplexity ou les AI Overviews ;
- remplacer le travail de fond : indexation, contenus extractibles, autorité de la marque. C'est le sujet du [guide du SEO pour les IA](/seo-ia/).

Ce site publie un [llms.txt](/llms.txt), généré automatiquement à partir des contenus. C'est une précaution qui ne coûte rien, pas un levier.

## Ce qui fonctionne vraiment pour être cité

1. Être **indexé et bien classé** : la plupart des assistants vont chercher leurs sources dans un moteur de recherche. Voir [l'indexation Google](/indexation-google/).
2. Publier des passages **autoportants** : une question, une réponse directe, une donnée sourcée.
3. Apporter des **informations originales** : tests, chiffres propres, retours d'expérience.
4. Être **mentionné ailleurs** : presse, comparatifs, communautés. Voir [le netlinking à l'heure des citations IA](/netlinking/).
5. **Mesurer** : le [nouveau rapport IA de la Search Console](/search-console-rapport-ia/) et un panel de requêtes suivies dans les assistants.

<section class="faq" markdown="1">

## Questions fréquentes

### llms.txt peut-il empêcher les IA d'utiliser mon contenu ?

Non. Il ne contient aucune directive de blocage. Pour refuser un robot d'IA, il faut le déclarer dans robots.txt, en sachant que tous les robots ne respectent pas ce fichier.

### Où placer le fichier ?

À la racine du domaine : `https://votre-site.fr/llms.txt`. Il doit renvoyer un code 200 et du texte brut.

### Faut-il aussi un llms-full.txt ?

Seulement pour une documentation technique que des agents doivent pouvoir lire en entier. Pour un site éditorial ou marchand, l'intérêt est faible.

</section>
