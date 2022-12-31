import Sequelize from "sequelize";

const Model = new Sequelize(
    process.env.SQL_DATABASE, 
    process.env.SQL_USERNAME, 
    process.env.SQL_PASSWORD, 
    {
        host: "localhost",
        dialect: "mysql",
    }
);


try {
    await Model.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

export { Model , Sequelize }