import CategoriaController from './CategoriaController';
import IRoutes from '../../infra/interfaces/IRoutes';
import express, { Request, Response, NextFunction } from 'express';
import { Categoria } from '@prisma/client';

export default class CategoriaRoutes implements IRoutes{
    private _router: express.Router;    
    private controller: CategoriaController;
    private _url: string;
    
    constructor(controller: CategoriaController){
        this._router = express.Router();
        this.controller = controller;
        this._url = '/categoria';             
    }

    register(): void {
        this._router.post('/', this.bodyParaEntidade,  this.controller.create);       
        this._router.get('/', this.controller.find);
        this._router.get('/:id', this.controller.findById);
        this._router.delete('/:id', this.controller.delete);
        this._router.put('/:id', this.bodyParaEntidade, this.controller.update);
    }

    bodyParaEntidade(req: Request, res: Response, next: NextFunction) {
        const categoria: Partial<Categoria> = {};
        
        categoria.descricao = req.body.descricao || '';
        req.body = categoria;
        
        next();
    }

    get router() {
        return this._router;
    }

    get url(): string {
        return this._url;
    }
}