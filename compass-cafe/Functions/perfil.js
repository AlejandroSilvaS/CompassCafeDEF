window.onload=function(){
    ajaxRequest("api/GET/perfil.php", "POST", null, function(response){
        console.log("Server Response:",response);
        if(response.sesion){
            if(response.participacion[0].id_version==='4'){
                document.getElementById("btnParticipar").style.display="none";

                document.getElementById("nombre-bebida").innerText = response.bebida[0].nombre;
                document.getElementById("descripcionBebida").innerText = response.bebida[0].descripcion;
                const urlPortada = response.tienda[0].img_portada;
                if(response.tienda[0].img_portada !== null){
                    document.getElementById("url-img").innerHTML = `.informacion {background: url('${urlPortada}')no-repeat center center; background-size:cover;}`;
                }

                if(response.bebida[0].img_bebida !== null){
                document.getElementById("imgBebida").src = response.bebida[0].img_bebida;
                }
            }
            for(let i=0;i<response.participacion.length;i++){
                if(response.participacion[i].id_version==='2'){
                    document.getElementById("btnParticipar").style.display="none";
                }
            }
            document.getElementById("titulo").innerText = response.tienda[0].nombre;
            document.getElementById("descripcionLarga").innerText = response.tienda[0].descripcion_amplia;

            document.getElementById("direccion").innerText = "📍 " + response.tienda[0].direccion;
            document.getElementById("instagram").innerText = "📸 @" + response.usuario[0].ig_cuenta;
            document.getElementById("numCelular").innerText = "📞 (+57) " + response.usuario[0].celular;

            let index1=null,index3=null,index2=null;
            for(let i=0;i<response.participacion.length;i++){
                let btnbebida=document.createElement('input');
                btnbebida.className="btnBebida";
                btnbebida.type="submit";
                if(response.participacion[i].id_version==='1'){
                    index1=i;
                    btnbebida.id="btnBebida1";
                    btnbebida.value="BEBIDA 2025-1";
                    document.getElementById("header").appendChild(btnbebida);
                }
                else if(response.participacion[i].id_version==='2'){
                    index2=i;
                    btnbebida.id="btnBebida2";
                    btnbebida.value="BEBIDA 2025-2";
                    document.getElementById("header").appendChild(btnbebida);
                }
                else if(response.participacion[i].id_version==='3'){
                    index3=i;
                    btnbebida.id="btnBebida3";
                    btnbebida.value="BEBIDA 2024";
                    document.getElementById("header").appendChild(btnbebida);
                }  
            }
            if(index1===null){
                if(index2===null){
                    index1=index3;
                }
                else{
                    index1=index2;
                } 
            }    
            if(index1!==null && index2!==null){
                localStorage.setItem('index',index2);//JSON.stringify(index1)
            }
        
            document.getElementById("nombre-bebida").innerText = response.bebida[index1].nombre;
            document.getElementById("descripcionBebida").innerText = response.bebida[index1].descripcion;

            if(response.bebida[index1].img_bebida !== null){
                document.getElementById("imgBebida").src = response.bebida[index1].img_bebida;
            }
            const urlPortada = response.tienda[0].img_portada;
            if(response.tienda[0].img_portada !== null){
                document.getElementById("url-img").innerHTML = `.informacion {background: url('${urlPortada}')no-repeat center center; background-size:cover;}`;
            }

            document.getElementById("btnBebida3").addEventListener("click",function(e){
                //console.log('index:',index3);
                e.preventDefault();
                document.getElementById("nombre-bebida").innerText = response.bebida[index3].nombre;
                document.getElementById("descripcionBebida").innerText = response.bebida[index3].descripcion;

                if(response.bebida[index3].img_bebida !== null){
                document.getElementById("imgBebida").src = response.bebida[index3].img_bebida;
                }
                const urlPortada = response.tienda[0].img_portada;
                if(response.tienda[0].img_portada !== null){
                    document.getElementById("url-img").innerHTML = `.informacion {background: url('${urlPortada}')no-repeat center center; background-size:cover;}`;
                }
            })

            document.getElementById("btnBebida1").addEventListener("click",function(e){
                //console.log('index:',index1);
                e.preventDefault();
    
                document.getElementById("nombre-bebida").innerText = response.bebida[index1].nombre;
                document.getElementById("descripcionBebida").innerText = response.bebida[index1].descripcion;

                if(response.bebida[index1].img_bebida !== null){
                document.getElementById("imgBebida").src = response.bebida[index1].img_bebida;
                }
                const urlPortada = response.tienda[0].img_portada;
                if(response.tienda[0].img_portada !== null){
                    document.getElementById("url-img").innerHTML = `.informacion {background: url('${urlPortada}')no-repeat center center; background-size:cover;}`;
                }
            })

            document.getElementById("btnBebida2").addEventListener("click",function(e){
                //console.log('index:',index1);
                e.preventDefault();
    
                document.getElementById("nombre-bebida").innerText = response.bebida[index2].nombre;
                document.getElementById("descripcionBebida").innerText = response.bebida[index2].descripcion;

                if(response.bebida[index2].img_bebida === null){
                    document.getElementById("imgBebida").src = "img/bebida/default.png";
                }else{
                    document.getElementById("imgBebida").src = response.bebida[index2].img_bebida;
                }
                const urlPortada = response.tienda[0].img_portada;
                if(response.tienda[0].img_portada !== null){
                    document.getElementById("url-img").innerHTML = `.informacion {background: url('${urlPortada}')no-repeat center center; background-size:cover;}`;
                }
            })
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