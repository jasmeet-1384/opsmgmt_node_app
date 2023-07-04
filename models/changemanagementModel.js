import { Model, Sequelize } from "../database/sequelize.js";

export const ChangeManagementModel = Model.define("change_management", {

    user_id: Sequelize.STRING,

    cr_no: {
        type: Sequelize.STRING,
        defaultValue: ''
    },

    date: Sequelize.DATE,

    project_name: Sequelize.STRING,

    cr_severity: Sequelize.STRING,

    area_affected: Sequelize.STRING,

    downtime: Sequelize.STRING,

    change_reqiured: Sequelize.STRING,

    intended_outcome: Sequelize.STRING,

    addtional_factor: Sequelize.STRING,

    implementor: Sequelize.STRING,

    status: {
        type: Sequelize.STRING,
        defaultValue: 'Pending'
    },


})


await ChangeManagementModel.sync();