const express = require('express');
const sequelize = require('../models/ConnectDatabase');
const initModels = require('../models/init-models');
const model = initModels(sequelize);

const rootRoute = express.Router();

const adminRoute = require('./adminRoute');

const staffRoute = require('./staffRoute');

rootRoute.use("/admin", adminRoute);
rootRoute.use("/staff", staffRoute)

rootRoute.get("/", (req, res) => {
    res.render('login');
});
rootRoute.post("/LogOut", (req, res) => {
    delete req.session.isLogined;
    res.redirect('/');
})
rootRoute.post("/ChangePass", (req, res) => {
    res.render("staff_first_view/ChangePassStaffFirst");
})
rootRoute.post("/PassChanged", async (req, res) => {
    try{
        let accID = req.session.user.accountID;
        let oldPass = req.body.oldPassword;
        let newPass = req.body.newPassword;
        let newPassConfirm = req.body.newPassword2;
        let data = await model.Accounts.findOne({
            where: {
                accountID: accID
            }
        })
        
        if(data.dataValues.accountPassword == oldPass){
            if(newPass == newPassConfirm){
                let updatedAccount = {
                    accountID: accID,
                    accountFullName: data.dataValues.accountFullName,
                    accountEmail: data.dataValues.accountEmail,
                    accountImage: data.dataValues.accountImage,
                    accountUsername: data.dataValues.accountUsername,
                    accountPassword: newPass,
                    accountStatus: "true",
                    accountRole: data.dataValues.accountRole,
                    firstTime: parseInt("0")
                }
                try{
                    let dt = await model.Accounts.update(updatedAccount, {
                        where: {
                            accountID: accID
                        }
                    })
                    res.redirect('/');
                }
                catch(err){
                    res.render("staff_first_view/ChangePassStaffFirst");
                }
            }
            else{
                res.render("staff_first_view/ChangePassStaffFirst");
            }
        }
        else{
            res.render("staff_first_view/ChangePassStaffFirst");
        }
    }
    catch(err){
        res.render("staff_first_view/ChangePassStaffFirst");
    }
})
rootRoute.post("/postLogin", async (req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;
    try{
        let getUsername = await model.Accounts.findOne({
            where: {
                accountUsername: Username
            }
        });
        if(getUsername != null){
            if(getUsername.dataValues.accountPassword == Password){
                req.session.user = {
                    accountID: getUsername.dataValues.accountID
                };
                if(getUsername.dataValues.accountRole == "admin"){
                    res.redirect("/admin/Category");
                }
                else if(getUsername.dataValues.accountRole == "staff" && getUsername.dataValues.firstTime != 1){
                    res.redirect("/staff/Category");
                }
                else{
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
            }
            else{
                res.send("Wrong password");
            }
        }
        else{
            res.send("User does not exist");
        }
    }
    catch(err){
        res.send("BE error");
    }
});

module.exports = rootRoute;