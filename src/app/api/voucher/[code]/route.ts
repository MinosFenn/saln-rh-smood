import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    // Validation du code
    if (!code || code.trim() === '') {
      return NextResponse.json(
        { error: 'Code de voucher manquant' },
        { status: 400 }
      );
    }

    // Nettoyer le code (enlever l'extension .pdf si présente)
    const cleanCode = code.replace(/\.pdf$/, '');

    // Créer le document PDF
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      info: {
        Title: `Bon cadeau - ${cleanCode}`,
        Author: 'Smood',
        Subject: 'Bon cadeau Smood',
        Creator: 'Roue de la Fortune Smood'
      }
    });

    // Buffer pour stocker le PDF
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    
    const pdfPromise = new Promise<Buffer>((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
    });

    // Couleurs de la marque
    const brandColor = '#040a8c';
    const secondaryColor = '#D83966';

    // Titre principal
    doc.fontSize(32)
       .fillColor(brandColor)
       .text('🎉 Bon cadeau', 0, 50, { align: 'center' });

    // Sous-titre
    doc.fontSize(18)
       .fillColor('#333')
       .text('Félicitations ! Voici votre bon cadeau.', 0, 100, { align: 'center' });

    // Code du voucher en gros
    doc.fontSize(24)
       .fillColor(secondaryColor)
       .font('Helvetica-Bold')
       .text(cleanCode, 0, 150, { align: 'center' });

    // Section téléchargement de l'application
    doc.fontSize(16)
       .fillColor('#333')
       .font('Helvetica')
       .text('Téléchargez l\'application :', 0, 250, { align: 'center' });

    // Espace pour les images des stores
    const imageY = 300;
    const imageSize = 80;
    const pageWidth = doc.page.width;
    const imageSpacing = 100;

    // Position des images (centrées)
    const leftImageX = (pageWidth - (imageSize * 2 + imageSpacing)) / 2;
    const rightImageX = leftImageX + imageSize + imageSpacing;

    try {
      // Image App Store
      const appleImagePath = path.join(process.cwd(), 'public', 'apple.png');
      if (fs.existsSync(appleImagePath)) {
        doc.image(appleImagePath, leftImageX, imageY, { width: imageSize, height: imageSize });
      } else {
        // Fallback si l'image n'existe pas
        doc.rect(leftImageX, imageY, imageSize, imageSize)
           .fillColor('#000')
           .fill();
        doc.fontSize(12)
           .fillColor('#fff')
           .text('App Store', leftImageX + 10, imageY + 30, { width: imageSize - 20, align: 'center' });
      }

      // Image Google Play
      const androidImagePath = path.join(process.cwd(), 'public', 'android.png');
      if (fs.existsSync(androidImagePath)) {
        doc.image(androidImagePath, rightImageX, imageY, { width: imageSize, height: imageSize });
      } else {
        // Fallback si l'image n'existe pas
        doc.rect(rightImageX, imageY, imageSize, imageSize)
           .fillColor('#00A854')
           .fill();
        doc.fontSize(12)
           .fillColor('#fff')
           .text('Google Play', rightImageX + 10, imageY + 30, { width: imageSize - 20, align: 'center' });
      }
    } catch (imageError) {
      console.warn('Erreur lors du chargement des images:', imageError);
      // Continuer sans les images
    }

    // Instructions d'utilisation
    doc.fontSize(14)
       .fillColor('#666')
       .text('Comment utiliser votre code :', 0, 450, { align: 'center' });

    const instructions = [
      '1. Téléchargez l\'application Smood',
      '2. Créez votre compte ou connectez-vous',
      '3. Allez dans "Mes codes" ou "Vouchers"',
      `4. Entrez le code : ${cleanCode}`,
      '5. Profitez de votre bon cadeau !'
    ];

    let instructionY = 480;
    instructions.forEach((instruction) => {
      doc.fontSize(12)
         .fillColor('#555')
         .text(instruction, 0, instructionY, { align: 'center' });
      instructionY += 20;
    });

    // Footer
    doc.fontSize(10)
       .fillColor('#999')
       .text('Merci de jouer avec Smood !', 0, doc.page.height - 50, { align: 'center' });

    // Finaliser le PDF
    doc.end();

    // Attendre que le PDF soit généré
    const pdfBuffer = await pdfPromise;

    // Retourner le PDF
    return new NextResponse(pdfBuffer as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${cleanCode}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération du PDF' },
      { status: 500 }
    );
  }
}
