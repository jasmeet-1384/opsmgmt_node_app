import { LeaveModel } from "../../models/leaveModel.js";
import { failed, success, firstError } from "../../utils/reply.js";
import Validator from "validatorjs";
import sendMail from "../../mail/sendMail.js";
import moment  from "moment/moment.js";
//leave form

async function leaveform(req, res) {
  let request = req.body;

  let validation = new Validator(request, {
    // date: "required|date",
    absence_from: "required|date",
    absence_through: "required|date",
    // total_days: "required",
    type_of_leave: "required",
    reason_for_leave: "required",
  });

  if (validation.fails()) {
    return res.json(failed(firstError(validation)));
  }

  let a = moment(request.absence_from);
  let b = moment(request.absence_through);
  

  request["user_id"] = req.user.id;
  request['date'] = new Date();
  request['total_days'] = b.diff(a, 'days');
  console.log(request);

  let leave = await LeaveModel.create(request);
  await sendMail.send(
    "jasmeet@yopmail.com",
    "Leave Applied by " + req.user.name
  );

  return res.json(success("Leave Data Saved Successfully", leave));
}

async function updateleave(req, res) {
  let request = req.body;

  let validation = new Validator(request, {
    date: "required|date",
    absence_from: "required|date",
    absence_through: "required|date",
    total_days: "required",
    type_of_leave: "required",
    reason_for_leave: "required",
  });

  if (validation.fails()) {
    return res.json(failed(firstError(validation)));
  }

  let id = req.params.id;

  let leaveupdate = await LeaveModel.findByPk(req.body, { where: { id: id } });

  return res.json(success("Leave Data Updated Successfully", leaveupdate));
}

async function getleavedata(req, res) {
  if (req.query?.latest) {
    let userleaves = await LeaveModel.findAll({
      where: {
        user_id: req.user.id,
      },
      order: [["id", "desc"]],
      limit: parseInt(req.query?.limit) || 3,
    });
    return res.json(success("Data fetch Successfully!", userleaves));
  }

  let userleaves = await LeaveModel.findAll({
    // where: {
    //   user_id: req.user.id,
    // },
    order: [["id", "desc"]]
  });
  return res.json(success("Data fetch Successfully!", userleaves));
}

export default {
  leaveform,
  updateleave,
  getleavedata,
};
