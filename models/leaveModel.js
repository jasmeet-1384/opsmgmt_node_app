import { Model, Sequelize } from "../database/sequelize.js";

export  const LeaveModel = Model.define("leave_details", {

    user_id: Sequelize.STRING,

    date: Sequelize.DATE,

    absence_from: Sequelize.DATE,

    absence_through: Sequelize.DATE,

    total_days: Sequelize.STRING,

    type_of_leave: Sequelize.STRING,

    reason_for_leave: Sequelize.STRING,

    status: {
        type: Sequelize.STRING,
        defaultValue: 'Pending'
    },


})

await LeaveModel.sync();