import { Request, Response, NextFunction } from "express";
import ApiResponse from "../ApiResponse";
import BaseException from "../exceptions/BaseException";
import { Prisma } from '@prisma/client'
import PrismaErrors from "../../../prisma/PrismaErrors";

export default class ExceptionHandler {
    public handleError(err: unknown, req: Request, res: Response<ApiResponse<{}>>, next: NextFunction) {        

        const apiResponse = new ApiResponse<{}>();
        let status: number = 400;

        if(err instanceof Prisma.PrismaClientKnownRequestError){                           
            apiResponse.setError(PrismaErrors.getPrismaClientKnownRequestErrorMessage(err));
        }
        else if(err instanceof Prisma.PrismaClientValidationError){
            apiResponse.setError(PrismaErrors.getPrismaClientValidationErrorMessage(err));
        }
        else if(err instanceof BaseException) {
            status = err.status;
            apiResponse.setError(err.message);
        }
        else if(err instanceof Error) {
            apiResponse.setError(err.message);            
        }
        else {
            apiResponse.setError(String(err));
        }

        res.status(status).send(apiResponse);
    }    
}