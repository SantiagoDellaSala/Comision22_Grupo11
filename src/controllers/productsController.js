const { leerJSON } = require("../data")
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    allProducts : (req,res) => {
        const products = leerJSON('productos')
        return res.render('products/all-products', {
           products,
           toThousand
        })
    },

    add : (req,res) => {
        return res.render('products/product-add')
    },
    detail : (req, res) => {
        const products = leerJSON('productos')
        const product = products.find(product => product.id === +req.params.id)
        return res.render('products/detail', {
            product,
            toThousand
        })
    },
    edit : (req, res) => {
        return res.render('products/product-edit')
    }
}