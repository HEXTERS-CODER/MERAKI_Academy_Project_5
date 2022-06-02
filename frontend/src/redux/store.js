
import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth";
import products from "./reducers/products";

export default configureStore({
    reducer:{
        auth:auth,
        products:products,
    }
})