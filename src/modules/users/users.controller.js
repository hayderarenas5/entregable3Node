import { catchAsync } from "../../common/errors/catchAsync.js";
import { validatePartialUser, validateUser } from "./user.schema.js";
import { UserService } from "./users.service.js"

export const register= catchAsync(async(req, res, next)=>{
  
    const {hasError, errorMessage, userData} =validateUser(req.body)

    if(hasError){
      return res.status(422).json({
        status: 'error',
        message: errorMessage
      })
    }

    const user= await UserService.create(userData)
    
    return res.status(201).json(user)

})

export const login = catchAsync(async(req, res)=>{

})

export const findAllUsers =catchAsync( async(req, res, next) => {
    const users = await UserService.findAll()
    return res.status(200).json(users)
})

export const findOneUser =catchAsync( async(req, res, next) => {
    const{user}= req
    return res.status(200).json(user)
})

export const updateUser = catchAsync( async(req, res, next) => {
    const { user } = req;
    const {hasError, errorMessage, userData}= validatePartialUser(req.body)

    if (hasError) {
      return res.status(422).json({
        status:'error',
        message: errorMessage
      })
    }

    const userUpdated = await UserService.update(user, userData)

    return res.status(200).json(userUpdated)
})

export const deleteUser =catchAsync( async(req, res, next) => {
    const { user } = req;

    await UserService.delete(user)

    return res.status(204).json(null)
})