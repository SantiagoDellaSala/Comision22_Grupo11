const crypto = require('crypto')

function Product(nombre,precio,categoria,peso,talle,material,origen,descripcion){
    this.id =crypto.randomUUID();
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