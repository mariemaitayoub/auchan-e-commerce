import {getStorageItem} from './storage.js';
import {setStorageItem} from './storage.js';



export const addCart = (productToAdd) => {
    let cart = getStorageItem('cart') || [];
    const existItem = cart.find(item => item.id === productToAdd.id);
    if (existItem) {
        cart = cart.map(item => {
            if (item.id === productToAdd.id) {
                return { ...item, quantity: item.quantity + 1 };
            } else {
                return item;
            }
        });
    } else {
        cart.push({ ...productToAdd, quantity: 1 });
    }

    setStorageItem('cart', cart)

    updateCartUI();
};


export const updateCartUI=()=>{
   const cartItemsContainer = document.querySelector("#cartItems");
    const cartTotalElement = document.querySelector("#cartTotal");
    const cart = getStorageItem('cart') || [];
    cartItemsContainer.innerHTML=``;
    if (cart.length===0){
        cartItemsContainer.innerHTML=`<p class="text-center text-gray-500">Votre panier est vide.</p>`;

    }else{
        cart.forEach(item => {
            const articleDiv = document.createElement("div");
            articleDiv.className = "flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100";
            
            articleDiv.innerHTML = `
                <div class="flex items-center gap-3">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                    <div class="flex flex-col">
                        <h4 class="font-bold text-sm text-gray-800">${item.name}</h4>
                        <span class="text-xs text-gray-500">${item.price} DH / unité</span>
                    </div>
                </div>
                <div class="font-black text-lg text-[#1E3A8A]">
                    x${item.quantity}
                </div>
            `;
            cartItemsContainer.appendChild(articleDiv);
        });
    }
    cartTotalElement.textContent=getCartTotal();
    }


    export const getCartTotal=()=>{
        const cart =getStorageItem("cart")||[];
        const sommeFnale=cart.reduce((total,item)=>{
            return total+(item.price*item.quantity);
        },0);// kanbdaw man 0dh
        //tofixed kat3tina 2 chiffres apers la vigulle 00,00
        return sommeFnale.toFixed(2);
    }
 
    








//find  :  ila l9at dakchi li kan9albo 3lih kat7bass sinon ila mal9atch katraja3 undifiend     
//map   :  ka t cree lik tableau akhor nafss 3adad items li kan f tableau ancien b7al mani darna [12,1,3] map(ele=>ele+1)  ghadi iwali [13,2,4]
// Spread Operator  {...  }  :  Il sert à copier tout le contenu d'un objet (ou d'un tableau) dans un nouveau. C'est indispensable pour ne pas détruire tes données d'origine par erreur



// reduce   :  bach n7assbo l majmo3 dyal chi 7aja matlan 3andna [1,2,3,4]   mnani kanbghiw nhassbo totlae kandiro reduce(c,v)=>c+v ,0
// tableau.reduce((accumulateur, valeurCourante) => {
//     // Logique de calcul ou de traitement    
//     return nouveauResultat;
// }, valeurInitiale);








