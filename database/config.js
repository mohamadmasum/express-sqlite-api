import Sequelize from "sequelize";

export const sqlite = new Sequelize({
  dialect: "sqlite",
  storage: './database/paltform.sqlite',
  logging: true,
});

// export const mysql = new Sequelize('platform','root', '', {
//     port : '3306',
//     dialect : 'mysql',
//     logging : true
// })