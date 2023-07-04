import { Model, Sequelize } from "../database/sequelize.js";

export const CommentsModel = Model.define("comments", {

    user_id: Sequelize.STRING,

    task_id: Sequelize.STRING,

    message: Sequelize.STRING,


})

await CommentsModel.sync();
