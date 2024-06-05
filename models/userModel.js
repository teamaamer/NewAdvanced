import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define(
  "User",
  {
    UserID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Role: {
      type: DataTypes.ENUM("Manager", "Volunteer", "Organization", "admin"),
      allowNull: false,
    },
    ProfileInfo: {
      type: DataTypes.TEXT,
    },
    ProfilePic: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

User.sync()
  .then(() => console.log("User model synchronized with the database"))
  .catch((err) => console.error("User model synchronization failed:", err));

export default User;
