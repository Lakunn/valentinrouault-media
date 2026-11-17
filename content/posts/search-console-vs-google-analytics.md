---
title: "Search Console et Google Analytics : pourquoi vos chiffres de trafic Google ne collent jamais, et lequel croire"
slug: search-console-vs-google-analytics
status: future
date: '2026-11-26T07:30:00'
origin: new
categories: [seo-technique]
seo_title: "Search Console vs Analytics : pourquoi les chiffres diffèrent"
meta_description: "Clics Search Console et sessions GA4 ne correspondent jamais. Les huit raisons, dont celles que Google vient de documenter, et comment rapprocher les deux."
dek: "La Search Console compte les clics sur les résultats de Google ; Google Analytics compte les visites qui ont chargé son script. Entre les deux, il y a le consentement aux cookies, les bloqueurs, les redirections, les fuseaux horaires et Discover. Google a publié le 12 novembre 2026 une page qui explique comment repérer son trafic. Voici ce qu'elle dit, ce qu'elle ne dit pas, et la méthode que j'utilise pour rapprocher les deux chiffres."
essentiel:
  - "**Search Console** : ce qui se passe **sur Google** (impressions, clics, positions). **Google Analytics** : ce qui se passe **sur votre site** (sessions, conversions)."
  - "Un écart de 20 à 50 % entre clics et sessions n'est pas un bug : en France, le **refus des cookies** suffit souvent à l'expliquer."
  - "Google confirme qu'un referrer `google.com` ne distingue **ni Search, ni Discover, ni Images** : seule la Search Console les sépare."
  - "Pour suivre une tendance de trafic SEO, je me fie aux **clics de la Search Console** ; pour mesurer ce que ce trafic rapporte, à **Analytics**."
sources:
  - "Google Search Central, Identify traffic from Google Search, mise à jour du 12 novembre 2026 : https://developers.google.com/search/docs/monitor-debug/identify-google-search-traffic"
  - "Search Engine Journal, Google Explains How To Find Search Traffic In Analytics & Logs, 13 novembre 2026 : https://www.searchenginejournal.com/google-search-traffic-analytics-logs/597382/"
  - "Google Search Central, Google Analytics et Search Console : https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console"
  - "CNIL, Cookies et traceurs : que dit la loi ? : https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/que-dit-la-loi"
---

Les clics de la Search Console et les sessions « Google / organic » de Google Analytics ne correspondent jamais, et ils ne le peuvent pas : ils ne mesurent pas la même chose au même endroit. La Search Console compte un clic dès qu'un internaute sélectionne votre résultat sur Google. Google Analytics ne compte une visite que si la page s'est chargée **et** que son script a pu s'exécuter, ce qui suppose, en France, que l'internaute ait accepté les cookies de mesure. L'écart est normal. Ce qui n'est pas normal, c'est un écart qui change brutalement.

## Deux outils, deux questions différentes

| | Search Console | Google Analytics 4 |
|---|---|---|
| Ce qu'il mesure | Ce qui se passe **sur Google** : impressions, clics, position, requêtes | Ce qui se passe **sur votre site** : sessions, pages vues, engagement, conversions |
| Source de la donnée | Les serveurs de Google | Un script exécuté dans le navigateur du visiteur |
| Moteurs couverts | Google seulement (Search, Discover, News) | Tous les canaux : Google, Bing, réseaux sociaux, e-mail, direct |
| Données sur les requêtes | Oui, en partie anonymisées | Non : Google ne transmet pas les mots-clés |
| Historique | 16 mois | Selon la configuration de la propriété |
| Prix | Gratuit | Gratuit (version standard) |

La Search Console répond à « comment Google voit et montre mon site ? ». Analytics répond à « que font les visiteurs une fois arrivés ? ». Il faut les deux, et ne pas demander à l'un de faire le travail de l'autre.

## Ce que Google vient de documenter

Le 12 novembre 2026, Google a publié dans sa documentation Search Central une page qui explique comment identifier le trafic venu de Google Search. Ce que dit Google, en substance :

- **Le referrer est réduit à l'origine.** Google envoie `https://www.google.com/` (ou un domaine local comme `google.fr`), sans chemin, sans paramètre et **sans les mots-clés**. L'application Google sur Android peut envoyer `android-app://com.google.android.googlequicksearchbox/…`.
- **Search, Discover et Images envoient le même referrer.** Impossible de les séparer dans Analytics ou dans les logs : pour isoler Discover, il faut le rapport Discover de la Search Console.
- **Le referrer peut disparaître** : navigation privée, ouverture dans un nouvel onglet selon le navigateur, passage d'un widget de recherche mobile au navigateur. Ces visites tombent alors en « Direct ».
- **Les redirections peuvent l'effacer.** Une redirection côté client (JavaScript) remplace le referrer par l'URL de votre propre site ; une redirection qui supprime la query string fait perdre le `gclid` des campagnes Google Ads.
- **Une politique `Referrer-Policy` trop stricte** sur votre site peut aussi le supprimer.

Ce que la page ne traite pas : la façon d'isoler le trafic venu des **AI Overviews** et du **mode IA**. Leurs clics sont comptés dans le rapport Performances de la Search Console, mais aucun filtre ne permet de les distinguer. Je n'ai pas de méthode fiable à proposer là-dessus, et je me méfie des outils qui prétendent le faire à partir du seul referrer.

## Les huit raisons de l'écart

