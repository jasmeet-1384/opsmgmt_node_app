import { TimeTrackerModel } from "../../models/timetrackerModel.js";
import { failed, success, firstError } from "../../utils/reply.js";
import Validator from "validatorjs";
import moment  from "moment/moment.js";

//Time Tracker

async function timetrackers(req, res) {

    let request = req.body;

    let validation = new Validator(request, {
        date: "required|date",
        project_name: "required",
        start_time: "required",
        finish_time: "required",
        // duration: "required",
        note: "required",
    });

    if (validation.fails()) {
        return res.json(failed(firstError(validation)));
    }

    let a = moment(request.start_time, 'HH:mm:ss');
    let b = moment(request.finish_time, 'HH:mm:ss');
    var duration = moment.duration(b.diff(a));
    var hours = duration.asHours(); 

    request['user_id'] = req.user.id;
    request['duration'] = hours.toFixed(2) + " hrs ";
    console.log(request);

    let leave = await TimeTrackerModel.create(request);

    return res.json(success("Time Tracker Data Saved Successfully", leave));
}

async function gettimetracker(req, res) {
 if(req.query?.latest) {
    let usertimetracker = await TimeTrackerModel.findAll({
      where: {
        user_id: req.user.id
      },
      order: [["id", "desc"]],
      limit: parseInt(req.query?.limit) || 3,
    })
    return res.json(success("Change Management Data Feteched Successfully!", usertimetracker))
  }

    let usertimetracker = await TimeTrackerModel.findAll({
        where: {
            user_id: req.user.id
        },
        order: [["id", "desc"]], 
    })
    return res.json(success("Data Feteched Successfully!", usertimetracker))
}



export default {
    timetrackers,
    gettimetracker
};