let aceptar = document.querySelector('.btn-aceptar-cookies');

document.addEventListener('DOMContentLoaded', () => {
    const cookieBox = document.querySelector('.boxed-cookies');
    const btnAceptar = document.querySelector('.btn-aceptar-cookies');
    const btnNoAceptar = document.querySelector('.btn-NO-aceptar-cookies');

    //LEE las cookies
    function getCookie(nombre) {
        const valor = `; ${document.cookie}`;
        const partes = valor.split(`; ${nombre}=`);
        if (partes.length === 2) return partes.pop().split(';').shift();   
    }

    // Mostrar aviso si no se ha aceptado
    if (!getCookie('cookiesAceptadas')) {
        cookieBox.style.display = 'block';
    }

    // ACEPTAR: GUARDA cookie y oculta aviso
    btnAceptar.addEventListener('click', () => {
        document.cookie = "cookiesAceptadas=true; max-age=" + (60 * 60 * 24 * 180)+"; path=/"; 
        cookieBox.style.display = 'none';
        console.log("Cookie guardada.");
    });

    // NO ACEPTAR: solo oculta aviso, no guarda cookie
    btnNoAceptar.addEventListener('click', () => {
        cookieBox.style.display = 'none';
    });

    //Revisar si la cookie ya se creó
    function checkCookie(nombre) {
        let aceptoCookies = getCookie(nombre);
        if (aceptoCookies) {
         //alert("Welcome again. Cookies set. ");
         cookieBox.style.display ='none';
        } else {
          //alert("No has aceptado cookies.");
        }
    }

    // Mostrar aviso si ya hay cookies
    checkCookie('cookiesAceptadas');  
});
