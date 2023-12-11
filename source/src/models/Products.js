const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Products.init(sequelize, DataTypes);
}

class Products extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    productID: {
      type: DataTypes.STRING(250),
      allowNull: false,
      primaryKey: true
    },
    productName: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    productPrice: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    productRetail: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    productCategory: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    productCreationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    productImage: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productID" },
        ]
      },
    ]
  });
  }
}
