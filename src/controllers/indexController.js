const db =require('../database/models')
const { Op } = require('sequelize')
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



module.exports = {
    index: (req, res) => {
		const oferta = db.Product.findAll({
			where: {categoryId: 1}
		})
		const destacado = db.Product.findAll({
			where: {categoryId: 2}
		})

		Promise.all([oferta, destacado])
			.then(([oferta, destacado]) => {
				return res.render('index', {
					oferta,
					destacado,
					toThousand
				})
            })
			.catch(error=>console.log(error))
	},
    cart: (req, res) => {
        return res.render('carrito')
    },
    admin: (req, res) => {
        db.Product.findAll()
            .then(products => {
                //return res.send(products)
                return res.render('dashboard', {
                    products
                })
            })
            .catch(error => console.log(error))
    },
    search: (req, res) => {
		const { keywords } = req.query;

        if (keywords.length > 0) {
            db.Product.findAll({
                where: {
                    name: {
                        [Op.substring]: keywords
                    }
                }
            })
                .then(products => {
                    return res.render('results', {
                        products,
                        keywords,
                        toThousand
                    })
                })
                .catch(error=>console.log(error))
        } else {
            const oferta = db.Product.findAll({
                where: {
                    categoryId: 1
                }
            })
            const destacado = db.Product.findAll({
                where: {
                    categoryId: 2
                }
            })
    
            Promise.all([oferta, destacado])
                .then(([oferta, destacado]) => {
                    return res.render('index', {
                        oferta,
                        destacado,
                        toThousand
                    })
    
                        
                })
                .catch(error=>console.log(error))
        }

		

	},
}