const { DataTypes } = require("sequelize");
const {sequelize} = require('../mysql_db.config')

export const Order = sequelize.define("order", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    customerId: {
        type:   DataTypes.INTEGER,
    },
    quantity: {
        type: DataTypes.INTEGER
    }
});
