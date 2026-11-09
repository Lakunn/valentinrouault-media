---
title: Martin Splitt nous donne les bonnes pratiques JavaScript SEO 2025 (explications détaillées)
slug: bonnes-pratiques-javascript-seo
status: publish
date: '2025-10-01T13:37:25'
origin: import
wp_id: 449
url: https://valentinrouault.com/bonnes-pratiques-javascript-seo/
seo_title: Les bonnes pratiques JS 🔥 | Martin Splitt - Googler
meta_description: Dans un podcast, Martin Splitt, Googler, nous explique les bonnes pratiques et erreur courantes liées au JavaScript pour le SEO.
categories:
- seo-technique
- seo
---

Dans un podcast, Martin Splitt, Googler, nous explique les bonnes pratiques et erreur courantes liées au [JavaScript pour le SEO.](https://valentinrouault.com/javascript-seo-erreurs/)

### 1\. Vérifier le HTML rendu (Rendered HTML)

- **Ce que ça veut dire** : Google n’indexe pas le code source brut (`View Source`), mais le contenu **après exécution du JavaScript** (comme un navigateur).
- **Action concrète** : Toujours contrôler le rendu via **Inspecteur d’URL dans Google Search Console** ou un outil comme **URL Render Test**.
- **Exemple** : Si ton `<h1>` n’est visible que dans le rendu final et pas dans le HTML brut, c’est bon tant qu’il est bien présent après exécution.

### 2\. Pages d’erreur avec les bons statuts HTTP

- **Problème** : Certains sites affichent une “page 404” via JS, mais renvoient un **code 200 OK**. Résultat : Google pense que c’est une page valide et l’indexe.
- **Action concrète** : Toujours renvoyer un **vrai code 404/410** côté serveur. Le visuel peut être en JS, mais le serveur doit envoyer le bon statut.
- **Exemple** : `/page-inexistante` doit donner un statut `404 Not Found` et non un `200`.

### 3\. Permissions bloquées (géoloc, notifications…)

- **Problème** : Googlebot refuse toujours les demandes de permissions. Donc si le contenu n’apparaît qu’après une géolocalisation autorisée → Google ne verra rien.
- **Action concrète** : Prévoir un **fallback** : par exemple afficher une version générique (“Contenu pour la France”) si la géoloc est refusée.
- **Exemple** : Une météo locale : si géoloc refusée → afficher la météo par défaut d’un pays plutôt qu’une page vide.

### 4\. Utiliser les outils Google

- **Pourquoi** : Pour savoir si Google comprend bien le rendu.
- **Outils à utiliser** :
	- Search Console → **Inspection d’URL** (Rendered HTML, ressources bloquées).
	- Test des résultats enrichis.
	- Chrome DevTools (onglet “Network” \+ “Rendered HTML”).
- **Action concrète** : Tester toutes les pages stratégiques pour valider que Google voit les balises SEO, le contenu et les liens internes.

### 5\. Identifier quel JS charge quel contenu

- **Pourquoi** : Pour comprendre si des scripts tiers ou internes bloquent l’indexation.
- **Action concrète** : Dans DevTools → Network → colonne “Initiator” : voir quel script a déclenché chaque requête.
- **Exemple** : Si ton `<h1>` est injecté par un script tiers et qu’il échoue parfois → Google peut voir une page vide.

### 6\. Ne pas bloquer les ressources essentielles dans robots.txt

- **Problème** : Si tu bloques `/js/`, `/css/`, Google ne peut pas exécuter ton JS correctement → il voit un site “cassé”.
- **Action concrète** : Vérifier robots.txt et autoriser tout ce qui est nécessaire au rendu.
- **Exemple** : Laisser passer `/assets/app.js` ou `/main.css`.

### 7\. Gérer correctement les redirections

- **Problème** : Les redirections faites uniquement via JS sont lentes et parfois ignorées.
- **Action concrète** : Utiliser **301 ou 302 côté serveur** (HTTP). Garder les redirections JS uniquement en secours.
- **Exemple** : Si `/old-page` doit rediriger → configurer la redirection dans `.htaccess` ou Nginx, pas uniquement avec `window.location.href`.

### 8\. Ne pas mettre toute la navigation uniquement en JS

- **Problème** : Si tes menus et liens internes ne sont visibles qu’après exécution JS, Google peut en rater une partie.
- **Action concrète** : Mettre au moins les liens internes stratégiques en HTML initial.
- **Exemple** : Un menu e\-commerce → les liens vers catégories doivent être en `<a href="...">`, pas uniquement en onclick JS.

### 9\. Limiter le poids et la complexité du JS

- **Problème** : Google a un **budget de rendu** (temps limité pour exécuter ton JS). Si c’est trop long, il arrête.
- **Action concrète** :
	- Minifier et découper le JS.
	- Charger les scripts critiques en priorité.
- **Exemple** : Si ton carrousel d’images casse le rendu, c’est moins grave que si ton contenu principal est retardé par un JS trop lourd.

### 10\. Communication SEO ↔ Développeurs

- **Pourquoi** : Beaucoup d’erreurs viennent d’un manque de communication (ex : dev met du contenu en JS sans savoir que ça bloque Google).
- **Action concrète** : Travailler ensemble : définir ce qui doit être server\-side, ce qui peut être client\-side.

### 11\. Tester le site avec JS désactivé

- **Pourquoi** : Pour savoir si le contenu essentiel reste visible sans JS.
- **Action concrète** : Désactiver JS dans ton navigateur → vérifier si :
	- Balises `<h1>`, `<title>`, `<meta>` sont là.
	- Liens internes critiques restent accessibles.
- **Exemple** : Si sans JS ton site est vide → il est fragile SEO.

### 12\. Utiliser SSR ou prerender si nécessaire

- **Problème** : Les sites JS lourds (React, Vue, Angular) peuvent ralentir l’indexation.
- **Solution** :
	- **SSR (Server Side Rendering)** : contenu généré côté serveur, livré déjà rendu.
	- **Prerendering** : générer une version statique HTML que Googlebot peut lire.
- **Exemple** : Next.js avec SSR → Google reçoit directement le HTML complet au lieu d’attendre le JS.

# Erreurs fréquentes

1. **Croire que “View Source” \= ce que Google voit** → Faux, toujours vérifier le rendu final.
2. **Pages 404 en JS renvoyant un code 200** → Mauvaise indexation garantie.
3. **Dépendre des permissions utilisateur** (géoloc, notif) → Google ne voit rien.
4. **Bloquer JS/CSS dans robots.txt** → Google ne peut pas exécuter.
5. **Redirections seulement en JS** → Peu fiables.
6. **Navigation uniquement en JS** → Risque de liens ignorés.
7. **JS trop lourd ou long à charger** → Google arrête le rendu.
8. **Ne pas tester sans JS** → Impossible de détecter la fragilité.

# Mythes et réalités

- **Google ne lit pas le JS** → Faux. Il le lit, mais avec des limites.
- **Client\-side rendering \= pénalité SEO** → Faux. Ça marche, mais il faut respecter les bonnes pratiques.
- **Google exécute toujours 100% du JS** → Faux. Il arrête si c’est trop long ou complexe.
- **Les permissions Googlebot** → Toujours refusées (pas de géoloc, pas de notif).
- **SSR obligatoire** → Pas toujours, seulement si ton site est trop lourd ou critique pour le SEO.
