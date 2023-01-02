import { KanbanModel } from "../models/kanbanModel.js";
import { failed, success, firstError } from "../utils/reply.js";
import Validator from "validatorjs";

//Change management

async function kanban(req, res) {

    let request = req.body;

let validation = new Validator(request,{
    due_date:"required|date",
    start_date:"required",
    tittle:"required",
    description:"required",
    assignee:"required",
});

if (validation.fails()) {
    return res.json(failed(firstError(validation)));
  }

  let leave = await KanbanModel.create(request);

  return res.json(success("Kanban Data Saved Successfully", leave));
}


export default {
kanban
};

