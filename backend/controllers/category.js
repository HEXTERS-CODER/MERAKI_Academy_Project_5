// ----------------------------------------------- shaker
const connection = require("../models/db");

const createCategory = (req, res) => {
  const { category_title, category_img } = req.body;
  const query = `INSERT INTO foodCategories (category_title, category_img) VALUES (?,?);`;
  const data = [category_title, category_img];

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
      massage: "category created",
      result: result,
    });
  });
};

const getAllCategories = (req, res) => {
  const query = `SELECT  category_title,category_img 
FROM  foodCategories
WHERE is_deleted = 0;`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: "All categoryies",
      result: result,
    });
  });
};

// const updateCategoryByid = (req, res) => {
//   const id = req.params.id;
//   const category_title = req.body.category_title;
//   const category_img = req.body.category_img;
//   const query = `UPDATE foodCategories SET
//   category_title = ? ,
//   category_img = ?
//    WHERE id = ? ; `;
//   const data = [category_title, category_img, id];
//   connection.query(query, data, (err, result) => {
//     if (err) {
//       return res.status(404).json({
//         err,
//       });
//     }
//     if (result.affectedRows != 0) {
//       return res.status(201).json({
//         success: true,
//         massage: `category updated`,
//         result: result,
//       });
//     } else {
//       return res.status(201).json({
//         success: false,
//         massage: `The Article is Not Found`,
//       });
//     }
//   });
// };
const updateCategoryByid = (req, res) => {
  const id = req.params.id;
  const category_title = req.body.category_title;
  const category_img = req.body.category_img;
  const query = `SELECT * FROM foodCategories WHERE id=?;`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    if (!result) {
      res.status(404).json({
        success: false,
        massage: `The foodCategories: ${id} is not found`,
        err: err,
      });
    } // result are the data returned by mysql server
    else {
      console.log(result);
      const query = `UPDATE foodCategories SET category_title=?, category_img=? WHERE id=?;`;
      const data = [
        category_title || result[0].category_title,
        category_img || result[0].category_img,
        id,
      ];
      connection.query(query, data, (err, results) => {
          console.log("errr",err);
          console.log(results);
        if (results.affectedRows != 0)
        res.status(201).json({
          success: true,
          massage: `product`,
          result: results,
        });
      });
    }
  });
};
const deleteCategoryByid = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE foodCategories SET 
  is_deleted = 1 
     WHERE id = ? ; `;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(404).json({
        err,
      });
    }
    if (result.affectedRows != 0) {
      return res.status(201).json({
        success: true,
        massage: `category updated`,
        result: result,
      });
    } else {
      return res.status(201).json({
        success: false,
        massage: `The  category is Not Found`,
      });
    }
  });
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategoryByid,
  deleteCategoryByid,
};

//------------------------------------------------------ marah

//-----------------------------------------------afgani

//-------------------------------------------------------fouad
