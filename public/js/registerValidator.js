
function qs(element){
    return document.querySelector(element);
}

window.addEventListener('load',function(){
    let $form =qs ('#form'),
    $inputName = qs('#name'),
    $nameErrors = qs('#nameErrors'),
    $inputsurname = qs('#surname'),
    $surnameErrors = qs('#surnameErrors'),
    $email = qs('#email'),
    $emailErrors = qs('#emailErrors'),
    $pass = qs('#pass'),
    $passErrors = qs('#passErrors'),
    $pass2 = qs('#pass2'),
    $pass2Errors = qs('#pass2Errors'),
    $file = qs('#avatar'),
    $fileErrors = qs('#fileErrors'),
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    //Nombre
    $inputName.addEventListener('blur', function(){
        console.log($inputName.value.trim())
        switch (true) {
            case !$inputName.value.trim():
                $nameErrors.innerHTML = 'El campo nombre es obligatorio';
                $inputName.classList.add('is-invalid');
            break;
            case !regExAlpha.test($inputName.value):
                $nameErrors.innerHTML = 'Ingresa un nombre valido';
                $inputName.classList.add('is-invalid');
                break;
            case $inputName.value.trim().length <= 2:
                    $nameErrors.innerHTML = 'El nombre debe tener más de 2 caracteres';
                    $inputName.classList.add('is-invalid');
                break;
            default:
                $inputName.classList.remove('is-invalid');
                $inputName.classList.add('is-valid');
                $nameErrors.innerHTML = ""
            break;
        }
    });

    //Apellido
    $inputsurname.addEventListener('blur', function(){
        console.log($inputsurname.value.trim())
        switch (true) {
            case !$inputsurname.value.trim():
                $surnameErrors.innerHTML = 'El campo Apellido es obligatorio';
                $inputsurname.classList.add('is-invalid');
            break;
            case !regExAlpha.test($inputsurname.value):
                $surnameErrors.innerHTML = 'Ingresa un Apellido valido';
                $inputsurname.classList.add('is-invalid');
                break;
            case $inputsurname.value.trim().length <= 1:
                    $surnameErrors.innerHTML = 'El Apellido debe tener más de un caracter';
                    $inputsurname.classList.add('is-invalid');
                break;
            default:
                $inputsurname.classList.remove('is-invalid');
                $inputsurname.classList.add('is-valid');
                $surnameErrors.innerHTML = "";
            break;
        }
    });

    //Email
    $email.addEventListener('blur', function(){
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerHTML = 'El campo email es obligatorio';
                $email.classList.add('is-invalid');
                break;
            case !regExEmail.test($email.value):
                $emailErrors.innerHTML = 'Debe ingresar un email válido';
                $email.classList.add('is-invalid');
                break;    
            default:
                $email.classList.remove("is-invalid");
                $email.classList.add('is-valid');
                $emailErrors.innerHTML = "";
                break;
        }
    });

    //password
    $pass.addEventListener('blur', function(){
        switch (true) {
            case !$pass.value.trim():
                $passErrors.innerHTML = 'El campo contraseña es obligatorio';
                $pass.classList.add('is-invalid');
                break;
            case !regExPass.test($pass.value):
                $passErrors.innerHTML = 'La contraseña debe tener: entre 6 o 12 caracteres, al menos una mayúscula, una minúscula y un número';
                $pass.classList.add('is-invalid');
                break;    
            default:
                $pass.classList.remove("is-invalid");
                $pass.classList.add('is-valid');
                $passErrors.innerHTML = "";
                break;
        }
    });

    //password 2
    $pass2.addEventListener('blur', function(){
        switch (true) {
            case !$pass2.value.trim():
                $pass2Errors.innerHTML = 'Reingresa la contraseña';
                $pass2.classList.add('is-invalid');
                break;
            case $pass2.value !== $pass.value:
                $pass2Errors.innerHTML = 'las contraseñas no coinciden';
                $pass2.classList.add('is-invalid');
                break;             
            default:
                $pass2.classList.remove('is-invalid');
                $pass2.classList.add('is-valid');
                $pass2Errors.innerHTML = "";
                break;
        }
    });

    
    //Img
    $file.addEventListener('change', function fileValidation() {
        let filePath = $file.value, 
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //Extensiones permitidas

        if (!allowefExtensions.exec(filePath)) { 
            $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $file.value = '';
            $imgPreview.innerHTML = '';
            return true;
        } else {
            // Image preview
            console.log($file.files);
            if ($file.files && $file.files[0]) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    $imgPreview.innerHTML = '<img src="' + e.target.result + '"/>';
                };
                reader.readAsDataURL($file.files[0]);
                $fileErrors.innerHTML = '';
                $file.classList.remove('is-invalid');
            }
        }     
    });

    /* const ojo = (params) => {
        params.addEventListener('click', function(){
            this.classList.toggle('fa-eye')
            this.classList.toggle('fa-eye-slash')
            $pass.type = $('password').type === "password" ? "text" : "password"
        });
    }

    ojo($buttonEye1)
    ojo($buttonEye2) */


    $form.addEventListener("submit", function (e) {
        e.preventDefault();
        let error = false;
        let formElements = this.elements;
        console.log(formElements)

        for (let index = 0; index < formElements.length - 1; index++) {
            if (
                formElements[index].value === "" ||
                formElements[index].classList.contains('is-invalid')
            ) {
                formElements[index].classList.add('is-invalid');
                submitErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }

        if (!error) {
            console.log('Todo bien');
            $form.submit();
        }
    });
});



