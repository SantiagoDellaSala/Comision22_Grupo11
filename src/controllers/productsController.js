const { leerJSON, escribirJSON } = require("../data")
const Product = require("../data/Product");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let products = leerJSON('products')


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
        let { nombre, precio, categoria, peso, talle, material, origen, descripcion, descuento, calidad, mainImage, image } = req.body;
        products.forEach(product => {
            if (product.id == +req.params.id) {
                (req.file && existsSync('public/images/' + product.mainImage)) && unlinkSync('public/images/' + product.mainImage)

                product.nombre = nombre,
                product.precio = precio,
                product.categoria = categoria,
                product.peso = peso,
                product.talle = talle,
                product.material = material,
                product.origen = origen,
                product.descripcion = descripcion,
                product.descuento = descuento,
                product.calidad = calidad,
                product.mainImage = req.file ? mainImage : product.mainImage,
                product.image = [image]



            }

        });


        escribirJSON(products, 'products');

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
