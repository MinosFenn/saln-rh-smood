# Système « Roue de la Fortune » – Vue d’ensemble (Projet final)

## 1) Architecture fonctionnelle
- Front Next.js (App Router), 100% côté client pour l’activation salon (offline‑friendly).
- Données de tours depuis un CSV local `public/J1.csv` (simple à éditer). 
- Logique de partie et angles de roue centralisés dans `src/utils/turnLogic.ts`.
- Génération QR (page cadeau) + carte voucher téléchargeable en PDF.

## 2) Fichiers clés
- Interface roue: `src/components/WheelPopup.tsx`
  - Lance la roue, calcule l’angle cible, gère l’état (tour actuel, total, reset).
  - Génère un QR d’accès à la page voucher du lot gagné.
  - Paramètre d’URL `?day=1|2` pour la dotation « 100 CHF » (voir règle ci‑dessous).
- Page voucher: `src/app/voucher/[code]/page.tsx`
  - Affiche la « carte » au format Wallet (Smood Business), conditions en une ligne.
  - Bouton « Télécharger PDF » qui capture l’élément à sa taille réelle (html2canvas + jsPDF) sans déformation.
- Styles roue / UI: `src/styles/wheel.css`
- Mapping & types: `src/config/lotMapping.ts`, `src/types/wheel.ts`
- Logique de tours/angles: `src/utils/turnLogic.ts`

## 3) Lots et codes vouchers
Codes standards utilisés:
- 5 CHF → `SALON-RH-5CHF`
- 10 CHF → `SALON-RH-10CHF`
- Frais de livraison offerts → `SALON-RH-FDL`
- 100 CHF → dépend du jour (cf. règle J1/J2)

Règle J1/J2 pour le lot « 100 CHF » (paramètre `?day=` lu côté roue et propagé au QR):
- Jour 1 (`?day=1` ou paramètre manquant) → code `SALON-RH-WIN-100CHF`
- Jour 2 (`?day=2`) → remplacé par un FDL → `SALON-RH-FDL`

NB: Si `?day` est absent ou invalide, on retombe par défaut sur Jour 1.

## 4) Flux utilisateur (salon)
1. L’utilisateur arrive sur la page roue (avec `?day=1` ou `?day=2`).
2. Il clique pour jouer, la roue s’arrête sur un lot prédéfini par tour/CSV.
3. Un QR est généré → lien vers `/voucher/[code]?day=…`.
4. Sur la page voucher, il voit sa carte « Wallet‑like », les conditions, et télécharge un PDF identique au rendu écran.

## 5) PDF fidèle à l’HTML
- Capture à dimensions réelles de l’élément (pas d’A4 imposé, pas d’étirement).
- Conversion px→mm dynamique; orientation calculée automatiquement.
- Gestion robustes des images (logo Smood) avec attente de chargement avant capture.

## 6) UI et ergonomie
- Carte voucher: design premium, logo Smood en haut, contenus centrés, T&Cs minimalistes.
- Compteurs (tour actuel / tours joués): placés sous la roue et le bouton, bien visibles.
- Responsive: rendu stable sur mobile/tablette (espaces, tailles et alignements revus).

## 7) Données (CSV) et logique
- Fichier `public/J1.csv` (ex.):
```csv
Tour,Lot,Zone,Code,Used,Note
1,Cooms Cookie,1,,,
2,Smood Goodies,2,,,
3,Pause Migros,5,,,
```
- `turnLogic.ts` fournit: `getLotForTurn`, `getZoneForTurn`, `getAngleForZone`, gestion d’état, etc.
- La roue s’aligne exactement sur la zone définie par le CSV (angles fixes par zone).

## 8) Paramètres et raccourcis
- `?day=1|2` sur la page roue pour gérer la dotation 100 CHF (J1 = 100CHF, J2 = FDL).
- Le QR inclut le même `?day` pour la cohérence jusqu’à la page voucher.
- Reset roue: 10 clics sur le marqueur pour réinitialiser l’état (utile en salon).

## 9) Avantages clés (opération salon)
- Rapidité de mise en place (CSV, pas d’API externe).
- Expérience fluide, design Smood Business cohérent et valorisant.
- Preuve « à emporter » via PDF fidèle, partageable.
- Pilotage multi‑jour simple via `?day`.

## 10) Évolutions possibles
- Ouverture au public via QR (jeu accessible à tous) et collecte email opt‑in (leads).
- Anti‑fraude (limite par personne/jour), quotas par dotation, reporting simple.
- Synchronisation CRM/marketing (Braze/HubSpot/Salesforce) pour nurturing post‑salon.

## 11) Sécurité & confidentialité (ne pas exposer les codes)
- Ne pas servir le CSV côté client: sortir `public/J1.csv` du dossier public; stocker côté serveur (`private/` gitignored) ou DB.
- API serveur minimaliste `/api/turns`:
  - Input: `turn`, `day`.
  - Output: seulement les infos nécessaires (lot, zone, éventuellement un token), jamais toute la liste.
  - Headers: `Cache-Control: no-store`.
- Option de masquage du code: retourner un identifiant temporaire; révéler le vrai code seulement sur `/voucher/[code]` via logique server‑only.
- Nettoyage Git: rendre le repo privé ou purger l’historique du CSV (BFG/git filter‑repo), puis `.gitignore`.

