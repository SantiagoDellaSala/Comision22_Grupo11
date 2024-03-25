const db = require("../database/models");

const modelResponseProduct = {
  attributes : {
    exclude : [
      'createdAt', 
      'updatedAt', 
      'categoryId',
      'materialId',
      'originId',
      'qualityId',
      'imageId' 
    ]
  },  
  include: [
    {
        association : 'category',
        attributes : ['name']
    },
    {
      association : 'material',
      attributes : ['name']
    },
    {
      association : 'origin',
      attributes : ['name']
    },
    {
      association : 'quality',
      attributes : ['name']
    },
    {
      association : 'image',
      attributes : ['name']
    }
  ]
}

module.exports = {
  listProduct : async (req, res) => {
    try {
      const products = await db.Product.findAll(modelResponseProduct)
      return res.status(200).json({
        ok : true,
        meta : {
          status : 200,
          total : products.lenght,
          url : `http://${req.get('host')}/api/products`
        },
        data : products
    })
    } catch (error) {
      return res.status(error.status || 500).json({
        ok : false,
        msg : error.message || 'Error al iniciar API'
    })
  }
  },
  detailProduct: async (req, res) => {
    try {
      let error;
      const product = await db.Product.findByPk(req.params.id, modelResponseProduct)
      if (isNaN(req.params.id)) {
        error = new Error('ID inválido...')
        error.status = 400
        throw error
      }
  
      if (!product) {
        error = new Error('No hay una película con ese ID...')
        error.status = 404
        throw error
      }
      return res.status(200).json({
        ok : true,
        meta : {
          status : 200,
          total : product.lenght,
          url : `http://${req.get('host')}/api/products/${product.id}`
        },
        data : product
    })
    } catch (error) {
      return res.status(error.status || 500).json({
        ok : false,
        msg : error.message || 'Error al iniciar API'
    })}
  }
}