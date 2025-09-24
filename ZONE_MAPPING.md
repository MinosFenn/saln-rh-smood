# Correspondance des Zones de la Roue

## Zones corrigées

| Zone | Lot | Angle de Rotation | Position |
|------|-----|-------------------|----------|
| 1 | Sélection caviste | 22.5° | 0° à 45° |
| 2 | Smood Goodies | 67.5° | 45° à 90° |
| 3 | Bon Cadeau | 112.5° | 90° à 135° |
| 4 | Cooms Cookie | 157.5° | 135° à 180° |
| 5 | Smood Goodies | 202.5° | 180° à 225° |
| 6 | Bon Cadeau | 247.5° | 225° à 270° |
| 7 | Smood Goodies | 292.5° | 270° à 315° |
| 8 | 100 CHF | 337.5° | 315° à 360° |

## Test des angles

Lorsque vous ouvrez la page, vous verrez dans la console :

```
=== Test des angles des zones ===
Zone 1: 22.5° (Sélection caviste)
Zone 2: 67.5° (Smood Goodies)
Zone 3: 112.5° (Bon Cadeau)
Zone 4: 157.5° (Cooms Cookie)
Zone 5: 202.5° (Smood Goodies)
Zone 6: 247.5° (Bon Cadeau)
Zone 7: 292.5° (Smood Goodies)
Zone 8: 337.5° (100 CHF)
```

## Vérification

- **Zone 1** (Sélection caviste) devrait s'arrêter à **22.5°** pour être alignée avec la flèche
- **Zone 2** (Smood Goodies) devrait s'arrêter à **67.5°**
- **Zone 4** (Cooms Cookie) devrait s'arrêter à **157.5°**
- etc.

## Structure du CSV

Votre fichier `J1.csv` devrait avoir cette correspondance :

```csv
Tour,Lot,Zone,Code,Used,Note
1,Cooms Cookie,1,,,
2,Smood Goodies,2,,,
3,Bon Cadeau,3,,,
4,Pause Migros,4,,,
5,Smood Goodies,5,,,
6,Bon Cadeau,6,,,
7,Smood Goodies,7,,,
8,100 CHF,8,,,
```

## Notes importantes

- La **Zone 1** (Cooms Cookie) est maintenant la zone pointée par la flèche
- Chaque zone fait exactement 45 degrés
- La flèche pointe vers le haut (0°) et la Zone 1 commence à 0°
- Les angles de rotation correspondent directement aux angles centraux des zones
- Zone 1 (Cooms Cookie) = 22.5° (centre de 0° à 45°)
