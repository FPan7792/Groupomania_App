# Groupomania_App

## **Installation du projet**

Cloner le projet sur votre propre machine :

```bash
gh repo clone FPan7792/Groupomania_App
```

(gh doit être déjâ installé sur la machine. Suivez ce lien https://cli.github.com/manual/installation )

**SINON**

Vous pouvez télécharger le dossier ZIP du projet et le décomporesser sur la machine

## **Démarrer le BACKEND**

A la source du projet :

```bash
cd backend
```

puis tapez :

```bash
npm install
```

Puis creer un fichier .env dans lequel vous entrerez vos variables d'environnements nécéssaires pour la connexion sous cette forme :

```env
NOM_DE_LA_VARIABLE=valeurdelavariable
```

**Cloudinary** :
CLOUDINARY_CLOUD_NAME,
CLOUDINARY_API_KEY,
CLOUDINARY_API_SECRET

**Base de Données mySQL** : DATABASE_USER,
DATABASE_PASSWORD

**Générateur de TOKEN code** : UUID_TOKEN_GENERATOR,

(Pensez à redémarrer votre éditeur de code)

puis tapez :

```bash
node server.js
```

## **Démarrer le FRONTEND**

A la source du projet :

```bash
cd frontend
```

puis tapez :

```bash
npm install
# ou
yarn install
```

puis

```bash
npm start
# ou
yarn start
```

Pour optimiser le l'application pour la production

```bash
npm build
# ou
yarn build
```
