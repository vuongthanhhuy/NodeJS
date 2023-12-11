const express = require('express');
const staffRoute = express.Router();

const { getPaymentPage, getAllReport, getAllDemandReport, getProductDetail2, getAllCategory, getAllPhone, getAllCharger, getAllHeadphone, getAllWatch, getAllCustomer, getAllDemandProduct, getUserOrderByPN, getOrderById, getInfoProduct, addProductToCart, getTransaction, deleteProductInCart } = require('../controllers/staffController');

staffRoute.get("/Category", getAllCategory);
staffRoute.get("/Phone", getAllPhone);
staffRoute.get("/Watch", getAllWatch);
staffRoute.get("/Headphone", getAllHeadphone);
staffRoute.get("/Charger", getAllCharger);
staffRoute.post("/ProductDetail", getInfoProduct);
staffRoute.get("/Customer", getAllCustomer);
staffRoute.get("/Transaction", getTransaction);
staffRoute.get("/Report", getAllReport);
staffRoute.get("/continueToPayment", getPaymentPage);
staffRoute.post("/getDemandProduct", getAllDemandProduct);
staffRoute.post("/userDetail", getUserOrderByPN);
staffRoute.post("/orderDetail", getOrderById);
staffRoute.post("/AddToCart", addProductToCart);
staffRoute.post("/deleteFromCart", deleteProductInCart);
staffRoute.post("/getDemandReport", getAllDemandReport);
staffRoute.post("/ProductDetail2", getProductDetail2);

module.exports = staffRoute;