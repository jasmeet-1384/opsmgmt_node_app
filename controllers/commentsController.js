import { CommentsModel } from "../models/commentsModel.js";
import { failed, success, firstError } from "../utils/reply.js";
import Validator from "validatorjs";
import { KanbanModel } from "../models/kanbanModel.js";


async function kanbanComments(req, res) {
    let request = req.body;
  
    let validation = new Validator(request, {
      message: "required",
      task_id: "required"
      
    });
  
    if (validation.fails()) {
      return res.json(failed(firstError(validation)));
    }
  
    request["user_id"] = req.user.id;

    let is_exist = await KanbanModel.findOne({
        where: {
          id: request.task_id
        }
      });
    
      if(!is_exist){
        return res.json(failed('Invalid Task'))
      }
   
    let comments = await CommentsModel.create(request);
  
    return res.json(success("Comments Data Saved Successfully", comments));
  }

  async function getcommentsdata(req, res) {
    
    let usercomments = await CommentsModel.findAll({
      where: {
        task_id: req.params.task_id,
      }
    });
    return res.json(success("Data fetch Successfully!", usercomments));
  }
  
  async function deletekanbancomments(req, res) {
    let id = req.params.id;
  
    let data = await CommentsModel.destroy({ where: { id: id } });
  
    return res.json(success("Data deleted successfully", data));
  }


  export default {
    kanbanComments,
    getcommentsdata,
    deletekanbancomments
  };