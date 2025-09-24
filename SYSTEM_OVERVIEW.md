# Système de Roue de la Fortune - Vue d'ensemble

## Architecture simplifiée

Le système utilise maintenant un fichier CSV local (`public/J1.csv`) pour définir les tours et zones de la roue.

## Fichiers principaux

### 1. **Données** - `public/J1.csv`
```csv
Tour,Lot,Zone,Code,Used,Note
1,Cooms Cookie,1,,,
2,Smood Goodies,2,,,
3,Pause Migros,5,,,
```

### 2. **Logique unifiée** - `src/utils/turnLogic.ts`
- `getCurrentTurnState()` : Récupère l'état actuel
- `incrementTurn()` : Passe au tour suivant
- `getTurns()` : Charge les données du CSV
- `getLotForTurn(turn)` : Récupère le lot
- `getZoneForTurn(turn)` : Récupère la zone
- `getAngleForZone(zone)` : Calcule l'angle de rotation
- `wheelConfig` : Configuration des images
- `victoryMessages` : Messages de victoire

### 3. **Interface** - `src/components/WheelPopup.tsx`
- Gestion de l'état de la roue
- Animation de rotation
- Affichage des résultats
- Reset par clics sur la flèche
- Interface simplifiée sans bouton de fermeture

## Zones de la roue

| Zone | Lot | Angle de rotation |
|------|-----|-------------------|
| 1 | Sélection caviste | 22.5° |
| 2 | Smood Goodies | 67.5° |
| 3 | Bon Cadeau | 112.5° |
| 4 | Cooms Cookie | 157.5° |
| 5 | Smood Goodies | 202.5° |
| 6 | Bon Cadeau | 247.5° |
| 7 | Smood Goodies | 292.5° |
| 8 | 100 CHF | 337.5° |

## Fonctionnalités

### ✅ **Système de tours prédéfinis**
- Chaque tour a un lot et une zone spécifiques
- Progression séquentielle des tours
- Persistance dans le localStorage

### ✅ **Animation précise**
- La roue s'arrête exactement sur la zone définie
- Rotation fluide avec plusieurs tours complets
- Calcul d'angle basé sur la zone du CSV

### ✅ **Reset par clics**
- Clic 10 fois sur la flèche pour réinitialiser
- Reset complet de l'état et de la position

### ✅ **Gestion des vouchers**
- Génération automatique de codes
- Détails des vouchers selon le lot

## Avantages du système simplifié

- 🚀 **Plus rapide** : Pas d'API externe
- 🔧 **Plus simple** : Configuration par CSV
- 📝 **Plus facile à modifier** : Édition directe
- 🔒 **Plus fiable** : Pas de dépendance externe
- 💾 **Versioning** : Fichier CSV versionné

## Modification des données

Pour changer les tours et zones :

1. Éditez `public/J1.csv`
2. Modifiez les colonnes `Tour`, `Lot`, `Zone`
3. Rechargez la page

Le système est maintenant entièrement basé sur le CSV et ne dépend plus de l'ancien système de zones pondérées.
