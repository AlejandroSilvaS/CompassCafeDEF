window.onload=function(){
    let id_version=JSON.parse(localStorage.getItem('id-version'));
    console.log(id_version);

    if(id_version==='3'){
            document.getElementById("main-titulo").innerText = 'PARTICIPANTES DEL PASAPORTE COMPASS DE CAFÉS ESPECIALES EDICIÓN 2024';
    }
    if(id_version==='1'){
        document.getElementById("main-titulo").innerText = 'PARTICIPANTES DEL PASAPORTE COMPASS DE CAFÉS ESPECIALES EDICIÓN 2025';
    }
    ajaxRequest("api/GET/mostrarCafeterias.php", "POST", {id_version:id_version}, function(response){
        //console.log("Server Response:",response);
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
                let datos=[response[i].id_tienda,response[i].id_user,id_version];
                localStorage.setItem('id-version', JSON.stringify("4"));

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