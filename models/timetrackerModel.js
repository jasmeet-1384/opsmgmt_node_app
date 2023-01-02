import { Model, Sequelize } from "../database/sequelize.js";

export const TimeTrackerModel = Model.define("time_trackers", {

    user_id: Sequelize.STRING,

    date: Sequelize.DATE,

    start_time: Sequelize.STRING,

    finish_time: Sequelize.STRING,

    duration: Sequelize.STRING,

    note: Sequelize.STRING,


})


await TimeTrackerModel.sync();