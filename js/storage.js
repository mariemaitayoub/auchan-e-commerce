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