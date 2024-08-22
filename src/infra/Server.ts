import express from 'express';
import IRoutes from './interfaces/IRoutes';
import ExceptionHandler from '../public/middlewares/ExceptionHandler';

export default class Server {
    private server: express.Application;
    
    constructor(exceptionHandler: ExceptionHandler, ...routes: IRoutes[]){
        const cors = require('cors');
        this.server = express();
        this.server.use(express.json());    
        this.server.use(cors({
            origin: '*'
        }));    

        routes.forEach(routes => {            
            this.server.use(routes.url, routes.router);            
            routes.register();
        });

        this.server.use(exceptionHandler.handleError);
    }

    public iniciar(porta: number): void{
        this.server.listen(porta, () => {
            console.log(`Servidor escutando a porta ${porta}`);
        });
    }
}