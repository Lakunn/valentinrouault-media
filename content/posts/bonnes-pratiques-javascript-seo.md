---
title: "JavaScript SEO : les bonnes pratiques expliquées par Martin Splitt (Google)"
slug: bonnes-pratiques-javascript-seo
status: publish
date: '2025-10-01T13:37:25'
origin: rewrite
wp_id: 449
categories:
- seo-technique
- seo
dek: "Rendu, codes HTTP, permissions, redirections, navigation : les recommandations de Martin Splitt, de l'équipe Search Relations de Google, pour qu'un site JavaScript soit correctement compris, avec les erreurs et les idées reçues à écarter."
seo_title: "JavaScript SEO : les bonnes pratiques selon Google"
meta_description: "Les bonnes pratiques JavaScript SEO selon Martin Splitt (Google) : vérifier le rendu, bons codes HTTP, permissions, redirections serveur, liens en HTML."
essentiel:
  - "Google indexe le **HTML rendu**, après exécution du JavaScript : c'est ce rendu qu'il faut vérifier, dans l'outil d'inspection d'URL."
  - "Une page d'erreur doit renvoyer un **vrai code 404 ou 410** côté serveur, même si son affichage est géré en JavaScript."
  - "Googlebot **refuse toutes les demandes de permission** (géolocalisation, notifications) : prévoyez un contenu par défaut."
  - "Redirections côté **serveur** et liens en **balises `<a href>`** : les équivalents purement JavaScript sont moins fiables."
---

Martin Splitt, membre de l'équipe Search Relations de Google et spécialiste du JavaScript, revient régulièrement, notamment dans des podcasts et vidéos de Google, sur les erreurs qui empêchent un site JavaScript d'être bien compris. Voici ses recommandations, regroupées et expliquées.

Pour les problèmes que l'on rencontre le plus souvent en audit, voir aussi [les 4 erreurs JavaScript qui coûtent des positions](/javascript-seo-erreurs/).

## Les bonnes pratiques

### 1. Vérifier le HTML rendu, pas le code source

Google indexe la page **après exécution du JavaScript**, comme un navigateur. Le code source brut (Ctrl+U) ne montre donc pas ce que Google voit.

**À faire :** contrôler le rendu dans l'outil d'inspection d'URL de la Search Console (« Afficher la page explorée ») : HTML rendu, capture d'écran, ressources non chargées et messages de la console.

Attention : ce qui vaut pour Google ne vaut pas pour tous les robots. Les robots des assistants IA lisent en général le HTML sans exécuter le JavaScript ; pour eux, c'est bien le code source qui compte.

### 2. Renvoyer les bons codes HTTP

Une erreur courante sur les applications JavaScript : afficher une page « introuvable » tout en renvoyant un code **200**. Google considère alors la page comme valide et peut l'indexer.

**À faire :** une URL inexistante doit renvoyer 404 (ou 410 si elle a été supprimée définitivement) côté serveur. L'affichage peut être géré en JavaScript, le code de réponse non.

### 3. Ne pas dépendre des permissions

Googlebot **refuse systématiquement** les demandes de permission : géolocalisation, notifications, caméra, etc. Un contenu qui n'apparaît qu'après autorisation reste invisible.

**À faire :** prévoir un affichage par défaut. Exemple : une page météo affiche une ville ou un pays par défaut si la géolocalisation est refusée, plutôt qu'une page vide.

### 4. Ne pas bloquer les ressources nécessaires au rendu

Si le `robots.txt` interdit l'accès aux dossiers de scripts ou de styles, Google ne peut pas reconstituer la page.

**À faire :** autoriser tout ce qui sert au rendu ; l'inspection d'URL liste les ressources que Google n'a pas pu charger.

### 5. Faire les redirections côté serveur

Une redirection faite uniquement en JavaScript (`window.location`) est plus lente et moins fiable.

**À faire :** configurer les redirections dans le serveur (301 permanente, 302 temporaire) et ne garder la redirection JavaScript qu'en secours.

### 6. Mettre les liens dans de vraies balises `<a href>`

Google suit les liens qui ont un attribut `href`. Un menu construit avec des éléments cliquables gérés par `onclick`, sans `href`, risque de ne pas être exploré.

**À faire :** tous les liens de navigation, en particulier vers les catégories et pages stratégiques, sont des `<a href="…">`.

### 7. Savoir quel script charge quel contenu

Si un élément important (titre, texte principal) est injecté par un script qui échoue de temps en temps, Google peut voir une page incomplète.

**À faire :** dans les outils de développement du navigateur, onglet *Réseau*, la colonne *Initiateur* indique quel script a déclenché chaque requête. Le contenu principal ne doit pas dépendre d'un script fragile ou tiers.

### 8. Alléger le JavaScript

Le rendu a un coût. Un JavaScript très lourd ralentit la page pour les visiteurs et rend le rendu plus incertain pour les robots.

**À faire :** découper et minifier les scripts, charger d'abord ce qui est critique, différer le reste.

### 9. Tester le site sans JavaScript

Désactivez le JavaScript dans le navigateur et regardez ce qui reste : le titre, le H1, le contenu principal et les liens internes doivent être là. Un site vide sans JavaScript est fragile, pour Google et plus encore pour les robots des IA.

### 10. Envisager le rendu côté serveur ou le pré-rendu

Pour les sites construits avec React, Vue ou Angular, le **rendu côté serveur (SSR)** ou le pré-rendu livrent directement un HTML complet. Ce n'est pas obligatoire, mais c'est la solution la plus robuste pour les pages qui doivent se classer.

### 11. Faire travailler ensemble SEO et développeurs

Beaucoup de problèmes viennent d'un simple manque de communication. Définissez ensemble ce qui doit être rendu côté serveur (contenu, liens, balises) et ce qui peut rester côté client (interactions).

## Les idées reçues

| Idée reçue | Réalité |
|---|---|
| Google ne lit pas le JavaScript | Faux. Il l'exécute, mais en différé et avec des limites. |
| Le rendu côté client est pénalisé | Faux. Il fonctionne si les bonnes pratiques sont respectées ; il est simplement plus risqué. |
| Google exécute toujours tout le JavaScript | Faux. Des scripts en erreur, trop lents ou dépendants d'une interaction peuvent ne pas être pris en compte. |
| Le code source montre ce que Google indexe | Faux pour Google, qui indexe le rendu. Mais vrai pour beaucoup de robots IA. |
| Le rendu côté serveur est obligatoire | Non, mais c'est la solution la plus fiable pour les pages stratégiques. |

<section class="faq" markdown="1">

## Questions fréquentes

### Comment voir ce que Google voit d'une page ?

Avec l'outil d'inspection d'URL de la Search Console : il montre le HTML rendu, une capture et les ressources bloquées. Le test des résultats enrichis donne aussi le HTML rendu pour une URL publique.

### Les liens ajoutés en JavaScript sont-ils suivis ?

Oui s'ils sont présents dans le HTML rendu sous forme de balises `<a>` avec un attribut `href`. Les liens qui n'existent qu'à travers un gestionnaire de clic ne le sont pas de façon fiable.

### Faut-il passer en rendu côté serveur ?

Pas forcément. C'est recommandé pour les pages qui doivent se classer ou être citées par les IA, si leur contenu dépend aujourd'hui du JavaScript.

</section>
