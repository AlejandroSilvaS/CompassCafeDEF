window.onload=function(){
    let sesionAdmin=JSON.parse(localStorage.getItem('sesionAdmin'));
    console.log(sesionAdmin);

    if(sesionAdmin===false){
        alert("Página no autorizada.");
        window.location.href='index.html';
    }
    let form=document.getElementById("formulario");
    let contrasenaAdmin='',fechaInicio1='',fechaFin1='';

    ajaxRequest("api/GET/mostrarFecha.php", "POST", null, function(response){
        console.log("server response: ",response);
        document.getElementById("fechaInicial").innerText='Fecha de inicio establecida: '+response.datos[0].fechaInicio;
        document.getElementById("fechaFin").innerText='Fecha de finalización establecida: '+response.datos[0].fechaFin;

        document.getElementById("fechaInicioInput").value=response.datos[0].fechaInicio;
        document.getElementById("fechaFinInput").value=response.datos[0].fechaFin;
        contrasenaAdmin=response.datos[0].contrasena;
        fechaInicio1=response.datos[0].fechaInicio;
        fechaFin1=response.datos[0].fechaFin;

    });
    let guardarInput=0;
    form.addEventListener("submit",function(event){
        guardarInput+=1;
        event.preventDefault();
        let inputData = new FormData(form);
        let dataObject = Object.fromEntries(inputData.entries());

        console.log(dataObject);
        if(guardarInput===1){
            if(dataObject.fechaInicio!==fechaInicio1 ||dataObject.fechaFin!==fechaFin1){
                document.getElementById("grupo__confirmarPassword").style.display = 'block';
            } else{
                window.location.href='aspirantes.html';
            }
        }
        else if(guardarInput>=2){
            if(dataObject.confirmContrasena===contrasenaAdmin){
                document.getElementById("grupo__mensaje").classList.remove("grupo__mensaje-activo");
                if(dataObject.fechaInicio!==fechaInicio1 ||dataObject.fechaFin!==fechaFin1){
                    ajaxRequest("api/POST/editarFecha.php", "POST", dataObject, function(response){
                        console.log("Server Response:",response.datos.fechaFin[0]);
                        if(response.datos.fechaFin[0]==='OK1' || response.datos.fechaInicio[0]==='OK1'){
                            alert("Fecha editada correctamente.");
                        }
                    });
                }
                window.location.href='aspirantes.html';
            }
            else{
                document.getElementById("grupo__mensaje").classList.add("grupo__mensaje-activo");
            }
            
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