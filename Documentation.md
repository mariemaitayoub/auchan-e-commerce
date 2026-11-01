# 📚 Documentation : Concepts du Sprint II
 
Ce document regroupe tous les concepts vus en classe et dans le brief, avec pour chacun : **définition**, **exemple** et **où ils sont utilisés dans le projet Auchan**.
 
## Sommaire
 
1. [Architecture modulaire (ES Modules)](#1-architecture-modulaire-es-modules)
2. [Arrow functions](#2-arrow-functions)
3. [Méthodes de tableaux ES6](#3-méthodes-de-tableaux-es6)
4. [Destructuring, Spread et Rest](#4-destructuring-spread-et-rest)
5. [Autres syntaxes ES6+ utiles](#5-autres-syntaxes-es6-utiles)
6. [Asynchrone : Promise, async/await](#6-asynchrone--promise-asyncawait)
7. [Fetch API](#7-fetch-api)
8. [Sérialisation JSON et localStorage](#8-sérialisation-json-et-localstorage)
9. [Manipulation du DOM](#9-manipulation-du-dom)
10. [Événements et délégation](#10-événements-et-délégation)
11. [Drag & Drop](#11-drag--drop)
12. [Logique algorithmique du projet](#12-logique-algorithmique-du-projet)
13. [Expressions régulières (Regex)](#13-expressions-régulières-regex)
14. [Tailwind CSS](#14-tailwind-css)
15. [Élément `<dialog>`](#15-élément-dialog)
16. [CRUD et Back-office](#16-crud-et-back-office)
17. [API publique RandomUser](#17-api-publique-randomuser)
18. [Git, GitHub et workflow](#18-git-github-et-workflow)
19. [Déploiement](#19-déploiement)
20. [Bonus : PDF et Dark Mode](#20-bonus--pdf-et-dark-mode)
21. [Aide-mémoire pour le quiz](#21-aide-mémoire-pour-le-quiz)
---
 
## 1. Architecture modulaire (ES Modules)
 
**Définition** : un module est un fichier JavaScript qui **exporte** des fonctions ou des valeurs, et qu'un autre fichier **importe**. Cela permet de séparer les responsabilités.
 
```javascript
// api.js : export nommé
export const fetchProducts = async () => { /* ... */ };
 
// main.js : import
import { fetchProducts } from "./api.js";
```
 
| Type | Export | Import |
|---|---|---|
| Nommé | `export const a = 1` | `import { a } from "./f.js"` |
| Par défaut | `export default a` | `import a from "./f.js"` |
| Renommé | | `import { a as b } from "./f.js"` |
| Tout | | `import * as f from "./f.js"` |
 
**Règles**
- Dans le HTML : `<script type="module" src="./js/main.js"></script>`.
- **Un seul** script d'entrée (`main.js`) : il importe les autres modules.
- Le chemin doit inclure l'extension : `"./api.js"`.
- Les modules nécessitent un **serveur local** (pas de `file://`).
- Chaque module a sa propre portée : pas de variables globales accidentelles.
**Séparation des responsabilités du projet**
 
| Couche | Fichiers |
|---|---|
| Logique métier (données, algorithmes) | `products.js`, `cart.js`, `validation.js` |
| Affichage (UI) | `ui.js` |
| Événements | `main.js`, `dragDrop.js` |
| Données / stockage | `api.js`, `storage.js` |
 
---
 
## 2. Arrow functions
 
**Définition** : syntaxe courte pour écrire une fonction.
 
```javascript
// Fonction classique
function double(n) { return n * 2; }
 
// Arrow function
const double = (n) => n * 2;         // retour implicite
const hello = () => "Bonjour";       // sans paramètre
const sum = (a, b) => {              // avec accolades : return obligatoire
  return a + b;
};
const toObj = (id) => ({ id });      // retourner un objet : parenthèses
```
 
Différence importante : une arrow function **n'a pas son propre `this`** (elle utilise celui de son contexte).
 
---
 
## 3. Méthodes de tableaux ES6
 
| Méthode | Rôle | Retourne |
|---|---|---|
| `map()` | Transforme chaque élément | Nouveau tableau (même taille) |
| `filter()` | Garde les éléments qui passent le test | Nouveau tableau (plus petit ou égal) |
| `find()` | Trouve le **premier** élément correspondant | L'élément ou `undefined` |
| `some()` | Au moins un élément passe le test ? | `true` / `false` |
| `every()` | Tous les éléments passent le test ? | `true` / `false` |
| `reduce()` | Réduit à **une seule valeur** | Une valeur |
| `forEach()` | Parcourt (effet de bord) | `undefined` |
| `sort()` | Trie (modifie l'original !) | Le même tableau |
| `slice()` | Copie une portion | Nouveau tableau |
| `includes()` | Valeur présente ? | `true` / `false` |
 
### Exemples avec le projet
 
```javascript
const products = [
  { id: 1, name: "T-shirt", price: 100, category: "Mode" },
  { id: 2, name: "Casque",  price: 300, category: "Électronique" },
];
 
// map : récupérer tous les noms
products.map((p) => p.name);                     // ["T-shirt", "Casque"]
 
// filter : recherche par nom
products.filter((p) => p.name.toLowerCase().includes("t-"));
 
// find : retrouver un produit par id
products.find((p) => p.id === 2);
 
// some : vérifier un doublon
cart.some((i) => i.id === 2 && i.size === "S");
 
// reduce : total du panier
cart.reduce((sum, { price, qty }) => sum + price * qty, 0);
```
 
### Comprendre `reduce`
 
```javascript
[10, 20, 30].reduce((acc, n) => acc + n, 0);
// acc = 0  → 0 + 10 = 10
// acc = 10 → 10 + 20 = 30
// acc = 30 → 30 + 30 = 60
```
Le 2ᵉ argument (`0`) est la **valeur de départ**.