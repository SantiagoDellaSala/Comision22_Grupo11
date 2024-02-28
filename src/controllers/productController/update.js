const { leerJSON, escribirJSON, } = require("../data");
const { existsSync, unlinkSync } = require('fs');
const Product = require("../data/Product");
let products = leerJSON('products')
const categorias = require("../data/categorias.json");


module.exports =

update = (req, res) => {
    let { nombre, precio, categoria, peso, talle, material, origen, descripcion, descuento, calidad,image} = req.body;
    const mainImage = req.file
    products.forEach(product => {
        if (product.id === +req.params.id) {
            (mainImage && existsSync('public/images/productos/' + product.mainImage)) && unlinkSync('public/images/productos/' + product.mainImage)

            if (image) {
                product.image.forEach(image => {
                    existsSync('public/images/productos/' + image) && unlinkSync('public/images/productos/' + image)
                });
            } else {
                product.image = [];
            }

            product.nombre = nombre ? nombre.trim() : product.nombre;
            product.precio = +precio;
            product.categoria = categoria;
            product.peso = +peso;
            product.talle = talle;
            product.material = material;
            product.origen = origen;
            product.descripcion = descripcion.trim()
            product.descuento = +descuento;
            product.calidad = calidad;
            product.mainImage = mainImage ? mainImage.filename : product.mainImage;

        }

    });


    escribirJSON(products, 'products');

    return res.redirect('/admin')
}
