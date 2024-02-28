const {leerJSON} = require('./index')
const products = leerJSON('products')
function Product(name,price,category,material,origin,description,discount,quality,mainImage){
    const lastID = products[products.length - 1].id;
    this.id = lastID+1;
    this.name = name;
    this.price = price;
    this.category = category;
    this.material = material;
    this.origin = origin;
    this.description = description;
    this.discount = discount;
    this.quality = quality;
    this.mainImage = mainImage ? mainImage[0].filename : null;
    this.images = images ? images.map(image => image.filename) : [];
}

module.exports = Product;
