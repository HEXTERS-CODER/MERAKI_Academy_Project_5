const connection = require("../models/db");

//add to cart  depend on the login | token userId
const addAndUpdateToCart = (req, res) => {
  let quantity = 1;
  const product_id = req.params.product_id;
  const user_id = req.token.userId;

  const query = `SELECT * FROM basket WHERE product_id=? AND user_id=? AND is_deleted = 0 `;
  const data = [product_id, user_id];
  console.log("data", data);
  connection.query(query, data, (err, result) => {
    console.log(result);
    if (result.length) {
      result[0].amount = quantity + result[0].amount;
      const query = `UPDATE basket SET amount=? WHERE product_id=? `;
      const data = [result[0].amount, result[0].product_id];
      connection.query(query, data, (err, results) => {
        if (results.affectedRows != 0) {
        return  res.status(201).json({
            success: true,
            massage: `Product Amount Updated +1`,
            result: results,
          });
        } else {
          res.status(500).json({
            success: false,
            massage: "Server error",
            err: err,
          });
        }
      });
    } else {
      const query = `INSERT INTO basket (product_id ,user_id) VALUES (?,?);`;
      const data = [product_id, user_id];
      connection.query(query, data, (err, result) => {
        if (err) {
          res.status(500).json({
            success: false,
            massage: "Server error",
            err: err,
          });
        }
        res.status(200).json({
          success: true,
          massage: `Product Added to Basket`,
          result: result,
        });
      });
    }
  });
};

//View Cart
const viewCart = (req, res) => {
  const user_id = req.token.userId;

  const query = `SELECT productName,img,price,amount FROM basket INNER JOIN  products ON  basket.product_id =products.id WHERE user_id=? AND basket.is_deleted = 0  ;`;
  const data = [user_id];

  connection.query(query, data, (err, result) => {
    console.log("userid :", user_id);
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: `Products In Cart `,
      result: result,
    });
  });
};

// Remove product from Cart
const removefromcart = (req, res) => {
  const user_id = req.token.userId;
  const product_id = req.params.product_id;

  const query = `UPDATE basket SET is_deleted=1 
    WHERE user_id=? AND product_id=?;`;
  const data = [user_id, product_id];
  console.log("data", data);
  connection.query(query, data, (error, result) => {
    console.log(error);
    if (error) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: error.message,
      });
    } else {
      console.log(product_id);
      console.log(user_id);
      res.status(200).json({
        success: true,
        massage: `Product removed `,
        result: result,
      });
    }
  });
};

const removeAndDecreas = (req, res) => {
  let quantity = 1;
  const product_id = req.params.product_id;
  const user_id = req.token.userId;

  const query = `SELECT * FROM basket WHERE product_id=? AND user_id=?`;
  const data = [product_id, user_id];
  console.log("data", data);
  connection.query(query, data, (err, result) => {
    console.log(result);
    if (result.length) {
      result[0].amount = result[0].amount - quantity;
      const query = `UPDATE basket SET amount=? WHERE product_id=? `;
      const data = [result[0].amount, result[0].product_id];
      connection.query(query, data, (err, results) => {
        if (result[0].amount === 0) {
          const query = `UPDATE basket SET is_deleted = 1;`;
          connection.query(query, (err, resultss) => {
            if (err) {
              return res.status(500).json({
                success: false,
                massage: "Server error",
                err: err,
              });
            } else {
              return res.status(201).json({
                success: true,
                message: "deleted from basket",
                result: resultss,
              });
            }
          });
        }
        if (results.affectedRows != 0) {
         return res.status(201).json({
            success: true,
            massage: `Product Amount Updated -1`,
            result: results,
          });
        } else {
         return res.status(500).json({
            success: false,
            massage: "Server error",
            err: err,
          });
        }
      });
    }
  });
};

module.exports = {
  addAndUpdateToCart,
  viewCart,
  removefromcart,
  removeAndDecreas,
};
