const { leerJSON } = require("../data")
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const products = leerJSON('products');

module.exports = {
    index : (req, res) => {
        
        return res.render('index',{
            products,
            toThousand
        })
    },
    cart : (req, res) => {
        return res.render('carrito')
    },
    admin : (req,res) => {
       

        return res.render('dashboard', {
            products
        })
    },
    search:(req,res)=>{
        
        const {keywords}= req.query;
		return res.render('results',{
			products:products.filter(product => product.nombre.toLowerCase().includes(keywords.toLowerCase()))
			,keywords
			,toThousand
		})
    }
}