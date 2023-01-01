import { LeaveModel } from "../models/leaveModel.js";
import { failed, success, firstError } from "../utils/reply.js";
import Validator from "validatorjs";

//leave form

async function leaveform(req, res) {
    
let request = req.body;

let validation = new Validator(request,{
    date: "required|date",
    absence_from:"required|date",
    absence_through:"required|date",
    total_days:"required",
    type_of_leave:"required",
    reason_for_leave:"required",
});

if (validation.fails()) {
    return res.json(failed(firstError(validation)));
  }

  let leave = await LeaveModel.create(request);

  return res.json(success("Leave Date Saved Successfully", leave));
}

export default {
leaveform
};
