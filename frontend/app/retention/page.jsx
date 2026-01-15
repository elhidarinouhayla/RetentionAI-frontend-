'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Users, TrendingUp, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import styles from './retention_styles.module.css';

export default function RetentionPage() {
  const [employee, setEmployee] = useState({
    Gender: "Male",
    Age: "30",
    Department: "Sales",
    JobRole: "Sales Executive",
    MonthlyIncome: "5000",
    YearsAtCompany: "5",
    JobSatisfaction: "3",
    WorkLifeBalance: "3",
    OverTime: "No",
    BusinessTravel: "Travel_Rarely",
    Education: "3",
    EducationField: "Life Sciences",
    EnvironmentSatisfaction: "3",
    JobInvolvement: "3",
    JobLevel: "2",
    MaritalStatus: "Single",
    PercentSalaryHike: "11",
    PerformanceRating: "3",
    RelationshipSatisfaction: "3",
    StockOptionLevel: "0",
    TotalWorkingYears: "8",
    YearsInCurrentRole: "4",
    YearsWithCurrManager: "3"
  });

  const [token, setToken] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [retentionPlan, setRetentionPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        router.push('/login');
      } else {
        setToken(storedToken);
      }
    }
  }, [router]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    try {
      const numericFields = [
        "Age", "MonthlyIncome", "YearsAtCompany", "JobSatisfaction", "WorkLifeBalance",
        "Education", "EnvironmentSatisfaction", "JobInvolvement", "JobLevel",
        "PercentSalaryHike", "PerformanceRating", "RelationshipSatisfaction",
        "StockOptionLevel", "TotalWorkingYears", "YearsInCurrentRole", "YearsWithCurrManager"
      ];

      const payload = { ...employee };
      numericFields.forEach(field => {
        payload[field] = parseInt(payload[field], 10) || 0;
      });

      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        alert("ERREUR DU SERVEUR :\n" + JSON.stringify(data.detail, null, 2));
        return;
      }

      setPrediction(data.churn_probability);
    } catch (err) {
      alert("Erreur de connexion : " + err.message);
    }
  };

  const handleGenerateRetentionPlan = async () => {
    setLoading(true);
    setRetentionPlan(null);
    
    try {
      const numericFields = [
        "Age", "MonthlyIncome", "YearsAtCompany", "JobSatisfaction", "WorkLifeBalance",
        "Education", "EnvironmentSatisfaction", "JobInvolvement", "JobLevel",
        "PercentSalaryHike", "PerformanceRating", "RelationshipSatisfaction",
        "StockOptionLevel", "TotalWorkingYears", "YearsInCurrentRole", "YearsWithCurrManager"
      ];

      const payload = { ...employee };
      numericFields.forEach(field => {
        payload[field] = parseInt(payload[field], 10) || 0;
      });

      const response = await fetch('http://127.0.0.1:8000/generate_retention_plan', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        alert("ERREUR DU SERVEUR :\n" + JSON.stringify(data.detail, null, 2));
        return;
      }

      setRetentionPlan(data.retention_plan);
    } catch (err) {
      alert("Erreur de connexion : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    router.push('/');
  };

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
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Déconnexion
          </button>
        </div>
      </nav>

      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Analyse de Rétention</h1>
          <p className={styles.subtitle}>Évaluez le risque de départ et générez un plan d'action</p>
        </div>

        <div className={styles.grid}>
          {/* Formulaire */}
          <div className={styles.formCard}>
            <h2 className={styles.cardTitle}>
              <Users className={styles.titleIcon} />
              Informations Employé
            </h2>
            <div className={styles.formGrid}>
              {Object.keys(employee).map((key) => (
                <div key={key} className={styles.inputGroup}>
                  <label className={styles.label}>{key}</label>
                  <input 
                    name={key} 
                    value={employee[key]} 
                    onChange={handleChange} 
                    className={styles.input} 
                  />
                </div>
              ))}
            </div>
            <button onClick={handlePredict} className={styles.btn}>
              Analyser le Risque
            </button>
          </div>
          
          {/* Résultats */}
          {prediction !== null && (
            <div className={styles.resultsWrapper}>
              {/* Score */}
              <div className={styles.scoreCard}>
                <div className={styles.circle}>
                  <div className={styles.circleInner}>
                    <span className={styles.percentage}>{prediction}%</span>
                  </div>
                </div>
                <div className={styles.riskHeader}>
                  <AlertCircle className={styles.alertIcon} />
                  <h3 className={styles.riskTitle}>
                    {prediction > 50 ? "Risque Faible" : "Risque Élevé"}
                  </h3>
                </div>
                <p className={styles.riskDesc}>
                  {prediction > 50 
                    ? "Cet employé présente un faible risque de départ"  
                    : "Cet employé présente un risque significatif de départ"
                  }
                </p>
                <button 
                  onClick={handleGenerateRetentionPlan} 
                  className={styles.btn}
                  disabled={loading}
                >
                  {loading ? "Génération..." : "Générer Plan de Rétention"}
                </button>
              </div>

              {/* Plan de rétention */}
              {retentionPlan && (
                <div className={styles.planCard}>
                  <h3 className={styles.planTitle}>
                    <Sparkles className={styles.titleIcon} />
                    Plan de Rétention Personnalisé
                  </h3>
                  <div className={styles.planList}>
                    {retentionPlan.map((plan, index) => (
                      <div key={index} className={styles.planItem}>
                        <CheckCircle2 className={styles.checkIcon} />
                        <p className={styles.planText}>{plan}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}