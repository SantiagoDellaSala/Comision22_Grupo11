console.log('cart connected!!');
if(!sessionStorage.getItem('cart-suyds')){
    sessionStorage.setItem('cart-suyds', JSON.stringify([])) 
}

var cart = JSON.parse(sessionStorage.getItem('cart-suyds'));
const cartTotalItems = document.getElementById('cart-total-items');

const calcCost = (products) => {
    if(products.length){
        document.getElementById('total-box').hidden = false

        document.getElementById('cart-total').innerHTML = products.map(item => item.quantity * item.price).reduce((a,b) => a + b, 0)
    }else {
        console.log(products.length);
        document.getElementById('total-box').hidden = true
    }
    

}

const showProductInCart = (products = []) =>{

    const cartBox =  document.getElementById('cart-box')
    cartBox.innerHTML = null;

    if(products.length){
        products.forEach(({id, name, price, image, quantity}) => {
            cartBox.innerHTML += `
            <div class="producto">
                <img class="img_class" src="/images/productos/${image}" alt="Product 8">
                <div class="detalles-producto">
                    <p class="nombre_producto">${name}</p>
                    
                    <span class="d-flex flex-row align-items"><p class="cantidad">${quantity} x </p><p class="precio ms-2">$${price}</p></span>
                    
                </div>
                <a href="#" onclick="removeProduct(${id})">
                    <img src="/images/eliminar.svg" alt="" id="eliminar">
                </a>
        </div>
            `
        })
        calcCost(products)
    }else {
        cartBox.innerHTML += `
        <article class="producto__agregado" >
            <h4 style="line-height: 44px">El carrito está vacío</h4>
        </article>
        `
    }
   
}

const showCartTotalItems = (count) => {
     if(cartTotalItems) cartTotalItems.innerHTML = count
  
}

window.onload = () => {
    showCartTotalItems(cart.length)
    calcCost(cart)
    
    if(document.getElementById('cart-box')){
        showProductInCart(cart)
    }
}

const addToCart = (id, name, price, image, quantity = 1) => { 

    const product = cart.find(item => item.id == id);

    if(product){

        const cartUpdated = cart.map(item => {
            if(item.id == id){
                item.quantity = item.quantity + +quantity
            }
            return item
        });
        sessionStorage.setItem('cart-suyds',JSON.stringify(cartUpdated))

    }else{
        const newProduct = {
            id,
            name,
            price : +price,
            image,
            quantity : +quantity
        }
        cart.push(newProduct)
        sessionStorage.setItem('cart-suyds',JSON.stringify(cart))

        showCartTotalItems(JSON.parse(sessionStorage.getItem('cart-suyds')).length)
    }
}

const removeProduct = (id) => {
    let cart = JSON.parse(sessionStorage.getItem('cart-suyds'))
    const cartUpdated = cart.filter(item => item.id != id);
    sessionStorage.setItem('cart-suyds',JSON.stringify(cartUpdated))

    showCartTotalItems(JSON.parse(sessionStorage.getItem('cart-suyds')).length)
    showProductInCart(cartUpdated)
    calcCost(cartUpdated)

}

const incrementQuantity = (id) => {
    const counter = document.getElementById('item-counter' + id)
    let currentValue = parseInt(counter.textContent);
    counter.textContent = currentValue + 1;
    modifyQuantity(id, currentValue + 1)
 };
 
 const decrementQuantity = (id) => {
    const counter = document.getElementById('item-counter' + id)
    let currentValue = parseInt(counter.textContent);
    if (currentValue > 1) {
       counter.textContent = currentValue - 1;
       modifyQuantity(id, currentValue - 1)
    }
 };

 const modifyQuantity = (id, quantity) => {
    const cart = JSON.parse(sessionStorage.getItem('cart-suyds'))
    const cartUpdated = cart.map(item => {
       if( item.id == id){
          item.quantity = quantity
       }
       return item
    });
    sessionStorage.setItem('cart-suyds',JSON.stringify(cartUpdated))
    calcCost(cartUpdated)
 }
 
 const emptyCart = () => {
    sessionStorage.setItem('cart-suyds',JSON.stringify([]))
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Gracias por su compra",
        showConfirmButton: false,
        timer: 1500
      });
    setTimeout(() => {
        location.href = '/'
    }, 1500);
 }


