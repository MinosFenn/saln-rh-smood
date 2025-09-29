# Charte Graphique - Couleurs de l'Entreprise

## 🎨 **Couleur principale**

**#D83966** - Rose/Magenta de l'entreprise

## 🔧 **Utilisation dans le système**

### **1. QR Code**
- **Couleur du QR code :** `#D83966` (au lieu du noir)
- **Fond :** Blanc (`#FFFFFF`)
- **Bordure :** `#D83966`

### **2. Page Voucher (`/voucher/[code]`)**
- **Arrière-plan :** Dégradé `#D83966` → `#B02A4A`
- **Titre principal :** `#D83966`
- **Code de voucher :** Fond `#D83966`, texte blanc
- **Bouton fermer :** `#D83966` (hover: `#B02A4A`)

### **3. Page PDF (`/voucher-pdf/[code]`)**
- **Arrière-plan :** Dégradé `#D83966` → `#B02A4A`
- **Titre principal :** `#D83966`
- **Code de voucher :** Fond `#D83966`, texte blanc

### **4. Styles CSS**
- **Bordure QR code :** `#D83966`
- **Container QR code :** Bordure `#D83966`

## 🎯 **Éléments stylisés**

### **QR Code Container**
```css
.qr-code-container {
  border: 2px solid #D83966;
  background: rgba(255, 255, 255, 0.9);
}
```

### **QR Code**
```css
.qr-code {
  border: 3px solid #D83966;
}
```

### **Code de Voucher**
```css
.code-display {
  background: #D83966;
  color: #FFFFFF;
}
```

### **Arrière-plan des pages**
```css
.voucher-page {
  background: linear-gradient(135deg, #D83966 0%, #B02A4A 100%);
}
```

## 📱 **Cohérence visuelle**

✅ **QR Code** : Couleur de l'entreprise  
✅ **Pages web** : Dégradé de l'entreprise  
✅ **Codes de voucher** : Fond de l'entreprise  
✅ **Boutons** : Couleur de l'entreprise  
✅ **Bordures** : Couleur de l'entreprise  

## 🎨 **Palette de couleurs**

| Élément | Couleur | Usage |
|---------|---------|-------|
| Principal | `#D83966` | QR code, titres, codes, boutons |
| Secondaire | `#B02A4A` | Hover, dégradé |
| Fond | `#FFFFFF` | QR code, conteneurs |
| Texte | `#333333` | Texte principal |
| Texte code | `#FFFFFF` | Sur fond #D83966 |

## 🚀 **Résultat**

Le système utilise maintenant la **couleur de l'entreprise #D83966** de manière cohérente sur tous les éléments liés aux bons cadeaux ! 🎉

