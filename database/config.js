import Sequelize from "sequelize";

// export const sqlite = new Sequelize({
//   dialect: "sqlite",
//   storage: './database/paltform.sqlite',
//   logging: true,
// });

export const mysql = new Sequelize('appdb','appuser', 'apppass', {
    port : '3306',
    dialect : 'mysql',
    logging : true
})

// // export const postgre = new Sequelize('appdb','appuser', 'secret', {
// //     port : '5432',
// //     dialect : 'postgres',
// //     logging : true
// })