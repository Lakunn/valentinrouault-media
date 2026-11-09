---
title: "Refonte de site : le guide SEO pour ne pas perdre de trafic"
slug: refonte-site-seo-cro
status: publish
date: '2025-09-11T14:20:17'
origin: rewrite
wp_id: 234
categories:
- contenu-seo
- blog
- seo-technique
dek: "Objectifs, audit, inventaire des URL, redirections ou conservation des adresses, recette, lancement et suivi : la méthode en huit étapes pour qu'une refonte fasse progresser le référencement au lieu de le casser."
seo_title: "Refonte de site et SEO : le guide pour ne pas perdre de trafic"
meta_description: "Refonte de site sans perte de trafic : audit, inventaire et plan d'URL, redirections, recette SEO, checklist de lancement et suivi après mise en ligne."
essentiel:
  - "Une refonte se prépare par un **audit** : pages qui génèrent du trafic, pages qui reçoivent des liens, erreurs à ne pas reproduire."
  - "L'étape la plus risquée est le **plan d'URL** : chaque ancienne adresse doit soit être conservée, soit rediriger en 301 vers son équivalent exact, jamais vers l'accueil."
  - "La **recette** (version de test) permet de vérifier redirections, balises, maillage et indexabilité avant la mise en ligne."
  - "Après le lancement, on **compare avant / après** page par page pendant plusieurs semaines pour corriger vite."
---

Une refonte est souvent vécue comme un moment à risque pour le référencement. Elle peut aussi être l'occasion de progresser : nettoyer les pages faibles, renforcer les pages fortes, corriger la technique. Tout dépend de la préparation.

Ce site lui-même a été refondu en novembre 2026, en conservant **toutes ses URL à l'identique**, sans aucune redirection. La méthode ci-dessous est celle que j'applique, et que j'ai appliquée ici.

## 1. Définir les objectifs

Une refonte poursuit généralement plusieurs objectifs : meilleure expérience mobile, design modernisé, nouvelle arborescence, changement de CMS, performances, conversion. Formalisez-les dans un cahier des charges partagé par tous les intervenants (direction, design, développement, SEO, contenu). Les exigences SEO doivent y figurer dès le départ, pas être ajoutées à la fin.

## 2. Auditer l'existant

L'audit dresse la carte du site : ce qui fonctionne, ce qui ne fonctionne pas.

- **Audit technique** : indexation, balises, canonicals, sitemap, vitesse, rendu JavaScript. Voir [l'indexation Google](/indexation-google/).
- **Audit des contenus** : pages qui génèrent du trafic, requêtes associées, pages à conserver, fusionner, retravailler.
- **Audit de popularité** : pages qui reçoivent des liens externes.

Outils indispensables : la Search Console (données de performance et d'indexation) et un crawler (Screaming Frog ou équivalent). Ahrefs ou Semrush complètent pour les liens.

Un site a presque toujours des **sections fortes** et des sections faibles. Une refonte réussie capitalise sur les premières et corrige les secondes.

## 3. Construire le plan d'URL

C'est l'étape où se produisent les pertes de trafic les plus graves.

1. **Inventorier toutes les URL** existantes : sitemap, crawl, Search Console, outils de liens, et les pages paginées et archives.
2. **Décider pour chacune** : conservée telle quelle, fusionnée, ou supprimée.
3. **Pour chaque URL qui change**, prévoir une redirection 301 vers la page équivalente la plus proche.

La solution la plus sûre est de conserver les URL. Une URL inchangée garde tout son historique sans dépendre d'une redirection. C'est le choix fait pour ce site : contenus et design entièrement refaits, mais adresses identiques.

Les erreurs les plus fréquentes :

- rediriger toutes les anciennes pages vers l'accueil (Google les traite comme des erreurs 404) ;
- oublier des pages qui reçoivent des liens ou du trafic ;
- créer des chaînes de redirections (A vers B vers C) ;
- oublier les pages paginées, les images et les fichiers PDF.

## 4. Soigner la technique de la nouvelle version

- Règles d'indexation correctes : robots.txt, balises meta robots, canonicals, hreflang si le site est multilingue.
- **Core Web Vitals** : images optimisées, scripts tiers maîtrisés. Voir [les erreurs JavaScript à éviter](/javascript-seo-erreurs/).
- Sitemap XML à jour.
- **Maillage interne** pensé dès la maquette : menus, pied de page, liens contextuels.
- Contenu principal présent dans le HTML, pour Google comme pour les robots des IA.

## 5. Retravailler les contenus

À partir de l'inventaire :

- **conserver** les contenus qui performent, en les mettant à jour ;
- **retravailler** les pages stratégiques qui sous-performent ;
- **fusionner** les contenus qui se concurrencent (voir [la cannibalisation](/cannibalisation-seo/)) ;
- **compléter** les sujets manquants.

Les exigences de qualité de Google, et des moteurs génératifs comme [ChatGPT](/seo-chatgpt/), sont plus élevées qu'il y a quelques années : la refonte est le bon moment pour relever le niveau.

## 6. Tout vérifier en recette

Sur une version de test (non indexable) :

- tester toutes les redirections à partir de la liste des anciennes URL ;
- crawler le site : titres, meta descriptions, codes de réponse, pages orphelines, liens cassés ;
- vérifier qu'il n'existe qu'une seule version de chaque URL (avec ou sans `www`, avec ou sans barre finale, HTTP et HTTPS) ;
- contrôler le rendu mobile et la vitesse.

## 7. Le jour du lancement

- Mettre en ligne le site et les redirections en même temps.
- Retirer les protections de la version de test : mot de passe, `noindex`, blocage dans le robots.txt. C'est l'oubli le plus coûteux qui soit.
- Soumettre le sitemap dans la Search Console et dans Bing Webmaster Tools.
- Crawler le site en production et retester les anciennes URL.

## 8. Suivre après la mise en ligne

Pendant au moins quatre à huit semaines :

- comparer trafic et positions page par page avec la période précédente ;
- surveiller le rapport d'indexation et les erreurs 404 ;
- analyser les logs serveur pour voir comment les robots explorent la nouvelle version ;
- corriger immédiatement chaque perte identifiée.

Une baisse légère et temporaire est fréquente le temps que Google réexplore le site. Une baisse durable signale presque toujours une URL oubliée, une redirection manquante ou un contenu affaibli.

Une fois le visiteur arrivé, la conversion compte autant que le trafic : voir [6 optimisations SEO et CRO testées](/optimisation-cro/).

<section class="faq" markdown="1">

## Questions fréquentes

### Une refonte fait-elle forcément perdre du trafic ?

Non. Avec un plan d'URL complet, des contenus conservés ou améliorés et une recette sérieuse, une refonte peut faire progresser le trafic.

### Faut-il changer les URL pendant une refonte ?

Seulement si c'est nécessaire. Conserver les URL est la solution la plus sûre ; si elles changent, chaque ancienne adresse doit rediriger en 301 vers son équivalent exact.

### Combien de temps garder les redirections ?

Le plus longtemps possible, idéalement sans limite : des liens externes et des favoris continuent de pointer vers les anciennes adresses pendant des années.

</section>
