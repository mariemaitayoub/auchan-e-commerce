export function products(){
    console.log("working ")
return  fetch("./data/data.json")
.then(response => response.json())
.then (data =>{
    return data;
    // console.log("sa7i7",data)
})
.catch(error =>{
    console.log("error",error);
});
}
export const getStorageItem=(key)=>{
    const data=localStorage.getItem(key);
    return data ? JSON.parse(data):null;

};
export const setStorageItem = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};