---
title: "Bing Webmaster Tools et IndexNow : j'ai vérifié mes sites, aucun n'était déclaré à Bing"
slug: bing-webmaster-tools-indexnow
status: future
date: '2026-11-21T07:30:00'
origin: new
categories: [seo-technique]
seo_title: "Bing Webmaster Tools et IndexNow : installation et vérification"
meta_description: "Aucun de mes sites n'était déclaré à Bing. Pourquoi c'est un oubli coûteux à l'heure de Copilot, comment l'installer en dix minutes et ajouter IndexNow."
dek: "En auditant l'indexation de quatre sites que j'édite, j'ai fait un constat gênant : trois étaient vérifiés dans la Search Console, aucun dans Bing Webmaster Tools. Or Bing alimente Copilot et publie depuis 2026 un rapport sur les citations dans ses réponses IA. Voici comment je l'ai corrigé, IndexNow compris, et comment vérifier que ça marche."
essentiel:
  - "Bing Webmaster Tools s'installe en quelques minutes en **important les sites de la Search Console** : pas de nouvelle balise à poser."
  - "C'est le seul outil gratuit qui montre les **citations de vos pages dans Copilot** et les réponses IA de Bing (rapport AI Performance, en préversion depuis février 2026)."
  - "**IndexNow** prévient Bing, Yandex, Seznam, Naver, Yep et Amazon dès qu'une page change ; Google ne l'utilise pas."
  - "Un ping IndexNow qui répond **202** veut dire « reçu, clé en cours de vérification » ; un **422** signale presque toujours un fichier de clé absent ou un mauvais domaine."
sources:
  - "IndexNow, FAQ et documentation : https://www.indexnow.org/faq"
  - "Search Engine Land, Bing Webmaster Tools testing new AI Performance report : https://searchengineland.com/bing-webmaster-tools-testing-new-ai-performance-report-468039"
  - "Microsoft Bing, Bing Webmaster Tools : https://www.bing.com/webmasters"
---

Bing Webmaster Tools est la Search Console de Bing. Si votre site n'y est pas déclaré, vous ne voyez ni comment Bing l'explore, ni sur quelles requêtes il apparaît, ni s'il est cité dans les réponses de Copilot. La bonne nouvelle : quand le site est déjà dans la Search Console, l'installation prend dix minutes. Je l'ai constaté à mes dépens cette semaine, en vérifiant quatre sites que j'édite : trois étaient vérifiés chez Google, aucun chez Bing.

## Ce que j'ai trouvé en vérifiant mes propres sites

Je fais ce contrôle chez les clients à chaque audit. Je ne l'avais pas fait chez moi. Pour chaque site, j'ai cherché les trois traces possibles d'une vérification :

1. **Un enregistrement DNS** : `google-site-verification=…` pour Google, un CNAME ou un TXT pour Bing.
2. **Une balise meta** dans le `<head>` : `google-site-verification` ou `msvalidate.01`.
3. **Un fichier à la racine** : `googleXXXX.html` ou `BingSiteAuth.xml`.

Résultat : un TXT Google sur trois sites, rien du tout sur le quatrième, et **aucune trace de Bing nulle part**. Ce n'est pas un cas isolé : en audit, je vois souvent des sites suivis de près dans la Search Console et jamais ouverts dans Bing Webmaster Tools, parce que Bing pèse peu dans le trafic.

## Pourquoi Bing compte plus qu'il n'y paraît

Le trafic venu de Bing reste faible pour la plupart des sites français. Mais ce n'est plus la bonne mesure, pour deux raisons.

- **Bing alimente Copilot.** Les réponses de Copilot et les résumés IA de Bing s'appuient sur l'index de Bing. Une page mal explorée par Bing a moins de chances d'y être citée.
- **Bing est le seul à montrer les citations IA.** Le rapport **AI Performance** de Bing Webmaster Tools, en préversion publique depuis février 2026, liste les pages citées dans Copilot et les réponses IA de Bing, avec les requêtes qui ont déclenché la citation. Il ne donne pas les clics, et il ne couvre ni ChatGPT ni les AI Overviews de Google. Mais aucun autre outil gratuit ne donne cette donnée, Google comprise.

Mon avis : pour un site qui travaille sa visibilité dans les IA, ne pas déclarer Bing revient à se priver de la seule mesure officielle disponible. C'est l'erreur la moins chère à corriger de tout l'audit.

## Installer Bing Webmaster Tools en dix minutes

