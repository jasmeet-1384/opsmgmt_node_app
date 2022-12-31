import { failed, success } from "../utils/reply.js";
import { CheckInModel } from '../models/checkInModel.js'

function updateCheckIn(req,res) {
    

    // 1 = check in and 2 = check out

    let check_type = req.params.type ;
    
    if(check_type != 1 && check_type != 2)
    {
        return res.json(failed('Invalid Data'));
    }

    // validaton

    return res.json(success('Working',req.user))

}

export default {
    updateCheckIn
}