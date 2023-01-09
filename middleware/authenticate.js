import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';

const jwtSecretKey = process.env.JWT_SECRET_KEY ;

async function getUser(user_id) {
    return await UserModel.findByPk(user_id);
}

export async function authenticate(req,res,next){

    let headers = req.headers?.authorization || null;

    if(!headers){
        return res.status(401).json({
            "status_code": 401,
            "message": "UnAuthenticated"
          });
    }

    let token = headers?.split('Bearer ')[1] ;
    
    try {
        let verified = jwt.verify(token, jwtSecretKey);
        

        if(verified)
        {
           let user_id = verified.userId;
            let user = await getUser(user_id);

            if(!user)
            {
                return res.status(401).json({
                    "status_code": 401,
                    "message": "UnAuthenticated"
                  });
            }

            // Add User Info In Req
            req['user'] = user;
            
            return  next();
        }
        else
        {
            return res.status(401).json({
                "status_code": 401,
                "message": "UnAuthenticated"
              });
        }

    } catch (error) {
        return res.status(401).json({
            "status_code": 401,
            "message": "UnAuthenticated"
          });
    }

   
}