import { catchAsync } from "../../common/errors/catchAsync.js";
import { validateParcialRepair, validateRepair } from "./repair.schema.js";
import { RepairService } from "./repairs.service.js"

export const createRepair=catchAsync( async(req, res, next)=>{
    const {hasError, errorMessage, repairsData} =validateRepair(req.body)

    if(hasError){
      return res.status(422).json({
        status: 'error',
        message: errorMessage
      })
    }

    const repair = await RepairService.create(repairsData)

    return res.status(201).json(repair)
})

export const findAllRepairs =catchAsync( async(req, res, next) => {
    const repairs = await RepairService.findAll();

    return res.status(200).json(repairs)
})

export const findOneRepair =catchAsync( async(req, res, next) => {
    const {repair}=req

    return res.status(200).json(repair)
})

export const updateRepair =catchAsync( async(req, res, next) => {
    const { repair } = req;
    const {hasError, errorMessage, repairsData}= validateParcialRepair(req.body)

    if (hasError) {
      return res.status(422).json({
        status:'error',
        message: errorMessage
      })
    }

    const repairUpdated = await RepairService.update(repair, repairsData)

    return res.status(200).json(repairUpdated)
})

export const deleteRepair =catchAsync( async(req, res, next) => {
    const { id } = req.params;

    const repair = await RepairService.findOne(id, ['pending', 'completed']);

    if(repair?.status === 'completed'){
      return res.status(400).json({
        status: 'error',
        message: 'the repair has been already completed'
      })
    }

    if(!repair){
      return res.status(404).json({
        status: 'error',
        message: 'repair not found'
      })
    }

    await RepairService.delete(repair)

    return res.status(204).json(null)
})
