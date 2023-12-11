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
                res.render("admin_views/CategoryAdmin", {allCategory});
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
                res.render("admin_views/CategoryAdmin", {allCategory});
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
                res.render("admin_views/CategoryAdmin", {allCategory});
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
                res.render("admin_views/CategoryAdmin", {allCategory});
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
                res.render("admin_views/CategoryAdmin", {allCategory});
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
                res.render("admin_views/UsersAdmin", {allCustomer});
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

const getAllStaff = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let allStaff = await model.Accounts.findAll({
                where: {
                    accountRole: "staff"
                }
            });
            if(allStaff != null){
                res.render("admin_views/ManageStaff", {allStaff});
            }
            else{
                res.send("Staff list is null");
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
                res.render("admin_views/AnalyticalReportAdmin", {allReport, totalRevenue, totalHistory, totalQuantity});
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

const addNewProduct = async (req, res) => {
    try {
      if (req.session.user.accountID != null) {
        let count = await model.Products.count();
        let newProductID = "00" + (parseInt(count) + 1).toString();
  
        const uploadPromise = () => {
          return new Promise((resolve, reject) => {
            upload(req, res, function (err) {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          });
        };
  
        await uploadPromise();
  
        let { name, category, retail, price } = req.body;
        const imagePath = req.file.filename;
  
        let newProduct = {
          productID: newProductID,
          productName: name,
          productPrice: parseFloat(retail),
          productRetail: parseFloat(price),
          productCategory: category,
          productCreationDate: new Date(),
          productImage: imagePath,
        };
  
        try {
          let data = await model.Products.create(newProduct);
          if (data) {
            res.redirect("/admin/Category");
          } else {
            res.send('Add product failed');
          }
        } catch (error) {
          console.error('Lỗi tạo sản phẩm:', error);
          res.status(500).send('Lỗi Nội dung máy chủ');
        }
      } else {
        res.redirect('/');
      }
    } catch (err) {
      res.redirect('/');
    }
  };

  
const updateProductForm = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let proID = req.body.proID;
            let getProduct = await model.Products.findOne({
                where: {
                    productID: proID
                }
            });
            if(getProduct != null){
                res.render("admin_views/UpdateProduct", {getProduct});
            }
            else{
                res.send("Update failed");
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

const updateProduct= async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            const uploadPromise = () => {
                return new Promise((resolve, reject) => {
                  upload(req, res, function (err) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve();
                    }
                  });
                });
              };
        
              await uploadPromise();
        
              let { prodID, inputName, inputCategory, inputImportPrice, inputPrice } = req.body;
              const imagePath = req.file.filename;
        
              let updatedProduct = {
                productID: prodID,
                productName: inputName,
                productPrice: parseFloat(inputImportPrice),
                productRetail: parseFloat(inputPrice),
                productCategory: inputCategory,
                productCreationDate: new Date(),
                productImage: imagePath,
              };
        
              try {
                let data = await model.Products.update(updatedProduct, {
                    where:{
                        productID: prodID
                    }
                });
                res.redirect("/admin/Category");
              } catch (error) {
                console.error('Lỗi sửa sản phẩm:', error);
                res.status(500).send('Lỗi Nội dung máy chủ');
              }
            } else {
              res.redirect('/');
            }
          } catch (err) {
            res.redirect('/');
          }
};

const deleteProduct = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let proID = req.body.proID;
            try{
                let delProduct = await model.Products.findOne({
                    where: {
                        productID: proID
                    }
                })
                await delProduct.destroy();
                res.redirect("/admin/Category");
            }
            catch(err){
                res.redirect("/admin/Category");
            }
        }
    } catch (err) {
        res.redirect('/');
    }
};

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
                    res.render("admin_views/AnalyticalReportAdmin", {allReport, totalRevenue, totalHistory, totalQuantity});
                }
                else{
                    res.redirect("/admin/Report");
                }
            }
            catch(err){
                res.redirect("/admin/Report");
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

const getProductDetail = async (req, res) => {
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
                res.render("admin_views/HistoryDetails", {allReport, staff});
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

const getPersonalPage = async (req, res) => {
    try{
        if(req.session.user.accountID != null){
            let personalPage = await model.Accounts.findOne({
                where: {
                    accountID: req.session.user.accountID
                }
            });
            if(personalPage != null){
                res.render("staff_first_view/AccountStaffFirst", {personalPage});
            }
            else{
                res.send("Account ID doesn't exist");
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


module.exports = {
    getPersonalPage, getAllCategory, getAllPhone, getAllCharger, getAllHeadphone, getAllWatch, getAllCustomer, getAllStaff, getAllReport, addNewProduct, updateProductForm, updateProduct, deleteProduct, getAllDemandReport, getProductDetail
}