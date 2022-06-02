const express = require("express");

const {
  createCategory,
  getAllCategories,
  updateCategoryByid,
  deleteCategoryByid,
} = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post("/create", createCategory);

categoryRouter.get("/allCategories", getAllCategories);

categoryRouter.put("/:id", updateCategoryByid);

categoryRouter.put("/delete/:id", deleteCategoryByid);

module.exports = categoryRouter;
