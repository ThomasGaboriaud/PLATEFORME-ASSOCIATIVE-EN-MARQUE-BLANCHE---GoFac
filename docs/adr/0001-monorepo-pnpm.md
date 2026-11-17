# 0001. Un seul dépôt (monorepo) géré avec pnpm

- **Statut :** acceptée
- **Date :** 2026-11-17

## Contexte

Le produit comprend une API, un site web et une application mobile, développés par 3 personnes. Le sujet demande un seul dépôt propre, qu'un nouveau contributeur peut lancer en moins de 15 minutes.

## Options étudiées

1. **Un dépôt par application** : séparation nette, mais trois CI, trois README, des versions à synchroniser et des types dupliqués.
2. **Un monorepo avec des espaces de travail** (pnpm workspaces) : une seule installation, une seule CI, des types partagés.

## Décision

Monorepo avec **pnpm workspaces** :

- `apps/api` : API (NestJS)
- `apps/web` : site public et administration (Next.js)
- `apps/mobile` : application mobile (React Native avec Expo)
- `packages/shared` : types et constantes partagés
- `docs/` : documentation utilisateur et technique

## Conséquences

- Une commande à la racine installe tout (`pnpm install`) et lance tous les tests (`pnpm test`).
- Les dépendances sont installées « à plat » (`nodeLinker: hoisted`), ce dont React Native a besoin.
- Une modification qui touche l'API et le mobile peut se faire dans une seule pull request.
