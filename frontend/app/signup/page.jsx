'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';
import styles from './signup_styles.module.css';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  async function handleSignup(e) {
    e.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ username, email, password})
      });
       
      if (!response.ok) {
        alert("Impossible de créer le compte. Essayez un autre username.");
        return;
      }

      router.push("/Login");

    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur interne du serveur");
    }
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <UserPlus className={styles.headerIcon} />
          </div>
          <h1 className={styles.title}>Créer un Compte</h1>
          <p className={styles.subtitle}>Rejoignez RetentionAI aujourd'hui</p>
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
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
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

            <button onClick={handleSignup} className={styles.btn}>
              Créer mon compte
            </button>
          </div>

          <div className={styles.footer}>
            <span className={styles.footerText}>Déjà un compte? </span>
            <Link href="/Login" className={styles.footerLink}>
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}