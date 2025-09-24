# Système de QR Codes pour les Bons Cadeaux

## 🎯 **Fonctionnalité**

Quand un utilisateur gagne un **Bon Cadeau** (5 CHF, FDL, 10 CHF, ou 100 CHF), un **QR code** apparaît automatiquement qui ouvre une landing page avec le code et les boutons de téléchargement d'app.

## 🔧 **Implémentation**

### **1. Génération du QR Code**

```typescript
// Dans WheelPopup.tsx
if ((lot === 'Bon cadeau 5 CHF' || lot === 'Bon cadeau FDL' || lot === 'Bon cadeau 10 CHF' || lot === '100chf') && finalCode) {
  // URL de la landing page avec le code
  const landingPageUrl = `${window.location.origin}/voucher/${finalCode}`;
  const qrDataUrl = await QRCode.toDataURL(landingPageUrl, {
    width: 150,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  });
  setQrCodeDataUrl(qrDataUrl);
}
```

### **2. Affichage du QR Code**

Le QR code s'affiche dans le message de victoire :

```html
<div class="qr-code-container">
  <img src="${qrCodeDataUrl}" alt="QR Code" class="qr-code" />
  <p class="qr-description">Scannez pour télécharger l'app</p>
</div>
```

**Le QR code contient l'URL :** `https://votre-domaine.com/voucher/CODE123`

### **3. Page dédiée aux vouchers**

**URL :** `/voucher/[code]`

**Fonctionnalités :**
- ✅ Affichage du code de voucher
- ✅ Boutons de téléchargement d'app
- ✅ Instructions d'utilisation
- ✅ Design responsive
- ✅ Landing page simple et efficace

## 📱 **Types de Bons Cadeaux supportés**

| Lot | Type | QR Code |
|-----|------|---------|
| Bon cadeau 5 CHF | 5chf | ✅ Oui |
| Bon cadeau FDL | fdl | ✅ Oui |
| Bon cadeau 10 CHF | 10chf | ✅ Oui |
| 100chf | 100chf | ✅ Oui |
| Cooms Cookie | cooms_cookie | ❌ Non |
| Smood Goodies | smood_goodies | ❌ Non |
| Pause Migros | pause_migros | ❌ Non |
| Caviste | caviste | ❌ Non |

## 🎨 **Styles CSS**

```css
.qr-code-container {
  margin-top: 20px;
  text-align: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  border: 2px solid #4CAF50;
}

.qr-code {
  width: 150px;
  height: 150px;
  border: 3px solid #333;
  border-radius: 10px;
  margin: 10px 0;
}
```

## 📋 **Flux utilisateur**

1. **Utilisateur tourne la roue** → Gagne un "Bon cadeau"
2. **QR code apparaît** → Contient l'URL de la landing page
3. **Utilisateur scanne** → Redirigé vers `/voucher/[code]`
4. **Landing page** → Affiche code + boutons d'app + instructions
5. **Téléchargement** → Vers App Store ou Google Play

## 🔗 **URLs de téléchargement**

- **App Store :** `https://apps.apple.com/app/smood/id123456789`
- **Google Play :** `https://play.google.com/store/apps/details?id=com.smood.app`

## ⚙️ **Configuration**

### **Dépendances installées :**
```bash
npm install qrcode @types/qrcode
```

### **Fichiers créés :**
- `src/app/voucher/[code]/page.tsx` - Page voucher
- `public/app-store-badge.png` - Badge App Store
- `public/google-play-badge.png` - Badge Google Play

### **Fichiers modifiés :**
- `src/components/WheelPopup.tsx` - Logique QR code
- `src/styles/wheel.css` - Styles QR code

## 🎯 **Avantages**

✅ **Engagement** : QR code incite à télécharger l'app  
✅ **Simplicité** : Code directement scannable  
✅ **Professionnel** : Page dédiée bien designée  
✅ **Mobile-first** : Optimisé pour smartphones  
✅ **Flexible** : Fonctionne avec tous les types de bons cadeaux  

## 🚀 **Utilisation**

Le système fonctionne automatiquement dès qu'un utilisateur gagne un bon cadeau. Aucune configuration supplémentaire n'est nécessaire !
