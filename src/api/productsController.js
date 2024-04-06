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
      const { count, rows} = await db.Product.findAndCountAll(modelResponseProduct)

      const products = rows.map(product => {
        return {
          ...product.dataValues,
          detail : `${req.protocol}://${req.get('host')}/products/${product.id}`
        }
      })

      return res.status(200).json({
        ok : true,
        count,
        products
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
      const product = await db.Product.findByPk(req.params.id, modelResponseProduct)

      const productCustom = {
        ...product.dataValues,
        category : product.category.name,
        material : product.material.name,
        origin : product.origin.name,
        quality : product.quality.name,
        image : `${req.protocol}://${req.get('host')}/images/${product.mainImage}`
      }

      return res.status(200).json({
        ok : true,
        product : productCustom
      })
    } catch (error) {
      return res.status(error.status || 500).json({
        ok : false,
        msg : error.message || 'Error al iniciar API'
    })}
  }
}