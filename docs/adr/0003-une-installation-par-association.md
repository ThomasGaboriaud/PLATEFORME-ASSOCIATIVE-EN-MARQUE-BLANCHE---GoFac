# 0003. Une installation = une association

- **Statut :** acceptée
- **Date :** 2026-11-17

## Contexte

Le sujet indique : « une nouvelle association = un nouveau déploiement de la même version, configuré depuis l'interface ». Le produit est livré comme une image déployable unique, identique pour toutes les associations.

## Options étudiées

1. **Multi-association dans une seule base** (colonne `associationId` partout) : un seul serveur, mais chaque requête doit filtrer par association, avec un risque de fuite de données entre associations.
2. **Une installation par association** : chaque association a son propre conteneur et sa propre base.

## Décision

**Une installation par association.** La même image Docker est déployée deux fois pour les deux associations de démonstration, chacune avec sa base de données.

## Conséquences

- Pas de colonne `associationId` : le code est plus simple et les données ne peuvent pas se mélanger.
- Les réglages de l'association (nom, logo, couleurs…) sont dans une table à une seule ligne, remplie par l'assistant d'installation.
- L'application mobile, elle, est unique : elle se connecte à l'adresse de l'installation choisie (QR code ou saisie).
