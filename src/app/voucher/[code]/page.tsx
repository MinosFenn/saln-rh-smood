'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Conditions générales pour chaque code
const VOUCHER_CONDITIONS = {
  'SALON-RH-10CHF': {
    code: 'SALON-RH-10CHF',
    maxUsage: 1,
    reduction: '10 CHF',
    minOrder: '40 CHF',
    validUntil: '31/12/2025 00:00'
  },
  'SALON-RH-5CHF': {
    code: 'SALON-RH-5CHF',
    maxUsage: 1,
    reduction: '5 CHF',
    minOrder: '40 CHF',
    validUntil: '31/12/2025 00:00'
  },
  'SALON-RH-FDL': {
    code: 'SALON-RH-FDL',
    maxUsage: 1,
    reduction: 'Frais de livraison offerts',
    minOrder: '40 CHF',
    validUntil: '31/12/2025 00:00'
  },
  'SALON-RH-100CHF': {
    code: 'SALON-RH-100CHF',
    maxUsage: 1,
    reduction: '100 CHF',
    minOrder: '100 CHF',
    validUntil: '31/12/2025 00:00'
  },
  'SALON-RH-100CHF-WIN': {
    code: 'SALON-RH-100CHF-WIN',
    maxUsage: 1,
    reduction: '100 CHF',
    minOrder: '100 CHF',
    validUntil: '31/12/2025 00:00'
  }
};

