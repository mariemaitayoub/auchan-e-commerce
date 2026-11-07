# 🛒 Auchan : Plateforme E-commerce
 
Application web dynamique, modulaire et 100 % côté client, développée pour le Centre Commercial **Auchan** dans le cadre du **Sprint II** (Nexora's).
 
🔗 **Démo en ligne** : [https://auchan-eight.vercel.app/]
📦 **Dépôt GitHub** : [https://github.com/mariemaitayoub/auchan-e-commerce.git]
 
---
 
## 📌 Présentation du projet
 
Les maquettes UX/UI ayant été validées, ce projet en est la phase de réalisation. Il comprend :
 
- une **interface client** : catalogue, recherche, filtres, pagination, panier, formulaire de contact ;
- un **tableau de bord administrateur** (extra) : gestion CRUD des produits ;
- une **persistance des données** dans le `localStorage` : rien n'est perdu après actualisation.
Projet individuel, réalisé en 8 jours (28/10/2026 → 06/11/2026).
 
---
 
## 🧰 Technologies
 
| Domaine | Outils |
|---|---|
| Structure | HTML5 |
| Style | CSS3 + **Tailwind CSS** (approche Mobile-First) |
| Logique | **JavaScript Vanilla ES6+** (modules, arrow functions, destructuring, spread/rest) |
| Données | Fetch API, JSON, `localStorage`, API publique RandomUser |
| Versionnage | Git / GitHub (Conventional Commits, Pull Requests) |
| Déploiement | Vercel ou GitHub Pages |
| Gestion de projet | Jira / GitHub Projects |
 
---
 
## ✨ Fonctionnalités
 
### Interface client
- [x] Chargement du catalogue via **Fetch** depuis `data/data.json`
- [x] **Recherche** par nom en temps réel (`.filter()`)
- [x] **Filtre par catégorie** (Électronique, Mode, Maison…)
- [x] **Pagination** (8 produits max par page ; 4 / 8 / 12 au choix en extra)
- [x] Bascule d'affichage **Liste / Grille** (classes Tailwind)
- [x] **Panier** : ajout, détection des doublons, quantités, suppression, total dynamique
- [x] **Drag & Drop** d'un produit vers la zone du panier
- [x] **Persistance** du catalogue et du panier dans le `localStorage`
- [x] **Formulaire de contact** avec validations Regex strictes
- [x] Bouton « Générer des données de test » (API **RandomUser**)
### Extras
- [ ] Tarification dynamique par taille (M = +5 %, L = +10 %, XL = +20 %)
- [ ] Back-office CRUD : ajouter, lister, modifier, supprimer un produit
- [ ] Mise à jour immédiate du catalogue client après chaque action admin
### Bonus
- [ ] Génération d'un devis au format **PDF**
- [ ] **Dark Mode / Light Mode** (`dark:` de Tailwind)
> Cochez les cases au fur et à mesure de l'avancement du projet.
 
---
 
## 📁 Structure des fichiers
 
```
auchan/
├── index.html            # Structure principale de la page
├── README.md             # Ce fichier
├── DOCUMENTATION.md      # Concepts du Sprint II
├── img/                  # Logo et images
├── data/
│   └── data.json         # Catalogue initial (base de données locale)
├── css/
│   └── style.css         # Styles complémentaires / configuration Tailwind
└── js/
    ├── main.js           # Point d'entrée : état global, imports, événements
    ├── api.js            # Récupération des données (Fetch)
    ├── products.js       # Logique métier : filtres, recherche, pagination, prix
    ├── cart.js           # Logique du panier : ajout, doublons, totaux
    ├── dragDrop.js       # Événements de glisser-déposer
    ├── storage.js        # localStorage (JSON.stringify / JSON.parse)
    ├── ui.js             # Manipulation du DOM (rendu, vue grille/liste, dialogs)
    └── validation.js     # Fonctions de vérification Regex
```
 
### Responsabilités des modules
 
| Module | Rôle | Touche au DOM ? |
|---|---|---|
| `api.js` | Charger les données | Non |
| `storage.js` | Sauvegarder / lire | Non |
| `products.js` | Calculs sur le catalogue | Non |
| `cart.js` | Calculs sur le panier | Non |
| `validation.js` | Tester les champs | Non |
| `ui.js` | Afficher | **Oui** |
| `dragDrop.js` | Gérer le glisser-déposer | Oui (événements) |
| `main.js` | Coordonner le tout | Oui (événements) |
 
---
 
## 🚀 Lancer le projet en local
 
> ⚠️ Le projet utilise des **modules ES** et `fetch()`. Ouvrir `index.html` directement (protocole `file://`) **ne fonctionne pas** : il faut un serveur local.
 
### 1. Cloner le dépôt
 
```bash
git clone https://github.com/VOTRE-USER/auchan.git
cd auchan
```
 
### 2. Démarrer un serveur local (au choix)
 
**Option A : Live Server (VS Code)**
1. Installer l'extension **Live Server**.
2. Clic droit sur `index.html` → **Open with Live Server**.
3. Le site s'ouvre sur `http://127.0.0.1:5500`.
**Option B : Python**
```bash
python -m http.server 8000
```
Puis ouvrir `http://localhost:8000`.
 
**Option C : Node.js**
```bash
npx serve .
```
 
### 3. Réinitialiser les données
 
Les données sont conservées dans le navigateur. Pour repartir de zéro :
DevTools (`F12`) → **Application** → **Local Storage** → clic droit → **Clear**.
 
Clés utilisées : `auchan_products`, `auchan_cart`.
 
---
 
## 🌿 Workflow Git
 
```
main        ← version stable
  └── develop   ← branche d'intégration
        ├── feature/catalogue
        ├── feature/pagination
        ├── feature/panier
        ├── feature/drag-drop
        └── feature/formulaire
```
 
**Règles**
1. Une branche par fonctionnalité, créée depuis `develop`.
2. Pull Request vers `develop`, après relecture.
3. Fusion de `develop` dans `main` après validation finale.
4. Commits explicites (Conventional Commits) :
| Préfixe | Usage |
|---|---|
| `feat:` | nouvelle fonctionnalité |
| `fix:` | correction de bug |
| `style:` | mise en forme / Tailwind |
| `docs:` | documentation |
| `refactor:` | réorganisation du code |
 
Exemple : `feat: ajout de la pagination du catalogue`
 
---
 
## 🌐 Déploiement
 
**GitHub Pages**
1. Dépôt → **Settings** → **Pages**.
2. Source : branche `main`, dossier `/ (root)`.
3. Le site est disponible sur `https://VOTRE-USER.github.io/auchan/`.
**Vercel**
1. Importer le dépôt sur [vercel.com](https://vercel.com).
2. Framework : **Other** (site statique), aucune commande de build.
3. Cliquer sur **Deploy**.
---