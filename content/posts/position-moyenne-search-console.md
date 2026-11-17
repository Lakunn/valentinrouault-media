---
title: "Position moyenne dans la Search Console : ce qu'elle mesure vraiment, et ce qu'une étude sur 9,5 milliards d'impressions en dit"
slug: position-moyenne-search-console
status: future
date: '2026-11-28T07:30:00'
origin: new
categories: [seo-technique]
seo_title: "Position moyenne Search Console : la lire sans se tromper"
meta_description: "La position moyenne de la Search Console trompe souvent : son calcul, pourquoi elle baisse quand tout va bien, et ce que 166 marques montrent du CTR."
dek: "La position moyenne de la Search Console est une moyenne de la meilleure position de votre site, pondérée par les impressions. Elle baisse quand vous gagnez des requêtes nouvelles, monte quand vous en perdez, et ne veut presque rien dire à l'échelle d'un site entier. Une étude d'iPullRank sur 166 marques, publiée le 12 novembre 2026, apporte aussi des chiffres utiles sur le CTR par position. Voici comment je lis cette métrique, et ce que je retiens de l'étude."
essentiel:
  - "La position moyenne = la **meilleure position** de votre site à chaque impression, **moyennée sur les impressions** : une page 1 et une page 3 font « position 15 »."
  - "Elle **baisse quand vous progressez** sur de nouvelles requêtes : à lire requête par requête, jamais au niveau du site."
  - "Étude iPullRank (166 marques, 2025-2026) : en 2026, la **1re position** obtient environ **5 clics pour 100 impressions**, contre 7 en 2025."
  - "Gagner une place **entre la 4e et la 3e position** rapporte bien plus qu'entre la 8e et la 7e : c'est là qu'il faut concentrer l'effort."
sources:
  - "Google, Aide Search Console, Rapport Performances : https://support.google.com/webmasters/answer/7576553"
  - "iPullRank, Michael Tandoh, 13 Things Google Search Console Ranking Data Says, 12 novembre 2026 : https://ipullrank.com/gsc-ranking-data"
---

La position moyenne de la Search Console n'est pas « votre classement » sur Google. C'est une moyenne de la position **la plus haute** atteinte par votre site à chaque fois qu'il apparaît dans les résultats, pondérée par le nombre d'impressions. Une requête où vous êtes premier et une requête où vous êtes trentième donnent, ensemble, une « position 15,5 » qui ne correspond à aucune réalité. Bien lue, requête par requête, c'est pourtant l'un des indicateurs les plus utiles de l'outil.

## Comment la Search Console calcule la position

Ce que dit Google dans l'aide du rapport Performances :

- Pour chaque impression, la Search Console retient **la meilleure position** de votre site sur la page de résultats. Si deux de vos pages apparaissent en 3e et en 8e position, c'est 3 qui compte.
- Elle fait ensuite la **moyenne de ces positions sur toutes les impressions** de la période et du filtre choisis.
- La position se compte de haut en bas en incluant les éléments enrichis : un bloc qui contient un lien vers votre site prend la position de ce bloc.

Trois conséquences pratiques :

1. **Une requête très vue pèse plus lourd.** 10 000 impressions en position 40 écrasent 100 impressions en position 2.
2. **La moyenne d'un site mélange tout** : marque et générique, mobile et ordinateur, pays et langues.
3. **Une position « 8,4 » peut cacher deux réalités** : une page stable en 8e position, ou une page qui alterne entre la 1re et la 20e.

## Pourquoi votre position moyenne baisse quand tout va bien

C'est la confusion la plus fréquente. Un site publie de bons contenus, Google commence à le montrer sur des centaines de nouvelles requêtes, en 30e ou 50e position au début. Les impressions montent, les clics aussi, et la position moyenne du site **chute**, parce que toutes ces nouvelles impressions en page 3 tirent la moyenne vers le bas.

L'inverse est aussi vrai : un site qui perd ses requêtes faibles voit sa position moyenne **s'améliorer**, alors qu'il perd de la visibilité.

**Comment le vérifier sur votre site** : dans le rapport Performances, comparez deux périodes et regardez le nombre de requêtes (onglet Requêtes, compteur en bas du tableau). Si le nombre de requêtes et les impressions augmentent pendant que la position moyenne baisse, vous gagnez du terrain. Ne présentez jamais la position moyenne d'un site seule dans un rapport.

## Comment je la lis vraiment

1. **Requête par requête**, ou par groupe de requêtes proches (filtre regex), jamais pour tout le site.
2. **Avec les impressions à côté** : une position sans volume ne dit rien.
3. **En séparant marque et générique**, avec un filtre de requête qui exclut votre nom de marque. Sur sa marque, un site est presque toujours premier, et cela gonfle la moyenne.
4. **En séparant mobile et ordinateur** (onglet Appareils) quand l'écart semble grand.
5. **Sur 28 jours au moins**, pour lisser les variations quotidiennes.

