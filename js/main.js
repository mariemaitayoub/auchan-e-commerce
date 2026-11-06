import { products } from "./storage.js";
products();
const contenaire = document.querySelector("#products");
async function pro() {
    const data = await products();
    if (!data)
        return;

    data.forEach(element => {

        // console.log(products.name);
        const card = document.createElement("div")
        card.innerHTML = `
<img src='${element.image}' class="w-full h-48 object-cover">
<div class="p-2 flex flex-col gap-3">
<h3 class="text-lg font-bold text-gray-800 ">${element.name}<h3> 
<span class="text-xl font-black text-red-600">${element.price} DH</span>
<span>
<button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-bold transition">Ajouter</button>
</div>

`
            ;

        contenaire.appendChild(card);

    });

}

console.log(pro());





//  "id": 1,
//     "name": "T-shirt coton blanc",
//     "category": "Vêtements",
//     "price": 89,
//     "image": "https://loremflickr.com/400/400/tshirt?lock=1",
//     "sizes": [
//       "S",
//       "M",
//       "L",
//       "XL"
//     ],
//     "description": "Coupe regular en coton 100% bio.",
//     "stock": 12,
//     "rating":


//  <div>
//             <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 p-4 shadow-xl ">
//                 <div class="border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden">
//                     <img src="" alt="" class="w-full h-48 object-cover">
//                     <h3 class="text-lg font-bold text-gray-800 mb-2">Casque Pulse Pro</h3>
//                     <span class="text-xl font-black text-red-600">79,99 $</span>
//                     <button
//                         class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-bold transition">Ajouter</button>
//                 </div>
//             </div>



//         </div>


