const sequelize = require('../models/ConnectDatabase');
const Products = require('../models/Products');
const initModels = require('../models/init-models');
const model = initModels(sequelize);
const moment = require('moment');
const { Op, literal } = require('sequelize');

const multer = require('multer');
const path = require('path');
const { DATE } = require('sequelize');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/views/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
}).single('image');


const getAllCategory = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let allCategory = await model.Products.findAll();
            if(allCategory != null){
                res.render("staff_views/Category", {allCategory});
            }
            else{
                res.send("Product list is null");
            }
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const getAllPhone = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let allCategory = await model.Products.findAll({
                where: {
                    productCategory: "Phone"
                }
            });
            if(allCategory != null){
                res.render("staff_views/Category", {allCategory});
            }
            else{
                res.send("Product list is null");
            }
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const getAllHeadphone = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let allCategory = await model.Products.findAll({
                where: {
                    productCategory: "Headphone"
                }
            });
            if(allCategory != null){
                res.render("staff_views/Category", {allCategory});
            }
            else{
                res.send("Product list is null");
            }
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const getAllCharger = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let allCategory = await model.Products.findAll({
                where: {
                    productCategory: "Charger"
                }
            });
            if(allCategory != null){
                res.render("staff_views/Category", {allCategory});
            }
            else{
                res.send("Product list is null");
            }
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const getAllWatch = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let allCategory = await model.Products.findAll({
                where: {
                    productCategory: "Watch"
                }
            });
            if(allCategory != null){
                res.render("staff_views/Category", {allCategory});
            }
            else{
                res.send("Product list is null");
            }
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const getAllCustomer = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let allCustomer = await model.Customers.findAll();
            if(allCustomer != null){
                res.render("staff_views/Users", {allCustomer});
            }
            else{
                res.send("Customer list is null");
            }
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const getAllDemandProduct = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let demandStart = req.body.number1;
            let demandEnd = req.body.number2;
            let allCategory = await model.Products.findAll({
                where: {
                    productPrice: {
                        [Op.and]: [
                            { [Op.gte]: parseFloat(demandStart) },
                            { [Op.lte]: parseFloat(demandEnd) }
                        ]
                    }
                }
            });
            if(allCategory != null){
                res.render("staff_views/Category", {allCategory});
            }
            else{
                res.send("Product list is null");
            }
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const getUserOrderByPN = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let customerID = req.body.customerPhone;

            let getHistory = await model.Customers.findOne({
                where: {
                    customerPhoneNumber: customerID
                }
            });
            let getName = getHistory.dataValues.customerName;

            let userOrders = await model.History.findAll({
                include: ["account"],
                where: {
                    customerPhoneNumber: customerID
                }
            });

            if(userOrders != null){
                res.render("staff_views/UserOrderDetails", {userOrders, getName});
            }
            else{
                res.send("Order list of user is null");
            }
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const getOrderById = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let orderID = req.body.historyID;
            let getHistory = await model.History.findOne({
                include: ["customerPhoneNumber_Customer"],
                where: {
                    historyID: orderID
                }
            });
            let getName = getHistory.dataValues.customerPhoneNumber_Customer.dataValues.customerName;
            
            let userOrders = await model.HistoryDetails.findAll({
                include: ["product"],
                where: {
                    historyID: orderID
                }
            });
            if(userOrders != null){
                res.render("staff_views/UserOrder", {userOrders, getName, getHistory});
            }
            else{
                res.send("Order detail list of user is null");
            }
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const getInfoProduct = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let productID = req.body.productID;
            let getInfoProduct = await model.Products.findOne({
                where: {
                    productID: productID
                }
            });
            
            if(getInfoProduct != null){
                res.render("staff_views/ProductDetails", {getInfoProduct});
            }
            else{
                res.send("Order detail list of user is null");
            }
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const addProductToCart = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let productID = req.body.productID;
            let quantity = req.body.quantity;
            if(parseInt(quantity) != 0){
                let getInfoProduct = await model.Products.findOne({
                    where: {
                        productID: productID
                    }
                });
                
                if(getInfoProduct != null){
                    try{
                        let newCartItem = {
                            quantity: parseInt(quantity),
                            accountID: req.session.user.accountID,
                            productID: productID
                        }
                        let data = await model.Carts.create(newCartItem);
                        console.log(data)
                        res.redirect("/staff/Category")
                    }
                    catch(err){
                        res.redirect("/");
                    }
                }
                else{
                    res.send("Product is null");
                }
            }
            else{
                res.redirect("/staff/Category")
            }
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const getTransaction = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let allCarts = await model.Carts.findAll({
                include: ["product"]
            });
            res.render("staff_views/TransactionProcessing", {allCarts});
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const deleteProductInCart = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let productID = req.body.productID;
            let getItem = await model.Carts.findOne({
                where: {
                    productID: productID
                }
            });
            await getItem.destroy();

            let allCarts = await model.Carts.findAll({
                include: ["product"]
            });
            res.render("staff_views/TransactionProcessing", {allCarts});
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const getAllReport = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let totalRevenue = await model.History.sum('totalPrice');
            let totalHistory = await model.History.count();
            let totalQuantity = await model.HistoryDetails.sum('quantity');
            let allReport = await model.History.findAll({
                include: ["HistoryDetails", "customerPhoneNumber_Customer"]
            });
            if(allReport != null){
                res.render("staff_views/AnalyticalReport", {allReport, totalRevenue, totalHistory, totalQuantity});
            }
            else{
                res.send("Report list is null");
            }
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const getAllDemandReport = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let startCheck = req.body.startCheck;
            let endCheck = req.body.endCheck;
            let formattedStartDate = moment(startCheck, 'MM/DD/YYYY').format('YYYY-MM-DD');
            let formattedEndDate = moment(endCheck, 'MM/DD/YYYY').format('YYYY-MM-DD');
            try{
                let allReport = await model.History.findAll({
                    include: ["HistoryDetails", "customerPhoneNumber_Customer"],
                    where: {
                        historyDate: {
                            [Op.between]: [formattedStartDate, formattedEndDate]
                        }
                    }
                });
                    
                if(allReport != null){
                    let totalRevenue = 0;

                    allReport.forEach(history => {
                        totalRevenue += history.dataValues.totalPrice;
                    });

                    let totalHistory = allReport.length;
                    let totalQuantity = 0;
                    allReport.forEach(history => {
                        history.dataValues.HistoryDetails.forEach(historyDetails => {
                            totalQuantity += historyDetails.dataValues.quantity;
                        });
                    });
                    res.render("staff_views/AnalyticalReport", {allReport, totalRevenue, totalHistory, totalQuantity});
                }
                else{
                    res.redirect("/staff/Report");
                }
            }
            catch(err){
                res.redirect("/staff/Report");
            }
            
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const getProductDetail2 = async (req, res) => {
    try{
        let hisId = req.body.hisID;
        if(req.session.user.accountID != null){
            let allReport = await model.HistoryDetails.findAll({
                include: ["history", "product"],
                where:{
                    historyID: hisId
                }
            });
            if(allReport != null){
                let staff;
                let staffID;
                allReport.forEach(async report => {
                    staffID = report.dataValues.history.dataValues.accountID;
                })
                staff = await model.Accounts.findOne({
                    where: {
                        accountID: staffID
                    }
                });
                res.render("staff_views/HistoryDetails", {allReport, staff});
            }
            else{
                res.send("History details list is null");
            }
        }
        else{
            res.redirect("/");
        }
    }
    catch(err){
        res.redirect("/");
    }
}

const getPaymentPage = async (req, res) => {
    res.render("staff_views/InvoiceDetails");
    // try{
        // if(req.session.user.accountID != null){
            // let allCategory = await model.Products.findAll();
            // if(allCategory != null){
                // res.render("staff_views/Category", {allCategory});
            // }
            // else{
            //     res.send("Product list is null");
            // }
    //     }
    //     else{
    //         res.redirect("/");
    //     }
    // }
    // catch(err){
    //     res.redirect("/");
    // }
}

module.exports = {
    getPaymentPage, getAllReport, getAllDemandReport, getProductDetail2, getAllCategory, getAllCharger, getAllHeadphone, getAllPhone, getAllWatch, getAllCustomer, getAllDemandProduct, getUserOrderByPN, getOrderById, getInfoProduct, addProductToCart, getTransaction, deleteProductInCart
}