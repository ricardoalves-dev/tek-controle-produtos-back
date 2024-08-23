import IRoutes from "../../infra/interfaces/IRoutes";
import ProdutoController from "./ProdutoController";
import express from 'express';
import { Prisma, Produto } from "@prisma/client";

export default class ProdutoRoutes implements IRoutes {
    private _url: string;
    private controller: ProdutoController;
    private _router: express.Router;

    constructor(controller: ProdutoController) {
        this._url = '/produto';
        this._router = express.Router();
        this.controller = controller;
    }    

    public register(): void {
        this._router.post('/', this.bodyParaEntidade, this.controller.create);
        this._router.get('/', this.controller.find);
        this._router.get('/:id', this.controller.findById);
        this._router.put('/:id', this.bodyParaEntidade, this.controller.update);
        this._router.delete('/:id', this.controller.delete);
    }

    bodyParaEntidade(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const produto: Partial<Produto> = {};

        produto.nome = req.body.nome || '';
        produto.descricao = req.body.descricao || '';
        produto.preco = req.body.preco && (typeof req.body.preco === 'number') ? new Prisma.Decimal(req.body.preco) : new Prisma.Decimal(0);
        produto.imagem = req.body.imagem || '';        
        produto.categoriaProduto = req.body.categoria.id ? req.body.categoria.id : 0;

        req.body = produto;
        
        next();
    }

    get url(): string {
        return this._url;
    }

    get router(): express.Router {
        return this._router;
    }
}