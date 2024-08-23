import express, {Request, Response, NextFunction} from 'express';

export default interface IRoutes {
    register(): void;
    router: express.Router; 
    url: string;
    bodyParaEntidade(req: Request, res: Response, next: NextFunction): void;
}