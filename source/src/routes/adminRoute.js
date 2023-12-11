const express = require('express');
const adminRoute = express.Router();

const { getPersonalPage, getAllCategory, getAllPhone, getAllCharger, getAllHeadphone, getAllWatch, getAllCustomer, getAllStaff, getAllReport, addNewProduct, updateProductForm, updateProduct, deleteProduct, getAllDemandReport, getProductDetail} = require('../controllers/adminController');

adminRoute.get("/Category", getAllCategory);
adminRoute.get("/Phone", getAllPhone);
adminRoute.get("/Watch", getAllWatch);
adminRoute.get("/Charger", getAllCharger);
adminRoute.get("/Headphone", getAllHeadphone);
adminRoute.get("/Customer", getAllCustomer);
adminRoute.get("/Staff", getAllStaff);
adminRoute.get("/Report", getAllReport);
adminRoute.post("/AddProduct", addNewProduct);
adminRoute.post("/UpdateProductForm", updateProductForm);
adminRoute.post("/UpdateProduct", updateProduct);
adminRoute.post("/Delete", deleteProduct);
adminRoute.post("/getDemandReport", getAllDemandReport);
adminRoute.post("/ProductDetail", getProductDetail);
adminRoute.get("/PersonalPage", getPersonalPage);

module.exports = adminRoute;