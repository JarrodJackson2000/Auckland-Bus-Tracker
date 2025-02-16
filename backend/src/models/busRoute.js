const { DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("../../config/dbConnect").Sequelize; // Corrected path

class BusRoute extends Model {}

BusRoute.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    routeId: { type: DataTypes.STRING, allowNull: false }, // Unique identifier for the route
    routeName: { type: DataTypes.STRING, allowNull: false }, // Name of the route
  },
  {
    sequelize: sequelizeInstance,
    modelName: "bus_routes", // Name of the table in the database
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    freezeTableName: true, // Prevents Sequelize from pluralizing the table name
    underscored: true, // Uses snake_case for column names
  }
);

module.exports = BusRoute;
