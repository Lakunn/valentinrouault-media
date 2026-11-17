---
title: "« Explorée, actuellement non indexée » : ce que j'ai appris en voyant un site sortir de l'index page par page"
slug: exploree-actuellement-non-indexee
status: future
date: '2026-11-19T07:30:00'
origin: new
categories: [seo-technique]
seo_title: "Explorée, actuellement non indexée : diagnostic d'un cas réel"
meta_description: "28 pages indexées en septembre, 14 en novembre, impressions à zéro : le diagnostic d'une désindexation par la qualité, et la méthode pour s'en sortir."
dek: "Quand Google explore vos pages mais refuse de les indexer, le problème est rarement technique : c'est un jugement de qualité. Je l'ai vu sur un site que j'édite, passé de 28 à 14 pages indexées en deux mois. Voici comment le reconnaître, ce que j'ai vérifié, et ce que j'ai fait."
essentiel:
  - "« Explorée, actuellement non indexée » est attribué par les **systèmes de Google**, pas par votre site : Google a lu la page et a décidé de ne pas la garder."
  - "Signature typique d'un problème de qualité : pages indexées qui baissent **par paliers** sur des semaines, sans erreur serveur ni blocage robots.txt."
  - "Avant de conclure, éliminez la technique : statut, noindex, canonical, sitemap, doublons de balises. J'y ai trouvé deux problèmes réels, mais pas la cause de la chute."
  - "La correction : réécrire en priorité les pages qui avaient de la demande, fusionner ou retirer les faibles, puis demander l'indexation."
sources:
  - "Google Search Central, Rapport sur l'indexation des pages : https://support.google.com/webmasters/answer/7440203"
  - "Google Search Central, Creating helpful, reliable, people-first content : https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
  - "Search Engine Land, Google September 2026 spam update done rolling out : https://searchengineland.com/google-september-2026-spam-update-done-rolling-out-493550"
---

« Explorée, actuellement non indexée » veut dire que Google a bien visité votre page, l'a lue, et a choisi de ne pas l'ajouter à son index. Ce n'est pas un bug ni un blocage : c'est une décision. Quand ce statut touche une page isolée, ce n'est pas grave. Quand il s'étend semaine après semaine, c'est le signe que Google a revu à la baisse la qualité de tout ou partie du site. Je viens d'en faire le diagnostic sur un site que j'édite, un guide pratique sur les chiens, et je vous montre la méthode avec les vrais chiffres.

## Le cas : 28 pages indexées en septembre, 14 en novembre

Le site comptait une cinquantaine de pages, dont 33 articles écrits il y a un à deux ans, sans sources ni travail de fond. Voici ce que montre le rapport « Indexation des pages » de la Search Console :

| Date | Pages indexées | Pages non indexées | Impressions par jour |
|---|---|---|---|
| Mi-septembre 2026 | 28 | 31 | moins de 5 |
| Fin septembre | 28 | 29 | 40 à 50 |
| 5 octobre | 26 | 31 | environ 50 |
| 20 octobre | 21 | 40 | environ 40 |
| 24 octobre | 18 | 42 | environ 33 |
| 26 octobre | 18 | 42 | **0** |
| 10 novembre | 14 | 46 | 0 |

Et dans le détail des pages non indexées : **38 pages « Explorée, actuellement non indexée »**, 4 en noindex, 3 redirections, une 404.

Ce qui m'a frappé, c'est la forme de la courbe. Pas de chute brutale de l'indexation, mais des paliers, une ou deux pages à la fois. Et la chute des impressions à zéro le 26 octobre correspond à la sortie de l'index des quelques pages qui faisaient encore des impressions (« tique chien », « chien perdu »).

## Étape 1 : éliminer la technique

Avant de parler de qualité, il faut être sûr que rien n'empêche l'indexation. Voici ce que j'ai vérifié, URL par URL, à partir des sitemaps :

1. **Statut HTTP** : toutes les URL du sitemap répondent 200.
2. **Robots** : pas de `noindex` dans les balises ni dans l'en-tête HTTP, `robots.txt` sans blocage.
3. **Canonical** : une seule par page, qui pointe vers elle-même.
4. **Sitemap** : valide, à jour, déclaré dans `robots.txt`.
5. **Balises en double** : une seule balise `<title>`, une seule meta description, un seul H1.
6. **Accès des robots** : l'hébergeur ne bloque pas Googlebot (attention, un test avec un faux user-agent Googlebot depuis votre poste peut être bloqué par la protection anti-robots de l'hébergeur alors que le vrai passe).

J'ai trouvé deux vrais problèmes :

- **Deux extensions SEO actives en même temps** (Yoast et Rank Math). Chaque page avait deux titres, deux canonicals et deux blocs de données structurées. Gênant, mais Google gère ce genre de doublon sans désindexer un site.
- **Des titres d'articles qui contenaient des balises `<h1>`**, héritées d'un ancien éditeur : des H1 imbriqués dans les cartes d'articles de la page d'accueil.

J'ai corrigé les deux. Mais aucun des deux n'explique une désindexation progressive : les pages restaient explorables et indexables. Et le rapport le disait déjà : la source du statut est « Systèmes Google », pas « Site Web ».

## Étape 2 : regarder ce que Google a gardé et ce qu'il a jeté

