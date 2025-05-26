window.onload=function(){
    console.log(document.getElementById("inputFechaInicio"));
    ajaxRequest("api/GET/mostrarAspirantes.php", "POST", {id_version:'4'}, function(response){
        console.log("Server Response:",response["accesoAdmin"]);
        if (response["accesoAdmin"]===false){
            alert("Página no autorizada.");
            localStorage.setItem('sesionAdmin',false);
            window.location.href = 'index.html';
            
        }
        else if(!response[0].accesoAdmin){
            alert("Página no autorizada.");
            localStorage.setItem('sesionAdmin',false);
            window.location.href = 'index.html';
        }
        else if(response[0].accesoAdmin){
            localStorage.setItem('sesionAdmin',true);
            for(let i=0; i < response[0].tiendas.length ; i++){
                let divElement = document.createElement('div');
                divElement.className="cafe";
                divElement.id='cafe';

                let stateElement=document.createElement("button");
                stateElement.className="btnEstado";
                stateElement.id="btnEstado";

                let logoImgElement=document.createElement("img");
                let nombreElement=document.createElement("h2");
                let descripElement=document.createElement("p");
                let linkElement=document.createElement("a");

                let botonElement=document.createElement("button");
                botonElement.className='cafe-button';
                
                if(response[0].aceptado[i]==='0'){
                    stateElement.innerText="Rechazada";
                    stateElement.style.background="#D9766C";
                }
                else if(response[0].aceptado[i]==='1'){
                    stateElement.innerText="Aceptada";
                    stateElement.style.background="#5DC054";
                }
                

                if(response[0].tiendas[i].img_logo!==null){
                    logoImgElement.src=response[0].tiendas[i].img_logo;
                } else{
                    logoImgElement.src="img/logo/default.png";
                }
                nombreElement.innerText=response[0].tiendas[i].nombre;
                descripElement.innerText=response[0].tiendas[i].descripcion_breve;
                linkElement.href="infoAspirante.html";
                botonElement.innerHTML='LEE MÁS <i class="fas fa-arrow-right"></i>';

                botonElement.addEventListener("click",function(e){
                    console.log("click");
                    let datos=[response[0].tiendas[i].id_tienda,response[0].tiendas[i].id_user,'4'];
                    localStorage.setItem('datos',JSON.stringify(datos));
                    localStorage.setItem('sesionAdmin',true);
                })

                linkElement.appendChild(botonElement);

                divElement.appendChild(stateElement);
                divElement.appendChild(logoImgElement);
                divElement.appendChild(nombreElement);
                divElement.appendChild(descripElement);
                divElement.appendChild(linkElement);
                document.getElementById("cafeterias-info").appendChild(divElement);
            }
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

    document.getElementById("cerrarSesionbtn").addEventListener("click",function(e){
        e.preventDefault();
        ajaxRequest("api/GET/cerrarSesion.php", "POST", null, function(response){
            console.log("server response: ",response);
            if(response.sesionClose){
                window.location.href='index.html';
            }
        });
    })
};