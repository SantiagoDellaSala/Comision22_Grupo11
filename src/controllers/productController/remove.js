const { existsSync, unlinkSync } = require('fs');

const db =require('../../database/models')

module.exports =

remove = (req, res) => {

    const { id } = req.params;

    db.Product.findByPk(id,{
        include:[]
    })
        .then(product=>{


            db.Product.destroy({
                where:{
                    id
                }
            })
            .then(()=>{
                return res.redirect('/admin');
        })
    })

        .catch(error => console.log(error))

  
}
