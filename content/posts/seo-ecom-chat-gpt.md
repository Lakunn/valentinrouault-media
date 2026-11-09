---
title: "ChatGPT Shopping : comment vos produits peuvent y apparaître"
slug: seo-ecom-chat-gpt
status: publish
date: '2025-10-07T14:15:56'
origin: rewrite
wp_id: 493
categories:
- blog
dek: "Instant Checkout a été lancé, élargi puis retiré en six mois. Le protocole de commerce agentique, lui, reste. Ce qui a changé depuis octobre 2025, et ce qui fait qu'un produit est recommandé par ChatGPT."
seo_title: "ChatGPT Shopping : le SEO e-commerce en 2026"
meta_description: "ChatGPT Shopping en 2026 : fin d'Instant Checkout, protocole ACP, flux produits. Ce qui fait qu'un produit est recommandé par ChatGPT et comment s'y préparer."
essentiel:
  - "Instant Checkout, l'achat sans quitter ChatGPT lancé le **29 septembre 2025**, a été retiré en **mars 2026** : les marchands gardent désormais leur propre tunnel de paiement."
  - "Le **protocole ACP** (Agentic Commerce Protocol, ouvert, conçu avec Stripe) reste actif pour transmettre catalogues et commandes aux agents."
  - "ChatGPT recommande peu de produits par réponse : les **données produit complètes** et les **preuves externes** (avis, comparatifs) pèsent lourd."
  - "La mesure reste le point faible : une recommandation dans ChatGPT finit souvent en **recherche de marque** sur Google."
---

En septembre 2025, OpenAI présentait ChatGPT comme un futur lieu d'achat : on demandait un conseil, on payait dans la conversation. Un an plus tard, le paiement intégré a disparu, mais la recommandation de produits est restée. Pour un site e-commerce, la question n'est plus « faut-il vendre dans ChatGPT ? », c'est « mes produits sont-ils cités quand on demande conseil à ChatGPT ? ».

## Ce qui s'est passé depuis octobre 2025

Les dates comptent ici, car beaucoup d'articles publiés à l'automne 2025 décrivent une situation qui n'existe plus.

| Date | Événement |
| --- | --- |
| 29 septembre 2025 | Lancement d'Instant Checkout aux États-Unis avec les vendeurs Etsy, sur le protocole ACP développé avec Stripe. |
| 16 février 2026 | Instant Checkout ouvert à tous les utilisateurs américains. |
| Mars 2026 | OpenAI retire Instant Checkout : le bouton renvoie vers le site du marchand, qui encaisse lui-même. |
| 24 mars 2026 | Shopify active par défaut ses « Agentic Storefronts », qui exposent les catalogues de ses marchands aux assistants IA. |

Le protocole ACP, publié en open source, n'a pas été abandonné avec Instant Checkout. Il sert toujours à décrire un catalogue, un panier et une commande pour qu'un agent puisse les manipuler. La partie paiement dans ChatGPT a disparu, la partie données reste.

En France, aucune de ces fonctions de paiement n'a été ouverte. Les recommandations de produits, elles, apparaissent dans les réponses de ChatGPT en français.

## Comment ChatGPT choisit les produits qu'il cite

OpenAI ne publie pas de critères de classement. Ce que l'on observe en testant des requêtes d'achat, et ce que la documentation marchand laisse entendre, tient en trois familles de signaux.

**Ce que la requête précise.** Une demande comme « chaussures de trail pour pieds larges, moins de 150 € » contient un budget, un usage et une contrainte. ChatGPT écarte les produits dont la fiche ne permet pas de vérifier ces trois points.

**Ce que disent les données produit.** Prix, disponibilité, variantes, dimensions, matières : quand ces informations sont absentes ou contradictoires entre le site et le flux, le produit perd sa place. Les données structurées `Product` et `Offer` sur la fiche, et un flux à jour, servent ici de socle.

