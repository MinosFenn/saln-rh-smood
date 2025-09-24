import { LOT_MAPPING, LotType, VoucherType, LOT_MESSAGES } from '@/config/lotMapping';

// Structure d'un tour prédéfini
export interface TurnData {
  tour: number;
  lot: LotType;
  zone: number;
  code: string;
}

// Gestion des tours (sans user ID)
const TURN_STORAGE_KEY = 'wheel_turn_data';

export interface TurnState {
  currentTurn: number;
  lastPlayDate: string;
  totalPlays: number;
}

// Récupérer l'état actuel des tours
export function getCurrentTurnState(): TurnState {
  try {
    const stored = localStorage.getItem(TURN_STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return data;
    }
  } catch (error) {
    console.error('Erreur lors de la lecture des tours:', error);
  }
  
  // Premier jeu
  return {
    currentTurn: 1,
    lastPlayDate: new Date().toISOString().slice(0, 10),
    totalPlays: 0
  };
}

// Sauvegarder l'état des tours
export function saveTurnState(turnState: TurnState): void {
  try {
    localStorage.setItem(TURN_STORAGE_KEY, JSON.stringify(turnState));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des tours:', error);
  }
}

// Passer au tour suivant
export function incrementTurn(): TurnState {
  const currentData = getCurrentTurnState();
  const newData: TurnState = {
    currentTurn: currentData.currentTurn + 1,
    lastPlayDate: new Date().toISOString().slice(0, 10),
    totalPlays: currentData.totalPlays + 1
  };
  
  saveTurnState(newData);
  return newData;
}

// Cache pour les données des tours
let cachedTurns: TurnData[] | null = null;

// Fonction pour récupérer les tours depuis le fichier CSV local
export async function fetchTurnsFromCSV(): Promise<TurnData[]> {
  try {
    const response = await fetch('/J1.csv');
    if (!response.ok) {
      throw new Error(`Erreur lors du chargement du CSV: ${response.status}`);
    }
    
    const csvText = await response.text();
    const lines = csvText.split('\n');
    
    // Ignorer la première ligne (en-têtes)
    const dataLines = lines.slice(1).filter(line => line.trim());
    
    const turns: TurnData[] = dataLines.map((line, index) => {
      const [tour, lot, zone, code, used, note] = line.split(',');
      return {
        tour: parseInt(tour) || index + 1,
        lot: lot.trim() as any,
        zone: parseInt(zone) || 1,
        code: code.trim() || ''
      };
    }).filter(turn => turn.lot && turn.zone);
    
    console.log('Tours récupérés depuis le CSV local:', turns.length);
    return turns;
  } catch (error) {
    console.error('Erreur lors de la récupération des tours depuis le CSV:', error);
    return [];
  }
}

// Fonction pour obtenir les tours (avec cache)
export async function getTurns(): Promise<TurnData[]> {
  // Utiliser le cache si disponible
  if (cachedTurns) {
    return cachedTurns;
  }
  
  // Récupérer les nouvelles données
  const turns = await fetchTurnsFromCSV();
  cachedTurns = turns;
  
  return turns;
}

// Récupérer le lot pour un tour donné (version asynchrone)
export async function getLotForTurn(turn: number): Promise<LotType | null> {
  const turns = await getTurns();
  const turnData = turns.find(t => t.tour === turn);
  return turnData ? turnData.lot : null;
}

// Récupérer la zone pour un tour donné (version asynchrone)
export async function getZoneForTurn(turn: number): Promise<number | null> {
  const turns = await getTurns();
  const turnData = turns.find(t => t.tour === turn);
  return turnData ? turnData.zone : null;
}

// Récupérer le code pour un tour donné (version asynchrone)
export async function getCodeForTurn(turn: number): Promise<string | null> {
  const turns = await getTurns();
  const turnData = turns.find(t => t.tour === turn);
  return turnData ? turnData.code : null;
}

// Calculer l'angle de rotation pour une zone donnée
export function getAngleForZone(zone: number): number {
  // Chaque zone fait 45 degrés (360°/8 zones)
  // Zone 1 (Sélection caviste) = 22.5° (centre de 0° à 45°)
  // Zone 2 (Smood Goodies) = 67.5° (centre de 45° à 90°)
  // Zone 3 (Bon Cadeau) = 112.5° (centre de 90° à 135°)
  // Zone 4 (Cooms Cookie) = 157.5° (centre de 135° à 180°)
  // Zone 5 (Smood Goodies) = 202.5° (centre de 180° à 225°)
  // Zone 6 (Bon Cadeau) = 247.5° (centre de 225° à 270°)
  // Zone 7 (Smood Goodies) = 292.5° (centre de 270° à 315°)
  // Zone 8 (100 CHF) = 337.5° (centre de 315° à 360°)
  
  // Calculer l'angle central de la zone
  const zoneCenterAngle = (zone - 1) * 45 + 22.5;
  
  // Retourner directement l'angle de la zone
  // La flèche pointe vers le haut (0°), donc la zone doit être à l'angle calculé
  return zoneCenterAngle;
}

// Fonction de test pour vérifier les angles
export function testZoneAngles(): void {
  console.log('=== Test des angles des zones ===');
  for (let zone = 1; zone <= 8; zone++) {
    const angle = getAngleForZone(zone);
    console.log(`Zone ${zone}: ${angle}°`);
  }
}

// Convertir un lot en type de voucher
export function lotToVoucherType(lot: LotType): VoucherType {
  return LOT_MAPPING[lot];
}

// Fonctions de génération de codes supprimées - les codes viennent du CSV

// Configuration de la roue (simplifiée pour le système CSV)
export const wheelConfig = {
  images: {
    title: 'ROUE SMOOD',
    wheel: '/Salon_HR_Roue_Final.png',
    marker: '/Arrow.png',
    background: '/Salon_HR_Roue_BKG.png'
  }
};

// Messages de victoire basés sur les lots
export const victoryMessages = LOT_MESSAGES;
