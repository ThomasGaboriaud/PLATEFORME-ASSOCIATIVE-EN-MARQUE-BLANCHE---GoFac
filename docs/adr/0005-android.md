# 0005. Application mobile ciblant Android

- **Statut :** acceptée
- **Date :** 2026-11-17

## Contexte

Le sujet demande une seule plateforme cible, iOS ou Android, et un build installable produit automatiquement à chaque merge.

## Options étudiées

1. **iOS** : demande un Mac pour compiler et un compte Apple pour installer sur un téléphone ; la CI doit tourner sur macOS.
2. **Android** : un APK se compile sur Linux dans GitHub Actions et s'installe sur n'importe quel téléphone Android ou émulateur.

## Décision

**Android.** L'accessibilité est testée avec **TalkBack**.

## Conséquences

- La CI produit un APK en artefact à chaque merge sur `main`.
- Expo permettrait de passer à iOS plus tard sans réécrire l'application.
