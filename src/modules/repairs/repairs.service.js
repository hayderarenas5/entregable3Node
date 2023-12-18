import User from "../users/users.model.js";
import Repair from "./repairs.model.js";

export class RepairService {

  static async findOne(id, status = ["pending","completed"]){
    return await Repair.findOne({
      where: {
        id,
        status: status
      },
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'role']
        }
      ]
    })
  }

  static async findAll(){
    return await Repair.findAll({
      where: {
        status: ["pending","completed"]
      },
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'role']
        }
      ]
    })
  }

  static async create(data){
    return await Repair.create(data)
  }

  static async update(repair, data){
    return await repair.update(data,{ status: 'completed' })
  }

  static async delete(repair){
    return await repair.update({ status: 'cancelled' })
  }

}