const {leerJSON} = require('./index')
const products = leerJSON('products')
function Product(nombre,precio,categoria,peso,talle,material,origen,descripcion){
    const lastID = products[products.length - 1].id;
    this.id = lastID+1;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.peso = peso || null;
    this.talle = talle || null;
    this.material = material;
    this.origen = origen;
    this.descripcion = descripcion;
    this.mainImage= 'ANAFE-PROTATIL-BUTANO.jpg';
    this.image = [];
}

module.exports = Product;