1. **Le consentement aux cookies.** En France, la CNIL considère que la mesure d'audience par Google Analytics nécessite le consentement de l'internaute. Un visiteur qui refuse n'est pas compté, ou seulement sous forme de données modélisées si le mode consentement est configuré. Selon le taux de refus de votre bandeau, c'est souvent la première cause de l'écart.
2. **Les bloqueurs de publicité et de traceurs**, qui empêchent le script de se charger.
3. **Le clic sans chargement.** L'internaute clique, puis revient en arrière avant que la page s'affiche. La Search Console a compté un clic, Analytics rien.
4. **Les redirections et le referrer perdu**, décrits plus haut : une partie du trafic Google atterrit en « Direct » ou en « Referral ».
5. **Le regroupement des canaux.** Le canal « Organic Search » de GA4 additionne Google, Bing, Qwant, Ecosia… Pour comparer, filtrez la source `google` et le support `organic`.
6. **Discover et Google News** comptés à part dans la Search Console, mais mélangés au trafic Google dans Analytics.
7. **Les fuseaux horaires.** Les dates de la Search Console suivent l'heure du Pacifique ; celles d'Analytics, le fuseau de votre propriété. Sur une journée isolée, l'écart peut être fort ; il s'efface sur une semaine.
8. **L'URL comptée.** La Search Console rattache les données à l'URL canonique ; Analytics enregistre l'URL réellement chargée, avec ses paramètres. Une page à variantes (filtres, UTM) s'éparpille dans Analytics.

## La méthode pour rapprocher les deux chiffres

Ce que je fais quand un client me dit « mes chiffres ne collent pas » :

1. **Même période, en semaines entières.** Au moins 28 jours, pour lisser le décalage horaire.
2. **Même périmètre.** Dans la Search Console, rapport Performances, type de recherche « Web » seulement. Dans GA4, sessions filtrées sur `google / organic`.
3. **Calculer le ratio sessions / clics**, page par page pour les 20 pages qui font le plus de clics. Un ratio stable d'une page à l'autre (par exemple 0,6 partout) indique une perte homogène, typique du consentement. Une page très en dessous des autres signale un problème local : redirection, script absent, page lente.
4. **Suivre ce ratio dans le temps.** C'est lui qui compte, pas sa valeur absolue. S'il chute du jour au lendemain, cherchez ce qui a changé ce jour-là : nouveau bandeau de cookies, nouveau thème, balise retirée, migration.
5. **Regarder le « Direct »**. Une hausse du direct qui coïncide avec une baisse du `google / organic` signale souvent un referrer perdu, pas une baisse de trafic.

**Comment vérifier une redirection suspecte** : ouvrez les outils de développement du navigateur, onglet Réseau, cliquez sur votre résultat dans Google, et regardez les requêtes. Une redirection en JavaScript apparaît comme un second chargement de page ; l'en-tête `Referer` de la seconde requête vous dit ce qu'Analytics a reçu.

## Lequel croire ?

Mon avis : aucun des deux n'est « le vrai ». Ils répondent à des questions différentes.

- **Pour suivre la visibilité et le trafic SEO dans le temps**, je me fie aux **clics de la Search Console**. Ils ne dépendent ni du consentement ni des bloqueurs, et c'est la seule source sur les requêtes et les positions.
- **Pour savoir ce que ce trafic rapporte** (inscriptions, ventes, temps passé), j'utilise **Analytics**, en gardant en tête qu'il ne voit qu'une partie des visiteurs.
- **Pour un chiffre à présenter à une direction**, je donne les deux, avec le ratio, plutôt que d'en choisir un. Un écart expliqué rassure plus qu'un chiffre unique qu'on ne sait pas défendre.

Pour aller plus loin sur ce que montre la Search Console, et ce qu'elle ne montre pas sur les réponses IA, voyez [le rapport sur l'IA générative de la Search Console](/search-console-rapport-ia/) et [l'indexation Google](/indexation-google/). Pour le trafic venu de Bing et de Copilot, il faut un autre outil : [Bing Webmaster Tools](/bing-webmaster-tools-indexnow/).

<section class="faq" markdown="1">

## Questions fréquentes

### Quel écart est normal entre la Search Console et Analytics ?

Il n'y a pas de chiffre officiel. Sur un site français avec un bandeau de cookies conforme, un nombre de sessions nettement inférieur aux clics est courant. Ce qui doit vous alerter, c'est un écart qui varie fortement d'une page à l'autre ou d'une semaine à l'autre.

### Peut-on retrouver les mots-clés dans Google Analytics ?

Pas depuis le referrer : Google ne transmet pas les termes de recherche. Vous pouvez lier la Search Console à GA4 pour afficher ses données de requêtes dans Analytics, mais ce sont les chiffres de la Search Console, pas des sessions.

### La Search Console compte-t-elle les clics venus des AI Overviews ?

Oui, ils sont inclus dans le rapport Performances, mais aucun filtre ne permet de les isoler du reste du trafic Web.

### Faut-il installer les deux outils ?

Oui. Ils sont gratuits et complémentaires : la Search Console pour Google, Analytics pour le comportement sur le site et les conversions.

</section>

## Sources

- Google Search Central, « Identify traffic from Google Search », mise à jour du 12 novembre 2026 : [developers.google.com](https://developers.google.com/search/docs/monitor-debug/identify-google-search-traffic)
- Search Engine Journal, « Google Explains How To Find Search Traffic In Analytics & Logs », 13 novembre 2026 : [searchenginejournal.com](https://www.searchenginejournal.com/google-search-traffic-analytics-logs/597382/)
- Google Search Central, « À propos de Google Analytics et de la Search Console » : [developers.google.com](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console)
- CNIL, « Cookies et traceurs : que dit la loi ? » : [cnil.fr](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/que-dit-la-loi)
