import { products } from "./storage.js";

const limit = 6;
let current = 1;
let data = [];
let currentFiltre = '';
let currentcategory = 'tout'
const filtreIn = document.querySelector("#filtree")
const proElem = document.querySelector('#products');
const pag = document.querySelector("#pagination");
const categorie = document.querySelectorAll(".catalogue button")
async function pro() {
    data = await products();
    if (!data) return;
    render();
}
filtreIn.addEventListener('input', e => { 
    currentFiltre=e.target.value.toLowerCase();
    current=1
    render();
});
categorie.forEach(btn => {
    btn.addEventListener("click", (e) => {
        currentcategory = e.target.textContent.trim().toLowerCase();
        categorie.forEach(btn => {
            btn.className = 'rounded-full bg-gray-600 px-5 py-2 text-sm font-meduim text-gray-600 shadow hover:bg-gray-100'
        });
        e.target.className = "rounded-full bg-[#1E3A8A] px-5 py-2 text-sm font-medium text-white shadow transition hover:bg-[#152960]";
        current = 1;
        render();
    });

});



function render() {

    // const filterd = data.filter(p => p.name.toLowerCase().includes(currentFiltre))

const filterd=data.filter(p=>{
    const filterName= p.name.toLowerCase().includes(currentFiltre);
    const filterCatg=currentcategory==='tout'||p.category.toLowerCase()===currentcategory;
    return filterName && filterCatg;
});


    const start = (current - 1) * limit;
    const pageItem = filterd.slice(start, start + limit);
    proElem.innerHTML = ``;
    for (const p of pageItem) {
        const div = document.createElement('div');
div.className = 'product bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 flex flex-col justify-between';
        div.innerHTML = `
    <img src='${p.image}' class="w-full h-48 object-cover">
<div class="p-2 flex flex-col gap-3">
<h3 class="text-lg font-bold text-gray-800 ">${p.name}</h3> 
<span class="text-xl font-black text-[#F59E0B]">${p.price} DH</span>
<button class="w-full bg-[#1E3A8A] text-white px-4 py-2 rounded-lg hover:bg-[#152960] font-bold transition mt-2 shadow-sm">Ajouter</button>
</div>
`;
        proElem.appendChild(div)
    }


    pag.innerHTML = '';
    const page = Math.ceil(filterd.length / limit);

    for (let i = 1; i <= page; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        let btnClasses = "w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition shadow-sm border ";
        if (i === current) {
            btn.disabled = true;

btnClasses += "bg-[#1E3A8A] text-white border-[#1E3A8A] cursor-default";
        }
        btn.className=btnClasses;
        btn.addEventListener('click', () => {
            current = i;
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
