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
### Trier
 
```javascript
// Copier avant de trier pour ne pas modifier l'original
[...products].sort((a, b) => a.price - b.price);        // prix croissant
[...products].sort((a, b) => b.price - a.price);        // prix décroissant
[...products].sort((a, b) => a.name.localeCompare(b.name)); // alphabétique
```
 
### Catégories uniques
 
```javascript
const categories = [...new Set(products.map((p) => p.category))];
```
 
---
 
## 4. Destructuring, Spread et Rest
 
### Destructuring (déstructuration)
 
Extraire des valeurs d'un objet ou d'un tableau.
 
```javascript
const { name, price } = product;           // objet
const { name: title } = product;           // renommer
const { qty = 1 } = item;                  // valeur par défaut
const [first, second] = [10, 20];          // tableau
 
// Dans les paramètres d'une fonction
const getTotal = (cart) =>
  cart.reduce((sum, { price, qty }) => sum + price * qty, 0);
```
 
### Spread `...` (étaler)
 
Copier ou fusionner sans modifier l'original.
 
```javascript
const newItem = { ...item, qty: item.qty + 1 };   // copie d'objet + modification
const newCart = [...cart, newItem];               // copie de tableau + ajout
const merged = { ...defaults, ...options };       // fusion d'objets
```
 
### Rest `...` (regrouper)
 
```javascript
const sum = (...numbers) => numbers.reduce((a, n) => a + n, 0);
sum(1, 2, 3);                      // 6
 
const { id, ...others } = product; // others = tout sauf id
```
 
