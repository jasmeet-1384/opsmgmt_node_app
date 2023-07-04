import { ProjectOnboardingModel } from "../../models/projectonboardingModel.js";
import { failed, success, firstError } from "../../utils/reply.js";
import Validator from "validatorjs";

//Project Onboarding

async function projectonboarding(req, res) {

    let request = req.body;

    let validation = new Validator(request, {
        date: "required|date",
        project_name: "required",
        project_folder: "required",
        time_tracker: "required",
        kanban: "required",
        cloud_pem: "required",
        comments: "required",
    });

    if (validation.fails()) {
        return res.json(failed(firstError(validation)));
    }

    request['user_id'] = req.user.id;
    console.log(request);

    let project = await ProjectOnboardingModel.create(request);

    return res.json(success("Project Onboarding Data Saved Successfully", project));
}

async function getprojectonboarding(req, res) {
    if (req.query?.latest) {
        let userproject= await ProjectOnboardingModel.findAll({
          where: {
            user_id: req.user.id,
          },
          order: [["id", "desc"]],
          limit: parseInt(req.query?.limit) || 3,
        });
        return res.json(success("Project Onboarding Data Feteched Successfully!", userproject));
      }

    let userprojectonboarding = await ProjectOnboardingModel.findAll({
        where: {
            user_id: req.user.id
        },
        order: [["id", "desc"]],
    })
    return res.json(success("Project Onboarding Data Feteched Successfully!", userprojectonboarding))
}


export default {
    projectonboarding,
    getprojectonboarding
};

