# Crédits Admin — Application Electron

Application de bureau Windows pour gérer les crédits vidéos connectée à Google Sheets.

## 📋 Prérequis

- **Node.js** v18+ ([nodejs.org](https://nodejs.org))
- **Windows** (pour compiler le .exe)

---

## 🚀 Installation & Build

### 1. Installer les dépendances

```bash
cd credits-app
npm install
```

### 2. Tester en local (sans compiler)

```bash
npm start
```

### 3. Compiler l'installateur .exe

```bash
npm run build
```

Le fichier `dist/Crédits Admin Setup 1.0.0.exe` sera créé.

> ⚠️ La première compilation télécharge Electron (~100 Mo). Prévoir quelques minutes.

---

## 🎨 Assets à placer dans `src/assets/`

Avant de compiler, placer ces fichiers :

| Fichier | Taille | Format | Usage |
|---------|--------|--------|-------|
| `icon.ico` | — | ICO multi-résolution | Icône de l'app et du raccourci |
| `icon.png` | 256×256 px | PNG | Icône au runtime |
| `installer-sidebar.bmp` | 164×314 px | BMP 24bit | Panneau gauche de l'installateur |
| `installer-header.bmp` | 150×57 px | BMP 24bit | En-tête de l'installateur |

> 💡 **Sans les BMP** : l'installateur reste fonctionnel mais sans images personnalisées (fond gris par défaut NSIS).
> 
> **Sans icon.ico** : l'app utilise l'icône Electron par défaut.

---

## 📁 Structure du projet

```
credits-app/
├── package.json          ← Config Electron + build
├── LICENSE.txt           ← Affiché dans l'installateur
├── src/
│   ├── main.js           ← Processus principal Electron
│   ├── preload.js        ← Pont sécurisé IPC
│   ├── splash.html       ← Écran de chargement animé
│   ├── admin.html        ← Interface admin principale
│   └── assets/
│       ├── icon.ico      ← À placer (vous)
│       ├── icon.png      ← À placer (vous)
│       ├── installer-sidebar.bmp  ← À placer (vous)
│       └── installer-header.bmp   ← À placer (vous)
└── dist/                 ← Généré par `npm run build`
    └── Crédits Admin Setup 1.0.0.exe
```

---

## ✨ Fonctionnalités

- **Écran de chargement** animé avec barre de progression dorée
- **Barre de titre personnalisée** (sans cadre Windows)
- **Authentification** par mot de passe Google Sheets
- **Gestion des vidéos** : créer, modifier, supprimer
- **Génération de liens** vers `https://nathbu92.github.io/Credits/`
- **Copie en un clic** + **Ouvrir dans le navigateur**
- **Installation par utilisateur** (pas de droits admin requis)

---

## 🔧 Modifier l'URL de base

Dans `src/admin.html`, ligne :
```js
const BASE_URL = 'https://nathbu92.github.io/Credits/';
```

---

## ❓ Problèmes fréquents

**`npm run build` échoue avec une erreur réseau** : Electron doit être téléchargé au premier build. Vérifiez votre connexion internet.

**L'app ne se connecte pas à Google Sheets** : Vérifiez que l'URL Apps Script dans `admin.html` est correcte et déployée en accès public.
