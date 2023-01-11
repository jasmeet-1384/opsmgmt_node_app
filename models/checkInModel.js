import { Model , Sequelize } from '../database/sequelize.js'

export const CheckInModel = Model.define("checkin_log", {
    

    user_id: Sequelize.STRING,

    date: Sequelize.DATE ,
    
    ip_address: Sequelize.STRING ,
    
    location: Sequelize.STRING ,

    check_in_time: Sequelize.STRING ,

    check_out_time: {
        type: Sequelize.STRING,
        defaultValue: ''
    },

    duration: {
        type: Sequelize.STRING,
        defaultValue: 0
    },

  });

await CheckInModel.sync();