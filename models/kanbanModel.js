import { Model, Sequelize } from "../database/sequelize.js";

export const KanbanModel = Model.define("kanbans", {

    user_id: Sequelize.STRING,

    title: Sequelize.STRING,

    description: Sequelize.STRING,

    start_date: Sequelize.DATE,

    due_date: Sequelize.DATE,

    original_estimate: Sequelize.STRING,

    time_spent: Sequelize.STRING,

    assignee: Sequelize.STRING,

    status: Sequelize.STRING,
    
    priority: Sequelize.STRING, // high , medium, low

    position_id: Sequelize.STRING,

    is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },
        

})


await KanbanModel.sync();