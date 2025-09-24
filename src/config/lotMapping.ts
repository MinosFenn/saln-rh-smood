// Mapping des lots vers les types de vouchers
export const LOT_MAPPING = {
  'Cooms Cookie': 'cooms_cookie',
  'Smood Goodies': 'smood_goodies', 
  'Pause Migros': 'pause_migros',
  'Bon cadeau 5 CHF': '5chf',
  'Caviste': 'caviste',
  'Bon cadeau FDL': 'fdl',
  'Bon cadeau 10 CHF': '10chf',
  '100chf': '100chf'
} as const;

export type LotType = keyof typeof LOT_MAPPING;
export type VoucherType = typeof LOT_MAPPING[LotType];

// Messages de victoire pour chaque lot
export const LOT_MESSAGES = {
  'cooms_cookie': '🍪 Cooms Cookie !',
  'smood_goodies': '🎁 Smood Goodies !',
  'pause_migros': '☕ Pause Migros !',
  '5chf': '🎉 5 CHF offerts !',
  'caviste': '🍷 Caviste !',
  'fdl': '🎉 Livraison offerte !',
  '10chf': '🎉 10 CHF offerts !',
  '100chf': '🎉 100 CHF offerts !'
} as const;

// Détails des vouchers
export const VOUCHER_DETAILS = {
  'cooms_cookie': {
    description: 'Cooms Cookie',
    minOrder: 0
  },
  'smood_goodies': {
    description: 'Smood Goodies',
    minOrder: 0
  },
  'pause_migros': {
    description: 'Pause Migros',
    minOrder: 0
  },
  '5chf': {
    description: '5 CHF de réduction',
    minOrder: 20
  },
  'caviste': {
    description: 'Caviste',
    minOrder: 0
  },
  'fdl': {
    description: 'Frais de livraison offerts',
    minOrder: 40
  },
  '10chf': {
    description: '10 CHF de réduction',
    minOrder: 40
  },
  '100chf': {
    description: '100 CHF de réduction',
    minOrder: 100
  }
} as const;
