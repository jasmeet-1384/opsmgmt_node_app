import { ChangeManagementModel } from "../../models/changemanagementModel.js";
import { failed, success, firstError } from "../../utils/reply.js";
import Validator from "validatorjs";

//Change management

async function changemanagement(req, res) {

  let request = req.body;

  let validation = new Validator(request, {
    // cr_no: "required",
    date: "required|date",
    project_name: "required",
    cr_severity: "required",
    area_affected: "required",
    downtime: "required",
    change_reqiured: "required",
    intended_outcome: "required",
    addtional_factor: "required",
    implementor: "required",
  });

  if (validation.fails()) {
    return res.json(failed(firstError(validation)));
  }

  

  request['user_id'] = req.user.id;
  console.log(request);

  let change = await ChangeManagementModel.create(request);
  if(change){
    change.cr_no =  "CRTTIT-" + change.id ;
    await change.save();
  }
  return res.json(success("Change Management Data Saved Successfully", change));
}

async function getchangemanagementdata(req, res) {
  if (req.query?.latest) {
    let userchangemanagement = await ChangeManagementModel.findAll({
      where: {
        user_id: req.user.id
      },
      order: [["id", "desc"]],
      limit: parseInt(req.query?.limit) || 3,
    })
    return res.json(success("Change Management Data Feteched Successfully!", userchangemanagement))
  }
  let userchangemanagement = await ChangeManagementModel.findAll({
    where: {
      user_id: req.user.id
    },
    order: [["id", "desc"]]
  })
  return res.json(success("Data Feteched Successfully!", userchangemanagement))
}


export default {
  changemanagement,
  getchangemanagementdata
};

