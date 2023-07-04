import { failed, success } from "../../utils/reply.js";
import { CheckInModel } from "../../models/checkInModel.js";
import fetch from "node-fetch";

const regexExp =
/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

async function updateCheckIn(req, res) {
  // 1 = check in and 2 = check out

  let check_type = req.params.type;
  let en_ip = req.params.en_ip;
  en_ip = atob(en_ip);

  if (check_type != 1 && check_type != 2) {
    return res.json(failed("Invalid Data"));
  }

  if (!regexExp.test(en_ip)) {
    return res.json(failed("Invalid Data"));
  }

  let checkin_status = await statusChecker(req.user.id);


  if (check_type == checkin_status) {
    return res.json(failed("Invalid Approach"));
  }

  let dd = new Date();

  let location = await fetch(`https://ipapi.co/${en_ip}/json/`).then((r) =>
    r.json()
  );
  // https://ipapi.co/8.8.8.8/json/


  if (check_type == 1) {
    let create_checkin = await CheckInModel.create({
      date: Date.now(),
      user_id: req.user.id,
      ip_address: en_ip,
      location: location?.city,
      check_in_time: dd.getTime(),
    });

    return res.json(success("Checked In Successfully"));
  } else {
    let last_row = await CheckInModel.findOne({
      where: {
        user_id: req.user.id,
      },
      order: [["id", "DESC"]],
    });

    // Update data
    let check_out_time = dd.getTime();
    last_row.check_out_time = check_out_time;
    last_row.duration =
    parseFloat(check_out_time) -  parseFloat(last_row.check_in_time)  ;

    let upadted = await last_row.save();
    return res.json(success("Checked Out Successfully"));
  }
}

async function getCheckInStatus(req, res) {
  let checkin_status = await statusChecker(req.user.id);
  return res.json(success("CheckIn Status Fetched", { checkin_status }));
}

async function statusChecker(user_id) {
  let checkin_status = 2; // default check-out

  let last_row = await CheckInModel.findOne({
    where: {
      user_id,
    },
    order: [["id", "DESC"]],
  });

  if (!last_row) {
    return checkin_status;
  }

  if (last_row.check_out_time == "") {
    return 1;
  }

  return checkin_status;
}

export default {
  updateCheckIn,
  getCheckInStatus,
};
