---
title: "Yoast et Rank Math actifs en même temps : comment repérer le doublon et lequel garder"
slug: deux-extensions-seo-wordpress
status: future
date: '2026-11-24T07:30:00'
origin: new
categories: [seo-technique]
seo_title: "Deux extensions SEO WordPress actives : repérer et corriger"
meta_description: "Deux titres, deux canonicals : ce que provoquent deux extensions SEO actives sur WordPress, comment le vérifier en deux minutes et en retirer une."
dek: "Sur un site que j'édite, Yoast et Rank Math tournaient ensemble depuis des mois. Chaque page avait deux balises title, deux canonicals et deux blocs de données structurées. Ce n'était pas la cause de ses problèmes d'indexation, mais c'est le genre de défaut qui brouille tous les signaux. Voici comment le repérer et le corriger sans rien perdre."
essentiel:
  - "Deux extensions SEO actives = **deux `<title>`, deux canonicals, deux meta descriptions, deux blocs JSON-LD** et souvent deux sitemaps."
  - "Vérification en deux minutes : afficher le code source d'une page et compter les `<title>` et les `rel=\"canonical\"`."
  - "Garder l'extension qui porte les **réglages réels** (titres et descriptions saisis), migrer l'autre avec l'outil d'import, puis la désactiver."
  - "Après la désactivation, **vérifier les meta descriptions** : c'est ce qui disparaît le plus souvent sans prévenir."
sources:
  - "Google Search Central, Influencer vos liens de titre dans les résultats de recherche : https://developers.google.com/search/docs/appearance/title-link"
  - "Google Search Central, Indiquer une URL canonique : https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls"
  - "Rank Math, Migrating from Yoast SEO to Rank Math : https://rankmath.com/kb/yoast-seo-migration/"
---

Quand deux extensions SEO sont actives sur un WordPress, chacune écrit ses propres balises dans l'en-tête des pages : vous obtenez deux titres, deux canonicals, deux descriptions et deux blocs de données structurées. Google ne pénalise pas ce doublon, mais il doit deviner quelle version croire, et la moindre divergence entre les deux (une canonical différente, un noindex d'un seul côté) devient un vrai problème. Je l'ai trouvé cette semaine sur un guide pratique sur les chiens que j'édite : Yoast et Rank Math y tournaient ensemble.

## Comment le repérer en deux minutes

1. Ouvrez un article, puis affichez le code source (Ctrl+U, ou `view-source:` devant l'URL).
2. Cherchez `<title` : il ne doit y en avoir **qu'un**.
3. Cherchez `rel="canonical"` : une seule occurrence.
4. Cherchez `application/ld+json` : plusieurs blocs peuvent être normaux, mais deux blocs `Article` ou deux `BreadcrumbList` pour la même page signalent un doublon.
5. Cherchez les commentaires laissés par les extensions : `<!-- This site is optimized with the Yoast SEO plugin` et `<!-- Search Engine Optimization by Rank Math`. S'il y a les deux, la question est réglée.

Dans mon cas, le code source contenait deux `<title>` et deux canonicals. Elles pointaient au même endroit, ce qui explique que rien n'ait cassé de façon visible. Mais certaines descriptions n'avaient été saisies que dans Rank Math : elles n'existaient pas côté Yoast.

**Comment vérifier à l'échelle du site** : dans Screaming Frog, les onglets « Page Titles » et « Canonicals » ont un filtre « Multiple ». Un crawl de quelques minutes donne la liste complète.

## Ce que ça provoque vraiment

Ce que dit Google : sa documentation sur les titres explique qu'il construit le lien de titre à partir de plusieurs sources, dont la balise `<title>`, et qu'il peut la réécrire. Avec deux balises, vous ne contrôlez plus laquelle il prend. Pour les canonicals, Google indique que des signaux contradictoires le conduisent à choisir lui-même l'URL canonique.

Ce que j'observe en audit : le doublon seul fait rarement chuter un site. Il devient grave quand les deux extensions divergent, par exemple quand l'une passe une page en `noindex` et l'autre non, ou quand une seule a été mise à jour après un changement d'URL. Sur le site en question, ce n'était pas la cause de la désindexation (je l'explique dans [« Explorée, actuellement non indexée »](/exploree-actuellement-non-indexee/)), mais c'était du bruit en plus sur un site déjà fragile.

## Laquelle garder

Mon critère est simple : **gardez celle qui contient le travail**. Ouvrez une dizaine d'articles importants et regardez où les titres SEO et les meta descriptions ont été saisis. C'est souvent l'extension installée en dernier qui a reçu les réglages, et celle installée en premier qui a gardé les anciennes données.

Ensuite, d'autres éléments peuvent départager :

| Question | Pourquoi elle compte |
|---|---|
| Laquelle génère le sitemap déclaré dans la Search Console ? | Changer de sitemap demande de le redéclarer |
| Des redirections sont-elles gérées par l'une des deux ? | Rank Math a un module de redirections : le désactiver peut casser des URL |
| Le thème ou d'autres extensions dépendent-ils de l'une ? | Certains thèmes lisent les champs de Yoast pour leur fil d'Ariane |

Je n'ai pas de préférence de principe entre les deux. Les deux font le travail. Ce qui compte, c'est qu'il n'y en ait qu'une.

## Retirer la seconde sans rien perdre

1. **Exportez** la liste des URL avec leur titre et leur description actuels (un crawl suffit). C'est votre état de référence.
2. **Importez** les données de l'extension que vous retirez dans celle que vous gardez : Rank Math sait importer depuis Yoast, et Yoast propose un outil d'import depuis d'autres extensions.
3. **Désactivez** l'extension retirée, sans la supprimer tout de suite.
4. **Recrawlez** et comparez à l'état de référence : un seul titre, une seule canonical, et surtout des descriptions présentes partout.
5. **Vérifiez le sitemap** déclaré dans la Search Console et dans Bing Webmaster Tools.
6. Supprimez l'extension une à deux semaines plus tard, quand rien n'a bougé.

Le point 4 n'est pas une formalité. Sur mon site, l'arrêt des balises de Rank Math a fait disparaître la meta description de 34 pages, celles dont la description n'existait que de son côté. Je l'ai vu au contrôle qui a suivi et je l'ai corrigé dans la foulée. Sans ce contrôle, je ne l'aurais pas vu.

<section class="faq" markdown="1">

## Questions fréquentes

### Google pénalise-t-il deux balises title ?

Non, il n'y a pas de pénalité. Mais Google choisit lui-même le titre affiché, et vous perdez le contrôle de ce choix.

### Peut-on garder les deux extensions en désactivant certains modules ?

C'est possible, mais je ne le recommande pas : chaque mise à jour peut réactiver une sortie, et le diagnostic devient pénible. Une seule extension SEO, c'est plus simple à vérifier.

### Faut-il redemander l'indexation après le nettoyage ?

Pas page par page. Google réexplore les pages à son rythme. Vérifiez seulement que le sitemap déclaré est toujours le bon.

</section>

## Sources

- Google Search Central, « Influencer vos liens de titre dans les résultats de recherche » : [developers.google.com](https://developers.google.com/search/docs/appearance/title-link)
- Google Search Central, « Indiquer une URL canonique » : [developers.google.com](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- Rank Math, « Migrating from Yoast SEO to Rank Math » : [rankmath.com](https://rankmath.com/kb/yoast-seo-migration/)
