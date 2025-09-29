# Typographie et Centrage - Mazzard Bold 700

## 🎨 **Font Mazzard Bold 700**

### **Configuration**

**Font utilisée :** Inter Bold 700 (équivalent de Mazzard Bold)  
**Variable CSS :** `--font-mazzard-bold`  
**Poids :** 700 (Bold)

### **Application**

```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-mazzard-bold), 'Inter', sans-serif;
  font-weight: 700;
}
```

### **Fichiers modifiés :**

1. **`src/app/layout.tsx`** - Import de la font Inter Bold
2. **`src/app/globals.css`** - Styles globaux pour les headings
3. **`src/styles/wheel.css`** - Styles spécifiques à la roue

## 🎯 **Centrage du contenu**

### **Pages centrées :**

✅ **Page Voucher** (`/voucher/[code]`)
- Contenu principal centré
- Instructions alignées à gauche dans un conteneur centré
- Largeur maximale : 400px pour les listes

✅ **Page PDF** (`/voucher-pdf/[code]`)
- Même centrage que la page voucher
- Optimisé pour la génération PDF

✅ **Roue principale**
- Déjà centrée avec `text-align: center`
- Conteneur centré avec `margin: 0 auto`

### **Styles appliqués :**

```css
.voucher-content {
  text-align: center;
}

.instructions ol {
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
}

.wheel-app {
  text-align: center;
}
```

## 📱 **Éléments stylisés**

### **Headings avec Mazzard Bold :**

- **Titre principal** : "🎉 Félicitations !"
- **Sous-titre** : "Vous avez gagné un Bon Cadeau"
- **Sections** : "Votre code de voucher", "Téléchargez l'application", etc.
- **Instructions** : "Comment utiliser votre code"

### **Contenu centré :**

- **Code de voucher** : Centré dans son conteneur
- **Boutons d'app** : Centrés horizontalement
- **Instructions** : Liste alignée à gauche dans un conteneur centré
- **QR Code** : Centré avec bordure #D83966

## 🎨 **Cohérence visuelle**

✅ **Font uniforme** : Tous les headings utilisent Mazzard Bold 700  
✅ **Centrage cohérent** : Tout le contenu est centré  
✅ **Couleur entreprise** : #D83966 maintenue partout  
✅ **Responsive** : Fonctionne sur mobile et desktop  

## 🚀 **Résultat**

Le système utilise maintenant la **font Mazzard Bold 700** pour tous les headings et **tout le contenu est centré** pour un design professionnel et cohérent ! 🎉

