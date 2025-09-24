'use client';

import { useState, useEffect } from 'react';
import WheelPopup from '@/components/WheelPopup';

export default function Home() {
  const [isBlocked, setIsBlocked] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a visité une page voucher
    const hasVisitedVoucher = sessionStorage.getItem('hasVisitedVoucher');
    if (hasVisitedVoucher) {
      setIsBlocked(true);
      setShowCodeInput(true);
    }
  }, []);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === '20122025') {
      setIsBlocked(false);
      setShowCodeInput(false);
      sessionStorage.removeItem('hasVisitedVoucher');
    } else {
      alert('Code incorrect. Veuillez réessayer.');
    }
  };

  if (isBlocked) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #040a8c 0%, #02085a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        color: 'white'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '90%'
        }}>
          <h1 style={{ color: '#040a8c', marginBottom: '20px' }}>
            Accès Restreint
          </h1>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            Vous avez déjà utilisé la roue de la fortune. 
            Veuillez entrer le code d&apos;accès pour continuer.
          </p>
          
          {showCodeInput && (
            <form onSubmit={handleCodeSubmit}>
              <input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Code d&apos;accès"
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '20px',
                  border: '2px solid #040a8c',
                  borderRadius: '10px',
                  fontSize: '16px',
                  textAlign: 'center'
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#040a8c',
                  color: 'white',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Débloquer
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return <WheelPopup />;
}