Le rapport de performances sur 12 mois a confirmé le diagnostic : **2 clics** sur l'année, des positions moyennes entre 40 et 70 sur toutes les requêtes. Les articles étaient des textes génériques, sans source, sans rien qu'on ne trouve dans les dix premiers résultats. Plusieurs se recoupaient (trois articles sur le « chien destructeur »). Autrement dit, exactement ce que la documentation de Google décrit comme du contenu qui n'apporte pas de valeur au-delà de l'existant.

Le calendrier colle aussi avec la **mise à jour anti-spam de septembre 2026** (déployée du 24 septembre au 8 octobre) : les premières pages sortent de l'index le 5 octobre. Je ne peux pas prouver le lien, mais la séquence est cohérente : Google réévalue, puis retire progressivement ce qu'il juge sans intérêt.

## Étape 3 : ce que j'ai fait

1. **Réécrire d'abord les pages qui avaient de la demande.** J'ai classé les articles par impressions sur 12 mois, et j'ai commencé par les cinq premiers. Chaque réécriture apporte au moins un élément absent du top 10 : délais de transmission tirés du guide vétérinaire de référence pour l'article sur les tiques, démarches heure par heure et affiche à imprimer pour le chien perdu, tests des vétérinaires dentistes pour les jouets, étude scientifique sur l'épaule pour les harnais.
2. **Fusionner ce qui se recoupe.** Les trois articles sur le chien destructeur n'en font plus qu'un, les deux autres pointent vers lui par une canonical, sans redirection (règle du site : zéro 301).
3. **Retirer ce qui n'a rien à faire dans l'index**, comme la « Page d'exemple » de WordPress, qui traînait dans le sitemap.
4. **Demander l'indexation** des pages réécrites dans la Search Console, et lancer « Valider la correction » sur le motif une fois le lot terminé.
5. **Prévenir Bing** avec IndexNow à chaque publication, en plus du sitemap.

Les résultats prendront des semaines : Google doit réexplorer, puis réévaluer. Je mettrai à jour cet article avec la suite.

## Comment savoir si c'est votre cas

| Indice | Problème technique | Problème de qualité |
|---|---|---|
| Source du motif dans la Search Console | « Site Web » | « Systèmes Google » |
| Forme de la courbe | Chute brutale, souvent toutes les pages | Baisse par paliers sur des semaines |
| Pages touchées | Toutes, ou un modèle de page entier | Les plus faibles d'abord, souvent les plus anciennes |
| Inspection d'URL, test en direct | Erreur (bloquée, 5xx, noindex) | Page indexable, mais non indexée |
| Ce qui marche | Corriger et revalider | Améliorer, fusionner, retirer, puis attendre |

Si vous êtes dans la colonne de droite, ne cherchez pas un réglage miracle. Il n'y en a pas : il faut des pages qui méritent leur place. Pour la méthode d'audit complète, voyez [Indexation Google : comment ça marche, comment la vérifier](/indexation-google/), et si plusieurs pages se recoupent, [la cannibalisation SEO](/cannibalisation-seo/).

## Ce que je retiens

- **Le statut « Explorée, actuellement non indexée » en masse est un signal de site, pas de page.** Google juge l'ensemble : beaucoup de pages faibles tirent tout le site vers le bas.
- **La technique d'abord, mais pas seulement.** J'ai trouvé deux vrais défauts techniques ; les corriger était nécessaire, pas suffisant.
- **Mieux vaut moins de pages, meilleures.** Fusionner trois articles moyens en un bon fait plus que publier trois nouveaux articles moyens.

<section class="faq" markdown="1">

## Questions fréquentes

### Faut-il demander l'indexation de chaque page non indexée ?

Non, pas sans l'avoir améliorée. Redemander l'indexation d'une page inchangée ne change pas la décision de Google. Améliorez d'abord, demandez ensuite.

### Combien de temps pour revenir dans l'index ?

Il n'y a pas de délai garanti. Comptez plusieurs semaines après les améliorations, le temps que Google réexplore et réévalue le site.

### Peut-on forcer Google à indexer une page ?

Non. L'inspection d'URL de la Search Console permet de **demander** l'indexation, ce qui accélère le passage de Googlebot, mais la décision reste à Google. Sur une page jugée faible, la demande ne change rien tant que la page n'a pas changé.

### Quelle différence avec « Détectée, actuellement non indexée » ?

« Détectée » veut dire que Google connaît l'URL mais ne l'a pas encore explorée, souvent faute de budget d'exploration ou parce que le site lui paraît peu prioritaire. « Explorée » veut dire qu'il l'a lue et a choisi de ne pas la garder. Le second statut est le plus révélateur d'un problème de qualité.

### Faut-il supprimer les pages non indexées ?

Pas forcément. Une page sans demande et sans valeur peut être fusionnée, mise en noindex ou retirée. Une page qui répond à une vraie question mérite d'être réécrite.

</section>

## Sources

- Google Search Central, « Rapport sur l'indexation des pages » : [support.google.com](https://support.google.com/webmasters/answer/7440203)
- Google Search Central, « Creating helpful, reliable, people-first content » : [developers.google.com](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Search Engine Land, « Google September 2026 spam update done rolling out » : [searchengineland.com](https://searchengineland.com/google-september-2026-spam-update-done-rolling-out-493550)
