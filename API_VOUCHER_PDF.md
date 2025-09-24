# API Route pour Génération PDF de Vouchers

## 🎯 **Fonctionnalité**

API route Next.js qui génère à la volée des PDFs de vouchers avec le code et les instructions de téléchargement de l'application.

## 📍 **Endpoint**

```
GET /api/voucher/[code].pdf
```

**Exemple :**
```
GET /api/voucher/DEMO-BON-CADEAU-5-CHF-007.pdf
```

## 🔧 **Implémentation**

### **Fichier :** `/src/app/api/voucher/[code]/route.ts`

**Technologies utilisées :**
- **PDFKit** : Génération de PDF côté serveur
- **Next.js App Router** : API route moderne
- **TypeScript** : Type safety

### **Fonctionnalités :**

1. **Validation du code** : Vérification que le code est présent
2. **Génération PDF** : Création dynamique du PDF
3. **Images des stores** : Intégration des images Apple/Android
4. **Headers corrects** : Content-Type et Content-Disposition
5. **Gestion d'erreurs** : Réponses d'erreur appropriées

## 📄 **Contenu du PDF**

### **Structure :**
```
┌─────────────────────────────────┐
│        🎉 Bon cadeau           │ ← Titre principal
├─────────────────────────────────┤
│  Félicitations ! Voici votre   │ ← Sous-titre
│        bon cadeau.              │
├─────────────────────────────────┤
│    DEMO-BON-CADEAU-5-CHF-007   │ ← Code en gros
├─────────────────────────────────┤
│   Téléchargez l'application :  │ ← Instructions
│                                 │
│    [App Store]  [Google Play]   │ ← Images des stores
├─────────────────────────────────┤
│  Comment utiliser votre code :  │ ← Instructions détaillées
│  1. Téléchargez l'application  │
│  2. Créez votre compte         │
│  3. Allez dans "Mes codes"     │
│  4. Entrez le code : XXX       │
│  5. Profitez de votre cadeau ! │
├─────────────────────────────────┤
│    Merci de jouer avec Smood ! │ ← Footer
└─────────────────────────────────┘
```

### **Styles appliqués :**
- **Couleurs** : #040a8c (bleu marque), #D83966 (rouge secondaire)
- **Typographie** : Helvetica, tailles variées
- **Layout** : Centré, espacement optimisé
- **Images** : 80x80px pour les stores

## 🔄 **Intégration avec WheelPopup**

### **Modification du QR Code :**

**Avant :**
```typescript
const pdfPageUrl = `${window.location.origin}/voucher-pdf/${finalCode}`;
```

**Après :**
```typescript
const pdfApiUrl = `${window.location.origin}/api/voucher/${finalCode}.pdf`;
```

### **Description mise à jour :**
```jsx
<p className="qr-description">Scannez pour télécharger votre bon cadeau</p>
```

## 📱 **Flux utilisateur**

1. **Utilisateur gagne** → "Bon cadeau 5 CHF"
2. **QR Code généré** → Pointe vers `/api/voucher/CODE.pdf`
3. **Utilisateur scanne** → Téléchargement immédiat du PDF
4. **PDF contient** → Code + instructions + images stores
5. **Plus de rejeu** → Pas de page web intermédiaire

## 🛡️ **Sécurité et Validation**

### **Validation du code :**
```typescript
if (!code || code.trim() === '') {
  return NextResponse.json(
    { error: 'Code de voucher manquant' },
    { status: 400 }
  );
}
```

### **Nettoyage du code :**
```typescript
const cleanCode = code.replace(/\.pdf$/, '');
```

### **Headers de sécurité :**
```typescript
'Cache-Control': 'no-cache, no-store, must-revalidate',
'Pragma': 'no-cache',
'Expires': '0'
```

## 🎨 **Personnalisation**

### **Couleurs de marque :**
```typescript
const brandColor = '#040a8c';      // Bleu principal
const secondaryColor = '#D83966';  // Rouge secondaire
```

### **Images des stores :**
- **Apple** : `/public/apple.png`
- **Android** : `/public/android.png`
- **Fallback** : Rectangles colorés si images manquantes

### **Métadonnées PDF :**
```typescript
info: {
  Title: `Bon cadeau - ${cleanCode}`,
  Author: 'Smood',
  Subject: 'Bon cadeau Smood',
  Creator: 'Roue de la Fortune Smood'
}
```

## ✅ **Avantages**

✅ **Téléchargement immédiat** : Pas de page intermédiaire  
✅ **PDF professionnel** : Design cohérent avec la marque  
✅ **Images intégrées** : Stores Apple et Google Play  
✅ **Instructions claires** : Guide d'utilisation complet  
✅ **Sécurisé** : Validation et nettoyage des codes  
✅ **Performant** : Génération à la volée, pas de stockage  
✅ **Responsive** : PDF optimisé pour tous les appareils  

## 🚀 **Résultat**

L'utilisateur scanne le QR code et télécharge **immédiatement** un PDF professionnel avec son code de voucher et toutes les instructions nécessaires ! 🎉
