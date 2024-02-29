const db =require('../database/models')
const { leerJSON, escribirJSON, } = require("../data");
const { existsSync, unlinkSync } = require('fs');
const Product = require("../data/Product");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let products = leerJSON('products')



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
                db.Material.findAll({
                    order :['name']
                }).then(materials =>{
                    db.Quality.findAll({
                        order : ['name']
                    }).then(qualities =>{
                        db.Origin.findAll({
                            order : ['name']
                        }).then(origins =>{
                            return res.render('products/product-add',{
                            categories,
                            materials,
                            qualities,
                            origins
                            })
                        })
                        
                    })
                    
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
                        materialId ,
                        originId ,
                        qualityId ,
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