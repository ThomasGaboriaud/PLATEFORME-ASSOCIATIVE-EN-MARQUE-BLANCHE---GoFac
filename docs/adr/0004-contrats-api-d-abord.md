# 0004. Contrats d'API écrits avant le code

- **Statut :** acceptée
- **Date :** 2026-11-17

## Contexte

Le travail est découpé par fonctionnalité. L'application mobile utilise des API développées par les autres membres de l'équipe : sans accord préalable, elle serait bloquée en attendant.

## Décision

- Toute route utilisée par une autre partie est **d'abord décrite** (route, paramètres, réponses, erreurs) dans la documentation OpenAPI, relue en pull request, puis codée.
- En attendant l'implémentation, le client travaille avec des **données simulées** qui respectent ce contrat.
- Les règles communes sont dans [`docs/technical/api-conventions.md`](../technical/api-conventions.md).

## Conséquences

- Personne n'attend un autre pour avancer.
- Un changement de contrat après coup doit être discuté en PR avec ceux qui l'utilisent.
