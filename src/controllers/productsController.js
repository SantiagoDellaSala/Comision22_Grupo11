const db =require('../database/models')
const { leerJSON, escribirJSON, } = require("../data");
const { existsSync, unlinkSync } = require('fs');
const Product = require("../data/Product");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let products = leerJSON('products')
const categorias = require("../data/categorias.json");


module.exports = {
    /* Santiago */
    allProducts: (req, res) => {
        return res.render('products/all-products', {
            products,
            toThousand
        })
    },
    add: (req, res) => {
        return res.render('products/product-add')
    },

    detail: (req, res) => {
        const product = products.find(product => product.id === +req.params.id)
        return res.render('products/detail', {
            ...product,
            toThousand,

        })
    },
    edit: (req, res) => {
        const product = products.find((product) => product.id === +req.params.id);

        return res.render('products/product-edit', {
            ...product,
            toThousand, categorias
        })
    },
    update: (req, res) => {
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
    },

    /* Ulises */

    create: (req, res) => {

    const { name, price, description,discount,categoryId,materialId,originId,qualityId}=req.body;
            
       db.Product.create({
        name,
        price,
        description,
        discount,
        categoryId,
        materialId,
        originId,
        qualityId,
        mainImage,
       }).then(newProduct =>{
        console.log(newProduct);
        return res.redirect('/admin')
    })
    .catch(error=>console.log(error))

    
    },
    remove: (req, res) => {
        const { id } = req.params;

        let productos = leerJSON('products');

        const nuevaLista = productos.filter(products => products.id !== +id);

        escribirJSON(nuevaLista, 'products')

        res.redirect('/admin');
    }
}