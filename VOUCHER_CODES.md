# Gestion des Codes de Vouchers

## Système simplifié

Les codes de vouchers sont maintenant **directement dans le CSV** au lieu d'être générés automatiquement.

## Structure du CSV

```csv
Tour,Lot,Zone,Code,Used,Note
1,Cooms Cookie,1,COOKIE123,,
2,Smood Goodies,2,SMOOD456,,
3,Pause Migros,5,PAUSE789,,
4,Bon Cadeau,3,BON2024,,
5,100 CHF,8,CHF100ABC,,
```

## Colonne Code

- **Code** : Code de voucher spécifique pour ce tour
- **Peut être vide** : Si pas de code, un code par défaut sera généré
- **Format libre** : Vous pouvez utiliser n'importe quel format de code
- **Unique** : Chaque tour peut avoir son propre code

### Codes par défaut

Si la colonne `Code` est vide, un code par défaut sera généré automatiquement :

**Format :** `DEMO-[LOT]-[TOUR]`

**Exemples :**
- `DEMO-COOMS-COOKIE-001`
- `DEMO-SMOOD-GOODIES-002`
- `DEMO-BON-CADEAU-5-CHF-003`
- `DEMO-PAUSE-MIGROS-004`

## Avantages du système CSV

✅ **Contrôle total** : Vous définissez exactement quels codes sont donnés  
✅ **Codes prédéfinis** : Pas de génération aléatoire  
✅ **Gestion centralisée** : Tous les codes dans un seul fichier  
✅ **Facilité de modification** : Édition directe du CSV  
✅ **Traçabilité** : Vous savez exactement quels codes ont été donnés  
✅ **Codes par défaut** : Génération automatique si colonne vide  
✅ **Flexibilité** : Mélange de codes prédéfinis et générés  

## Exemples de codes

```csv
# Codes pour différents types de lots
1,Cooms Cookie,1,COOKIE2024,,
2,Smood Goodies,2,,,  # Code par défaut : DEMO-SMOOD-GOODIES-002
3,Bon Cadeau,3,BON-CADEAU-456,,
4,Pause Migros,5,,,  # Code par défaut : DEMO-PAUSE-MIGROS-004
5,100 CHF,8,CHF100-VIP-ABC,,
```

## Fonctions supprimées

Les fonctions suivantes ont été supprimées car plus nécessaires :

- ❌ `generateVoucherCodeForLot()` - Génération automatique
- ❌ `lotRequiresVoucher()` - Vérification automatique
- ❌ `getVoucherDetails()` - Détails des vouchers
- ❌ `getMinOrderValue()` - Valeur minimale de commande

## Nouvelle fonction

- ✅ `getCodeForTurn(turn)` - Récupère le code du CSV pour un tour donné

## Utilisation

Le système récupère automatiquement le code depuis la colonne `Code` du CSV pour chaque tour. Si la colonne est vide, aucun code ne sera affiché.
