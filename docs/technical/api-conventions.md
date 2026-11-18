# Conventions de l'API

Ces règles s'appliquent à **toutes** les routes, quel que soit le module. Elles permettent au site web et à l'application mobile de traiter toutes les réponses de la même façon.

> Une route utilisée par quelqu'un d'autre (par exemple l'app mobile) est **d'abord décrite** dans la documentation OpenAPI, relue en PR, **puis** codée. Celui qui l'attend peut travailler avec des données simulées qui respectent ce contrat.

## 1. URL

| Règle                                                 | Exemple                             |
| ----------------------------------------------------- | ----------------------------------- |
| Préfixe commun et version                             | `/api/v1/...`                       |
| Ressources au **pluriel**, en **kebab-case**          | `/api/v1/team-members`              |
| Identifiant dans le chemin                            | `/api/v1/events/{id}`               |
| Sous-ressource                                        | `/api/v1/events/{id}/registrations` |
| Action qui n'est pas un CRUD : verbe en fin de chemin | `POST /api/v1/payments/{id}/refund` |

## 2. Méthodes HTTP

| Méthode  | Usage                        | Code de succès                  |
| -------- | ---------------------------- | ------------------------------- |
| `GET`    | Lire                         | `200`                           |
| `POST`   | Créer                        | `201` (avec la ressource créée) |
| `PATCH`  | Modifier partiellement       | `200`                           |
| `PUT`    | Remplacer entièrement (rare) | `200`                           |
| `DELETE` | Supprimer                    | `204` (sans contenu)            |

## 3. Format des données

- JSON, champs en **camelCase** : `firstName`, `createdAt`.
- Dates au format **ISO 8601 en UTC** : `"2026-11-17T20:00:00.000Z"`.
- Montants en **centimes**, en entier, avec la devise : `{ "amount": 2500, "currency": "EUR" }`.
- Identifiants : UUID sous forme de texte.
- Les types partagés sont dans `packages/shared` (`@gofac/shared`) et importés par l'API, le web et le mobile.

## 4. Listes et pagination

Paramètres : `?page=1&pageSize=20` (par défaut 20, maximum 100). Tri : `?sort=lastName` ou `?sort=-createdAt` (décroissant). Filtres : un paramètre par champ, par exemple `?status=active&teamId=...`. Recherche texte : `?q=dupont`.

Réponse (type `Paginated<T>` de `@gofac/shared`) :

```json
{
  "data": [{ "id": "…", "firstName": "Alice" }],
  "meta": { "page": 1, "pageSize": 20, "total": 134 }
}
```

## 5. Erreurs

Toutes les erreurs suivent le format **problem details** (RFC 9457), type `ProblemDetails` de `@gofac/shared`, avec l'en-tête `Content-Type: application/problem+json`. Le filtre global `ProblemDetailsFilter` de l'API s'en charge.

```json
{
  "type": "about:blank",
  "title": "BAD_REQUEST",
  "status": 400,
  "detail": "Le formulaire contient des erreurs.",
  "instance": "/api/v1/members",
  "errors": [
    {
      "field": "email",
      "message": "L'adresse e-mail n'est pas valide.",
      "suggestion": "Vérifiez qu'elle contient un « @ », par exemple nom@exemple.fr."
    }
  ]
}
```

- `errors` liste les erreurs **champ par champ**, avec une **suggestion de correction** : c'est une exigence d'accessibilité (formulaires).
- Les messages sont rédigés pour l'utilisateur final, en français.
- Une erreur inattendue (`500`) ne révèle **jamais** de détail technique.

| Code          | Quand                                                                                  |
| ------------- | -------------------------------------------------------------------------------------- |
| `400`         | Données invalides                                                                      |
| `401`         | Non connecté ou session expirée                                                        |
| `403`         | Connecté mais pas la permission                                                        |
| `404`         | Ressource introuvable **ou** hors du périmètre de l'utilisateur                        |
| `409`         | Conflit (réservation qui chevauche, événement complet…)                                |
| `422`         | Règle métier non respectée                                                             |
| `502` / `503` | Service externe indisponible (paiement, e-mail) : l'opération est signalée ou relancée |

## 6. Authentification

- **Site web** : cookie de session `HttpOnly`, `Secure`, `SameSite=Lax`.
- **Application mobile** : en-tête `Authorization: Bearer <jeton>`.
- Les sessions expirent ; la déconnexion invalide la session côté serveur.

## 7. Permissions

- Les permissions sont **toujours vérifiées côté serveur**, jamais seulement en masquant un bouton.
- Nom d'une permission : `<module>.<action>`, par exemple `members.read`, `events.write`, `payments.refund`.
- Un rôle s'applique à **toute l'association** ou à **une seule équipe**. Pour un rôle d'équipe, l'API ne renvoie que les données de cette équipe (`404` pour le reste, afin de ne pas révéler leur existence).
- Chaque route déclare la permission requise avec le décorateur commun (fourni par le module d'authentification).
- Les actions sensibles (changement de droits, paiement, remboursement, suppression de données) écrivent une ligne dans le **journal d'audit**.

## 8. Modules désactivés

Si un module est désactivé depuis l'administration, ses routes répondent `404` et il disparaît du site et de l'application.

## 9. Documentation OpenAPI

- Générée par `@nestjs/swagger`, consultable sur `http://localhost:3001/api/docs`.
- Chaque route documente : description, paramètres, corps, réponses et erreurs possibles, avec un exemple.
