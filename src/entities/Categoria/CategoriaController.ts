import { Categoria } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma/PrismaSingleton";
import ApiResponse from "../../public/ApiResponse";
import InvalidArgumentException from "../../public/exceptions/InvalidArgumentException";

export default class CategoriaController {
    constructor(){}

    private static async validateDescricao(descricao: string): Promise<void>{        
        if(descricao === ''){
            throw new InvalidArgumentException('Descrição da categoria deve ser informada');
        }        
    }

    public async create(req: Request<any, any, Categoria>, res: Response<ApiResponse<Categoria>>, next: NextFunction): Promise<void> {           
        try {            
            await CategoriaController.validateDescricao(req.body.descricao);                  
            
            const apiResponse: ApiResponse<Categoria> = new ApiResponse<Categoria>();                         
            apiResponse.setData(await prisma.categoria.create({data: req.body}));
            res.status(201).send(apiResponse);
        } catch (error) {
            next(error);
        }
    }

    public async find(req: Request, res: Response<ApiResponse<Categoria[]>>, next: NextFunction): Promise<void> {
        const apiResponse: ApiResponse<Categoria[]> = new ApiResponse<Categoria[]>();

        try {
            apiResponse.setData(await prisma.categoria.findMany({where: {id: {gt: 0}}, orderBy: {id: 'asc'}}));
            res.status(200).send(apiResponse);
        } catch (error) {
            next(error);
        }        
    }

    public async findById(req: Request, res: Response<ApiResponse<Categoria>>, next: NextFunction): Promise<void> {        
        try {                        
            const apiResponse: ApiResponse<Categoria> = new ApiResponse<Categoria>();
            apiResponse.setData(await prisma.categoria.findUniqueOrThrow({where: {id: parseInt(req.params.id)}}));
            res.status(200).send(apiResponse);
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response<ApiResponse<{}>>, next: NextFunction): Promise<void> {                
        try {                              
            await prisma.categoria.delete({where: {id: parseInt(req.params.id)}});
            const apiResponse: ApiResponse<{}> = new ApiResponse<{}>();               
            res.status(200).send(apiResponse);
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response<ApiResponse<Categoria>>, next: NextFunction): Promise<void> {                   
        try {                       
            let categoria: Categoria = await prisma.categoria.findUniqueOrThrow({where: {id: parseInt(req.params.id)}});
            await CategoriaController.validateDescricao(req.body.descricao);            
            Object.assign(categoria, req.body);                      
                        
            const apiResponse: ApiResponse<Categoria> = new ApiResponse<Categoria>();         
            apiResponse.setData(await prisma.categoria.update({data: categoria, where:{id: categoria.id}}));
            res.status(200).send(apiResponse);
        } catch (error) {
            next(error);
        }   
    }
}