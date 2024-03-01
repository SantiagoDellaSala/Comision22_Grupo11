const db =require('../database/models')
const { leerJSON, escribirJSON, } = require("../data");
const { existsSync, unlinkSync } = require('fs');
const Product = require("../data/Product");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let products = leerJSON('products')
const { validationResult } = require('express-validator');

module.exports = {
    /* Santiago */
    allProducts: (req, res) => {
        return res.render('products/all-products', {
            products,
            toThousand
        })
    },
    add: (req, res) => {
        db.Category.findAll({
            order : ['name']
        })
            .then(categories => {
                return res.render('products/product-add',{
                    categories
                })
            })
            .catch(error => console.log(error))
      
    },
    detail: (req, res) => {
		db.Product.findByPk(req.params.id,{
            include:['category','material','origin']} )
			.then(product => {
				return res.render('products/detail', {
					...product.dataValues,
					toThousand,
				});
			})
			.catch(error => console.log(error))

	},
    edit: (req, res) => {

        const { id } = req.params;

        const product = db.Product.findByPk(id, {
            include: ['category', 'material', 'origin', 'quality', 'image']
        })
        const categories = db.Category.findAll({
            order: [['name']]
        })
        Promise.all([product, categories])
            .then(([product, categories]) => {
                return res.render('products/product-edit', {
                    ...product.dataValues,
                    categories,
                    toThousand
                })
            })
            .catch(error => console.log(error))
    },
    update: (req, res) => {
        /* let { nombre, precio, categoria, peso, talle, material, origen, descripcion, descuento, calidad,image} = req.body;
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

        return res.redirect('/admin') */
        const errors = validationResult(req);
        const { name, price, categoryId, materialId, originId, description, discount, qualityId } = req.body;
        
        
        if (errors.isEmpty()) {

            db.Product.update(
                {
                    name: name.trim(),
                    price,
                    categoryId,
                    materialId,
                    originId,
                    description,
                    discount,
                    qualityId
                },
                {
                    where:{id:req.params.id}
                }
            )
            .then(response=>{
				console.log(response)
				return res.redirect("/admin");
			})
			.catch(error => console.log(error))
            
        } else {
            
            return res.render('admin',{
                id: req.params.id,
                name: req.body.name,
                categoryId: req.body.categoryId,
                materialId: req.body.materialId,
                originId: req.body.originId,
                description: req.body.description,
                discount: req.body.discount,
                qualityId: req.body.qualityId,
                old : req.body,
                errors : errors.mapped()
            })
        }
    },

    /* Ulises */

    create: (req, res) => {

   
        const { name, price, description,discount,categoryId,materialId,originId,qualityId}=req.body;
           db.Material.create({
            name
           }) .then(material =>{
            db.Origin.create({
                name
            }).then(origin=>{
                db.Quality.create({
                    name
                }).then(quality=>{
                    db.Product.create({
                        name,
                        price,
                        description,
                        discount,
                        categoryId,
                        materialId,
                        originId,
                        qualityId,
                       }).then(newProduct =>{
                           
                        console.log(newProduct);
                        return res.redirect('/admin')
                    })
               
                    .catch(error=>console.log(error))
                    
                   })
                })
                
                })
               
       
     },
    remove: (req, res) => {
        const { id } = req.params;

        let productos = leerJSON('products');

        const nuevaLista = productos.filter(products => products.id !== +id);

        escribirJSON(nuevaLista, 'products')

        res.redirect('/admin');
    }
}