1. Connectez-vous sur [bing.com/webmasters](https://www.bing.com/webmasters) avec un compte Microsoft (ou Google).
2. Choisissez **Importer depuis Google Search Console**. Bing récupère les sites vérifiés et leurs sitemaps, sans nouvelle balise.
3. Pour un site absent de la Search Console, ajoutez-le à la main et vérifiez-le par DNS : c'est la méthode qui survit aux changements de thème et d'extension.
4. Vérifiez dans **Sitemaps** que le sitemap est bien lu, puis attendez quelques jours que les premières données arrivent.

**Comment vérifier** : dans **Inspection d'URL**, testez votre page d'accueil et un article récent. Si Bing indique que l'URL est indexée, c'est en place.

## Ajouter IndexNow : prévenir Bing à chaque publication

IndexNow est un protocole ouvert : à chaque publication ou mise à jour, votre site envoie l'URL à un point d'entrée, et elle est partagée avec tous les moteurs participants. D'après la documentation officielle, ce sont aujourd'hui Bing, Yandex, Seznam, Naver, Yep et Amazon. **Google ne l'utilise pas** : pour lui, le sitemap et l'inspection d'URL restent les seuls leviers.

Ce que j'ai mis en place sur mes sites :

1. **Une clé** (8 à 128 caractères, lettres, chiffres et tirets) servie dans un fichier texte à la racine : `https://example.com/<clé>.txt`, qui ne contient que la clé.
2. **Un envoi automatique** à chaque publication : une requête POST vers `https://api.indexnow.org/indexnow` avec le domaine, la clé et la liste des URL publiées (10 000 au maximum par requête).
3. **Un premier envoi de toutes les URL** des sitemaps, pour rattraper le retard : 173 URL sur quatre sites, toutes acceptées.

Sur WordPress, une extension fait le travail (Bing en publie une, et plusieurs extensions SEO l'intègrent). Mes sites sont publiés depuis un dépôt git, j'ai donc ajouté l'envoi au script de publication.

## Lire les réponses d'IndexNow

| Code | Ce que ça veut dire | Que faire |
|---|---|---|
| 200 | Reçu et traité | Rien |
| 202 | Reçu, la clé est en cours de vérification | Normal au premier envoi |
| 400 | Requête mal formée | Vérifier le format JSON et les URL |
| 422 | Requête comprise mais refusée | Presque toujours : fichier de clé inaccessible, ou URL d'un autre domaine que celui déclaré |
| 429 | Trop de requêtes | Attendre la durée indiquée dans l'en-tête `Retry-After` |

Mes premiers envois ont tous répondu 202 : c'est le comportement attendu tant que le moteur n'a pas lu le fichier de clé.

**Comment vérifier** : ouvrez `https://votre-site/<clé>.txt` dans un navigateur privé. Vous devez voir la clé seule, sans page HTML autour. Puis, quelques jours plus tard, regardez le rapport IndexNow de Bing Webmaster Tools : il liste les URL reçues.

## Ce que je n'en attends pas

IndexNow ne fait pas indexer une page que Bing juge sans intérêt : il lui dit seulement qu'elle existe ou qu'elle a changé. Et il ne fait rien pour Google. Sur le site que j'ai vu sortir de l'index Google cet automne (j'en parle dans [« Explorée, actuellement non indexée »](/exploree-actuellement-non-indexee/)), IndexNow n'a rien d'un remède : c'est la qualité des pages qui est en cause. C'est un réglage d'hygiène, comme le sitemap. Il se pose une fois et on n'y pense plus.

Pour le reste des contrôles d'indexation côté Google, voyez [Indexation Google : comment ça marche, comment la vérifier](/indexation-google/).

<section class="faq" markdown="1">

## Questions fréquentes

### Faut-il vérifier son site dans Bing si on a peu de trafic Bing ?

Oui. L'outil est gratuit, l'import depuis la Search Console prend quelques minutes, et c'est la seule source officielle sur les citations dans Copilot.

### IndexNow aide-t-il pour Google ?

Non. Google ne participe pas au protocole. Pour Google, gardez un sitemap à jour et utilisez l'inspection d'URL de la Search Console pour les pages importantes.

### Faut-il renvoyer toutes les URL à chaque publication ?

Non. Envoyez seulement les URL créées, modifiées ou supprimées. Renvoyer tout le site à chaque fois n'apporte rien et peut déclencher des limites de débit.

</section>

## Sources

- IndexNow, FAQ et documentation : [indexnow.org](https://www.indexnow.org/faq)
- Search Engine Land, « Bing Webmaster Tools testing new AI Performance report » : [searchengineland.com](https://searchengineland.com/bing-webmaster-tools-testing-new-ai-performance-report-468039)
- Microsoft Bing, Bing Webmaster Tools : [bing.com/webmasters](https://www.bing.com/webmasters)
