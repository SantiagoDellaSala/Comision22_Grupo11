const db = require("../database/models");

const modelRespondeUser = {
  attributes : {
    exclude : ['createdAt', 'updatedAt', 'roleId', 'troleyId', 'password', 'avatar']
  },  
  include: [
    {
        association : 'role',
        attributes : ['name']
    },
  ]
}

module.exports = {
  listUsers : async (req, res) => {
    try {
      const users = await db.User.findAll(modelRespondeUser)
      return res.status(200).json({
        ok : true,
        meta : {
          status : 200,
          total : users.lenght,
          url : `http://${req.get('host')}/api/users`
        },
        data : users
    })
    } catch (error) {
      return res.status(error.status || 500).json({
        ok : false,
        msg : error.message || 'Error al iniciar API'
    })
  }
  },
  detailUsers: async (req, res) => {
    try {
      let error;
      const user = await db.User.findByPk(req.params.id, modelRespondeUser)
      if (isNaN(req.params.id)) {
        error = new Error('ID inválido...')
        error.status = 400
        throw error
      }
  
      if (!user) {
        error = new Error('No hay una película con ese ID...')
        error.status = 404
        throw error
      }
      return res.status(200).json({
        ok : true,
        meta : {
          status : 200,
          total : user.lenght,
          url : `http://${req.get('host')}/api/users/${user.id}`
        },
        data : user
    })
    } catch (error) {
      return res.status(error.status || 500).json({
        ok : false,
        msg : error.message || 'Error al iniciar API'
    })}
  }
}