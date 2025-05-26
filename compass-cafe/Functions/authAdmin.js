window.onload=function(){
    let form=document.getElementById("formulario");
    form.addEventListener("submit",function(event){
        event.preventDefault();
        let inputData = new FormData(form);
        let dataObject = Object.fromEntries(inputData.entries());

        ajaxRequest("api/GET/authAdmin.php", "POST", dataObject, function(response){
            console.log("Server Response:",response);
            if(response["accesoAdmin"]===true){
                localStorage.setItem('sesionAdmin',true);
                document.getElementById("grupo__mensaje-contrasena").classList.remove("grupo__mensaje_contrasena-activo");
                window.location.href='aspirantes.html';
            }
            if(response["accesoAdmin"]===false){
                document.getElementById("grupo__mensaje-contrasena").classList.add("grupo__mensaje_contrasena-activo");
                localStorage.setItem('sesionAdmin',false);
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