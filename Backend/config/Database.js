import { Sequelize } from "sequelize";

const db = new Sequelize('task_db', 'phpmyadmin', 'bismillah1', {
  host: 'localhost',
  dialect: 'mysql'
} );

export default db;