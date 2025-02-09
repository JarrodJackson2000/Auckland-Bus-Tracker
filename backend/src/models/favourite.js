const { DataTypes, Model } = require("sequelize"); // Use `Model`, not `Models`
let dbConnect = require("../../config/dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Favourite extends Model {} // Use `Model`, not `Models`

Favourite.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    bus_route: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "bus_routes", key: "id" },
    },
    // Remove `created_at` if `timestamps: true` is enabled
  },
  {
    sequelize: sequelizeInstance,
    modelName: "favourites",
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    freezeTableName: true,
    underscored: true, // Use snake case for column names (e.g., `created_at`)
  }
);

module.exports = Favourite;
