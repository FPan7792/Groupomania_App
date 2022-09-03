# Groupomania_App

## **Présentation du projet**

Ce projet est codé en javascript avec NODEJS, REACT, DOCKER .

GROUPOMANIA_APP est un réseau social interne d'entreprise entièrement fonctionnel et responsive (adapté à tous types d'écrans) . Il permettra à chaque collaborateur de creer un compte unique, de poster des messages avec ou sans image, de les liker et trier.
Un dark mode est implémenté .

## **Installation du projet**

Cloner le projet sur votre propre machine :

```bash
gh repo clone FPan7792/Groupomania_App
```

(gh doit être déjâ installé sur la machine. Suivez ce lien https://cli.github.com/manual/installation )

**SINON**

Vous pouvez télécharger le dossier ZIP du projet et le décompresser sur la machine

## **Démarrer le BACKEND**

(DOCKER DOIT IMPERATIVEMENT ETRE INSTALLE ET LANCE SUR VOTRE MACHINE POUR QUE LE PROJET PUISSE DEMARRER)

A la racine du projet :

```bash
cd backend
```

puis tapez les commandes suivantes dans l'ordre :

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

**Base de Données mySQL** :
PORT=3003,
DATABASE_NAME=groupomania_app,
DATABASE_USER=root,
DATABASE_PASSWORD=my-groupomania-pwd,

**Générateur de TOKEN code** : UUID_TOKEN_GENERATOR=unechainedecharactersecurisee,

(Pensez à redémarrer votre éditeur de code)

puis tapez :

```bash
npm run build && npm run init
npm run init-dtb
npm run start
```

## **Démarrer le FRONTEND**

A la racine du projet :

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

Pour generer un fichier optimisé de l'application pour la production :

```bash
npm build
# ou
yarn build
```
