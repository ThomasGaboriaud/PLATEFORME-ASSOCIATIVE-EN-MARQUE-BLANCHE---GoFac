# GoFac — Plateforme associative en marque blanche

[![CI](https://github.com/ThomasGaboriaud/PLATEFORME-ASSOCIATIVE-EN-MARQUE-BLANCHE---GoFac/actions/workflows/ci.yml/badge.svg)](https://github.com/ThomasGaboriaud/PLATEFORME-ASSOCIATIVE-EN-MARQUE-BLANCHE---GoFac/actions/workflows/ci.yml)

Un produit générique qui donne à chaque association son site, son application mobile et ses outils de gestion. L'association l'installe et le personnalise elle-même (nom, logo, couleurs, contenus), sans toucher au code.

> **Projet pédagogique.** Les associations et les membres sont fictifs, les paiements se font uniquement en mode test.
> Le nom « GoFac » est provisoire, en attendant l'identité définitive du produit.

<!-- Captures d'écran à ajouter quand les premiers écrans existeront. -->

## Sommaire

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancement](#lancement)
- [Tests et qualité](#tests-et-qualité)
- [Structure du dépôt](#structure-du-dépôt)
- [Documentation](#documentation)
- [Contribuer](#contribuer)
- [Usage de l'IA](#usage-de-lia)

## Prérequis

| Outil                                                  | Version                            | Pour quoi                                             |
| ------------------------------------------------------ | ---------------------------------- | ----------------------------------------------------- |
| [Node.js](https://nodejs.org/)                         | 24 ou plus                         | Tout le projet                                        |
| [pnpm](https://pnpm.io/)                               | 12 (activé avec `corepack enable`) | Gestion des dépendances                               |
| [Docker](https://www.docker.com/)                      | récent                             | Base de données et serveur d'e-mails de développement |
| [Android Studio](https://developer.android.com/studio) | récent                             | Émulateur Android (application mobile uniquement)     |

## Installation

```bash
git clone https://github.com/ThomasGaboriaud/PLATEFORME-ASSOCIATIVE-EN-MARQUE-BLANCHE---GoFac.git
cd PLATEFORME-ASSOCIATIVE-EN-MARQUE-BLANCHE---GoFac
corepack enable
pnpm install
cp .env.example .env
pnpm db:up
```

`pnpm db:up` démarre PostgreSQL et Mailpit (boîte de réception de test pour les e-mails, sur http://localhost:8025).

## Lancement

| Commande          | Ce que ça lance           | Adresse                                                                  |
| ----------------- | ------------------------- | ------------------------------------------------------------------------ |
| `pnpm dev`        | API et site web           | API : http://localhost:3001/api/v1/health · Site : http://localhost:3000 |
| `pnpm dev:api`    | API seule                 | Documentation de l'API : http://localhost:3001/api/docs                  |
| `pnpm dev:web`    | Site web seul             | http://localhost:3000                                                    |
| `pnpm dev:mobile` | Application mobile (Expo) | Appuyer sur `a` pour l'ouvrir dans l'émulateur Android                   |

## Tests et qualité

| Commande         | Rôle                                                  |
| ---------------- | ----------------------------------------------------- |
| `pnpm test`      | **Tous les tests** (API, web, mobile) en une commande |
| `pnpm lint`      | Linter sur tout le projet                             |
| `pnpm typecheck` | Vérification des types TypeScript                     |
| `pnpm format`    | Formate tout le code avec Prettier                    |
| `pnpm build`     | Compile tous les projets                              |

Lancer un seul test : `pnpm --filter @gofac/api test -- health` (remplacer `api` par `web` ou `mobile`, et `health` par une partie du nom du fichier).

À chaque commit, un hook formate automatiquement les fichiers modifiés et vérifie le message de commit.

## Structure du dépôt

```
apps/
  api/        API NestJS + base de données (Prisma)
  web/        Site public et administration (Next.js)
  mobile/     Application mobile Android (React Native avec Expo)
packages/
  shared/     Types partagés entre l'API, le web et le mobile
docs/
  adr/        Décisions d'architecture
  technical/  Documentation technique
  user/       Documentation utilisateur
.github/      CI, modèles d'issue et de pull request
```

## Documentation

- [Documentation (sommaire)](docs/README.md)
- [Conventions de l'API](docs/technical/api-conventions.md)
- [Modèle de données](docs/technical/data-model.md)
- [Décisions d'architecture](docs/adr/README.md)

## Contribuer

Lire [CONTRIBUTING.md](CONTRIBUTING.md) : branches, convention de commits, pull requests et relecture. Le [code de conduite](CODE_OF_CONDUCT.md) s'applique à tous.

## Usage de l'IA

Conformément au sujet, l'usage d'outils d'IA est déclaré ici. Le groupe est responsable de tout le code livré : chaque partie est relue en pull request, testée, et chaque membre doit pouvoir l'expliquer.

| Outil              | Utilisé pour                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Claude (Anthropic) | Mise en place du dépôt (structure, configuration, CI), rédaction des conventions et des ADR |

_À compléter au fil du projet : code, tests, documentation, contenus de démonstration._

## Licence

[MIT](LICENSE)
