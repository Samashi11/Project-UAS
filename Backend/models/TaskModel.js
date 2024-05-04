import Sequelize from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Task = db.define('tasks', {
  judul_tugas: DataTypes.STRING,
  detail_tugas: DataTypes.TEXT,
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  bukti: DataTypes.STRING,
  status_user: {
    type: DataTypes.ENUM('Belum Dikerjakan', 'Dalam Penugasan', 'Selesai'),
    defaultValue: 'Belum Dikerjakan'
  },
  status_admin: {
    type: DataTypes.ENUM('Unknown', 'Belum Disetujui', 'Selesai'),
    defaultValue: 'Unknown'
  },
  waktu_awal: DataTypes.DATE,
  waktu_akhir: DataTypes.DATE,
}, {
  freezeTableName: true,
});

// Define associations between models
User.hasMany(Task, { foreignKey: 'user_id' });
Task.belongsTo(User, { foreignKey: 'user_id' });

export default Task;
