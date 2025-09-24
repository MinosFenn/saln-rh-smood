'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function VoucherPage() {
  const params = useParams();
  const code = params.code as string;

  return (
    <div className="voucher-page">
      <div className="voucher-container">
        <div className="voucher-header">
          <h1>🎉 Félicitations !</h1>
          <h2>Vous avez gagné un Bon Cadeau</h2>
        </div>

        <div className="voucher-content">
          <div className="code-section">
            <h3>Votre code de voucher :</h3>
            <div className="code-display">
              <span className="code-text">{code}</span>
            </div>
          </div>

          <div className="download-section">
            <h3>Téléchargez l'application :</h3>
            <div className="download-buttons">
              <a 
                href="https://apps.apple.com/app/smood/id123456789" 
                target="_blank" 
                rel="noopener noreferrer"
                className="download-btn app-store"
              >
                <Image
                  src="/app-store-badge.png"
                  alt="Télécharger sur l'App Store"
                  width={120}
                  height={40}
                />
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.smood.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="download-btn google-play"
              >
                <Image
                  src="/google-play-badge.png"
                  alt="Disponible sur Google Play"
                  width={120}
                  height={40}
                />
              </a>
            </div>
          </div>

          <div className="instructions">
            <h3>Comment utiliser votre code :</h3>
            <ol>
              <li>Téléchargez l'application Smood</li>
              <li>Créez votre compte ou connectez-vous</li>
              <li>Allez dans "Mes codes" ou "Vouchers"</li>
              <li>Entrez le code : <strong>{code}</strong></li>
              <li>Profitez de votre bon cadeau !</li>
            </ol>
          </div>
        </div>

        <div className="voucher-footer">
          <button 
            onClick={() => window.close()} 
            className="close-btn"
          >
            Fermer
          </button>
        </div>
      </div>

      <style jsx>{`
        .voucher-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #D83966 0%, #B02A4A 100%);
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
        }

        .voucher-header h1 {
          color: #D83966;
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

        .code-section, .download-section, .instructions {
          margin: 30px 0;
          padding: 20px;
          border: 2px solid #f0f0f0;
          border-radius: 15px;
          background: #fafafa;
        }

        .code-section h3, .download-section h3, .instructions h3 {
          color: #333;
          margin: 0 0 15px 0;
          font-size: 1.2em;
        }

        .code-display {
          background: #D83966;
          color: #FFFFFF;
          padding: 15px;
          border-radius: 10px;
          font-family: 'Courier New', monospace;
          font-size: 1.5em;
          font-weight: bold;
          letter-spacing: 2px;
        }


        .download-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .download-btn {
          transition: transform 0.2s;
        }

        .download-btn:hover {
          transform: scale(1.05);
        }

        .instructions ol {
          color: #555;
          line-height: 1.6;
          text-align: left;
          max-width: 400px;
          margin: 0 auto;
        }

        .instructions li {
          margin: 8px 0;
        }

        .voucher-footer {
          margin-top: 30px;
          text-align: center;
        }

        .close-btn {
          background: #D83966;
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 25px;
          font-size: 1.1em;
          cursor: pointer;
          transition: background 0.2s;
        }

        .close-btn:hover {
          background: #B02A4A;
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
