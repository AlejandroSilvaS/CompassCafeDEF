const formulario = document.getElementById('formulario');
const inputs= document.querySelectorAll('#formulario input'); //Arreglo con los inputs del formulario
const textareas=document.querySelectorAll('#formulario textarea');
const inputsFile = document.querySelectorAll('#formulario input[type="file"]');

/*Expresiones Regulares*/
const expresiones={
	nombre: /^[a-zA-ZÀ-ÿ0-9\:\.\!\,\-\?\s]{4,40}$/, // Para bebida y tienda: Letras y espacios, pueden llevar acentos.
} 

const campos ={
    bebida: false,
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
        case "nombreBebida":
            validarCampo(expresiones.nombre, e.target, 'bebida');
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
            case "imgBebida":
                validarArchivoImagen(e.target, 'imagenBebida');
                break;
        }
    });
});

textareas.forEach((textarea)=>{
    textarea.addEventListener('keyup', ()=>{
        switch(textarea.id){
            case "descripcionBebida":
                validarTextarea("descripcionBebida",5,50);
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
    const bebidaDesOk=validarTextarea("descripcionBebida",5,50);

    if(campos.bebida && bebidaDesOk)
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