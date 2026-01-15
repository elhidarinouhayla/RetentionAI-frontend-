'use client';
import Link from 'next/link';
import { Users, TrendingUp, Shield, ArrowRight, LogIn, UserPlus, BarChart3, Sparkles } from 'lucide-react';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <TrendingUp className={styles.icon} />
            </div>
            <span className={styles.logoText}>RetentionAI</span>
          </div>
          <div className={styles.navButtons}>
            <Link href="/login" className={styles.navLogin}>
              <LogIn className={styles.iconSmall} />
              Login
            </Link>
            <Link href="/signup" className={styles.navSignup}>
              <UserPlus className={styles.iconSmall} />
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroCenter}>
            <div className={styles.badge}>
              <Sparkles className={styles.badgeIcon} />
              <span className={styles.badgeText}>AI-Powered Employee Retention</span>
            </div>
            
            <h1 className={styles.title}>
              Prédisez et Prévenez le
              <span className={styles.titleGradient}> Turnover</span>
            </h1>
            
            <p className={styles.subtitle}>
              Identifiez les risques de départ en temps réel et générez des plans de rétention personnalisés grâce à l'intelligence artificielle.
            </p>

            <div className={styles.ctaButtons}>
              <Link href="/signup" className={styles.ctaPrimary}>
                Commencer Gratuitement
                <ArrowRight className={styles.iconSmall} />
              </Link>
              <button className={styles.ctaSecondary}>
                Voir la Démo
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className={styles.features}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <BarChart3 className={styles.icon} />
              </div>
              <h3 className={styles.featureTitle}>Analyse Prédictive</h3>
              <p className={styles.featureDesc}>
                Algorithmes ML avancés pour prédire les risques de départ avec précision
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Users className={styles.icon} />
              </div>
              <h3 className={styles.featureTitle}>Plans Personnalisés</h3>
              <p className={styles.featureDesc}>
                Recommandations sur-mesure pour chaque employé à risque
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Shield className={styles.icon} />
              </div>
              <h3 className={styles.featureTitle}>Données Sécurisées</h3>
              <p className={styles.featureDesc}>
                Vos données RH protégées avec les meilleurs standards de sécurité
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}