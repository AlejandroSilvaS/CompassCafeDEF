window.onload = function() {
    let index=Number(localStorage.getItem('index'));
    console.log(index);
    if(isNaN(index)){
        index=0;
    }
    console.log(index);
    let form = document.getElementById("formulario");
    //sconsole.log(form);
    ajaxRequest("api/GET/mostrarDatos.php", "POST", null, function(response){
        console.log("Server Response:",response);
        if(response.sesion){
            document.getElementById("nit").value = response.tienda[0].NIT;
            document.getElementById("correo").value = response.usuario[0].correo;
            document.getElementById("cuentaInstagram").value = response.usuario[0].ig_cuenta;
            document.getElementById("numeroCel")    .value = response.usuario[0].celular;
            document.getElementById("nombreTienda").value = response.tienda[0].nombre;
            document.getElementById("largeDescripcion").value = response.tienda[0].descripcion_amplia;
            document.getElementById("breveDescripcion").value = response.tienda[0].descripcion_breve;
            document.getElementById("bebida").value = response.bebida[index].nombre;
            document.getElementById("descripcionBebida").value = response.bebida[index].descripcion;
            document.getElementById("direccion").value = response.tienda[0].direccion;

            if(response.tienda[0].img_portada!==null){
                document.getElementById("img-portada").src=response.tienda[0].img_portada;
            }
            if(response.tienda[0].img_logo!==null){
                document.getElementById("img-logo").src=response.tienda[0].img_logo;
            }
            if(response.tienda[0].img_bebida!==null){
                document.getElementById("img-bebida").src=response.bebida[index].img_bebida;
            }
        }
        else{
            //window.location.href = 'about:blank';
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

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let datos = new FormData(form);
        //console.log(datos);

        $.ajax({
            url: 'api/POST/editarDatos.php',
            type: 'POST',
            data: datos,
            contentType: false,
            processData: false,
            success: function (response){
                console.log("Server Response:", response);  
                window.location.href='myCafeteria.html';
            }
        })
    });

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

