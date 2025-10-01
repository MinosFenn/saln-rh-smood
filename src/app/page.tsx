'use client';

import { useState, useEffect } from 'react';
import WheelPopup from '@/components/WheelPopup';

export default function Home() {
  const ACCESS_CODE = process.env.NEXT_PUBLIC_ACCESS_CODE ?? '';
  const [isBlocked, setIsBlocked] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  useEffect(() => {
    // Vérifier si un accès a déjà été accordé
    const accessGranted = localStorage.getItem('home_access_ok');
    if (accessGranted === 'true') {
      setIsBlocked(false);
      setShowCodeInput(false);
    } else {
      setIsBlocked(true);
      setShowCodeInput(true);
    }
  }, []);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ACCESS_CODE && accessCode === ACCESS_CODE) {
      setIsBlocked(false);
      setShowCodeInput(false);
      localStorage.setItem('home_access_ok', 'true');
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
            Accès requis
          </h1>
          <p style={{ color: '#666', marginBottom: '30px' }}>
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
                  textAlign: 'center',
                  color: '#040a8c',           // couleur des points (masque)
                  caretColor: '#040a8c'       // couleur du curseur
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
