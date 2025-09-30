## Smood Business – Roulette Salon RH (One‑Pager)

### Objectif
Créer une activation simple et premium pour salons/événements qui génère du trafic application, capte l’attention, et transforme l’engagement en conversions via des bons (5 CHF, 10 CHF, FDL, 100 CHF).

### Expérience Utilisateur (parcours live)
1. Le visiteur scanne un QR/accède à la page “Roue”.
2. Il lance la roue et découvre son lot instantanément (gamification positive, design Smood).
3. Un QR code lui permet d’ouvrir sa page “voucher” personnelle.
4. Il visualise une « carte » style Wallet (marque/valeurs Smood), voit ses conditions, et télécharge un PDF parfaitement proportionné (prêt à conserver/partager).

### Ce que ça apporte au business
- Acquisition et réactivation: incentive clair (bons 5/10 CHF, FDL, 100 CHF) + diffusion facile (PDF/QR).
- Notoriété et image: carte au design premium, cohérente avec l’identité Smood Business.
- Expérience fluide en salon: rapide, mobile-first, sans friction; s’utilise sur iPhone/Android/iPad.
- Mesure et pilotage événement: paramètre `day` pour différencier les journées et les dotations 100 CHF.

### Fonctionnalités clés (et bénéfices)
- Roue gamifiée (UI optimisée tablette/mobile)
  - Attire, divertit et convertit. Titres, marqueur et ergonomie adaptés aux contraintes salon.
- Codes voucher standardisés
  - `SALON-RH-5CHF`, `SALON-RH-10CHF`, `SALON-RH-FDL`, `100 CHF` (config jour J1/J2, voir ci‑dessous).
  - Affichage conditions en format phrase minimaliste (style T&Cs condensées, centré, lisible).
- Carte “Wallet‑like” (page `/voucher/[code]`)
  - Logo Smood Business, visuels premium, typographies soignées, alignements précis.
  - Responsive contrôlé: rendu identique desktop/mobile pour une impression professionnelle.
- Export PDF fidèle à l’écran
  - Le PDF adopte exactement la taille de l’élément HTML (aucune déformation, orientation auto).
  - Idéal pour sauvegarder/partager le bon (prospects repartent avec une preuve tangible).
- QR code automatique
  - Lien direct vers la page voucher du gagnant; incite à ouvrir l’app et à utiliser le code.
- Compteurs d’usage
  - Indicateurs lisibles (tours en cours/joués) placés sous la roue pour faciliter l’animation terrain.

### Paramétrage Salon sur 2 jours (dotation 100 CHF)
- Jour 1 (J1): code 100 CHF = `SALON-RH-WIN-100CHF`
- Jour 2 (J2): code 100 CHF = `SALON-RH-100CHF-WIN`
- Comment définir le jour
  - Lancer la roue avec `?day=1` (par défaut) ou `?day=2`.
  - Le QR embarque le même `day`, garantissant la cohérence jusqu’à la page voucher.

Exemples
- Page roue (jour 1): `…/wheel?day=1`
- Page roue (jour 2): `…/wheel?day=2`
- Page voucher depuis QR: `…/voucher/SALON-RH-10CHF?day=2`

### Robustesse et qualité d’exécution
- Rendu identique HTML → PDF (capture à dimensions réelles, gestion CORS/chargement logo).
- Design system orienté marque (bleus Smood, hiérarchie visuelle, composants cohérents).
- Optimisations tablette/iPad et mobile (espaces, polices, placements clairs en environnement salon).

### Mise en place sur stand (checklist)
- Installer un device en mode plein écran sur la page roue (`?day` correct).
- Préparer un présentoir QR “Scannez et récupérez votre bon”.
- Briefer l’équipe: 3 étapes (lancer, scanner, télécharger), plus rappel de l’app.

### Pistes d’évolution business
- Collecte opt‑in post‑gain (email/app install) pour nurturing.
- A/B tests dotations/messages selon jour/zone.
- Dashboard simple (exports CSV ou comptage) pour reporting post‑événement.

### Améliorations futures (lead gen & scale)
- Jeu ouvert à tous via QR public
  - Un QR unique affiché sur le stand, tout visiteur scanne et accède à la roue.
  - Base de données simple (cloud) pour enregistrer chaque session de jeu et le lot.
- Email gating (captation de leads)
  - Demande d’email (et consentement RGPD) avant de jouer; validation par code OTP/magic‑link si nécessaire.
  - Synchronisation CRM/marketing (HubSpot/Salesforce/Braze) pour relances automatiques.
- Anti‑fraude & gouvernance
  - Règle « 1 personne = 1 jeu » (hash email, device fingerprint léger, limite par jour).
  - Quotas par dotation (ex: nombre de 10 CHF/disponible) et logs d’audit.
- Post‑événement automatisé
  - Emails de remerciement + rappel d’usage du code; segmentations selon lot/jour.
  - Tableau de bord live: scans, taux de jeu, taux de conversion code/app.
- Expériences avancées
  - Multi‑langue, accessibilité, mode kiosque/offline de secours.
  - Co‑branding sponsor, thèmes visuels par événement.

### Où trouver quoi (repères non‑tech)
- Page roue et compteurs: `src/components/WheelPopup.tsx`, styles `src/styles/wheel.css`.
- Page voucher (carte + PDF): `src/app/voucher/[code]/page.tsx`.
- Paramétrage des lots: `src/config/lotMapping.ts` (références), logique tour/CSV: `src/utils/turnLogic.ts`.

En synthèse: une activation clé‑en‑main, esthétiquement soignée, simple à opérer, et directement reliée à des résultats business (acquisition, notoriété, conversions via bons).


