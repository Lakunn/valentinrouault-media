---
title: "Générateur et vérificateur de balises hreflang"
slug: generateur-hreflang
parent: outils-seo
status: publish
origin: new
dek: "Listez les versions d'une page par langue et par pays : l'outil génère les balises et le sitemap, et repère les erreurs de codes, d'adresses et de couverture."
seo_title: "Générateur hreflang gratuit, avec vérification"
meta_description: "Générez les balises hreflang et le sitemap multilingue d'une page, avec la détection des codes invalides, doublons, x-default manquant et adresses incorrectes."
essentiel:
  - "Chaque version doit lister **toutes les autres, et elle-même**."
  - "Les erreurs les plus fréquentes : **en-uk** au lieu de en-gb, codes pays seuls, adresses qui redirigent."
  - "Bing ignore hreflang : il se fie à la langue du contenu."
---

J'ai travaillé sur des sites en plusieurs langues et sur plusieurs continents : hreflang est l'un des réglages les plus souvent faux, et l'un des plus coûteux quand il l'est. Une version canadienne qui remonte en France, une page anglaise servie aux internautes belges : les symptômes sont discrets, mais le trafic perdu est réel.

L'outil sert aussi d'audit : collez les balises `<link rel="alternate" hreflang>` copiées depuis le code source d'une page, il les relit et signale les codes invalides, les doublons et l'absence de x-default.

[vr_hreflang]

## Les règles à retenir

1. **Réciprocité.** Si la page A pointe vers la page B, la page B doit pointer vers la page A. Sinon, Google ignore la paire.
2. **Auto-référence.** Chaque page se cite elle-même dans sa propre liste.
3. **Adresses finales.** Chaque adresse répond en 200, sans redirection, avec une canonical vers elle-même.
4. **Codes valides.** Langue au format ISO 639-1 (`fr`, `en`), pays au format ISO 3166-1 (`fr`, `be`, `ca`, `gb`). Le Royaume-Uni s'écrit `gb`, pas `uk`.
5. **Une version générique** par langue ou un `x-default` pour les internautes des autres pays.

Pour les autres réglages techniques à vérifier lors d'un changement de structure, voir [la refonte d'un site sans perte de trafic](/refonte-site-seo-cro/).
