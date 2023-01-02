import { Model, Sequelize } from "../database/sequelize.js";

export const ProjectOnboardingModel = Model.define("project_onboarding", {

    user_id: Sequelize.STRING,

    date: Sequelize.DATE,

    project_name: Sequelize.STRING,

    project_folder: Sequelize.STRING,

    time_tracker: Sequelize.STRING,

    kanban: Sequelize.STRING,

    cloud_pem: Sequelize.STRING,

    comments: Sequelize.STRING,

})


await ProjectOnboardingModel.sync();