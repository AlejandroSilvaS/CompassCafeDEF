window.onload=function(){
    let boton2024=document.getElementById("boton-version2024");
    let boton2025=document.getElementById("boton-version2025");

    boton2024.addEventListener("click",function(e){
        console.log("click");
        localStorage.setItem('id-version',JSON.stringify('3'));
    })   
    
    boton2025.addEventListener("click",function(e){
        console.log("click");
        localStorage.setItem('id-version',JSON.stringify('1'));
    }) 
};