## Ce qu'une étude sur 166 marques apporte

iPullRank a publié le 12 novembre 2026 une analyse des données Search Console de **166 marques** (272 propriétés), de mars 2025 à mi-juillet 2026, soit environ 9,5 milliards d'impressions et 105 millions de clics par mois. C'est une étude d'agence, avec sa propre méthode et un échantillon qu'elle ne détaille pas par pays : je la cite comme une étude, pas comme une vérité. Mais plusieurs résultats sont directement utiles.

**Le CTR baisse à position égale.** Selon l'étude, le premier résultat est passé d'environ 7 à environ 5 clics pour 100 impressions entre 2025 et 2026, et la 3e position a perdu plus de la moitié de ses clics. C'est cohérent avec ce qu'on observe depuis l'arrivée des réponses IA, y compris en France : j'en parle dans [l'impact des AI Overviews sur le CTR en France](/ai-overviews-france-ctr/).

**Toutes les places ne se valent pas.** Passer de la 4e à la 3e position rapporte environ **18 clics de plus pour 1 000 impressions** ; passer de la 8e à la 7e, environ **un seul**. Mon avis : c'est l'enseignement le plus actionnable de l'étude. Les pages en positions 4 à 6 sur des requêtes à fort volume sont celles à travailler en priorité.

**Un CTR anormalement haut annonce une progression.** L'étude observe qu'une requête dont le CTR dépasse celui attendu à sa position tend à monter ensuite, avec un effet maximal vers 28 jours, surtout sur les requêtes génériques et à l'intérieur du top 10. Attention à la lecture : c'est une corrélation observée, pas la preuve que Google utilise le CTR comme signal de classement. L'étude ne le prétend d'ailleurs pas.

**Les positions du top 3 sont stables.** Un résultat dans le top 3 y est encore un an plus tard dans 76 % des cas ; un résultat dans le top 10, dans 95 % des cas.

**Les longues requêtes cliquent plus.** Entre les positions 4 et 10, le CTR passe d'environ 0,5 % pour une requête d'un mot à près de 2 % pour une requête de quatre mots.

**Les images gonflent les impressions.** La recherche d'images représente environ 15 % des impressions mais moins de 4 % des clics : filtrez le type de recherche « Web » avant d'analyser.

## Ce que l'étude ne dit pas

- Elle n'isole pas le marché français. Les ordres de grandeur du CTR peuvent différer, notamment parce que les AI Overviews sont arrivés en France plus tard (le 22 juillet 2026).
- Elle ne donne pas de chiffres par secteur pour tous ses constats, alors que l'étude elle-même montre de grands écarts entre secteurs sur les requêtes d'achat.
- Elle ne prouve aucun mécanisme de classement : ce sont des corrélations sur des données Search Console.

## La méthode que je recommande

1. Exportez les requêtes génériques (hors marque) sur 3 mois, type de recherche « Web ».
2. Gardez celles en **positions 3 à 8** avec un volume d'impressions significatif pour votre site.
3. Triez par impressions décroissantes : ce sont vos pages où une ou deux places de plus rapportent le plus.
4. Pour chacune, regardez la page de résultats réelle : réponse IA, vidéos, blocs. Une position 4 sous une réponse IA et un bloc vidéo n'a pas la même valeur qu'une position 4 dans une page de liens classique.
5. Améliorez ces pages d'abord, avant de produire du nouveau contenu.

<section class="faq" markdown="1">

## Questions fréquentes

### Qu'est-ce qu'une bonne position moyenne ?

La question est mal posée à l'échelle d'un site. Requête par requête, tout ce qui est dans le top 3 capte l'essentiel des clics ; au-delà de la 10e position, les clics deviennent marginaux.

### Pourquoi ma position est-elle différente quand je cherche moi-même ?

Les résultats varient selon le lieu, l'appareil, l'historique et le moment. La Search Console fait une moyenne sur toutes les impressions réelles ; votre recherche n'en est qu'une.

### Les liens dans les AI Overviews ont-ils une position ?

Oui : un lien cité dans un bloc prend la position de ce bloc dans la page. Mais aucun filtre de la Search Console ne permet d'isoler les impressions et les clics venus des réponses IA.

</section>

## Sources

- Google, Aide Search Console, « Rapport Performances (Recherche) » : [support.google.com](https://support.google.com/webmasters/answer/7576553)
- iPullRank, Michael Tandoh, « 13 Things Google Search Console Ranking Data Says », 12 novembre 2026 : [ipullrank.com](https://ipullrank.com/gsc-ranking-data)
