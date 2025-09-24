# Système PDF pour les Bons Cadeaux

## 🎯 **Fonctionnalité**

Le QR code génère automatiquement un **PDF** de la page HTML avec le code de voucher et les informations de téléchargement d'app.

## 🔧 **Implémentation**

### **1. QR Code pointe vers la page PDF**

```typescript
// Dans WheelPopup.tsx
const pdfPageUrl = `${window.location.origin}/voucher-pdf/${finalCode}`;
const qrDataUrl = await QRCode.toDataURL(pdfPageUrl, {...});
```

### **2. Page PDF automatique**

**URL :** `/voucher-pdf/[code]`

**Fonctionnement :**
- ✅ Génère automatiquement le PDF au chargement
- ✅ Télécharge le fichier `voucher-CODE.pdf`
- ✅ Redirige vers la page normale après téléchargement
- ✅ Design optimisé pour le PDF

### **3. Génération du PDF**

```typescript
// Utilise html2canvas + jsPDF
const canvas = await html2canvas(pdfRef.current, {
  scale: 2, // Haute résolution
  useCORS: true,
  allowTaint: true,
  backgroundColor: '#ffffff'
});

const pdf = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});
```

## 📱 **Flux utilisateur**

1. **Roue tourne** → Gagne "Bon cadeau 5 CHF"
2. **QR code apparaît** → "Scannez pour télécharger le PDF"
3. **Utilisateur scanne** → Ouvre `/voucher-pdf/DEMO-BON-CADEAU-5-CHF-003`
4. **PDF généré** → Téléchargement automatique de `voucher-DEMO-BON-CADEAU-5-CHF-003.pdf`
5. **Redirection** → Vers `/voucher/DEMO-BON-CADEAU-5-CHF-003`

## 🎨 **Contenu du PDF**

```
┌─────────────────────────────────┐
│  🎉 Félicitations !             │
│  Vous avez gagné un Bon Cadeau  │
├─────────────────────────────────┤
│  Votre code de voucher :        │
│  ┌─────────────────────────────┐ │
│  │ DEMO-BON-CADEAU-5-CHF-003   │ │
│  └─────────────────────────────┘ │
├─────────────────────────────────┤
│  Téléchargez l'application :    │
│  [App Store] [Google Play]      │
├─────────────────────────────────┤
│  Comment utiliser votre code :  │
│  1. Téléchargez l'app Smood     │
│  2. Créez votre compte          │
│  3. Entrez le code : DEMO-...   │
│  4. Profitez !                  │
├─────────────────────────────────┤
│  Scannez le QR code pour        │
│  télécharger l'application      │
└─────────────────────────────────┘
```

## ⚙️ **Avantages du système PDF**

✅ **Portable** : PDF téléchargeable et partageable  
✅ **Professionnel** : Format standard et lisible  
✅ **Offline** : Utilisable sans connexion  
✅ **Imprimable** : Peut être imprimé facilement  
✅ **Haute qualité** : Résolution optimisée (scale: 2)  
✅ **Automatique** : Génération et téléchargement automatiques  

## 🔗 **URLs générées**

- **QR Code :** `https://votre-domaine.com/voucher-pdf/CODE123`
- **PDF téléchargé :** `voucher-CODE123.pdf`
- **Redirection :** `https://votre-domaine.com/voucher/CODE123`

## 📋 **Dépendances installées**

```bash
npm install html2canvas jspdf @types/html2canvas
```

## 🎯 **Types de Bons Cadeaux supportés**

| Lot | Type | PDF |
|-----|------|-----|
| Bon cadeau 5 CHF | 5chf | ✅ Oui |
| Bon cadeau FDL | fdl | ✅ Oui |
| Bon cadeau 10 CHF | 10chf | ✅ Oui |
| 100chf | 100chf | ✅ Oui |
| Cooms Cookie | cooms_cookie | ❌ Non |
| Smood Goodies | smood_goodies | ❌ Non |
| Pause Migros | pause_migros | ❌ Non |
| Caviste | caviste | ❌ Non |

## 🚀 **Résultat**

Le système génère automatiquement un **PDF professionnel** avec le code de voucher et les informations de téléchargement d'app ! 🎉
