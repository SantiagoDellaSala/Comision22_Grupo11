const { leerJSON, escribirJSON } = require("../data")
const { leerJSON, escribirJSON, cargarArchivo } = require("../data/index");
const Product = require("../data/Product");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const products = leerJSON('products')


module.exports = {
    allProducts : (req,res) => {
        return res.render('products/all-products', {
           products,
           toThousand
        })
    },
    add : (req,res) => {
        return res.render('products/product-add')
    },
    detail : (req, res) => {
        const product = products.find(product => product.id === +req.params.id)
        return res.render('products/detail', {
            ...product,
            toThousand,
            
        })
    },
    edit: (req, res) => {
		const product= products.find((product)=>product.id=== +req.params.id);
        
        return res.render('products/product-edit',{
			...product,
            toThousand,
		})
	},
    update: (req, res) => {
        const {nombre,precio,categoria,peso,talle,material,origen,descripcion} = req.body;

        products.forEach(p => {
            if (p.id === +req.params.id) {
                p.nombre = nombre,
                p.precio = precio,
                p.categoria = categoria,
                p.peso = peso,
                p.talle = talle,
                p.material= material,
                p.origen = origen,
                p.descripcion =descripcion

                let uProduct = products.indexOf(p);
                products.splice(uProduct,1)
            }

            return p
        });

        escribirJSON(products,'products')

        return res.redirect('/admin')
        
    },
    create : (req,res)=>{
        const {nombre,precio,categoria,peso,talle,material,origen,descripcion} = req.body;
        
        const newProduct = new Product(nombre,precio,categoria,peso,talle,material,origen,descripcion);
        const products = leerJSON('productos');
        products.push(newProduct);

        escribirJSON(products,'productos')

        return res.redirect('/admin')
    },
    remove : (req, res) => {
        const {id} = req.params;

        let productos = leerJSON('products');
       
        const nuevaLista = productos.filter(products => products.id !== +id);
        
        escribirJSON(nuevaLista, 'products')
       
         res.redirect('/admin');
    }
}