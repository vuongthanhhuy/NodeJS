const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Accounts.init(sequelize, DataTypes);
}

class Accounts extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    accountID: {
      type: DataTypes.STRING(250),
      allowNull: false,
      primaryKey: true
    },
    accountFullName: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    accountEmail: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    accountImage: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    accountUsername: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    accountPassword: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    accountStatus: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    accountRole: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    firstTime: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Accounts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "accountID" },
        ]
      },
    ]
  });
  }
}
