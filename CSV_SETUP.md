# Configuration CSV - Zones de la Roue

## Fichier CSV utilisé

Le système utilise maintenant le fichier `public/J1.csv` pour récupérer les données des tours.

## Structure du fichier CSV

Le fichier CSV doit avoir la structure suivante :

```csv
Tour,Lot,Zone,Code,Used,Note
1,Cooms Cookie,1,COOKIE123,,
2,Smood Goodies,2,SMOOD456,,
3,Pause Migros,5,PAUSE789,,
4,Smood Goodies,6,,,
5,Smood Goodies,6,,,
...
```

### Description des colonnes :

- **Tour** : Numéro du tour (1, 2, 3, ...)
- **Lot** : Nom du lot (Cooms Cookie, Smood Goodies, etc.)
- **Zone** : Zone de la roue où s'arrêter (1 à 8)
- **Code** : Code de voucher (utilisé directement depuis le CSV)
- **Used** : Statut d'utilisation (optionnel, non utilisé actuellement)
- **Note** : Note additionnelle (optionnel, non utilisé actuellement)

## Zones de la Roue

La roue est divisée en 8 zones de 45 degrés chacune :

- **Zone 1 (0° à 45°)** : **Sélection caviste** (verre de vin rouge) - *Zone pointée par la flèche*
- **Zone 2 (45° à 90°)** : **Smood Goodies** (logo rouge Smood)
- **Zone 3 (90° à 135°)** : **Bon Cadeau** (ruban rouge)
- **Zone 4 (135° à 180°)** : **Cooms Cookie** (cookie rouge)
- **Zone 5 (180° à 225°)** : **Smood Goodies** (logo rouge Smood)
- **Zone 6 (225° à 270°)** : **Bon Cadeau** (ruban rouge)
- **Zone 7 (270° à 315°)** : **Smood Goodies** (logo rouge Smood)
- **Zone 8 (315° à 360°)** : **100 CHF** (symbole dollar rouge)

## Avantages du système CSV

✅ **Plus simple** : Pas besoin d'API key ou de configuration complexe  
✅ **Plus rapide** : Chargement local instantané  
✅ **Plus fiable** : Pas de dépendance externe  
✅ **Plus facile à modifier** : Édition directe du fichier CSV  
✅ **Versioning** : Le fichier peut être versionné avec Git  

## Modification des données

Pour modifier les tours et zones :

1. Ouvrez le fichier `public/J1.csv`
2. Modifiez les colonnes `Tour`, `Lot`, et `Zone`
3. Sauvegardez le fichier
4. Rechargez la page web

## Cache

Le système utilise un cache en mémoire pour éviter de recharger le CSV à chaque tour. Le cache se vide automatiquement lors du rechargement de la page.
