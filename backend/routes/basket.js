const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  addAndUpdateToCart,
  viewCart,
  removefromcart,
  removeAndDecreas,
} = require("../controllers/basket");

const basketRouter = express.Router();

basketRouter.post("/:product_id", authentication, addAndUpdateToCart);
basketRouter.get("/", authentication, viewCart);
basketRouter.put("/:product_id", authentication, removefromcart);
basketRouter.put("/basket/:product_id", authentication, removeAndDecreas);

module.exports = basketRouter;
