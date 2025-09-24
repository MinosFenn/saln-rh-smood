'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function VoucherPDFPage() {
  const params = useParams();
  const code = params.code as string;
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generatePDF = async () => {
      if (!pdfRef.current) return;

      try {
        // Import dynamique des librairies
        const html2canvas = (await import('html2canvas')).default;
        const jsPDF = (await import('jspdf')).default;

        // Générer le canvas à partir du HTML
        const canvas = await html2canvas(pdfRef.current, {
          useCORS: true,
          allowTaint: true,
          background: '#ffffff',
          width: 800,
          height: 1000
        });

        // Créer le PDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        // Calculer les dimensions pour centrer l'image
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        let heightLeft = imgHeight;
        let position = 0;

        // Ajouter l'image au PDF
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Ajouter des pages supplémentaires si nécessaire
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Télécharger le PDF
        pdf.save(`voucher-${code}.pdf`);
        
        // Rediriger vers la page principale après téléchargement
        setTimeout(() => {
          window.location.href = `/voucher/${code}`;
        }, 1000);

      } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error);
        // Rediriger vers la page principale en cas d'erreur
        window.location.href = `/voucher/${code}`;
      }
    };

    // Générer le PDF automatiquement au chargement
    generatePDF();
  }, [code]);

  return (
    <div style={{ display: 'none' }}>
      {/* Contenu caché pour la génération du PDF */}
      <div ref={pdfRef} className="voucher-pdf-content">
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
                  <div className="download-btn app-store">
                    <div className="app-store-badge">App Store</div>
                  </div>
                  <div className="download-btn google-play">
                    <div className="google-play-badge">Google Play</div>
                  </div>
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
              <div className="qr-info">
                <p>Scannez le QR code pour télécharger l'application</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .voucher-pdf-content {
          width: 800px;
          margin: 0 auto;
          background: white;
        }

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
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: bold;
          color: white;
          min-width: 120px;
        }

        .app-store-badge {
          background: #000000;
        }

        .google-play-badge {
          background: #00A854;
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

        .qr-info {
          color: #666;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
