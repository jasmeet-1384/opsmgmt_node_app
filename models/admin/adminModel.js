import { Model , Sequelize } from '../../database/sequelize.js'

export const AdminModel = Model.define("admin", {
    
    name: Sequelize.STRING,

    employee_id: {
        type: Sequelize.STRING,
        defaultValue: ''
    },

    // Admin = 3 , Manager = 2 , User = 1
    user_type: {
        type: Sequelize.STRING,
        defaultValue: 3
    },

    email: Sequelize.STRING,

    password: Sequelize.STRING,

    mobile: {
        type: Sequelize.STRING,   
        defaultValue: ''
    },

    image: {
        type: Sequelize.STRING,
        defaultValue: ''
    },

    gender: {
        type: Sequelize.STRING,
        defaultValue: ''
    },

    active_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },

    gmail_id :  {
        type: Sequelize.STRING,
        defaultValue: ''
    },

  });

await AdminModel.sync();