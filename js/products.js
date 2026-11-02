import {products} from "./storage.js";

const limit =6; 
let current=1;
let data=[];
let currentFiltre='';
const filtreIn=document.querySelector("#filtree")
const proElem=document.querySelector('#products');
const pag=document.querySelector("#pagination");

async function pro(){
    data=await products();
    if(!data)return;
    render();
}
filtreIn.addEventListener('input',e=>{
    currentFiltre=e.target.value.toLowerCase();
    current=1;
    render();
})
function render(){
const filterd=data.filter(p=>p.name.toLowerCase().includes(currentFiltre))
const start=(current-1)*limit;
const pageItem=filterd.slice(start, start+limit);
proElem.innerHTML=``;
for (const p of pageItem){
    const div=document.createElement('div');
    div.classList.add('product')
    div.innerHTML=`
    <img src='${p.image}' class="w-full h-48 object-cover">
<div class="p-2 flex flex-col gap-3">
<h3 class="text-lg font-bold text-gray-800 ">${p.name}</h3> 
<span class="text-xl font-black text-red-600">${p.price} DH</span>
<button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-bold transition">Ajouter</button>
</div>
`;     
proElem.appendChild(div)
}


pag.innerHTML='';
const page=Math.ceil(filterd.length / limit);

for (let i=1;i<=page;i++){
    const btn=document.createElement('button');
    btn.textContent=i;
    if(i===current){
        btn.disabled=true;


    }
    btn.addEventListener('click',() =>{
        current=i;
        render();
    })
    pag.appendChild(btn);
}
}

pro();











// function pagination (number_page){
//     const list=document.getElementById('products')
//    const start= (number_page-1)*limit;
// const end =number_page*limit;
// const pagination_item=items.slice(start,end);
// return pagination_item
// }
// console.log(pagination(1))
// //start=>numbre sf7a-1)*total dyal li produit li bghina f kola page 
// //end=>raqm page*total dyal 
// //arr.slice(start,end)
