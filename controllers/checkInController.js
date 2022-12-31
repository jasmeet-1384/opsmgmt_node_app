import { failed, success } from "../utils/reply.js";
import { CheckInModel } from "../models/checkInModel.js";

async function updateCheckIn(req, res) {
  // 1 = check in and 2 = check out

  let check_type = req.params.type;

  if (check_type != 1 && check_type != 2) {
    return res.json(failed("Invalid Data"));
  }

  let checkin_status = await statusChecker(req.user.id);

  if(check_type == checkin_status)
  {
    return res.json(failed('Invalid Approach'))
  }

  // validaton

  return res.json(success("Working", req.user));
}

async function getCheckInStatus(req, res) {
  let checkin_status = await statusChecker(req.user.id);
  return res.json(success("CheckIn Status Fetched", { checkin_status }));
}

async function statusChecker(user_id) {
  let checkin_status = 1;
  let last_row = await CheckInModel.findOne({
    where: {
      user_id,
    },
    order: [["id", "DESC"]],
  });

  if (last_row) {
    if (last_row.check_out_time != "") {
      checkin_status = 2;
    }
  }
  return checkin_status;
}

export default {
  updateCheckIn,
  getCheckInStatus,
};
