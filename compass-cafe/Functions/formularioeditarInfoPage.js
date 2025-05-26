const formulario = document.getElementById('formulario');
const inputs= document.querySelectorAll('#formulario input'); //Arreglo con los inputs del formulario
const textareas=document.querySelectorAll('#formulario textarea');
const inputsFile = document.querySelectorAll('#formulario input[type="file"]');

/*Expresiones Regulares*/
const expresiones={
    user_instagram: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ0-9\!\-\,\.\s]{1,40}$/, // Para bebida y tienda: Letras y espacios, pueden llevar acentos.
	celular: /^3\d{9}$/, // que comience en tres y contenga 10 números
    direccion: /^[a-zA-ZÀ-ÿ0-9#\-\.\s]{1,40}$/
} 

const campos ={
    nombre__tienda: true,
    bebida: true,
    direccion: true,
    cuentaInstagram: true,
    numeroCelular: true,
    imagenPortada:true,
    imagenLogo:true,
    imagenBebida:true
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
        const tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg'];
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

    const largeOK=validarTextarea("largeDescripcion",20,110);
    const breveOK=validarTextarea("breveDescripcion",3,12);
    const bebidaDesOk=validarTextarea("descripcionBebida",10,50);

    if(campos.nombre__tienda && campos.bebida && campos.direccion && 
    campos.cuentaInstagram && campos.numeroCelular && largeOK && breveOK
    && bebidaDesOk && campos.imagenBebida && campos.imagenLogo && campos.imagenPortada)
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
    } 
    else {
        document.getElementById('grupo__mensaje').classList.add('grupo__mensaje-activo');
    }
});