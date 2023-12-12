import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { RepairService } from "./repairs.service.js";

export const validateExitRepairs= catchAsync( async(req, res, next)=>{
        const { id } = req.params;

        const repair = await RepairService.findOne(id);

        if(!repair){
            return next(new AppError('repair not found'), 404)
        }

        req.repair=repair
        next()  
})