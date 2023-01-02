import { ProjectOnboardingModel } from "../models/projectonboardingModel.js";
import { failed, success, firstError } from "../utils/reply.js";
import Validator from "validatorjs";

//Project Onboarding

async function projectonboarding(req, res) {

    let request = req.body;

let validation = new Validator(request,{
    date:"required|date",
    project_name:"required",
    project_folder:"required",
    time_tracker:"required",
    kanban:"required",
    cloud_pem:"required",
    comments:"required",
});

if (validation.fails()) {
    return res.json(failed(firstError(validation)));
  }

  let leave = await ProjectOnboardingModel.create(request);

  return res.json(success("Project Onboarding Data Saved Successfully", leave));
}


export default {
projectonboarding
};

