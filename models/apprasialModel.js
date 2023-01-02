import { Model, Sequelize } from "../database/sequelize.js";

export const AppraisalModel = Model.define("appraisal", {

    user_id: Sequelize.STRING,

    goals_appraisal: Sequelize.STRING,

    greatest_accomplishment: Sequelize.STRING,

    biggest_challenge: Sequelize.STRING,

    biggest_strength_weakness: Sequelize.STRING,

    resources: Sequelize.STRING,

    career_goals: Sequelize.STRING,

    current_role: Sequelize.STRING,

    motivates: Sequelize.STRING,

    any_questions: Sequelize.STRING,




})


await AppraisalModel.sync();