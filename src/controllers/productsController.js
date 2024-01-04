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
        let { nombre, precio, categoria, peso, talle, material, origen, descripcion, descuento, calidad, mainImage } = req.body;
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
                product.image = []



            }

        });


        escribirJSON(products, 'products');

        return res.redirect('/admin')
    },
    create: (req,res)=>{
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