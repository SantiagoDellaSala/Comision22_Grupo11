const { leerJSON } = require("../data")
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index : (req, res) => {
        const products = leerJSON('productos');
        return res.render('index',{
            products,
            toThousand
        })
    },
    cart : (req, res) => {
        return res.render('carrito')
    },
    admin : (req,res) => {
        const products = leerJSON('productos');

        return res.render('dashboard', {
            products
        })
    }
}