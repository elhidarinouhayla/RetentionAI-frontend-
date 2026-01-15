'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import styles from './login_styles.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        alert("Username ou Password incorrect");
        return;
      }

      const data = await response.json();
      
      // Stocker le token côté client
      if (typeof window !== 'undefined') {
        localStorage.setItem("token", data.token);
      }
      
      router.push("/retention");

    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur interne");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <LogIn className={styles.headerIcon} />
          </div>
          <h1 className={styles.title}>Bon Retour!</h1>
          <p className={styles.subtitle}>Connectez-vous à votre compte</p>
        </div>

        <div className={styles.card}>
          <div className={styles.formWrapper}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nom d'utilisateur</label>
              <input
                className={styles.input}
                type="text"
                placeholder="johndoe"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Mot de passe</label>
              <input
                className={styles.input}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button onClick={handleLogin} className={styles.btn}>
              Se connecter
            </button>
          </div>

          <div className={styles.footer}>
            <span className={styles.footerText}>Pas encore de compte? </span>
            <Link href="/signup" className={styles.footerLink}>
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}