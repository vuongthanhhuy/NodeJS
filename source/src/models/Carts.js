const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Carts.init(sequelize, DataTypes);
}

class Carts extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    accountID: {
      type: DataTypes.STRING(250),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Accounts',
        key: 'accountID'
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
    tableName: 'Carts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "accountID" },
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
