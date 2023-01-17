import { ChangeManagementModel } from "../models/changemanagementModel.js";
import { failed, success, firstError } from "../utils/reply.js";
import Validator from "validatorjs";

//Change management

async function changemanagement(req, res) {

    let request = req.body;

let validation = new Validator(request,{
    cr_no:"required",
    date:"required|date",
    project_name:"required",
    cr_severity:"required",
    area_affected:"required",
    downtime:"required",
    change_reqiured:"required",
    intended_outcome:"required",
    addtional_factor:"required",
    implementor:"required",
});

if (validation.fails()) {
    return res.json(failed(firstError(validation)));
  }

  request['user_id'] = req.user.id;
   console.log(request);

  let leave = await ChangeManagementModel.create(request);

  return res.json(success("Change Management Data Saved Successfully", leave));
}


export default {
changemanagement
};

