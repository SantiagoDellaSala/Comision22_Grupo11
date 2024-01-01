const { leerJSON, escribirJSON } = require("../data");
const Product = require("../data/Product");

module.exports = {
    add : (req,res) => {
        return res.render('products/product-add')
    },
    detail: (req, res) => {

        const { id } = req.params;
        const products = leerJSON('products');
        const product = products.find(product => product.id == id);

        return res.render('products/product-detail', {
            ...product,
        })

    },
    edit : (req, res) => {
        return res.render('products/product-edit')
    },
    create : (req,res)=>{
        const {nombre,precio,categoria,peso,talle,material,origen,descripcion} = req.body;
        
        const newProduct = new Product(nombre,precio,categoria,peso,talle,material,origen,descripcion);
        const products = leerJSON('productos');
        products.push(newProduct);

        escribirJSON(products,'productos')

        return res.redirect('/admin')
    }
}
