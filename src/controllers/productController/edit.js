const db = require('../../database/models')

module.exports=

edit = (req, res) => {

    const {id} = req.params

    
    
    const product = db.Product.findByPk(id,{
        include : ['categories','materials']
    })

    const categories = db.Category.findAll({
        order:[['name']]
    })

    Promise.all([product,categories])

    .then(([product,categories ])=>{

        return res.render('products/product-edit', {
            ...product.dataValues,
            categories
        })

    })
    .catch(error =>console.log(error))
   
   
}