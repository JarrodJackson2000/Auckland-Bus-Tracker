const { DataTypes, Model } = require("sequelize"); // Use `Model`, not `Models`
let dbConnect = require("../../config/dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class BusRoute extends Model {} // Use `Model`, not `Models`

BusRoute.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    route_number: { type: DataTypes.STRING, allowNull: false },
    latitude: { type: DataTypes.FLOAT, allowNull: false },
    longitude: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "bus_routes",
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = BusRoute;
