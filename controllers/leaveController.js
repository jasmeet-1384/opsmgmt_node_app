import { leaveModel } from './../models/leaveModel';
import { failed, success } from "../utils/reply.js";
import Validator from "validatorjs";

//leave form

async function ccc(req, res) {
    
let request = req.body;

let validation = new validator(request,{
    date: "required|date",
    absence_form:"required|date",
    absence_through:"required|date",
    total_days:"required|min:1",
    type_of_leave:"required|min:1",
    reason_for_leave:"required|min:1",
});

if (validation.fails()) {
    return res.json(failed(firstError(validation)));
  }


}








