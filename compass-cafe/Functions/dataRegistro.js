window.onload = function() {
    let acceso=JSON.parse(localStorage.getItem('accesoAregistro')); 
    if(acceso===false){
        alert("Pagina restringida.");
        window.location.href='index.html';
    }

    let form = document.getElementById("formulario");
    console.log(form);
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let datos = new FormData(form);
        console.log(datos);

        $.ajax({
            url: 'api/POST/registro.php',
            type: 'POST',
            data: datos,
            contentType: false,
            processData: false,
            success: function (response){
                console.log("Server Response:", response);  
                window.location.href='inicioSesionPage.html';
            }
        })
    });
}; 

