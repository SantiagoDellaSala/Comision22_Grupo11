const db = require("../database/models");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require("express-validator");

module.exports = {
  /* Santiago */
  allProducts: (req, res) => {
    const products = db.Product.findAll({
      order: ["name"],
    })
      .then(products => {
        return res.render("products/all-products", {
          products,
          toThousand
        })
      })
      .catch(error => console.log(error))
  },
  add: (req, res) => {
    const categories = db.Category.findAll({
      order: ["name"],
    });
    const materials = db.Material.findAll({
      order: ["name"],
    });
    const qualities = db.Quality.findAll({
      order: ["name"],
    });
    const origins = db.Origin.findAll({
      order: ["name"],
    });
    Promise.all([categories, materials, qualities, origins])

      .then(([categories, materials, qualities, origins]) => {
        return res.render("products/product-add", {
          categories,
          materials,
          qualities,
          origins,
        });
      })

      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: ["category", "material", "origin"],
    })
      .then((product) => {
        return res.render("products/detail", {
          ...product.dataValues,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },
  edit: (req, res) => {
    const { id } = req.params;

    const product = db.Product.findByPk(id, {
      include: ["category", "material", "origin", "quality", "image"],
    });
    const categories = db.Category.findAll({
      order: [["name"]],
    });
    const materials = db.Material.findAll({
      order: [["name"]],
    });
    const qualities = db.Quality.findAll({
      order: [["name"]],
    });
    const origins = db.Origin.findAll({
      order: [["name"]],
    });

    Promise.all([product, categories, materials, qualities, origins])
      .then(([product, categories, materials, qualities, origins]) => {
        return res.render("products/product-edit", {
          ...product.dataValues,
          categories,
          materials,
          qualities,
          origins,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },

  update: (req, res) => {
    
    const errors = validationResult(req);
    if (errors.isEmpty()) {
    const {
      name,
      price,
      categoryId,
      materialId,
      originId,
      description,
      discount,
      qualityId,
    } = req.body;

   
      db.Product.update(
        {
          name,
          price,
          categoryId,
          materialId,
          originId,
          description,
          discount,
          qualityId,
          mainImage: req.file ? req.file.filename : null,
        },
        {
          where: { id: req.params.id },
        }
      )
        .then((response) => {
          console.log(response);
          return res.redirect("/admin");
        })
        .catch((error) => console.log(error));
    } else {
      const { id } = req.params;

      const product = db.Product.findByPk(id, {
        include: ["category", "material", "origin", "quality", "image"],
      });
      const categories = db.Category.findAll({
        order: [["name"]],
      });
      const materials = db.Material.findAll({
        order: [["name"]],
      });
      const qualities = db.Quality.findAll({
        order: [["name"]],
      });
      const origins = db.Origin.findAll({
        order: [["name"]],
      });
  
      Promise.all([product, categories, materials, qualities, origins])
        .then(([product, categories, materials, qualities, origins]) => {
          return res.render("products/product-edit", {
            ...product.dataValues,
            categories,
            materials,
            qualities,
            origins,
            toThousand,
            errors : errors.mapped(),
            old : req.body
          });
        })
        .catch((error) => console.log(error));
    }
  },
  /* Ulises */
  create: (req, res) => {
    const errors = validationResult(req);

    console.log(errors);

    if(errors.isEmpty()){
      const {
        name,
        price,
        description,
        discount,
        categoryId,
        materialId,
        originId,
        qualityId,
      } = req.body;
  
      db.Product.create({
        name,
        price,
        description,
        discount,
        categoryId,
        materialId,
        originId,
        qualityId,
        mainImage: req.file ? req.file.filename : null,
      })
        .then((newProduct) => {
          return res.redirect("/admin");
        })
  
        .catch((error) => console.log(error));
    }else {
      const categories = db.Category.findAll({
        order: ["name"],
      });
      const materials = db.Material.findAll({
        order: ["name"],
      });
      const qualities = db.Quality.findAll({
        order: ["name"],
      });
      const origins = db.Origin.findAll({
        order: ["name"],
      });
      Promise.all([categories, materials, qualities, origins])
  
        .then(([categories, materials, qualities, origins]) => {
          return res.render("products/product-add", {
            categories,
            materials,
            qualities,
            origins,
            errors : errors.mapped(),
            old : req.body
          });
        })
  
        .catch((error) => console.log(error));
    }
   
  },
  remove: (req, res) => {
    const { id } = req.params;

    db.Product.findByPk(id)
      .then((product) => {
        product.destroy().then(() => {
          console.log("Product deleted successfully");
          return res.redirect("/admin");
        });
      })
      .catch((error) => console.log(error));
  },
  filterCat: (req, res) => {
    const { id } = req.params;

    const category = db.Category.findByPk(id);

    const prodCat = db.Product.findAll({
      where: { categoryId: id },
    });
    Promise.all([category, prodCat])
      .then(([category, prodCat]) => {
        return res.render("products/category", {
          category,
          prodCat,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },
};
