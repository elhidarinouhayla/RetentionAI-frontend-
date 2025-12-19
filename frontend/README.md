# RetentionAI Frontend

Interface utilisateur pour l'application RetentionAI - Solution de prédiction et prévention du turnover des employés.

##  Vue d'ensemble

Le frontend RetentionAI permet aux professionnels RH de :
- S'authentifier de manière sécurisée (JWT)
- Saisir les informations d'un employé
- Obtenir une prédiction du risque de départ
- Visualiser automatiquement un plan de rétention personnalisé

##  Technologies utilisées

- **Next.js** (React Framework)
- **TypeScript**
- **CSS Modules** pour le styling
- **JWT** pour l'authentification

##  Structure du projet

```
frontend/
├── app/
│   ├── login/
│   │   ├── page.jsx             
│   │   └── login_styles.module.css
│   ├── signup/
│   │   ├── page.jsx              
│   │   └── signup_styles.module.css
│   ├── retention/
│   │   ├── page.jsx              
│   │   └── retention_styles.module.css
│   ├── layout.tsx                
│   ├── page.tsx                 
│   ├── page.module.css
│   └── globals.css
├── public/
├── .dockerignore
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

##  Installation et démarrage

### Prérequis

- Node.js 18+ 
- npm ou yarn
- Backend RetentionAI en cours d'exécution

### Installation locale

```bash
# Cloner le repository
git clone <https://github.com/elhidarinouhayla/RetentionAI_Frontend.git>
cd frontend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Variables d'environnement

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

##  Démarrage avec Docker

```bash
# Build de l'image
docker build -t retentionai-frontend .

# Lancement du container
docker run -p 3000:3000 retentionai-frontend
```




