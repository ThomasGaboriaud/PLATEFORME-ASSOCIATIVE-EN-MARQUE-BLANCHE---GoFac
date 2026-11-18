# Contribuer

Merci de contribuer ! Ce guide explique comment proposer une modification, de l'issue jusqu'au merge.

## 1. Mettre en place son poste

Suivre la section [Installation](README.md#installation) du README. Vérifier que Git utilise votre nom et l'e-mail de votre compte GitHub, pour que l'historique montre qui a fait quoi :

```bash
git config --global user.name "Prénom Nom"
git config --global user.email "email-de-votre-compte-github"
```

## 2. Déroulé d'une contribution

1. **Une issue d'abord.** Toute tâche est une issue du tableau GitHub Projects, avec un responsable, un label et un statut.
2. **Une branche par issue**, créée depuis `main` à jour.
3. **Des commits** qui respectent la convention ci-dessous.
4. **Une pull request** vers `main`, liée à l'issue (`Closes #12` dans la description).
5. **La CI doit passer** (lint, types, tests, build).
6. **Une relecture** par un autre membre de l'équipe est obligatoire. Les remarques sont traitées ou discutées, puis la conversation est marquée comme résolue.
7. **Merge** en « Squash and merge ». La branche est supprimée automatiquement.

Personne ne pousse directement sur `main` : la branche est protégée.

## 3. Stratégie de branches

Un seul tronc, `main`, toujours déployable. Les branches sont courtes (quelques jours au plus) et nommées ainsi :

| Préfixe     | Usage                                                  | Exemple                      |
| ----------- | ------------------------------------------------------ | ---------------------------- |
| `feat/`     | Nouvelle fonctionnalité                                | `feat/events-waiting-list`   |
| `fix/`      | Correction de bug                                      | `fix/booking-overlap`        |
| `docs/`     | Documentation                                          | `docs/user-guide-members`    |
| `test/`     | Tests uniquement                                       | `test/payments-refund`       |
| `refactor/` | Réorganisation du code sans changement de comportement | `refactor/permissions-guard` |
| `chore/`    | Outillage, configuration, dépendances                  | `chore/update-deps`          |
| `ci/`       | Pipeline CI/CD                                         | `ci/android-build`           |

Les versions sont taguées sur `main` aux étapes clés, en versionnage sémantique (`v0.1.0`, `v0.2.0`…), et notées dans le [CHANGELOG](CHANGELOG.md).

## 4. Convention de commits

On suit [Conventional Commits](https://www.conventionalcommits.org/fr/). Le message est vérifié automatiquement à chaque commit.

```
<type>(<portée>): <description à l'impératif, en minuscules>
```

- **Types :** `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `ci`, `perf`, `style`, `build`
- **Portées :** `api`, `web`, `mobile`, `shared`, `docs`, `ci`, `deps`, `repo`

Exemples :

```
feat(api): ajoute la liste d'attente des événements
fix(web): corrige le focus invisible dans l'éditeur de pages
docs(docs): décrit la procédure d'installation d'une association
```

## 5. Qualité attendue

- Le code passe `pnpm lint`, `pnpm typecheck` et `pnpm test`.
- Toute nouvelle logique a ses tests.
- Les règles de l'API sont dans [docs/technical/api-conventions.md](docs/technical/api-conventions.md). Une route utilisée par une autre partie est décrite **avant** d'être codée ([ADR 0004](docs/adr/0004-contrats-api-d-abord.md)).
- Toute modification de la base passe par une migration Prisma.
- **Accessibilité :** tout est utilisable au clavier, chaque champ a un libellé, chaque image a un texte alternatif, les contrastes respectent le niveau AA.
- **Aucun secret** dans le code : les valeurs vont dans `.env` (non versionné) et sont documentées dans `.env.example`.
- **Aucune donnée réelle** : membres, associations et paiements sont fictifs.
- Une décision d'architecture importante fait l'objet d'une [ADR](docs/adr/README.md).

## 6. Code produit avec l'IA

Autorisé, mais soumis aux mêmes règles que le reste : tests, relecture en PR, propreté, sécurité. L'outil utilisé est déclaré dans la section [Usage de l'IA](README.md#usage-de-lia) du README.
