# Décisions d'architecture (ADR)

Chaque décision importante est écrite ici : le contexte, les options étudiées, le choix et ses conséquences. Une décision n'est jamais modifiée : si on change d'avis, on écrit une nouvelle ADR qui remplace l'ancienne.

| N°                                               | Décision                                                            | Statut   |
| ------------------------------------------------ | ------------------------------------------------------------------- | -------- |
| [0001](0001-monorepo-pnpm.md)                    | Un seul dépôt (monorepo) géré avec pnpm                             | Acceptée |
| [0002](0002-stack-typescript.md)                 | Stack TypeScript : NestJS, Next.js, React Native (Expo), PostgreSQL | Acceptée |
| [0003](0003-une-installation-par-association.md) | Une installation = une association                                  | Acceptée |
| [0004](0004-contrats-api-d-abord.md)             | Contrats d'API écrits avant le code                                 | Acceptée |
| [0005](0005-android.md)                          | Application mobile ciblant Android                                  | Acceptée |

Pour en ajouter une : copier [`template.md`](template.md) en `NNNN-titre-court.md` et l'ajouter au tableau.
