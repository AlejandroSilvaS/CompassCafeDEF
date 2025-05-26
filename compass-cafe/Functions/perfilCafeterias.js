window.onload=function(){
    ajaxRequest("api/GET/perfilCafeterias.php", "POST", null, function(response){
        console.log("Server Response:",response.sesion);
        if(response.sesion){
            document.getElementById("nombreTienda").innerText = response.nombre;
            document.getElementById("breveDescripcion").innerText = response.descripcion_breve;

            if(response.img_logo != null){
                document.getElementById("img-logo").src = response.img_logo;
            }
        }
        else{
            alert("Página no autorizada.");
            window.location.href='index.html';
        }
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