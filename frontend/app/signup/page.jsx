'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import styles from './signup_styles.module.css'; 
 

export default function SignupPge() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    async function handledSignup(e) {
        e.preventDefault();
        console.log('clicked')
        console.log(username,password,email)
        try {
            const response = await fetch('http://127.0.0.1:8001/register', {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ username, email, password})
            });
             
            if (!response.ok) {
                alert("Impossible de créer le compte. Essayez un autre username.");
        return;
            }

            router.push("/Login")

            console.log(username);

        } catch (error) {
          console.error("Erreur:", error);
          alert("Erreur interne du serveur");
        }
    }
    function handleClick() {
        router.push("/Login")
    }
    
    return(
        <div className={styles.container}>
            
            <div className={styles.card}>
            
                <h1 className={styles.title}>Create Account</h1>

                <form onSubmit={handledSignup} className={styles.form}>

                    <input
                        className={styles.input}
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <input
                        className={styles.input}
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        className={styles.input}
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button type="submit" className={styles.btn}>
                        Sign Up
                    </button>

                </form>
            </div>

        </div>
    );
}


