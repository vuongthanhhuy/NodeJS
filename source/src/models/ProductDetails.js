const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ProductDetails.init(sequelize, DataTypes);
}

class ProductDetails extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    productID: {
      type: DataTypes.STRING(250),
      allowNull: true,
      references: {
        model: 'Products',
        key: 'productID'
      }
    },
    productInfo: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    productScreen: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    productOS: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    productCamera: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    productChip: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    productRam: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    productMemory: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    productSim: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    productPin: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ProductDetails',
    timestamps: false,
    indexes: [
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
