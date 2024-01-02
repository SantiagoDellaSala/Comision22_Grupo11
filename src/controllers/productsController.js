const { leerJSON, escribirJSON } = require("../data")
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
    create: (req,res)=>{
        const {nombre,precio,categoria,peso,talle,material,origen,descripcion} = req.body;
        
        const newProduct = new Product(nombre,precio,categoria,peso,talle,material,origen,descripcion);
        products.push(newProduct);

        escribirJSON(products,'products')

        return res.redirect('/admin')
    },
    
    kill : (req, res) => {
        products.forEach(product=>{
            if (product.id === +req.params.id) {
                let killProduct = products.indexOf(product);
                products.splice(killProduct,1)
            }
        }) 

        escribirJSON(products,'products')
        return res.redirect('/admin')
    }
}
