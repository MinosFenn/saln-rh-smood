# Système de Codes par Défaut

## 🎯 **Fonctionnalité**

Quand la colonne `Code` du CSV est vide, un code par défaut est généré automatiquement pour l'exemple.

## 🔧 **Format des codes par défaut**

**Structure :** `DEMO-[LOT]-[TOUR]`

### **Règles de génération :**

1. **Préfixe** : `DEMO-` (toujours)
2. **Nom du lot** : Espaces remplacés par des tirets, en majuscules
3. **Numéro de tour** : 3 chiffres avec zéros à gauche

### **Exemples de transformation :**

| Lot original | Code généré |
|--------------|-------------|
| `Cooms Cookie` | `DEMO-COOMS-COOKIE-001` |
| `Smood Goodies` | `DEMO-SMOOD-GOODIES-002` |
| `Bon cadeau 5 CHF` | `DEMO-BON-CADEAU-5-CHF-003` |
| `Pause Migros` | `DEMO-PAUSE-MIGROS-004` |
| `100chf` | `DEMO-100CHF-005` |

## 💻 **Implémentation**

```typescript
// Dans WheelPopup.tsx
const finalCode = code || `DEMO-${lot.replace(/\s+/g, '-').toUpperCase()}-${turnState.currentTurn.toString().padStart(3, '0')}`;
```

### **Détails techniques :**

- `lot.replace(/\s+/g, '-')` : Remplace tous les espaces par des tirets
- `.toUpperCase()` : Convertit en majuscules
- `padStart(3, '0')` : Ajoute des zéros à gauche (001, 002, etc.)

## 📋 **Exemples concrets**

### **CSV avec codes vides :**
```csv
Tour,Lot,Zone,Code,Used,Note
1,Cooms Cookie,4,,,
2,Smood Goodies,2,,,
3,Bon cadeau 5 CHF,7,,,
```

### **Codes générés :**
- Tour 1 : `DEMO-COOMS-COOKIE-001`
- Tour 2 : `DEMO-SMOOD-GOODIES-002`
- Tour 3 : `DEMO-BON-CADEAU-5-CHF-003`

## 🎨 **Affichage**

Les codes par défaut s'affichent exactement comme les codes prédéfinis :

- ✅ **Message de victoire** : Code affiché
- ✅ **QR Code** : Généré pour les bons cadeaux
- ✅ **Page voucher** : URL `/voucher/DEMO-COOMS-COOKIE-001`
- ✅ **Console** : Log du code généré

## 🔄 **Flux complet**

1. **CSV lu** → Colonne `Code` vide
2. **Code généré** → `DEMO-[LOT]-[TOUR]`
3. **Affiché** → Dans l'interface utilisateur
4. **QR Code** → Généré si bon cadeau
5. **Page voucher** → Accessible via URL

## ⚙️ **Configuration**

### **Avantages :**
- 🎯 **Toujours un code** : Jamais de champ vide
- 🔧 **Format cohérent** : Structure prévisible
- 📱 **Fonctionnel** : QR codes et pages voucher
- 🎨 **Professionnel** : Codes bien formatés

### **Utilisation :**
- **Développement** : Codes d'exemple automatiques
- **Tests** : Démonstration sans configuration
- **Production** : Fallback si CSV incomplet

## 🚀 **Résultat**

Le système fonctionne parfaitement même avec un CSV vide de codes, générant automatiquement des codes d'exemple professionnels ! 🎉
