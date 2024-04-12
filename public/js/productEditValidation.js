
const $ =(id) => document.getElementById(id);

window.onload = function(){

const form = document.querySelector('.formEdit')

console.log(form)

const inputName = form.elements[0]
const inputPrice = form.elements[1]
const selectCategory = form.elements[2]
const selectMaterial = form.elements[3]
const selectOrigin = form.elements[4]
const inputDiscount = form.elements[5]
const selectQuality = form.elements[6]
const inputDescription = form.elements[7]
const inputMainImage = form.elements[8]

inputName.addEventListener('focus', () =>{
    $('info-name').innerHTML = "Indica un Nombre por favor"

    setTimeout(() => {
        $('info-name').innerHTML = ""
    }, 2000);

    $('error-name').innerHTML=''
})

inputName.addEventListener('blur', (event) =>{
    $('info-name').innerHTML = ""
    if(!event.target.value) $('error-name').innerHTML = "Debes ingresar un Nombre"
})

inputPrice.addEventListener('focus', () =>{
    $('info-price').innerHTML = "Indica un Precio por favor"

    setTimeout(() => {
        $('info-price').innerHTML = ""
    }, 2000);

    $('error-price').innerHTML=''
})

inputPrice.addEventListener('blur', (event) =>{
    $('info-price').innerHTML = ""
    if(isNaN(event.target.value.trim()) || event.target.value.trim() <= 0) {
        $('error-price').innerHTML = "Debes ingresar un Precio válido mayor que cero"
    }
})

inputDiscount.addEventListener('focus', () =>{
    $('info-discount').innerHTML = "Indica un Descuento por favor"

    setTimeout(() => {
        $('info-discount').innerHTML = ""
    }, 2000);

    $('error-discount').innerHTML=''
})

inputDiscount.addEventListener('blur', (event) =>{
    $('info-discount').innerHTML = ""
    if(isNaN(event.target.value.trim()) || event.target.value.trim() < 0 || event.target.value.trim() > 100) {
        $('error-discount').innerHTML = "Debes ingresar un Descuento válido mayor a 0 y menor a 100"
    }
})

selectCategory.addEventListener('focus', () =>{
    $('info-category').innerHTML = "Indica una Categoria por favor"

    setTimeout(() => {
        $('info-category').innerHTML = ""
    }, 2000);

    $('error-category').innerHTML=''
})

selectCategory.addEventListener('blur', (event) =>{
    $('info-category').innerHTML = ""
    if(!event.target.value) $('error-category').innerHTML = "Debes ingresar una Categoria"
})


selectMaterial.addEventListener('focus', () =>{
    $('info-material').innerHTML = "Indica un Material por favor"

    setTimeout(() => {
        $('info-material').innerHTML = ""
    }, 2000);

    $('error-material').innerHTML=''
})

selectMaterial.addEventListener('blur', (event) =>{
    $('info-material').innerHTML = ""
    if(!event.target.value) $('error-material').innerHTML = "Debes ingresar un Material"
})

selectOrigin.addEventListener('focus', () =>{
    $('info-origin').innerHTML = "Indica un Origen por favor"

    setTimeout(() => {
        $('info-origin').innerHTML = ""
    }, 2000);

    $('error-origin').innerHTML=''
})

selectOrigin.addEventListener('blur', (event) =>{
    $('info-origin').innerHTML = ""
    if(!event.target.value) $('error-origin').innerHTML = "Debes ingresar un Origen"
})

selectQuality.addEventListener('focus', () =>{
    $('info-quality').innerHTML = "Indica una Calidad por favor"

    setTimeout(() => {
        $('info-quality').innerHTML = ""
    }, 2000);

    $('error-quality').innerHTML=''
})

selectQuality.addEventListener('blur', (event) =>{
    $('info-quality').innerHTML = ""
    if(!event.target.value) $('error-quality').innerHTML = "Debes ingresar una Calidad"
})


inputDescription.addEventListener('focus', () =>{
    $('info-description').innerHTML = "Indica una Descripcion por favor"

    setTimeout(() => {
        $('info-description').innerHTML = ""
    }, 2000);

    $('error-description').innerHTML=''
})

inputDescription.addEventListener('blur', (event) =>{
    $('info-description').innerHTML = ""
    if(!event.target.value) $('error-description').innerHTML = "Debes ingresar una Descripcion"
})

 inputMainImage.addEventListener('change', (event) => {
    
    document.getElementById('image-prev').src = URL.createObjectURL(event.target.files[0])
 });


form.addEventListener('submit', (event) =>{
    event.preventDefault();
    let error = false;

    for (let i = 0; i < form.elements.length - 1; i++) {
        if(!form.elements[i].value){
            error = true
        }
       if(!error){
        form.submit()
       }else{
        alert('Hay campos Vacíos!')
       }
        
    }

})   



    
}