export default function VoucherPage() {
  const params = useParams();
  const code = params.code as string;
  const cardRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Marquer que l'utilisateur a visité une page voucher
    sessionStorage.setItem('hasVisitedVoucher', 'true');
  }, []);

  // Récupérer les conditions pour le code actuel
  const conditions = VOUCHER_CONDITIONS[code as keyof typeof VOUCHER_CONDITIONS];

  // Fonction utilitaire: attendre le chargement du logo si nécessaire
  const waitForImage = async (img?: HTMLImageElement | null): Promise<void> => {
    if (!img) return;
    if (img.complete) return;
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
  };

  // Fonction pour télécharger la carte en PDF
  const downloadCardAsPDF = async () => {
    if (!cardRef.current || !conditions) return;

    try {
      // Attendre que l'élément soit complètement rendu
      await new Promise(resolve => setTimeout(resolve, 50));
      await waitForImage(logoRef.current);
      await new Promise((r) => requestAnimationFrame(() => r(undefined)));

      // Utiliser la taille réelle du noeud pour éviter les marges inutiles
      const { width: nodeWidth, height: nodeHeight } = cardRef.current.getBoundingClientRect();

      // Capturer l'élément sans forcer width/height pour respecter le layout réel
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Obtenir les dimensions réelles visibles de la carte (après croissance)
      const { width: nodeWidth2, height: nodeHeight2 } = cardRef.current.getBoundingClientRect();
      const canvasWidth = Math.round(nodeWidth2 || canvas.width);
      const canvasHeight = Math.round(nodeHeight2 || canvas.height);
      
      // Si html2canvas rend un canvas plus grand (DPR), normaliser sur les dimensions CSS
      const renderWidthPx = Math.round(nodeWidth || canvasWidth);
      const renderHeightPx = Math.round(nodeHeight || canvasHeight);

      // Convertir en mm (1px = 0.264583mm)
      const widthInMm = renderWidthPx * 0.264583;
      const heightInMm = renderHeightPx * 0.264583;
      
      // Créer un PDF avec les dimensions exactes
      const pdf = new jsPDF({
        orientation: widthInMm > heightInMm ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [widthInMm, heightInMm]
      });
      
      // Ajouter l'image aux dimensions exactes
      pdf.addImage(imgData, 'PNG', 0, 0, widthInMm, heightInMm, undefined, 'FAST');
      
      // Télécharger le PDF
      pdf.save(`voucher-${code}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    }
  };
  

  return (
    <div className="voucher-page">
      <div className="voucher-container">
        {/* Stamp Swiss-Made en haut à droite */}
        <div className="swiss-stamp">
          <Image
            src="/Stamp_Swiss-Made_Fair-Work_A.png"
            alt="Swiss Made Fair Work"
            width={80}
            height={80}
          />
        </div>

        <div className="voucher-header">
          <h1>Félicitations !</h1>
          <h2>Vous avez gagné un bon</h2>
        </div>

        

          {/* Carte de voucher pour téléchargement */}
          {conditions && (
            <div className="wallet-card-container">
              <div className="wallet-card" ref={cardRef}>
                {/* Section du haut - Logo Smood */}
                <div className="wallet-card-top">
                  <div className="wallet-card-logo-horizontal">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      ref={logoRef}
                      src="/RGB-Logos-Smood-business-large-blue.png"
                      alt="Smood Business"
                      crossOrigin="anonymous"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                </div>
                
                {/* Section centrale - Contenu principal */}
                <div className="wallet-card-center">
                  <div className="wallet-card-main-content">
                    <div className="wallet-card-subtitle">VOUS AVEZ GAGNÉ</div>
                    <div className="wallet-card-title">{conditions.reduction}</div>
                    <div className="wallet-card-divider"></div>
                    <div className="wallet-card-code-section">
                      <div className="wallet-card-code-label">CODE</div>
                      <div className="wallet-card-code">{code}</div>
                    </div>
                    <div className="wallet-card-divider"></div>
                    <div className="wallet-card-details">
                      <div className="wallet-card-detail">
                        <span>                Utilisation maximale par client : {conditions.maxUsage}. Montant de réduction : {conditions.reduction}. Panier minimum : {conditions.minOrder}. Utilisable jusqu&apos;au : {conditions.validUntil}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              
              <button 
                className="download-card-btn"
                onClick={downloadCardAsPDF}
              >
                📱 Télécharger PDF
              </button>
            </div>
          )}

          {/* Conditions générales */}

          <div className="download-section">
              <h3>Téléchargez l&apos;application :</h3>
            <div className="download-buttons">
              <a 
                href="https://apps.apple.com/ch/app/smood-lappli-de-livraison/id1227720412?l=fr-FR" 
                target="_blank" 
                rel="noopener noreferrer"
                className="download-btn app-store"
              >
                <Image
                  src="/apple.png"
                  alt="Télécharger sur l'App Store"
                  width={200}
                  height={60}
                />
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.jamtech.marabel.smood&hl=fr_CH" 
                target="_blank" 
                rel="noopener noreferrer"
                className="download-btn google-play"
              >
                <Image
                  src="/android.png"
                  alt="Disponible sur Google Play"
                  width={200}
                  height={60}
                />
              </a>
            </div>
          </div>

          <div className="instructions">
            <h3>Comment utiliser votre code :</h3>
            <ol>
              <li>1. Téléchargez l&apos;application Smood</li>
              <li>2.Créez votre compte ou connectez-vous</li>
              <li>3.Entrez le code lors du paiement</li>
            </ol>
          </div>

          {/* Logo Smood en bas */}
          <div className="smood-logo">
            <Image
              src="/RGB-Logos-Smood-business-large-blue.png"
              alt="Smood Logo"
              width={200}
              height={60}
            />
          </div>
        </div>


      <style jsx>{`
        .voucher-page {
          min-height: 100vh;
          background: #d7d9fe;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Arial', sans-serif;
        }

        .voucher-container {
          background: white;
          border-radius: 20px;
          padding: 40px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          text-align: center;
          position: relative;
        }

        .voucher-header h1 {
          color: #040a8c;
          font-size: 2.5em;
          margin: 0 0 10px 0;
        }

        .voucher-header h2 {
          color: #333;
          font-size: 1.5em;
          margin: 0 0 30px 0;
        }

        .voucher-content {
          text-align: center;
        }

        .code-section {
         margin: 14px 0;
          padding: 20px;
        background: #040a8c;
        color: #FFFFFF;
                  border-radius: 12px;
                  font-size: 1.5em;
                  font-weight: bold;
                  letter-spacing: 2px;
        }

        .download-section, .instructions {
          margin: 16px 0;
          padding: 20px;
          border: 2px solid #f0f0f0;
          border-radius: 12px;
          background: #fafafa;
        }

        .conditions-section {
          text-align: center;
          margin: 14px 0;
          padding: 0;
        }

        .conditions-text {
          color: #666;
          font-size: 0.75em;
          line-height: 1.4;
          margin: 0;
          font-style: italic;
        }

        /* Wallet Card Styles - Design sobre et professionnel */
        .wallet-card-container {
          margin: 20px 0;
          text-align: center;
        }

        .wallet-card {
          width: 100%;
          max-width: 580px;
          height: auto;
          min-height: 400px;
          background: linear-gradient(135deg, #040a8c 0%, #1a237e 100%);
          border: 2px solid #040a8c;
          margin: 0 auto 20px;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* Section du haut - Logo Smood */
        .wallet-card-top {
          height: 64px;
          background: #f8f9fa;
          border-bottom: 2px dashed #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 14px;
        }

        .wallet-card-logo-horizontal {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          width: 100%;
        }
        
        .wallet-card-logo-horizontal img {
          max-height: 48px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        /* Section centrale - Contenu principal */
        .wallet-card-center {
          flex: 1;
          padding: 30px 35px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }

        .wallet-card-main-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 16px;
        }


        .wallet-card-subtitle {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .wallet-card-title {
          font-size: 52px;
          font-weight: 300;
          color: #ffffff;
          margin-bottom: 0;
          letter-spacing: 2px;
        }

        .wallet-card-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.3);
          margin: 0;
        }

        .wallet-card-code-section {
          margin: 0;
        }

        .wallet-card-code-label {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          letter-spacing: 1px;
          margin-bottom: 5px;
          text-transform: uppercase;
        }

        .wallet-card-code {
          font-size: 28px;
          font-weight: bold;
          color: #ffffff;
          letter-spacing: 3px;
        }

        .wallet-card-details {
          margin-top: 0;
          text-align: center;
        }

        .wallet-card-detail {
          font-size: 14px;
          color: rgba(255,255,255,0.8);
          margin-bottom: 12px;
          line-height: 1.6;
        }


        .download-card-btn {
          background: #040a8c;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 1em;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(4, 10, 140, 0.3);
        }

        .download-card-btn:hover {
          background: #1a237e;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(4, 10, 140, 0.4);
        }

        .download-section {
          margin: 0px 0;
          padding: 15px;
        }

        .code-section h3, .download-section h3, .instructions h3 {
          color: #040a8c;
          margin: 0 0 15px 0;
          font-size: 1.2em;
        }

        .download-section h3 {
          margin: 0 0 10px 0;
        }

        .code-display {
          background: #040a8c;
          color: #FFFFFF;
          padding: 15px;
          border-radius: 12px;
          font-family: 'Courier New', monospace;
          font-size: 1.5em;
          font-weight: bold;
          letter-spacing: 2px;
        }


        .download-buttons {
          display: flex;
          gap: 010px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        .download-btn {
          transition: transform 0.2s;
          border-radius: 20px;
          overflow: hidden;
        }

        .download-btn:hover {
          transform: scale(1.05);
        }

        .instructions ol {
          color: #555;
          line-height: 1.6;
          text-align: center;
          max-width: 500px;
          margin: 0 auto;
          list-style-position: inside;
        }

        .instructions li {
          margin: 8px 0;
        }

        /* Stamp Swiss-Made en bas à droite */
        .swiss-stamp {
          position: absolute;
          bottom: -20px;
          right: -20px;
          z-index: 10;
        }

        /* Logo Smood en bas */
        .smood-logo {
          margin-top: 30px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .voucher-footer {
          margin-top: 30px;
          text-align: center;
        }




        @media (max-width: 600px) {
          .voucher-container {
            padding: 10px;
          }
          
          .download-buttons {
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }

          .conditions-text {
            font-size: 0.75em;
            line-height: 1.3;
          }

          .conditions-section {
            margin: 10px 0;
          }

          .wallet-card-container {
            margin: 10px 0;
          }

          .wallet-card {
            margin: 0 auto 10px;
          }

          .wallet-card-center {
            padding: 20px;
          }

          .wallet-card-subtitle {
            font-size: 10px;
          }

          .wallet-card-title {
            font-size: 24px;
          }

          .wallet-card-code {
            font-size: 18px;
            letter-spacing: 2px;
          }

          .wallet-card-detail {
            font-size: 11px;
            margin-bottom: 6px;
          }

          .download-card-btn {
            padding: 8px 16px;
            font-size: 0.9em;
          }
        }
      `}</style>
    </div>
  );
}