**Ce que disent les autres.** Avis clients, tests de la presse, comparatifs, discussions sur les forums. ChatGPT justifie souvent sa sélection par une phrase du type « apprécié pour son maintien » : cette justification vient de sources tierces, rarement de votre seule fiche.

![Exemple de réponse de ChatGPT Shopping avec une sélection de produits](https://valentinrouault.com/wp-content/uploads/2025/10/image-2-1024x553.png)

Une réponse affiche en général une poignée de produits. Être sixième revient à ne pas exister, ce qui change la logique par rapport à une page de résultats Google où l'on peut gagner des clics en deuxième page de catégorie.

## Les risques à connaître

- **La volatilité.** La même requête, posée à quelques heures d'écart, ne renvoie pas toujours la même sélection. Un suivi ponctuel ne suffit pas.
- **Les erreurs de données.** Un prix ou un stock faux affiché par l'assistant crée une déception au moment où l'acheteur arrive sur votre site.
- **L'attribution.** Un acheteur voit votre produit dans ChatGPT, puis tape votre marque dans Google. Dans vos outils, la vente est attribuée à la recherche de marque. Le [rapport IA de la Search Console](/search-console-rapport-ia/) et le suivi des recherches de marque aident à recouper.
- **La dépendance.** Instant Checkout a vécu six mois. Construire une stratégie sur une fonction précise d'un assistant expose à ce genre de revirement.

## Ce que je recommande de travailler

1. **Des fiches produits complètes et cohérentes.** Toutes les caractéristiques qu'un acheteur pourrait mentionner dans une question, écrites en texte (pas seulement dans une image), et identiques dans le flux, la fiche et les données structurées.
2. **Des contenus orientés usage.** « Pour qui », « pour quel usage », « à éviter si » : ce sont exactement les éléments qu'un assistant reprend pour justifier une recommandation. Les guides d'achat de votre site jouent ce rôle à l'échelle d'une catégorie.
3. **Des preuves externes.** Avis vérifiés, présence dans les comparatifs de référence de votre secteur, citations dans la presse. Le travail de [SEO off-site](/off-site-seo/) sert directement la visibilité dans les assistants.
4. **L'accès des robots.** Vérifier que `OAI-SearchBot`, le robot de recherche d'OpenAI, n'est pas bloqué dans votre robots.txt ni par votre pare-feu. Sans exploration, pas de citation.
5. **Un suivi régulier.** Une liste fixe d'une vingtaine de requêtes d'achat, testée chaque mois, avec la position de vos produits et de ceux des concurrents.

Pour la partie technique propre aux boutiques en ligne (catégories, facettes, pagination), la page [SEO e-commerce](/seo-ecommerce/) détaille les fondamentaux, qui restent la base de tout le reste.

## Faut-il rejoindre le programme marchand d'OpenAI ?

Si votre boutique tourne sur Shopify, vos produits sont déjà exposés aux assistants depuis mars 2026, sauf désactivation. Pour les autres solutions, OpenAI propose un formulaire marchand et la documentation du protocole ACP. L'intégration a un coût technique : je la conseille aux catalogues importants, déjà propres côté données. Pour une petite boutique, le travail sur les fiches et les avis rapporte davantage, puisqu'il sert aussi Google.

<section class="faq" markdown="1">

## Questions fréquentes

### Peut-on encore acheter directement dans ChatGPT ?

Non. Depuis mars 2026, le paiement intégré n'existe plus : ChatGPT renvoie vers le site du marchand pour finaliser la commande.

### ChatGPT Shopping est-il disponible en France ?

Les recommandations de produits apparaissent dans les réponses en français. Les fonctions de paiement n'ont jamais été ouvertes en France.

### Les produits cités dans ChatGPT sont-ils sponsorisés ?

OpenAI indique que les recommandations de produits sont organiques. Les annonces testées dans ChatGPT sont signalées comme telles, séparément des réponses.

</section>

Sources : annonces d'OpenAI sur Instant Checkout et l'Agentic Commerce Protocol (29 septembre 2025, puis février et mars 2026) ; annonce de Shopify sur les Agentic Storefronts (mars 2026).
