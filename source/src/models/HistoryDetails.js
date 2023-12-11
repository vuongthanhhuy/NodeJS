const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return HistoryDetails.init(sequelize, DataTypes);
}

class HistoryDetails extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    totalPriceOfProduct: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    productPrice: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    historyID: {
      type: DataTypes.STRING(250),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'History',
        key: 'historyID'
      }
    },
    productID: {
      type: DataTypes.STRING(250),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Products',
        key: 'productID'
      }
    }
  }, {
    sequelize,
    tableName: 'HistoryDetails',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "historyID" },
          { name: "productID" },
        ]
      },
      {
        name: "productID",
        using: "BTREE",
        fields: [
          { name: "productID" },
        ]
      },
    ]
  });
  }
}
