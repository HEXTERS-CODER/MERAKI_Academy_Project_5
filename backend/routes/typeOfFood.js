const express = require("express");

//controllers
const { createTypeOfFood,deleteTypeOfFoodById,getAllTypeOfFood} = require("../controllers/typeOfFood");

const typeOfFoodRouter = express.Router();


typeOfFoodRouter.post("/",createTypeOfFood);
typeOfFoodRouter.delete ("/:id",deleteTypeOfFoodById);
typeOfFoodRouter.get ("/",getAllTypeOfFood);

module.exports = typeOfFoodRouter;
