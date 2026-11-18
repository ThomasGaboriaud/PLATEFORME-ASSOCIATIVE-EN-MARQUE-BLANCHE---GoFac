# 0002. Stack TypeScript : NestJS, Next.js, React Native (Expo), PostgreSQL

- **Statut :** acceptée
- **Date :** 2026-11-17

## Contexte

La stack est libre mais doit être justifiée. L'équipe est de 3 personnes, chacune travaille sur toutes les couches de ses modules (base, API, web et parfois mobile). Le mobile ne peut pas être un site emballé (PWA, Capacitor, WebView interdits).

## Options étudiées

1. **Tout en TypeScript** : un seul langage, types partagés entre l'API, le web et le mobile.
2. **Python (Django/FastAPI) + TypeScript** : back-end solide, mais deux langages et des types à dupliquer.
3. **Mobile natif (Kotlin)** : très performant, mais un langage de plus et aucun code partagé.

## Décision

| Couche          | Choix                            | Pourquoi                                                                                                          |
| --------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| API             | **NestJS**                       | Structure en modules (adapté aux modules activables), injection de dépendances, génération OpenAPI intégrée       |
| Base de données | **PostgreSQL** + **Prisma**      | Relationnel adapté aux réservations et aux paiements ; Prisma gère les migrations et le typage                    |
| Site web        | **Next.js**                      | Rendu côté serveur (rapide et accessible), un seul projet pour le site public et l'administration                 |
| Mobile          | **React Native avec Expo**       | Vraie application native (pas une WebView), même langage que le reste, scan de QR codes et notifications intégrés |
| Tests           | Jest (API, mobile), Vitest (web) | Outils par défaut de chaque framework                                                                             |

## Conséquences

- Chaque membre de l'équipe peut relire et expliquer tout le code (exigence de la soutenance).
- Les types partagés (`@gofac/shared`) évitent les décalages entre l'API et ses clients.
- Les versions majeures récentes (Next.js 16, NestJS 12, Expo 58) changent souvent : toujours vérifier la documentation de la version installée.
