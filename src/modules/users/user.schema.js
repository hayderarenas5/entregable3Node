import z, { boolean } from 'zod'
import { extractValidationData } from '../../common/utils/extractErrorDate.js'

const registerSchema= z.object({
    name: z
        .string({
            invalid_type_error: "Email must be a correct format",
            required_error: "Email is required",
        })
        .min(3, {message: "Name is too short"})
        .max(50, {message:"Name is too long"}),
    email: z
        .string({
            invalid_type_error: "Email must be a correct format",
            required_error: "Email is required",
        })
        .email({message: "Invalid email"})
        .min(3, {message: "Email is too short"})
        .max(50, {message:"Email is too long"}),
    password: z
        .string({required_error: "password is required"})
        .min(8, {message: "Password must be at least 8 characters"}),
    role: z
        .enum(['client','employee'])
})

export function validateUser(data) {
    const result= registerSchema.safeParse(data)

    const {hasError, errorMessage, data: userData}= extractValidationData(result)

    return{
        hasError,
        errorMessage,
        userData
    }
}

export function validatePartialUser(data) {
    const result= registerSchema.partial().safeParse(data)

    const {hasError, errorMessage, data: userData}= extractValidationData(result)

    return{
        hasError,
        errorMessage,
        userData
    }
}