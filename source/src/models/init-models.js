const DataTypes = require("sequelize").DataTypes;
const _Accounts = require("./Accounts");
const _Carts = require("./Carts");
const _Customers = require("./Customers");
const _History = require("./History");
const _HistoryDetails = require("./HistoryDetails");
const _ProductDetails = require("./ProductDetails");
const _Products = require("./Products");

function initModels(sequelize) {
  const Accounts = _Accounts(sequelize, DataTypes);
  const Carts = _Carts(sequelize, DataTypes);
  const Customers = _Customers(sequelize, DataTypes);
  const History = _History(sequelize, DataTypes);
  const HistoryDetails = _HistoryDetails(sequelize, DataTypes);
  const ProductDetails = _ProductDetails(sequelize, DataTypes);
  const Products = _Products(sequelize, DataTypes);

  Accounts.belongsToMany(Products, { as: 'productID_Products', through: Carts, foreignKey: "accountID", otherKey: "productID" });
  History.belongsToMany(Products, { as: 'productID_Products_HistoryDetails', through: HistoryDetails, foreignKey: "historyID", otherKey: "productID" });
  Products.belongsToMany(Accounts, { as: 'accountID_Accounts', through: Carts, foreignKey: "productID", otherKey: "accountID" });
  Products.belongsToMany(History, { as: 'historyID_Histories', through: HistoryDetails, foreignKey: "productID", otherKey: "historyID" });
  Carts.belongsTo(Accounts, { as: "account", foreignKey: "accountID"});
  Accounts.hasMany(Carts, { as: "Carts", foreignKey: "accountID"});
  History.belongsTo(Accounts, { as: "account", foreignKey: "accountID"});
  Accounts.hasMany(History, { as: "Histories", foreignKey: "accountID"});
  History.belongsTo(Customers, { as: "customerPhoneNumber_Customer", foreignKey: "customerPhoneNumber"});
  Customers.hasMany(History, { as: "Histories", foreignKey: "customerPhoneNumber"});
  HistoryDetails.belongsTo(History, { as: "history", foreignKey: "historyID"});
  History.hasMany(HistoryDetails, { as: "HistoryDetails", foreignKey: "historyID"});
  Carts.belongsTo(Products, { as: "product", foreignKey: "productID"});
  Products.hasMany(Carts, { as: "Carts", foreignKey: "productID"});
  HistoryDetails.belongsTo(Products, { as: "product", foreignKey: "productID"});
  Products.hasMany(HistoryDetails, { as: "HistoryDetails", foreignKey: "productID"});
  ProductDetails.belongsTo(Products, { as: "product", foreignKey: "productID"});
  Products.hasMany(ProductDetails, { as: "ProductDetails", foreignKey: "productID"});

  return {
    Accounts,
    Carts,
    Customers,
    History,
    HistoryDetails,
    ProductDetails,
    Products,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
