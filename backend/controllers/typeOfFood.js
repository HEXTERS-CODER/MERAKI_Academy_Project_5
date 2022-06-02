const connection = require("../models/db");

const createTypeOfFood = (req, res) => {
  const { type } = req.body;

  const query = `INSERT INTO typeOfFood (type) VALUES (?)`;
  const data = [type];
  connection.query(query, data, (err, results) => {
    if (err) {
   return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "Success typeOfFood created",
      results: results,
    });
  });
};

const deleteTypeOfFoodById = (req, res) => {
    const id = req.params.id;
  
    const query = `UPDATE typeOfFood SET is_deleted=1 WHERE id=?;`;
  
    const data = [id];
  
    connection.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          massage: "Server Error",
          err: err,
        });
      }
      if (!result.changedRows) {
        return res.status(404).json({
          success: false,
          massage: `The category : ${id} is not found`,
          err: err,
        });
      }
      res.status(200).json({
        success: true,
        massage: `Succeeded to delete category with id: ${id}`,
        result: result,
      });
    });
  };


  const getAllTypeOfFood = (req, res) => {
    const query = `SELECT * FROM typeOfFood WHERE is_deleted=0;`;
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
        massage: "All the typeOfFood",
        result: result,
      });
    });
  };
  


module.exports = {
    createTypeOfFood,deleteTypeOfFoodById,getAllTypeOfFood
  };
  

