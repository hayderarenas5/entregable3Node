import z from 'zod'
import { extractValidationData } from '../../common/utils/extractErrorDate.js'

const repairsSchema= z.object({
    date: z
        .string({
            invalid_type_error: "Date must be a correct format",
            required_error: "Date is required"
        }),
    motorsNumber: z
        .string({required_error: "Date is required"})
        .min(3, {message: "Very small engine number"}),
    description: z
        .string({required_error: "Date is required"})
        .min(3, {message: "Very small description"})
        .max(300, {message:"Very long description"}),
    userId: z.number(),
})


export function validateRepair(data) {
    const result= repairsSchema.safeParse(data)

    const {hasError, errorMessage, data: repairsData}= extractValidationData(result)

    return{
        hasError,
        errorMessage,
        repairsData
    }
}

export function validateParcialRepair(data) {
    const result= repairsSchema.partial().safeParse(data)

    const {hasError, errorMessage, data: repairsData}= extractValidationData(result)

    return{
        hasError,
        errorMessage,
        repairsData
    }
}