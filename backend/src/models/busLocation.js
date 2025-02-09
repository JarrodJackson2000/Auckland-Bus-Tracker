// models/busLocation.js
const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../../config/dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class BusLocation extends Model {}

BusLocation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    busId: { type: DataTypes.STRING, allowNull: false }, // Unique identifier for the bus
    latitude: { type: DataTypes.FLOAT, allowNull: false }, // Latitude of the bus position
    longitude: { type: DataTypes.FLOAT, allowNull: false }, // Longitude of the bus position
    timestamp: { type: DataTypes.DATE, allowNull: false }, // Timestamp of the position update
  },
  {
    sequelize: sequelizeInstance,
    modelName: "bus_locations", // Name of the table in the database
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    freezeTableName: true, // Prevents Sequelize from pluralizing the table name
    underscored: true, // Uses snake_case for column names
  }
);

module.exports = BusLocation;
