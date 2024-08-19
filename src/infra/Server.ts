import express from 'express';

export default class Server {
    private server: express.Application;
    
    constructor(){
        this.server = express();
        this.server.use(express.json());
    }

    public iniciar(porta: number): void{
        this.server.listen(porta, () => {
            console.log(`Servidor escutando a porta ${porta}`);
        });
    }
}