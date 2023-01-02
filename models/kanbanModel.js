import { Model, Sequelize } from "../database/sequelize.js";

export const KanbanModel = Model.define("kanbans", {

    user_id: Sequelize.STRING,

    due_date: Sequelize.DATE,

    start_date: Sequelize.DATE,

    original_estimate: Sequelize.STRING,

    time_spent: Sequelize.STRING,

    tittle: Sequelize.STRING,

    description: Sequelize.STRING,

    assignee: Sequelize.STRING,

    column: {
        type: Sequelize.STRING,
        defaultValue: "Assigned-Task"
    },
    
    priority: {
        type: Sequelize.STRING,
        defaultValue: "0"
    },


})


await KanbanModel.sync();