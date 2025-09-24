'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { 
  getCurrentTurnState, 
  incrementTurn, 
  saveTurnState,
  lotToVoucherType, 
  getAngleForZone,
  testZoneAngles,
  wheelConfig,
  victoryMessages,
  getLotForTurn,
  getZoneForTurn,
  getCodeForTurn
} from '@/utils/turnLogic';
import { LotType } from '@/config/lotMapping';
// Import VOUCHER_DETAILS supprimé - plus nécessaire avec les codes du CSV
// Import WheelZone supprimé - plus nécessaire avec le système CSV
import '@/styles/wheel.css';

export default function WheelPopup() {
  const [hasSpun, setHasSpun] = useState(false);
  const [currentVoucherCode, setCurrentVoucherCode] = useState('');
  const [currentLot, setCurrentLot] = useState<string | null>(null);
  const [turnState, setTurnState] = useState({ currentTurn: 1, totalPlays: 0, lastPlayDate: '' });
  const [showVictory, setShowVictory] = useState(false);
  const [arrowClickCount, setArrowClickCount] = useState(0);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  
  const wheelRef = useRef<HTMLImageElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  // Initialisation au montage du composant
  useEffect(() => {
    const state = getCurrentTurnState();
    setTurnState(state);
    
    // Test des angles des zones (pour debug)
    testZoneAngles();
  }, []);

  // Fonction supprimée - plus nécessaire avec le système CSV

  const handlePlay = async () => {
    if (hasSpun) return;
    
    setHasSpun(true);
    if (displayRef.current) {
      displayRef.current.innerHTML = '<div style="font-size:3em;">🥁</div>';
    }

    try {
      // Récupérer le lot, la zone et le code pour le tour actuel
      const lot = await getLotForTurn(turnState.currentTurn);
      const zone = await getZoneForTurn(turnState.currentTurn);
      const code = await getCodeForTurn(turnState.currentTurn);
      
      if (!lot || !zone) {
        throw new Error('Aucun lot ou zone trouvé pour ce tour');
      }

      setCurrentLot(lot);
      
      // Code seulement pour les bons cadeaux
      const finalCode = (lot === 'Bon cadeau 5 CHF' || lot === 'Bon cadeau FDL' || lot === 'Bon cadeau 10 CHF' || lot === '100chf') ? (code || `DEMO-${lot.replace(/\s+/g, '-').toUpperCase()}-${turnState.currentTurn.toString().padStart(3, '0')}`) : '';
      setCurrentVoucherCode(finalCode);

      // Générer le QR code si c'est un Bon cadeau
      if ((lot === 'Bon cadeau 5 CHF' || lot === 'Bon cadeau FDL' || lot === 'Bon cadeau 10 CHF' || lot === '100chf') && finalCode) {
        try {
          // URL de l'API PDF avec le code
          const pdfApiUrl = `${window.location.origin}/api/voucher/${finalCode}.pdf`;
          const qrDataUrl = await QRCode.toDataURL(pdfApiUrl, {
            width: 150,
            margin: 2,
            color: {
              dark: '#D83966',
              light: '#FFFFFF'
            }
          });
          setQrCodeDataUrl(qrDataUrl);
        } catch (error) {
          console.error('Erreur lors de la génération du QR code:', error);
        }
      } else {
        setQrCodeDataUrl('');
      }

      // Passer au tour suivant
      const newTurnData = incrementTurn();
      setTurnState(newTurnData);

      // Sauvegarde gérée par le système de tours

      // Envoi Braze (simulé)
      console.log('Lot gagné:', lot, 'Zone:', zone, 'Code:', finalCode);

      // Animation roue avec la zone précise du CSV
      if (wheelRef.current) {
        const spins = 5; // Entre 5 et 8 tours
        const targetAngle = getAngleForZone(zone); // Angle précis de la zone
        const totalRotation = spins * 360 + targetAngle;
        
        console.log(`Zone ${zone} -> Angle cible: ${targetAngle}° -> Rotation totale: ${totalRotation}°`);
        
        wheelRef.current.style.transition = 'all 3s ease-out';
        wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
      }
    } catch (error) {
      console.error('Erreur lors du tirage:', error);
      setCurrentLot('Pause Migros'); // Lot par défaut
      setCurrentVoucherCode('');
    }
  };

  const handleWheelTransitionEnd = () => {
    setShowVictory(true);
    if (displayRef.current && currentLot) {
      const voucherType = lotToVoucherType(currentLot as LotType);
      const message = victoryMessages[voucherType] || currentLot;
      displayRef.current.innerHTML = message;
    }
  };

  const handleContinue = () => {
    // Réinitialiser pour un nouveau tour
    setHasSpun(false);
    setShowVictory(false);
    setCurrentLot(null);
    setCurrentVoucherCode('');
    setQrCodeDataUrl('');
    
    // Remettre la roue à sa position initiale
    if (wheelRef.current) {
      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = 'rotate(0deg)';
      // Forcer un reflow pour que la transition se remette à zéro
      void wheelRef.current.offsetHeight;
    }
  };

  const handleArrowClick = () => {
    const newCount = arrowClickCount + 1;
    setArrowClickCount(newCount);
    
    if (newCount >= 10) {
      // Reset complet de la roue
      setHasSpun(false);
      setShowVictory(false);
    setCurrentLot(null);
    setCurrentVoucherCode('');
    setQrCodeDataUrl('');
    setTurnState({ currentTurn: 1, totalPlays: 0, lastPlayDate: '' });
    setArrowClickCount(0);
      
      // Remettre la roue à sa position initiale
      if (wheelRef.current) {
        wheelRef.current.style.transition = 'none';
        wheelRef.current.style.transform = 'rotate(0deg)';
        // Forcer un reflow pour que la transition se remette à zéro
        void wheelRef.current.offsetHeight;
      }
      
      // Reset des données
      saveTurnState({ currentTurn: 1, totalPlays: 0, lastPlayDate: new Date().toISOString().slice(0, 10) });
      
      // Afficher un message de confirmation
      if (displayRef.current) {
        displayRef.current.innerHTML = '🎉 ROUE RÉINITIALISÉE ! 🎉';
        setTimeout(() => {
          if (displayRef.current) {
            displayRef.current.innerHTML = '';
          }
        }, 2000);
      }
    } else {
      // Afficher le compteur de clics
      if (displayRef.current) {
        displayRef.current.innerHTML = `Clics sur la flèche: ${newCount}/10`;
        setTimeout(() => {
          if (displayRef.current && !showVictory) {
            displayRef.current.innerHTML = '';
          }
        }, 1000);
      }
    }
  };

  // Fonctions de détails de vouchers supprimées - les codes viennent du CSV

  return (
    <div className="full-page-wheel">

      {/* Compteurs en position fixe */}
      <div className="counters">
        <div className="counter">
          <span className="counter-label">Tour actuel:</span>
          <span className="counter-value">{turnState.currentTurn}</span>
        </div>
        <div className="counter">
          <span className="counter-label">Tours joués:</span>
          <span className="counter-value">{turnState.totalPlays}</span>
        </div>
      </div>

      {/* Zone principale - Layout en deux colonnes */}
      <div className="wheel-main-content">
        {/* Titre au-dessus des colonnes */}
        <div className="wheel-header">
          <h1 className="wheel-title">ROUE SMOOD</h1>
        </div>

        {/* Container des colonnes */}
        <div className="wheel-columns-container">
          {/* Colonne gauche - Roue */}
          <div className="wheel-column">
            <div className="wheel-container">
              <Image
                src={wheelConfig.images.wheel}
                alt="Wheel of Fortune"
                width={500}
                height={500}
                className={`wheel ${hasSpun ? 'spinning' : ''}`}
                ref={wheelRef}
                onTransitionEnd={handleWheelTransitionEnd}
                priority
              />
              <Image
                src={wheelConfig.images.marker}
                alt="Marker"
                width={60}
                height={60}
                className="marker clickable-arrow"
                onClick={handleArrowClick}
                priority
              />
            </div>
          </div>

          {/* Colonne droite - Messages et Boutons */}
          <div className="message-column">
            {/* Bouton de jeu */}
            {!hasSpun && (
              <button className="button-play" onClick={handlePlay}>
                JE TENTE MA CHANCE !
              </button>
            )}
            
            {/* Zone de victoire */}
            <div className={`victory-zone ${showVictory ? 'active' : ''}`}>
              <div className="display" ref={displayRef}></div>
              
              {/* QR Code centré sous la mention du lot */}
              {showVictory && qrCodeDataUrl && (
                <>
                  <Image src={qrCodeDataUrl} alt="QR Code" className="qr-code" width={120} height={120} />
                  <p className="qr-description">Scannez pour télécharger votre bon cadeau</p>
                </>
              )}
              
              {currentVoucherCode && (
                <div className="voucher-code">
                  <p className="voucher-text">Code: {currentVoucherCode}</p>
                </div>
              )}
            </div>
            
            {/* Bouton pour tourner une autre roue */}
            {showVictory && (
              <div className="victory-buttons">
                <button 
                  className="button-close show"
                  onClick={handleContinue}
                >
                  TOURNER UNE AUTRE ROUE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
