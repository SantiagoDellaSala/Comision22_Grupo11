const express = require('express');
const path = require('path');
const app = express();

const PORT = 3030;

app.use(express.static(path.join(__dirname,'public')));

/* rutas */
app.get('/',(req,res) => res.sendFile(path.join(__dirname,'views','index.html')));
app.get('/register',(req,res) => res.sendFile(path.join(__dirname,'views','register.html')));
app.get('/login',(req,res) => res.sendFile(path.join(__dirname,'views','login.html')));
app.get('/productDetail',(req,res) => res.sendFile(path.join(__dirname,'views','productDetail.html')));
app.get('/product-cart',(req,res) => res.sendFile(path.join(__dirname,'views','productCart.html')));
<<<<<<< HEAD
app.get('/header',(req,res) => res.sendFile(path.join(__dirname,'views', 'partials','header.html')));

=======
app.get('/footer',(req,res) => res.sendFile(path.join(__dirname,'views','partials','footer.html')));
app.get('/ofertas',(req,res) => res.sendFile(path.join(__dirname,'views','ofertas.html')));
app.get('/destacados',(req,res) => res.sendFile(path.join(__dirname,'views','productosDestacados.html')));
>>>>>>> 90d88c0484512f8751d11a9c6acc518b11b881a7




app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}`));