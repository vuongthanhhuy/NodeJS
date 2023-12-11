const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Customers.init(sequelize, DataTypes);
}

class Customers extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    customerPhoneNumber: {
      type: DataTypes.STRING(250),
      allowNull: false,
      primaryKey: true
    },
    customerName: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    customerAddress: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Customers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customerPhoneNumber" },
        ]
      },
    ]
  });
  }
}
