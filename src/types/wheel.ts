export interface VoucherDetails {
  [key: string]: {
    description: string;
    minOrder: number;
  };
}

// Interface BrazePayload supprimée - plus nécessaire avec le système CSV
