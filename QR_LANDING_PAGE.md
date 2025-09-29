# QR Code + Landing Page pour Bons Cadeaux

## 🎯 **Système simplifié**

Le QR code ouvre directement une **landing page** avec le code et les boutons de téléchargement d'app.

## 🔧 **Fonctionnement**

### **1. Codes uniquement pour les bons cadeaux**

```typescript
// Seuls ces lots ont des codes :
- 'Bon cadeau 5 CHF'
- 'Bon cadeau FDL' 
- 'Bon cadeau 10 CHF'
- '100chf'
```

### **2. QR Code pointe vers la landing page**

```typescript
// URL générée : https://votre-domaine.com/voucher/CODE123
const landingPageUrl = `${window.location.origin}/voucher/${finalCode}`;
const qrDataUrl = await QRCode.toDataURL(landingPageUrl, {...});
```

### **3. Landing page simplifiée**

**URL :** `/voucher/[code]`

**Contenu :**
- ✅ Code de voucher affiché
- ✅ Boutons App Store / Google Play
- ✅ Instructions d'utilisation
- ❌ Pas de QR code (redondant)

## 📱 **Flux utilisateur**

1. **Roue tourne** → Gagne "Bon cadeau 5 CHF"
2. **QR code apparaît** → Contient URL landing page
3. **Utilisateur scanne** → Ouvre `/voucher/DEMO-BON-CADEAU-5-CHF-003`
4. **Landing page** → Code + boutons d'app + instructions
5. **Téléchargement** → Vers App Store ou Google Play

## 🎨 **Design de la landing page**

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
└─────────────────────────────────┘
```

## ⚙️ **Avantages du système**

✅ **Simple** : QR code → Landing page directe  
✅ **Efficace** : Code + boutons d'app en un clic  
✅ **Mobile-first** : Optimisé pour smartphones  
✅ **Professionnel** : Design clean et moderne  
✅ **Fonctionnel** : Instructions claires  

## 🔗 **URLs de téléchargement**

- **App Store :** `https://apps.apple.com/app/smood/id123456789`
- **Google Play :** `https://play.google.com/store/apps/details?id=com.smood.app`

## 📋 **Codes par défaut**

Si pas de code dans le CSV :
- `DEMO-BON-CADEAU-5-CHF-001`
- `DEMO-BON-CADEAU-FDL-002`
- `DEMO-BON-CADEAU-10-CHF-003`
- `DEMO-100CHF-004`

## 🚀 **Résultat**

Le système est **ultra-simplifié** : QR code → Landing page → Téléchargement d'app ! 🎉

