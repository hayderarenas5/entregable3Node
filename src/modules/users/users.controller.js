import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { encryptedPassword, verifyPassword } from "../../config/plugins/encripted-password.plugin.js";
import { generateJWT } from "../../config/plugins/generate-jwt.plugin.js";
import { validateLogin, validatePartialUser, validateUser } from "./user.schema.js";
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

    const token = await generateJWT(user.id)
    
    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    })

})

export const login = catchAsync(async(req, res, next)=>{
    const {hasError, errorMessage, userData}=validateLogin(req.body)

    if(hasError){
      return res.status(422).json({
        status: 'error',
        message: errorMessage
      })
    }

    const user= await UserService.findOneByEmail(userData.email)

    if (!user) {
      return next(new AppError('This accont does not exist', 404))
    }

    const isCorrectPassword =await verifyPassword(userData.password, user.password)

    if (!isCorrectPassword) {
      return next(new AppError('Incorrect email or password'))
    }

    const token= await generateJWT( user.id)

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    })

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

export const changePassword= catchAsync(async(req, res, next)=>{
  const {sessionUser}=req
  const {currentPassword, newPassword}= req.body

  if (currentPassword=== newPassword) {
    return next(new AppError('The password cannot be equal', 400))
  }

  const isCorrectPassword =await verifyPassword(currentPassword, sessionUser.password)

    if (!isCorrectPassword) {
      return next(new AppError('Incorrect email or password'))
    }

    const hashedNewPassword= await encryptedPassword(newPassword)

    await UserService.update(sessionUser, {
      password: hashedNewPassword,
      passwordChangedAt: new Date()
    })

  return res.status(200).json({
    message:' The user password was updated successfully'
  })
})