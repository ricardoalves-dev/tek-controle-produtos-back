import IRoutes from "../../infra/interfaces/IRoutes";
import ProdutoController from "./ProdutoController";
import express from 'express';

export default class ProdutoRoutes implements IRoutes {
    private _url: string;
    private controller: ProdutoController;
    private _router: express.Router;

    constructor(controller: ProdutoController) {
        this._url = '/produto';
        this._router = express.Router();
        this.controller = controller;
    }

    get url(): string {
        return this._url;
    }

    get router(): express.Router {
        return this._router;
    }

    public register(): void {
        this._router.post('/', this.controller.create);
        this._router.get('/', this.controller.find);
        this._router.get('/:id', this.controller.findById);
        this._router.put('/:id', this.controller.update);
        this._router.delete('/:id', this.controller.delete);
    }
}