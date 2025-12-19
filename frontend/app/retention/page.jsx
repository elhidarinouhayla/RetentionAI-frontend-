'use client';
import { useState, useEffect } from "react";
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

  // Récupérer le token uniquement côté client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

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

      const response = await fetch('http://127.0.0.1:8001/predict', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token" : token,
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        
        console.log("Détails complets:", data.detail);
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

      const response = await fetch('http://127.0.0.1:8001/generate_retention_plan', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Détails complets:", data.detail);
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

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handlePredict}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
          {Object.keys(employee).map((key) => (
            <div key={key}>
              <label style={{fontSize: '10px'}}>{key}</label>
              <input name={key} value={employee[key]} onChange={handleChange} className={styles.input} />
            </div>
          ))}
        </div>
        <button type="submit" className={styles.btn}>Tester</button>
      </form>
      
      {prediction !== null && (
        <div>
          <h2>Résultat: {prediction}</h2>
          <button 
            onClick={handleGenerateRetentionPlan} 
            className={styles.btn}
            disabled={loading}
          >
            {loading ? "Génération en cours..." : "Générer Plan de Rétention"}
          </button>
        </div>
      )}

      {retentionPlan && (
        <div className={styles.retentionPlan}>
          <h3>Plan de Rétention :</h3>
          <ul>
            {retentionPlan.map((plan, index) => (
              <li key={index}>{plan}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}