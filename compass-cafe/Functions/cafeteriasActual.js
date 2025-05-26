window.onload=function(){
    ajaxRequest("api/GET/mostrarCafeterias.php", "POST", {id_version:'1'}, function(response){
        console.log("Server Response:",response);
        for(let i=0; i < response.length ; i++){
            let divElement = document.createElement('div');
            divElement.className="cafe";
            divElement.id='cafe';

            let logoImgElement=document.createElement("img");
            let nombreElement=document.createElement("h2");
            let descripElement=document.createElement("p");
            let linkElement=document.createElement("a");

            let botonElement=document.createElement("button");
            botonElement.className='cafe-button';
            
            if(response[i].img_logo!==null){
                logoImgElement.src=response[i].img_logo;
            } else{
                logoImgElement.src="img/logo/default.png";
            }
            nombreElement.innerText=response[i].nombre;
            descripElement.innerText=response[i].descripcion_breve;
            linkElement.href="infoCafeteria.html";
            botonElement.innerHTML='LEE MÁS <i class="fas fa-arrow-right"></i>';

            botonElement.addEventListener("click",function(e){
                console.log("click");
                let datos=[response[i].id_tienda,response[i].id_user,'1'];
                localStorage.setItem('datos',JSON.stringify(datos));
            })

            linkElement.appendChild(botonElement);

            divElement.appendChild(logoImgElement);
            divElement.appendChild(nombreElement);
            divElement.appendChild(descripElement);
            divElement.appendChild(linkElement);
            document.getElementById("cafeterias-info").appendChild(divElement);
        }
        
    });
        
    function ajaxRequest(url,method,data,callback){
        let xhr = new XMLHttpRequest();
        xhr.open(method,url,true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(JSON.stringify(data));
    }
};