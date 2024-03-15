const db =require('../database/models')
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require("express-validator")


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
        const materials = db.Material.findAll({
            order: [['name']]
        })
        const qualities = db.Quality.findAll({
            order: [['name']]
        })
        const origins = db.Origin.findAll({
            order: [['name']]
        })


        Promise.all([product, categories, materials, qualities, origins])
            .then(([product, categories,materials, qualities, origins]) => {
                return res.render('products/product-edit', {
                    ...product.dataValues,
                    categories,
                    materials, 
                    qualities,
                    origins,
                    toThousand
                })
            })
            .catch(error => console.log(error))
    },
    
    update: (req, res) => {
     
        const errors = validationResult(req);
        const { name, price, categoryId, materialId, originId, description, discount, qualityId } = req.body;
        
        
        if (errors.isEmpty()) {

            db.Product.update(
                {
                    name,
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
       
                    db.Product.create({
                        name,
                        price,
                        description,
                        discount,
                        categoryId,
                        materialId ,
                        originId ,
                        qualityId,
                        mainImage : req.file ? req.file.filename : null,
                       }).then(newProduct =>{
                           
                        console.log(newProduct);
                        return res.redirect('/admin')
                    })
               
                    .catch(error=>console.log(error))

            
       
     },
     remove: (req, res) => {
        const { id } = req.params;
    
        db.Product.findByPk(id)
            .then(product => {
                product.destroy()
                    .then(() => {
                        console.log("Product deleted successfully");
                        return res.redirect("/admin");
                    })
            })
            .catch(error => console.log(error));
    }
    
}
