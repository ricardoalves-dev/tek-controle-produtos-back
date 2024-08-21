import express from 'express';
import CategoriaController from './CategoriaController';
import IRoutes from '../../infra/interfaces/IRoutes';

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
        this._router.post('/', this.controller.create);       
        this._router.get('/', this.controller.find);
        this._router.get('/:id', this.controller.findById);
        this._router.delete('/:id', this.controller.delete);
        this._router.put('/:id', this.controller.update);
    }

    get router() {
        return this._router;
    }

    get url(): string {
        return this._url;
    }
}