'use client';
import { useState } from 'react';
import styles from './login_styles.module.css';
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  

  async function handleLogin(e) {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ 
                          username,
                          password 
                          })
      });

      if (!response.ok) {
        alert("Username ou Password incorrect");
        return;

      }

      const data = await response.json();

      router.push("/retention")
      localStorage.setItem("token", data.token);

      

    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur interne");
    }
  }

  return (
    <div className={styles.container}>
  <div className={styles.card}>
    <h1 className={styles.title}>Login</h1>

    <form onSubmit={handleLogin} className={styles.form}>
        
      <input
        className={styles.input}
        type="text"
        placeholder="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        className={styles.input}
        type="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit" className={styles.btn}>
        Login
      </button>

    </form>
  </div>
</div>
  );
}
