window.onload=function(){
    let datos=JSON.parse(localStorage.getItem('datos'));
    ajaxRequest("api/GET/infoCafeteria.php", "POST", {id: datos[0], id_user: datos[1],id_version: datos[2] }, function(response){
        console.log("Server Response:",response);
        
        document.getElementById("titulo").innerText = response.tienda[0].nombre;
        document.getElementById("descripcionLarga").innerText = response.tienda[0].descripcion_amplia;
        document.getElementById("nombre-bebida").innerText = response.bebida[0].nombre;
        document.getElementById("descripcionBebida").innerText = response.bebida[0].descripcion;

        if(response.bebida[0].img_bebida !== null){
            document.getElementById("imgBebida").src = response.bebida[0].img_bebida;
        }
        const urlPortada = response.tienda[0].img_portada;
        if(response.tienda[0].img_portada !== null){
            document.getElementById("url-img").innerHTML = `.informacion {background: url('${urlPortada}') no-repeat center center; background-size:cover;}`;
        }
        document.getElementById("direccion").innerText = "📍 " + response.tienda[0].direccion;
        document.getElementById("instagram").innerHTML = `📸 @<a href="https://www.instagram.com/${response.usuario[0].ig_cuenta}" target="_blank">${response.usuario[0].ig_cuenta}</a>`;
        document.getElementById("celular").innerHTML = `📞 <a href="https://api.whatsapp.com/send?phone=57${response.usuario[0].celular}" target="_blank">(+57) ${response.usuario[0].celular}</a>`;
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
};