window.onload=function(){
    let form=document.getElementById("formulario");
    form.addEventListener("submit",function(event){
        event.preventDefault();
        let inputData = new FormData(form);
        let dataObject = Object.fromEntries(inputData.entries());

        ajaxRequest("api/GET/auth.php", "POST", dataObject, function(response){
            console.log("Server Response:",response);
            if(response["acceso"]===true){
                document.getElementById("grupo__mensaje-solicitud").classList.remove("grupo__mensaje_solicitud-activo");
                document.getElementById("grupo__mensaje-contrasena").classList.remove("grupo__mensaje_contrasena-activo");
                document.getElementById("grupo__mensaje-registro").classList.remove("grupo__mensaje_registro-activo");
                window.location.href='myCafeteria.html';
            }
            if(response["acceso"]===false){
                document.getElementById("grupo__mensaje-solicitud").classList.remove("grupo__mensaje_solicitud-activo");
                document.getElementById("grupo__mensaje-registro").classList.remove("grupo__mensaje_registro-activo");
                document.getElementById("grupo__mensaje-contrasena").classList.add("grupo__mensaje_contrasena-activo");
            }
            if(response["accesoAcept"]===false){
                document.getElementById("grupo__mensaje-contrasena").classList.remove("grupo__mensaje_contrasena-activo");
                document.getElementById("grupo__mensaje-registro").classList.remove("grupo__mensaje_registro-activo");
                document.getElementById("grupo__mensaje-solicitud").classList.add("grupo__mensaje_solicitud-activo");
            }
            if(response["registro"]===false){
                document.getElementById("grupo__mensaje-contrasena").classList.remove("grupo__mensaje_contrasena-activo");
                document.getElementById("grupo__mensaje-solicitud").classList.remove("grupo__mensaje_solicitud-activo");
                document.getElementById("grupo__mensaje-registro").classList.add("grupo__mensaje_registro-activo");
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
};