window.onload=function(){
    let form=document.getElementById("formulario");
    let time=0;
    form.addEventListener("submit",function(event){
        time+=1;
        event.preventDefault();
        let inputData = new FormData(form);
        let dataObject = Object.fromEntries(inputData.entries());

        if(time===1){
            ajaxRequest("api/GET/authReestablecerPssword.php", "POST", dataObject, function(response){
                console.log("Server Response:",response);
                if(response["acceso"]===true){
                    document.getElementById("grupo__password").style.display = 'block';
                    document.getElementById("grupo__confirmarPassword").style.display = 'block';
                }
                if(!response["acceso"]){
                    document.getElementById('grupo__error2').classList.add('grupo__error2-activo');
                    setTimeout(()=>{
                        document.getElementById('grupo__error2').classList.remove('grupo__error2-activo');
                        }, 5500);
                    time=0;
                }
            });
        }

        if(time>=2){
            $.ajax({
                url: 'api/POST/editarContrasena.php',
                type: 'POST',
                data: inputData,
                contentType: false,
                processData: false,
                success: function (response){
                    console.log("Server Response:", response);  
                    if(response["errorVacio"]===true){
                        alert("Campos vacíos: Dígite la contraseña nueva.");
                    }
                    else{
                        alert("Contraseña reestablecida");
                        window.location.href='inicioSesionPage.html';
                    }     
                }
            })
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
};