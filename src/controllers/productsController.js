const { leerJSON, escribirJSON } = require("../data")
const Product = require("../data/Product");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {
    allProducts : (req,res) => {
        const products = leerJSON('products')
        return res.render('products/all-products', {
           products,
           toThousand
        })
    },
    add : (req,res) => {
        return res.render('products/product-add')
    },
    detail : (req, res) => {
        const products = leerJSON('products')
        const product = products.find(product => product.id === +req.params.id)
        return res.render('products/detail', {
            product,
            toThousand
        })
    },
    edit : (req, res) => {
        return res.render('products/product-edit')
    },
    create : (req,res)=>{
        const {nombre,precio,categoria,peso,talle,material,origen,descripcion} = req.body;
        
        const newProduct = new Product(nombre,precio,categoria,peso,talle,material,origen,descripcion);
        const products = leerJSON('products');
        products.push(newProduct);

        escribirJSON(products,'products')

        return res.redirect('/admin')
    }
}
