const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return History.init(sequelize, DataTypes);
}

class History extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    historyID: {
      type: DataTypes.STRING(250),
      allowNull: false,
      primaryKey: true
    },
    historyDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    customerPhoneNumber: {
      type: DataTypes.STRING(250),
      allowNull: true,
      references: {
        model: 'Customers',
        key: 'customerPhoneNumber'
      }
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    totalReturn: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    totalPaid: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    accountID: {
      type: DataTypes.STRING(250),
      allowNull: true,
      references: {
        model: 'Accounts',
        key: 'accountID'
      }
    }
  }, {
    sequelize,
    tableName: 'History',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "historyID" },
        ]
      },
      {
        name: "customerPhoneNumber",
        using: "BTREE",
        fields: [
          { name: "customerPhoneNumber" },
        ]
      },
      {
        name: "accountID",
        using: "BTREE",
        fields: [
          { name: "accountID" },
        ]
      },
    ]
  });
  }
}
