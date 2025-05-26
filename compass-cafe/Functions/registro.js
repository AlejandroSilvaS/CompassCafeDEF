const formulario = document.getElementById('formulario');
const inputs= document.querySelectorAll('#formulario input'); //Arreglo con los inputs del formulario
const textareas=document.querySelectorAll('#formulario textarea');
const inputsFile = document.querySelectorAll('#formulario input[type="file"]');

/*Expresiones Regulares*/
const expresiones={
    user_instagram: /^[a-zA-Z0-9\.\_\-]{4,25}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ0-9\:\-\s]{4,40}$/, // Para bebida y tienda: Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	celular: /^\d{10}$/, // que comience en tres y contenga 10 números
    numero_nit: /^\d{9}$/, // 10 dígitos
    direccion: /^[a-zA-ZÀ-ÿ0-9#\-\.\,\s]{1,40}$/
} 

const campos ={
    correo: false,
    NIT: false,
    nombre__tienda: false,
    bebida: false,
    direccion: false,
    cuentaInstagram: false,
    numeroCelular: false,
    password: false,
    imagenPortada:false,
    imagenLogo:false,
    imagenBebida:false
}

function contarPalabras(texto){
    const limpio = texto.trim().replace(/\s+/g,' ');
    return limpio.length > 0 ? limpio.split(' ').length:0;
}

function validarTextarea(idCampo, minPalabras, maxPalabras){
    const textarea = document.getElementById(idCampo);
    const grupo = document.getElementById(`grupo__${idCampo}`);
    const mensaje=grupo.querySelector('.mensaje-error');

    const palabras = contarPalabras(textarea.value);

    if (palabras >= minPalabras && palabras<=maxPalabras){
        grupo.classList.remove('formulario__grupo-incorrecto');
        grupo.classList.add('formulario__grupo-correcto');
        mensaje.classList.remove('mensaje-error-activo');
        return true;
    }
    else{
        grupo.classList.add('formulario__grupo-incorrecto');
        grupo.classList.remove('formulario__grupo-correcto');
        mensaje.classList.add('mensaje-error-activo');
        return false;
    }
}

const validarArchivoImagen = (input, campo) => {
    const archivo = input.files[0];

    if (archivo){
        const tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg','image/webp'];
        if (tiposPermitidos.includes(archivo.type)) {
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} .mensaje-error`).classList.remove('mensaje-error-activo');
            campos[campo] = true;
        }
        else{
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
            document.querySelector(`#grupo__${campo} .mensaje-error`).classList.add('mensaje-error-activo');
            campos[campo] = false;
        }
    } else{
        campos[campo] = false;
    }
}

const validarFormulario = (e) => {
    switch(e.target.name){
        case "email":
            validarCampo(expresiones.correo, e.target, 'correo');
        break;
        case "nit":
            validarCampo(expresiones.numero_nit, e.target, 'NIT');
        break;
        case "nombreTienda":
            validarCampo(expresiones.nombre, e.target, 'nombre__tienda');
        break;
        case "nombreBebida":
            validarCampo(expresiones.nombre, e.target, 'bebida');
        break;
        case "direccionTienda":
            validarCampo(expresiones.direccion, e.target, 'direccion');
        break;
        case "cuentainstagram":
            validarCampo(expresiones.user_instagram, e.target, 'cuentaInstagram');
        break;
        case "numeroCelular":
            validarCampo(expresiones.celular, e.target, 'numeroCelular');
        break;
        case "contrasena":
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword();
        break;
        case "confirmContrasena":
            validarPassword();
        break;
    }  
}

const validarCampo = (expresion,input,campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} .mensaje-error`).classList.remove('mensaje-error-activo');
        campos[campo]=true;
    }
    else{
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__${campo} .mensaje-error`).classList.add('mensaje-error-activo');
        campos[campo]=false;
    }
}

const validarPassword = () =>{
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('passwordConfirm');

    if(inputPassword1.value !== inputPassword2.value){
        document.getElementById(`grupo__confirmarPassword`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__confirmarPassword .mensaje-error`).classList.add('mensaje-error-activo');
        campos['password']=false;
    }
    else{
        document.getElementById(`grupo__confirmarPassword`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__confirmarPassword`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__confirmarPassword .mensaje-error`).classList.remove('mensaje-error-activo');
        campos['password']=true;
    }
}

inputsFile.forEach((inputFile) =>{
    inputFile.addEventListener('change', (e) => {
        switch (e.target.name) {
            case "imgPortada":
                validarArchivoImagen(e.target, 'imagenPortada');
                break;
            case "imgLogo":
                validarArchivoImagen(e.target, 'imagenLogo');
                break;
            case "imgBebida":
                validarArchivoImagen(e.target, 'imagenBebida');
                break;
        }
    });
});

textareas.forEach((textarea)=>{
    textarea.addEventListener('keyup', ()=>{
        switch(textarea.id){
            case "largeDescripcion":
                validarTextarea("largeDescripcion",20,110);
            break;
            case "breveDescripcion":
                validarTextarea("breveDescripcion",3,12);
            break;
            case "descripcionBebida":
                validarTextarea("descripcionBebida",10,50);
            break;
        }
    });
});


inputs.forEach((input)=>{
    input.addEventListener('keyup',validarFormulario);
    input.addEventListener('blur',validarFormulario);
});

formulario.addEventListener('submit',(e)=>{
    //e.preventDefault(); //No se envían los datos a ningún lado

    const terminos = document.getElementById('terminos');

    const largeOK=validarTextarea("largeDescripcion",20,110);
    const breveOK=validarTextarea("breveDescripcion",3,12);
    const bebidaDesOk=validarTextarea("descripcionBebida",10,50);

    if(campos.correo && campos.nombre__tienda && campos.NIT && campos.bebida && campos.direccion && 
    campos.cuentaInstagram && campos.numeroCelular && campos.password && terminos.checked
    && largeOK && breveOK && bebidaDesOk && campos.imagenBebida && campos.imagenLogo && campos.imagenPortada)
    {
        //formulario.reset();

        document.getElementById('mensaje-exito').classList.add('mensaje-exito-activo');
        setTimeout(()=>{
            document.getElementById('mensaje-exito').classList.remove('mensaje-exito-activo');
        }, 4500);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((input)=>{
            input.classList.remove('formulario__grupo-correcto');
        });

        document.getElementById('grupo__mensaje').classList.remove('grupo__mensaje-activo');
        //window.location.href='../inicioSesion.html'; //Debe ir a inicio de sesión
    } 
    else {
        document.getElementById('grupo__mensaje').classList.add('grupo__mensaje-activo');
    }
});