import { Request, Response, NextFunction } from "express";
import ApiResponse from "../../public/ApiResponse";
import { Categoria, Prisma, Produto } from "@prisma/client";
import '../../../prisma/PrismaSingleton';
import InvalidArgumentException from "../../public/exceptions/InvalidArgumentException";
import { prisma } from "../../../prisma/PrismaSingleton";

export type ProdutoDto = Omit<Produto, 'categoriaProduto'> & {categoria: Omit<Categoria, 'descricao'> & Partial<Pick<Categoria, 'descricao'>>};

export default class ProdutoController {
    constructor() {}

    static validateNome(nome: string): void {
        if(nome === '') {
            throw new InvalidArgumentException("Nome do produto deve ser informado");
        }
    }

    static validatePreco(preco: Prisma.Decimal): void {   

        if(preco.lessThanOrEqualTo(0)) {
           throw new InvalidArgumentException("Preço do produto deve ser um valor maior que zero");    
        }
    }

    static async validateCategoria(categoriaId: number): Promise<void> {                       
        await prisma.categoria.findUniqueOrThrow({where: {id: categoriaId}});
    }

    static async validate(produto: Omit<Produto, 'id'>): Promise<void> {
        ProdutoController.validateNome(produto.nome);
        ProdutoController.validatePreco(produto.preco);
        await ProdutoController.validateCategoria(produto.categoriaProduto);        
    }

    async create(req: Request, res: Response<ApiResponse<ProdutoDto>>, next: NextFunction): Promise<void> {        
        try {                                          
            await ProdutoController.validate(req.body);
            const apiResponse: ApiResponse<ProdutoDto> = new ApiResponse<ProdutoDto>();
            apiResponse.setData(await prisma.produto.create({
                data: req.body, 
                omit: {categoriaProduto: true}, 
                include: {categoria: true}}));
            res.status(201).send(apiResponse);
        } catch (error) {
            next(error);
        }
    }

    async find(req: Request, res: Response<ApiResponse<ProdutoDto[]>>, next: NextFunction): Promise<void> {
        try {                  
            const apiResponse: ApiResponse<ProdutoDto[]> = new ApiResponse<ProdutoDto[]>();
            apiResponse.setData(await prisma.produto.findMany({
                omit: {categoriaProduto: true},
                include: {categoria: true},                               
                where: {id: {gt: 0}}
            }));

            res.status(200).send(apiResponse);
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response<ApiResponse<ProdutoDto>>, next: NextFunction): Promise<void> {
        try {
            const apiResponse: ApiResponse<ProdutoDto> = new ApiResponse<ProdutoDto>();
            apiResponse.setData(await prisma.produto.findUniqueOrThrow({                
                where: {id: parseInt(req.params.id)},
                omit: {categoriaProduto: true},
                include: {categoria: true}
            }));

            res.status(200).send(apiResponse);
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response<ApiResponse<ProdutoDto>>, next: NextFunction): Promise<void> {
        try {
            const produto: Produto = await prisma.produto.findUniqueOrThrow({where: {id: parseInt(req.params.id)}});
            
            Object.assign(produto, req.body);            
            await ProdutoController.validate(produto);

            const apiResponse: ApiResponse<ProdutoDto> = new ApiResponse<ProdutoDto>;
            apiResponse.setData(await prisma.produto.update({
                data: produto,
                where: {id: produto.id},
                omit: {categoriaProduto: true},
                include: {categoria: true}
            }));
            
            res.status(200).send(apiResponse);        
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response<ApiResponse<{}>>, next: NextFunction): Promise<void> {
        try {            
            await prisma.produto.delete({where: {id: parseInt(req.params.id)}});
            res.status(200).send(new ApiResponse<{}>());
        } catch (error) {
            next(error);            
        }
    }
}