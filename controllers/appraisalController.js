import { AppraisalModel } from "../models/apprasialModel.js";
import { failed, success, firstError } from "../utils/reply.js";
import Validator from "validatorjs";

//Change management

async function appraisal(req, res) {

    let request = req.body;

let validation = new Validator(request,{
    goals_appraisal:"required",
    greatest_accomplishment:"required",
    biggest_challenge:"required",
    biggest_strength_weakness:"required",
    resources:"required",
    career_goals:"required",
    current_role:"required",
    motivates:"required",
    any_questions:"required",
});

if (validation.fails()) {
    return res.json(failed(firstError(validation)));
  }

  request['user_id'] = req.user.id;
  console.log(request);

  let leave = await AppraisalModel.create(request);

  return res.json(success("Appraisal Data Saved Successfully", leave));
}


export default {
appraisal
};

