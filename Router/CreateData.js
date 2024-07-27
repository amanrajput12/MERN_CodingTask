import { Router } from "express";
import { CreateTransaction, GetMonthTransaction, GetTransaction, queryData } from "../Controller/Transaction.js";
import { BarchartData, combineData, GetSaleData, PichartData } from "../Controller/statistics.js";

const CreateRouter = Router()

CreateRouter.route('/add').post(CreateTransaction)
CreateRouter.route('/get').get(GetTransaction)
CreateRouter.route('/getMonth').get(GetMonthTransaction)
CreateRouter.route('/query').get(queryData)


CreateRouter.route('/sale').get(GetSaleData)
CreateRouter.route('/barchart').get(BarchartData)
CreateRouter.route('/pichart').get(PichartData)
CreateRouter.route('/combinedata').get(combineData)

export {CreateRouter}
