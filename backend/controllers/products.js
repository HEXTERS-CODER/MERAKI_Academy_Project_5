const connection = require("../models/db");

const createNewProduct = (req, res) => {
  const { productName, img, price, category_id } = req.body;
  const type_id = req.params.type_id;
  const query = `INSERT INTO products (productName,
    img,
    price,
    type_id,
    category_id) VALUES (?,?,?,?,?);`;
  const data = [productName, img, price, type_id, category_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: "Product created",
      result: result,
    });
  });
};

const getAllProduct = (req, res) => {
  // limit as 20
  const limit = 10
  // page number
  const page = req.query.page
  // calculate offset
  const offset = (page - 1) * limit

  const query = `SELECT * FROM products WHERE is_deleted=0  limit ${limit} OFFSET ${offset};`;
  connection.query(query, (err, result) => {

    if (err) {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the product",
      result: {result,
      'page_number':page},
    });
  });
};

const deleteProductById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  const query = `UPDATE products SET is_deleted=1 WHERE id=?;`;
  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `!! No product deleted`,
      });
    }
    return res.status(200).json({
      success: true,
      massage: `Deleted product`,
      result: result,
    });
  });
};

const updateProductById = (req, res) => {
    const { productName, img, price } = req.body;
    const id = req.params.id;
    
    const query = `SELECT * FROM products WHERE id=?;`;
    const data = [id];
    
    console.log("hello");
  connection.query(query, data, (err, result) => {
      console.log(result);
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    if (!result) {
      return res.status(404).json({
        success: false,
        massage: `The product: ${id} is not found`,
        err: err,
      });
    } else {
      const query = `UPDATE products SET productName=?,img=?,price=? WHERE id=?;`;
      const data = [
        productName || result[0].productName,
        img || result[0].img,
        price || result[0].price,
        id
      ];

      connection.query(query, data, (err, result) => {
          console.log(err);
        if (result.affectedRows != 0)
          res.status(201).json({
            success: true,
            massage: `product updated`,
            result: result,
          });
      });
    }
  });
};

const getAllProductByType = (req, res) => {
  const { type_id, category_id } = req.body;
  const query = `SELECT * FROM products WHERE is_deleted=0 AND type_id=? AND category_id=?;`;
  const data = [type_id, category_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: "All the product",
      result: result,
    });
  });
};

const getProductsByTitle = (req, res) => {
  let productName = req.query.productName;
 
  const query = `SELECT * FROM products
   WHERE is_deleted=0 AND 
    productName LIKE ?;`
  const data = [`${productName}%`];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: "All the product",
      result: result,
    });
  });

};

const getAllProductsByCategory = (req, res) => {
  const category_id  = req.params.category_id;
  const query = `SELECT * FROM products WHERE is_deleted=0 AND category_id=?;`;
  const data = [category_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: "All the product by category",
      result: result,
    });
  });
};



module.exports = {
  getAllProduct,
  createNewProduct,
  deleteProductById,
  getAllProductByType,
  updateProductById,
  getProductsByTitle,
  getAllProductsByCategory
};
