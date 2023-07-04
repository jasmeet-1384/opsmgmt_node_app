import { KanbanModel } from "../models/kanbanModel.js";
import { failed, success, firstError } from "../utils/reply.js";
import Validator from "validatorjs";
import _ from 'lodash';
import { UserModel } from "../models/userModel.js";

//kanban

async function kanban(req, res) {
  let request = req.body;

  let validation = new Validator(request, {
    title: "required",
    description: "required",
    start_date: "required|date",
    due_date: "required",
    assignee: "array",
    "assignee.*": "numeric",
    status: "required|in:pending,progress,testing,completed",
    priority: "required|in:low,medium,high",
  });

  if (validation.fails()) {
    return res.json(failed(firstError(validation)));
  }

  request["user_id"] = req.user.id;
  request["assignee"] = request?.assignee?.toString() || "";
console.log(request);
  let kanban = await KanbanModel.create(request);

  return res.json(success("Kanban Data Saved Successfully", kanban));
}

async function deletekanban(req, res) {
  let id = req.params.id;

  let data = await KanbanModel.destroy({ where: { id: id } });

  return res.json(success("Data deleted successfully", data));
}

async function getUsersListData(){
 
  return await UserModel.findAll({
    raw:true,
    attributes:["id","name", "image"]
  });

}

async function getkanban(req, res) {
  let tasks = await KanbanModel.findAll({raw: true , where: {
    is_deleted: 0
  }});

  // get users list
  let users = await getUsersListData();


  // Mapping users

  users = Object.assign({}, ...users.map(user => { 
    return { [user.id]: user } 
  }));

  tasks = tasks.map(task => {
    task['user'] = users?.[task.user_id];
    task.assignee = _.values(_.pick(users, task?.assignee?.split(',')));
    task['assignee_count'] = task?.assignee?.length || 0 ;
    return task;
  });


  tasks = _.groupBy(tasks,'status')
  return res.json(success("Data fetch Successfully!", tasks));
}


async function updateStatus (req, res) {

  let request = req.body;

  let validation = new Validator(request, {
    task_id: "required",
    status: "required|in:pending,progress,testing,completed",
    position_id: "required|numeric"
  });

  if (validation.fails()) {
    return res.json(failed(firstError(validation))); 
  }

  let is_exist = await KanbanModel.findOne({
    where: {
      id: request.task_id
    }
  });

  if(!is_exist){
    return res.json(failed('Invalid Task'))
  }

  let kanbanUpdate = await KanbanModel.update({
    status: request.status,
    position_id: request.position_id
  },{
    where:{
      id: request.task_id
    }
  });
  return res.json(success("Saved Successfully"));

}


async function updateClosed(req, res) {

  let is_exist = await KanbanModel.findOne({
    where: {
      id: req.params.task_id
    }
  });

  if(!is_exist){
    return res.json(failed('Invalid Task'))
  }

  let kanbanUpdate = await KanbanModel.update({
    is_deleted: 1
  },{
    where:{
      id: req.params.task_id
    }
  });
  return res.json(success("Saved Successfully"));

}


export default {
  kanban,
  deletekanban,
  getkanban,
  updateStatus,
  updateClosed
};
