const { leerJSON, escribirJSON } = require("../data");
const Product = require("../data/Product");

module.exports = {
    add : (req,res) => {
        return res.render('products/product-add')
    },
    detail : (req, res) => {
        return res.render('products/detail')
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
    },
    remove : (req, res) => {

        const {id} = req.params;
        const products = leerJSON('products');

    const listaNueva = products.filter(product => product.id != id);

    escribirJSON(listaNueva);

    res.redirect('/admin')
	}
    
}