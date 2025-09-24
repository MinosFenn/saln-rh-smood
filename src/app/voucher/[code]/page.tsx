'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

export default function VoucherPage() {
  const params = useParams();
  const code = params.code as string;

  useEffect(() => {
    // Marquer que l'utilisateur a visité une page voucher
    sessionStorage.setItem('hasVisitedVoucher', 'true');
  }, []);

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

          <div className="code-section">
              <span className="code-text">{code}</span>
            </div>
          

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
         margin: 30px 0;
          padding: 20px;
        background: #040a8c;
        color: #FFFFFF;
                  border-radius: 12px;
                  font-size: 1.5em;
                  font-weight: bold;
                  letter-spacing: 2px;
        }

        .download-section, .instructions {
          margin: 30px 0;
          padding: 20px;
          border: 2px solid #f0f0f0;
          border-radius: 12px;
          background: #fafafa;
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
            padding: 20px;
          }
          
          .download-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