**Astuce** : `...` est du **spread** quand on **étale** (à droite), du **rest** quand on **regroupe** (paramètre ou à gauche d'une déstructuration).
 
### Immutabilité
 
On ne modifie pas l'ancien tableau : on en crée un nouveau (`map`, `filter`, spread). C'est plus sûr et plus prévisible que `push` ou `splice`.
 
---
 
## 5. Autres syntaxes ES6+ utiles
 
```javascript
// Template literals
const html = `<h3>${name}</h3><span>${price} DH</span>`;
 
// let / const (jamais var)
const PI = 3.14;      // ne peut pas être réaffecté
let count = 0;        // peut être réaffecté
 
// Optional chaining ?.
const city = user?.address?.city;   // undefined si absent, pas d'erreur
 
// Nullish coalescing ?? : valeur par défaut seulement si null/undefined
const cart = load("cart") ?? [];    // diffère de || (qui traite aussi 0 et "")
 
// Opérateur ternaire
const label = qty > 1 ? "articles" : "article";
 
// Propriété raccourcie
const state = { page, limit };      // équivaut à { page: page, limit: limit }
 
// Clé calculée
const actions = { [name]: () => {} };
```
 
---
 
## 6. Asynchrone : Promise, async/await
 
**Pourquoi ?** Charger un fichier prend du temps. JavaScript ne bloque pas la page : il lance l'opération et continue.
 
### Promise
 
Un objet qui représente un résultat **futur** : `pending` → `fulfilled` (réussi) ou `rejected` (échec).
 
```javascript
fetch("./data/data.json")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```
 
### async / await (même chose, plus lisible)
 
```javascript
const fetchProducts = async () => {
  try {
    const res = await fetch("./data/data.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};
```
 
- `async` : la fonction retourne **toujours** une Promise.
- `await` : attend la fin de la Promise (uniquement dans une fonction `async` ou un module).
- `try / catch` : gère les erreurs.
---
 
## 7. Fetch API
 
```javascript
const res = await fetch(url);       // 1. envoie la requête
res.ok;                             // true si statut 200-299
res.status;                         // 200, 404, 500...
const data = await res.json();      // 2. convertit le corps en objet JS
```
 
**Points d'attention**
- `fetch` ne rejette **pas** la Promise sur une erreur 404 : il faut tester `res.ok`.
- `res.json()` est lui aussi asynchrone : il faut `await`.
- Requête POST :
```javascript
await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
```
 
**Dans le projet** : `api.js` charge `data/data.json` (catalogue initial).
 
---
 
## 8. Sérialisation JSON et localStorage
 
### JSON
 
Format texte d'échange de données.
 
```json
[
  { "id": 1, "name": "T-shirt", "price": 100, "category": "Mode", "image": "img/t.png" }
]
```
Les clés sont entre guillemets doubles, pas de virgule finale, pas de commentaires.
 
### Sérialisation / Désérialisation
 
| Opération | Méthode | Sens |
|---|---|---|
| Sérialiser | `JSON.stringify(obj)` | objet → texte |
| Désérialiser | `JSON.parse(texte)` | texte → objet |
 
### localStorage
 
Stockage du navigateur : **clé → texte**, persistant après fermeture. ~5 Mo.
 
```javascript
localStorage.setItem("auchan_cart", JSON.stringify(cart));  // écrire
const cart = JSON.parse(localStorage.getItem("auchan_cart")); // lire (null si absent)
localStorage.removeItem("auchan_cart");                       // supprimer une clé
localStorage.clear();                                         // tout vider
```
 
### Module `storage.js` du projet
 
```javascript
const KEYS = { products: "auchan_products", cart: "auchan_cart" };
 
export const save = (key, value) =>
  localStorage.setItem(KEYS[key], JSON.stringify(value));
 
export const load = (key) => {
  try {
    return JSON.parse(localStorage.getItem(KEYS[key]));
  } catch {
    return null;   // JSON corrompu
  }
};
```
 
### Stratégie de persistance
 
```javascript
state.products = load("products") ?? (await fetchProducts());
save("products", state.products);
```
Premier chargement : `fetch` du JSON. Ensuite : on lit le `localStorage` (qui contient aussi les modifications de l'admin).
 
---
 
## 9. Manipulation du DOM
 
### Sélection
 
```javascript
document.querySelector("#products");        // premier élément
document.querySelectorAll(".catalogue button"); // tous (NodeList)
```
 
### Modification
 
```javascript
el.textContent = "Texte";        // texte brut (sûr)
el.innerHTML = `<p>HTML</p>`;    // HTML (attention aux injections XSS)
el.classList.add("hidden");
el.classList.remove("hidden");
el.classList.toggle("hidden");
el.classList.toggle("hidden", count === 0);   // avec condition
el.setAttribute("aria-label", "Fermer");
el.dataset.id;                    // lit data-id="..."
```
 
### Création
 
```javascript
const btn = document.createElement("button");
btn.textContent = "1";
container.appendChild(btn);
```
 
### Rendu par template
 
```javascript
container.innerHTML = items
  .map(({ name, price }) => `<h3>${name}</h3><span>${price} DH</span>`)
  .join("");
```
`.join("")` est indispensable : sans lui, `map` renvoie un tableau et les virgules s'affichent.
 
### Basculer Liste / Grille
 
On change simplement les classes Tailwind du conteneur :
 
```javascript
container.className = view === "grid"
  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
  : "flex flex-col gap-4";
```
 
---
 
## 10. Événements et délégation
 
### addEventListener
 
```javascript
el.addEventListener("click", (e) => { /* ... */ });
input.addEventListener("input", (e) => e.target.value);  // à chaque frappe
form.addEventListener("submit", (e) => { e.preventDefault(); });
```
 
| Événement | Quand |
|---|---|
| `click` | clic |
| `input` | chaque modification d'un champ |
| `change` | valeur validée (select, checkbox) |
| `submit` | envoi d'un formulaire |
| `DOMContentLoaded` | DOM prêt |
 
### L'objet `event`
 
- `e.target` : l'élément réellement cliqué.
- `e.preventDefault()` : annule le comportement par défaut.
- `e.stopPropagation()` : empêche la remontée de l'événement.
### Délégation d'événements
 
Les éléments créés dynamiquement n'existent pas au moment du `addEventListener`. On écoute le **parent** :
 
```javascript
$("#cart-items").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;                     // clic ailleurs : on ignore
  const { action, id, size } = btn.dataset;
});
```
 
- `closest(selector)` remonte l'arbre pour trouver l'ancêtre correspondant.
- Les `data-*` du HTML sont lus via `dataset`. Ils sont **toujours des chaînes** : `Number(btn.dataset.id)`.
---
 
## 11. Drag & Drop
 
### Principe
 
L'API HTML5 repose sur 3 acteurs : l'élément **draggable**, la **zone de dépôt**, et `dataTransfer` qui transporte la donnée.
 
```
dragstart → dragover → drop
(on attrape) (on survole) (on lâche)
```
 
### Événements
 
| Événement | Sur quoi | Rôle |
|---|---|---|
| `dragstart` | l'élément | début du glissement : on stocke l'`id` |
| `dragover` | la zone | **`preventDefault()` obligatoire** pour autoriser le drop |
| `dragleave` | la zone | on quitte : retirer le style |
| `drop` | la zone | on lâche : on lit l'`id` et on agit |
 
### Code
 
```html
<article draggable="true" data-id="3">...</article>
```
 
```javascript
// Début : stocker l'id
productsContainer.addEventListener("dragstart", (e) => {
  const card = e.target.closest("[data-id]");
  if (card) e.dataTransfer.setData("text/plain", card.dataset.id);
});
 
// Survol : autoriser le dépôt
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("ring-2", "ring-red-600");
});
 
// Dépôt : récupérer l'id
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const id = Number(e.dataTransfer.getData("text/plain"));
  onDrop(id);   // appelle handleAdd(id)
});
```
 
**Erreur classique** : oublier `preventDefault()` dans `dragover` → le `drop` ne se déclenche jamais.
 
**Réutilisation** : `onDrop` est la même fonction `handleAdd` que celle du bouton « Ajouter » : une seule logique pour deux interactions.
 
---
 
## 12. Logique algorithmique du projet
 
### Filtre + recherche
 
```javascript
export const filterProducts = (products, { search = "", category = "tout" }) =>
  products.filter(({ name, category: cat }) => {
    const matchName = name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "tout" || cat.toLowerCase() === category.toLowerCase();
    return matchName && matchCat;
  });
```
Deux conditions combinées avec `&&`. `toLowerCase()` rend la recherche insensible à la casse.
 
### Pagination
 
```
Page 1 → éléments 0 à 7
Page 2 → éléments 8 à 15
start = (page - 1) × limit
fin   = start + limit
totalPages = Math.ceil(total / limit)
```
 
```javascript
export const paginate = (items, page, limit) => {
  const totalPages = Math.max(1, Math.ceil(items.length / limit));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * limit;
  return { items: items.slice(start, start + limit), totalPages, page: safePage };
};
```
Quand on filtre ou recherche, on **remet la page à 1**.
 
### Panier
 
| Action | Méthode | Cas |
|---|---|---|
| Doublon ? | `some` | produit + taille déjà présents |
| Augmenter | `map` + spread | `{ ...i, qty: i.qty + 1 }` |
| Nouvelle ligne | spread | `[...cart, { ..., qty: 1 }]` |
| Supprimer | `filter` | garder tout sauf la ligne |
| Total | `reduce` | `Σ prix × quantité` |
| Compteur | `reduce` | `Σ quantité` |
 
Une ligne est identifiée par **`id` + `size`** : un même produit en M et en L = 2 lignes.
 
### Tarification dynamique (extra)
 
| Taille | Majoration |
|---|---|
| S | 0 % |
| M | +5 % |
| L | +10 % |
| XL | +20 % |
 
```javascript
const SIZE_RATES = { S: 0, M: 0.05, L: 0.10, XL: 0.20 };
 
export const priceWithSize = (price, size = "S") =>
  +(price * (1 + (SIZE_RATES[size] ?? 0))).toFixed(2);
 
priceWithSize(100, "L");   // 110
```
`toFixed(2)` renvoie une chaîne, d'où le `+` devant pour la reconvertir en nombre.
 
### Source unique de vérité
 
Tout changement du panier passe par `updateCart` :
 
```
Action utilisateur → nouveau tableau → state.cart → save() → render()
```
L'écran et le `localStorage` ne peuvent jamais être en désaccord.
 
### Objet `state`
 
```javascript
const state = { products: [], cart: [], search: "", category: "tout", page: 1, limit: 8, view: "grid" };
```
Toutes les données de l'application sont dans un seul objet. L'affichage est une **fonction de l'état** : on modifie `state`, puis on appelle `render()`.
 
---
 
## 13. Expressions régulières (Regex)
 
### Syntaxe de base
 
| Symbole | Signification |
|---|---|
| `^` | début de chaîne |
| `$` | fin de chaîne |
| `.` | n'importe quel caractère |
| `\d` | un chiffre |
| `\s` | un espace |
| `\w` | lettre, chiffre ou `_` |
| `[abc]` | un caractère parmi a, b, c |
| `[^abc]` | un caractère **sauf** a, b, c |
| `[A-Za-z]` | une lettre |
| `*` | 0 ou plus |
| `+` | 1 ou plus |
| `?` | 0 ou 1 |
| `{2,30}` | entre 2 et 30 fois |
| `(a\|b)` | a ou b |
 
`^` et `$` sont essentiels pour une validation **stricte** : sans eux, la regex accepte une chaîne qui contient seulement un morceau valide.
 
### Regex du formulaire
 
```javascript
export const patterns = {
  name:  /^[A-Za-zÀ-ÿ' -]{2,30}$/,              // prénom, nom
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,           // e-mail
  phone: /^(\+212|0)[5-7]\d{8}$/,                // téléphone marocain
};
 
export const validate = (type, value) => patterns[type].test(value.trim());
```
 
### Méthodes
 
```javascript
/^\d+$/.test("123");        // true  (retourne un booléen)
"a1b2".match(/\d/g);        // ["1", "2"]
"a-b".replace(/-/g, " ");   // "a b"
```
 
### Messages d'erreur visibles
 
```javascript
const showError = (input, message) => {
  input.classList.add("border-red-600");
  input.nextElementSibling.textContent = message;   // <p class="text-red-600 text-sm">
};
```
Le formulaire doit **empêcher l'envoi** (`e.preventDefault()`) tant qu'un champ est invalide, et afficher un message de confirmation en cas de succès.
 
---
 
## 14. Tailwind CSS
 
### Principe
 
Framework **utility-first** : on style directement dans le HTML avec des classes courtes.
 
```html
<button class="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition">
```
 
### Classes courantes
 
| Catégorie | Exemples |
|---|---|
| Espacement | `p-4`, `px-8`, `py-2`, `m-4`, `mt-auto`, `gap-6` |
| Couleurs | `bg-red-600`, `text-gray-800`, `border-gray-200` |
| Texte | `text-sm`, `text-3xl`, `font-bold`, `text-center` |
| Flex | `flex`, `flex-col`, `items-center`, `justify-between` |
| Grille | `grid`, `grid-cols-3`, `gap-6` |
| Bordures | `border`, `rounded-xl`, `rounded-full` |
| Ombres | `shadow`, `shadow-xl` |
| Taille | `w-full`, `h-48`, `max-w-2xl` |
| Valeur libre | `bg-[#559529]`, `py-[30px]` |
 
### Mobile-First
 
Les classes **sans préfixe** s'appliquent au mobile. Les préfixes **élargissent** vers les grands écrans.
 
| Préfixe | À partir de |
|---|---|
| (aucun) | 0 px (mobile) |
| `sm:` | 640 px |
| `md:` | 768 px |
| `lg:` | 1024 px |
| `xl:` | 1280 px |
 
```html
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
```
1 colonne sur mobile, 2 sur petite tablette, 3 sur tablette, 4 sur grand écran.
 
### États et variantes
 
`hover:`, `focus:`, `disabled:`, `dark:`, `group-hover:`.
 
### Dark Mode (bonus)
 
```html
<script>tailwind.config = { darkMode: "class" }</script>
```
```html
<body class="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
```
```javascript
document.documentElement.classList.toggle("dark");
localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
```
 
> Dans le brief : utiliser **exclusivement** les classes utilitaires Tailwind. `style.css` ne doit contenir que le strict nécessaire.
 
---
 
## 15. Élément `<dialog>`
 
Fenêtre modale native du HTML5.
 
```html
<dialog id="pan" class="rounded-2xl p-6 backdrop:bg-black/50">...</dialog>
```
 
```javascript
dialog.showModal();   // ouvre en modal (fond assombri, Échap pour fermer)
dialog.close();       // ferme
```
 
- `showModal()` et `close()` sont les seules méthodes (pas de `closeModal()`).
- `backdrop:` (Tailwind) stylise le fond derrière la modale.
- Un `<button>` dans un `<form>` **soumet** par défaut : utiliser `type="button"` pour un bouton « fermer ».
---
 
## 16. CRUD et Back-office
 
**CRUD** = **C**reate, **R**ead, **U**pdate, **D**elete.
 
| Lettre | Action admin | Méthode de tableau |
|---|---|---|
| Create | Ajouter un produit | `[...products, newProduct]` |
| Read | Afficher le tableau de bord | `map` → lignes `<tr>` |
| Update | Modifier un produit | `map` (remplacer l'élément) |
| Delete | Supprimer un produit | `filter` |
 
```javascript
export const addProduct = (products, data) => {
  const id = Math.max(0, ...products.map((p) => p.id)) + 1;   // nouvel id unique
  return [...products, { id, ...data }];
};
 
export const updateProduct = (products, id, changes) =>
  products.map((p) => (p.id === id ? { ...p, ...changes } : p));
 
export const deleteProduct = (products, id) =>
  products.filter((p) => p.id !== id);
```
 
**Champs d'un produit** : nom, catégorie, prix, image, tailles.
 
**Règle du brief** : chaque action CRUD doit **immédiatement** :
1. mettre à jour `state.products` ;
2. appeler `save("products", ...)` ;
3. rafraîchir le catalogue côté client.
**Vérifications** : champs obligatoires, prix > 0, nom non dupliqué (`some`).
 
**Confirmer avant de supprimer** : `if (!confirm("Supprimer ce produit ?")) return;`
 
---
 
## 17. API publique RandomUser
 
API gratuite qui renvoie des utilisateurs fictifs. Utilisée pour le bouton **« Générer des données de test »**.
 
```javascript
export const fetchRandomUser = async () => {
  const res = await fetch("https://randomuser.me/api/");
  const { results } = await res.json();          // destructuring
  const { name, email, phone } = results[0];
  return { firstName: name.first, lastName: name.last, email, phone };
};
```
 
```javascript
$("#generate").addEventListener("click", async () => {
  const user = await fetchRandomUser();
  $("#prenom").value = user.firstName;
  $("#nom").value = user.lastName;
  $("#email").value = user.email;
  $("#tel").value = user.phone;
});
```
 
Le numéro renvoyé n'a pas le format marocain : adapter la Regex ou le reformater pour que le formulaire reste cohérent.
 
---
 
## 18. Git, GitHub et workflow
 
### Commandes essentielles
 
```bash
git init                         # initialiser un dépôt
git clone <url>                  # cloner
git status                       # état des fichiers
git add .                        # préparer les changements
git commit -m "feat: ..."        # enregistrer
git push origin <branche>        # envoyer sur GitHub
git pull                         # récupérer
git branch                       # lister les branches
git checkout -b feature/panier   # créer et changer de branche
git switch develop               # changer de branche
git merge feature/panier         # fusionner
git log --oneline                # historique court
```
 
### Stratégie de branches
 
| Branche | Rôle |
|---|---|
| `main` | version stable (production) |
| `develop` | intégration |
| `feature/xxx` | une fonctionnalité chacune |
 
### Cycle de travail
 
```bash
git switch develop
git pull
git switch -c feature/pagination
# ... coder ...
git add .
git commit -m "feat: ajout de la pagination"
git push -u origin feature/pagination
# → ouvrir une Pull Request vers develop sur GitHub
```
 
### Conventional Commits
 
Format : `type: description à l'impératif`
 
| Type | Usage |
|---|---|
| `feat:` | nouvelle fonctionnalité |
| `fix:` | correction de bug |
| `style:` | mise en forme (pas de changement de logique) |
| `refactor:` | restructuration |
| `docs:` | documentation |
| `chore:` | maintenance |
 
Exemples : `feat: ajout du drag & drop`, `fix: correction du total du panier`, `docs: ajout du README`.
 
### Pull Request
 
Demande de fusion d'une branche dans une autre. Elle permet la **relecture** avant intégration.
 
### Règles du brief
 
1. Une branche par fonctionnalité.
2. Une Pull Request vers `develop`.
3. Vérifier le code avant chaque intégration.
4. Fusionner `develop` dans `main` après validation finale.
5. Commits explicites.
### Gestion de projet
 
Jira ou GitHub Projects : colonnes **To Do → In Progress → Done**, une carte par user story.
 
---
 
## 19. Déploiement
 
| Plateforme | Étapes |
|---|---|
| **GitHub Pages** | Settings → Pages → branche `main` → URL `user.github.io/repo` |
| **Vercel** | Importer le dépôt → Framework « Other » → Deploy |
 
**Vérifier après déploiement**
- Les chemins sont **relatifs** (`./data/data.json`, `./js/main.js`), pas absolus.
- Les majuscules/minuscules des noms de fichiers correspondent (le serveur est sensible à la casse).
- Le catalogue se charge, le panier persiste, les images s'affichent.
---
 
## 20. Bonus : PDF et Dark Mode
 
### Devis PDF
 
Utiliser une bibliothèque comme **jsPDF** (chargée via CDN) :
 
```javascript
const { jsPDF } = window.jspdf;
 
export const generateQuote = (cart, total) => {
  const doc = new jsPDF();
  doc.text("Devis Auchan", 20, 20);
  cart.forEach(({ name, size, qty, price }, i) => {
    doc.text(`${name} (${size}) x${qty} : ${(price * qty).toFixed(2)} DH`, 20, 40 + i * 10);
  });
  doc.text(`Total : ${total.toFixed(2)} DH`, 20, 60 + cart.length * 10);
  doc.save("devis-auchan.pdf");
};
```
 
### Dark Mode
 
Voir la section [Tailwind CSS](#14-tailwind-css) : configuration `darkMode: "class"`, classes `dark:`, et sauvegarde du thème dans le `localStorage`.
 
---
 
## 21. Aide-mémoire pour le quiz
 
### Questions probables
 
| Question | Réponse courte |
|---|---|
| Différence `map` / `filter` ? | `map` transforme chaque élément ; `filter` en retire |
| Quand utiliser `reduce` ? | Pour obtenir une seule valeur (total, compteur) |
| `find` vs `filter` ? | `find` renvoie un élément ; `filter` un tableau |
| `some` vs `every` ? | `some` : au moins un ; `every` : tous |
| Spread vs rest ? | Spread étale, rest regroupe |
| `let` / `const` / `var` ? | `const` par défaut, `let` si réaffectation, jamais `var` |
| `??` vs `\|\|` ? | `??` ne réagit qu'à `null`/`undefined` ; `\|\|` à toute valeur falsy |
| Pourquoi `async/await` ? | Syntaxe lisible pour les Promises |
| Pourquoi tester `res.ok` ? | `fetch` ne rejette pas sur un 404 |
| `stringify` / `parse` ? | objet → texte / texte → objet |
| Pourquoi `JSON.stringify` pour le localStorage ? | Il ne stocke que des chaînes |
| Pourquoi `preventDefault` dans `dragover` ? | Sinon le `drop` est bloqué |
| Délégation d'événements ? | Écouter le parent pour gérer les éléments créés dynamiquement |
| Pourquoi `.join("")` après `map` ? | Convertir le tableau de chaînes en une seule chaîne |
| Pourquoi des modules ? | Séparer les responsabilités, éviter les variables globales |
| Pourquoi un serveur local ? | Les modules et `fetch` sont bloqués en `file://` |
| Mobile-First ? | Style de base pour mobile, `sm:` `md:` `lg:` pour élargir |
| `^` et `$` en Regex ? | Début et fin : validation stricte de toute la chaîne |
| Qu'est-ce qu'une Pull Request ? | Demande de fusion avec relecture |
| Source unique de vérité ? | Un seul endroit modifie l'état (`updateCart`) |
 
### Flux global de l'application
 
```
data.json ──fetch──► state.products ◄──► localStorage
                          │
              filterProducts → paginate
                          │
                   renderProducts (ui.js)
                          │
        clic "Ajouter" / drag & drop
                          │
                       handleAdd
                          │
                      updateCart ──► state.cart ──► localStorage
                          │
              renderCart + renderCartCount
```
 