window.onload=function(){
    let sesionAdmin=JSON.parse(localStorage.getItem('sesionAdmin'));
    console.log(sesionAdmin);

    let btnAceptar=document.getElementById("btnAceptar");
    let btnRechazar=document.getElementById("btnRechazar");
    let datos=JSON.parse(localStorage.getItem('datos'));
    console.log(datos);

    let responseGet;

    if(sesionAdmin===false){
        alert("Página no autorizada.");
        window.location.href='index.html';
    }
    if(datos===null){
        alert("Página no autorizada.");
        window.location.href='index.html';
    }

    ajaxRequest("api/GET/infoCafeteria.php", "POST", {id: datos[0], id_user: datos[1],id_version: datos[2] }, function(response){
        console.log("Server Response:",response);
        responseGet=response;

        if(response.usuario[0].aceptado==='0'){
            document.getElementById("descrip-state").innerHTML='<b>Estado actual: </b>Rechazada';
        }
        else if(response.usuario[0].aceptado==='1'){
            document.getElementById("descrip-state").innerHTML='<b>Estado actual: </b>Aceptada';
        }

        document.getElementById("titulo").innerText = response.tienda[0].nombre;
        document.getElementById("descripcionLarga").innerText = response.tienda[0].descripcion_amplia;
        document.getElementById("nit").innerText = 'NIT: '+response.tienda[0].NIT;
        document.getElementById("nombre-bebida").innerText = response.bebida[0].nombre;
        document.getElementById("descripcionBebida").innerText = response.bebida[0].descripcion;

        if(response.bebida[0].img_bebida !== null){
            document.getElementById("imgBebida").src = response.bebida[0].img_bebida;
        }
        const urlPortada = response.tienda[0].img_portada;
        if(response.tienda[0].img_portada !== null){
            document.getElementById("url-img").innerHTML = `.informacion {background: url('${urlPortada}') no-repeat center center; background-size:cover;}`;
        }
        document.getElementById("correo").innerText = "📧 " + response.usuario[0].correo;
        document.getElementById("instagram").innerHTML = `📸 @<a href="https://www.instagram.com/${response.usuario[0].ig_cuenta}" target="_blank">${response.usuario[0].ig_cuenta}</a>`;
        document.getElementById("celular").innerHTML = `📞 <a href="https://api.whatsapp.com/send?phone=57${response.usuario[0].celular}" target="_blank">(+57) ${response.usuario[0].celular}</a>`;
        document.getElementById("direccion").innerText = "📍 " + response.tienda[0].direccion;
    });

    btnAceptar.addEventListener("click", function(e){
        e.preventDefault();
        ajaxRequest("api/POST/editarAceptado.php", "POST", {id_user: responseGet.usuario[0].id_user, aceptado: '1'}, function(response){
            console.log("server Response:",response);
            if(response.aceptadoState==='0'){
                document.getElementById("descrip-state").innerHTML='<b>Estado actual: </b>Rechazada';
            }
            if(response.aceptadoState==='1'){
                document.getElementById("descrip-state").innerHTML='<b>Estado actual: </b>Aceptada';
            }
        });
    });

    btnRechazar.addEventListener("click", function(e){
        e.preventDefault();
        ajaxRequest("api/POST/editarAceptado.php", "POST", {id_user: responseGet.usuario[0].id_user, aceptado: '0'}, function(response){
            console.log("server Response:",response);
            if(response.aceptadoState==='1'){
                document.getElementById("descrip-state").innerHTML='<b>Estado actual: </b>Aceptada';
            }
            else if(response.aceptadoState==='0'){
                document.getElementById("descrip-state").innerHTML='<b>Estado actual: </b>Rechazada';
            }
        });
        
    });
        
    function ajaxRequest(url,method,data,callback){
        let xhr = new XMLHttpRequest();
        xhr.open(method,url,true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function(){
            if (xhr.readyState ===4 && xhr.status===200){
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