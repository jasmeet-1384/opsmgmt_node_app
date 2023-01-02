import { TimeTrackerModel } from "../models/timetrackerModel.js";
import { failed, success, firstError } from "../utils/reply.js";
import Validator from "validatorjs";

//Time Tracker

async  function  timetrackers(req, res) {

    let request = req.body;

    let validation = new Validator(request,{
        date:"required|date",
        project_name:"required",
        start_time:"required",
        finish_time:"required",
        duration:"required",
        note:"required",
    });
    
    if (validation.fails()) {
        return res.json(failed(firstError(validation)));
      }
    
      let leave = await TimeTrackerModel.create(request);
    
      return res.json(success("Time Tracker Data Saved Successfully", leave));
    }


export default {
    timetrackers
    };