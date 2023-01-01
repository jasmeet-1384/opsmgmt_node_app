import { Model, Sequelize } from "../database/sequelize.js";

export  const leaveModel = Model.define("leave_details", {

    user_id: Sequelize.STRING,

    date: Sequelize.DATE,

    absence_from: Sequelize.DATE,

    absence_through: Sequelize.DATE,

    total_days: Sequelize.STRING,

    type_of_leave: Sequelize.STRING,

    reason_for_leave: Sequelize.STRING,


})

await leaveModel.sync();