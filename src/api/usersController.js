const db = require("../database/models");

const modelRespondeUser = {
  attributes : {
    exclude : ['createdAt', 'updatedAt', 'roleId', 'troleyId', 'password']
  },
  
}

module.exports = {
  listUsers : async (req, res) => {
    try {
      const { count, rows} = await db.User.findAndCountAll()

      const users = await db.User.findAll(modelRespondeUser)
      return res.status(200).json({
        ok : true,
        meta : {
          status : 200,
          total : users.length,  
          url : `http://${req.get('host')}/api/users`,
          count,
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
        error = new Error('No hay un usuario con ese ID...')
        error.status = 404
        throw error
      }
      return res.status(200).json({
        ok : true,
        meta : {
          status : 200,
          total : user.length,
          url : `http://${req.get('host')}/api/users/${user.id}`
        },
        data : user,
        avatar : `${req.protocol}://${req.get('host')}/images/avatars/${user.avatar}`,
    })
    } catch (error) {
      return res.status(error.status || 500).json({
        ok : false,
        msg : error.message || 'Error al iniciar API'
    })}
  }
}