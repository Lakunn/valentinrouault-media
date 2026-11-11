---
title: "PageRank interne : mesurez la force de votre maillage"
slug: pagerank-interne
parent: outils-seo
status: publish
origin: new
dek: "Collez l'export des liens internes de votre crawler : l'outil calcule le PageRank interne de chaque page, repère les pages orphelines et celles trop loin de l'accueil."
seo_title: "PageRank interne et pages orphelines : l'outil gratuit"
meta_description: "Calculez le PageRank interne de vos pages à partir d'un export Screaming Frog, trouvez les pages orphelines et la profondeur en clics. Calcul local, gratuit."
essentiel:
  - "Le **PageRank interne** montre où votre maillage envoie la popularité : vers vos pages stratégiques, ou vers vos mentions légales."
  - "Une **page orpheline** ne reçoit aucun lien : les moteurs la trouvent mal et lui accordent peu de poids."
  - "Au-delà de **trois clics** depuis l'accueil, une page est souvent moins explorée."
---

Chaque lien interne transmet une part d'importance d'une page à l'autre. C'est le principe du PageRank, publié par les fondateurs de Google en 1998, et il reste la meilleure façon de lire un maillage : non pas « combien de liens », mais « où va la popularité ». Je me sers de ce calcul en début d'audit, avant toute recommandation de liens.

[vr_pagerank]

## Comment obtenir la liste des liens

Avec Screaming Frog (gratuit jusqu'à 500 URL), lancez l'exploration du site puis exportez **Bulk Export › Links › All Inlinks**. Collez le fichier tel quel : les colonnes Source et Destination sont reconnues, les autres sont ignorées. Tout autre crawler fait l'affaire, du moment que vous avez deux colonnes : la page qui fait le lien, la page qui le reçoit.

Pour repérer les orphelines, il faut aussi la liste complète des pages, puisqu'une page sans lien n'apparaît pas dans l'export du crawler. Collez les URL de votre sitemap dans le second champ.

## Lire le résultat

- **Le haut du classement** doit correspondre à vos pages qui comptent : catégories, services, guides piliers. Une page de contact en tête n'est pas grave ; une page de mentions légales ou d'étiquette, si.
- **Les pages les moins soutenues** sont les premières à recevoir des liens depuis vos pages fortes, dans le corps du texte.
- **La profondeur** se compte en clics depuis l'accueil, en suivant les liens. Une page « inaccessible » n'est reliée à aucune page atteignable depuis l'accueil.

Le score est relatif : 100 pour la page la plus forte du site. Il ne tient compte ni des liens venus d'autres sites, ni de l'emplacement du lien dans la page. C'est une mesure de structure, à croiser avec vos données de trafic.
