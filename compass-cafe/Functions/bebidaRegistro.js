window.onload = function() {
    let form = document.getElementById("formulario");
    console.log(form);

    ajaxRequest("api/GET/verificarEstado.php", "POST", null, function(response){
        console.log("server response: ",response.sesion);
        if(response.sesion===false){
            window.location.href='index.html';
        }
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let datos = new FormData(form);
        console.log(datos);

        $.ajax({
            url: 'api/POST/bebidaRegistro.php',
            type: 'POST',
            data: datos,
            contentType: false,
            processData: false,
            success: function (response){
                console.log("Server Response:", response);  
                if(response==='okok2'){
                    alert("Bebida registrada!");
                }
                 if(response==='exists'){
                    alert("Ya tienes una bebida registrada.");
                }
                else{
                    alert("La bebida no se puedo registrar.");
                }
                window.location.href='myCafeteria.html';
            }
        })
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