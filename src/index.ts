import { prisma } from "../prisma/PrismaSingleton";
import CategoriaController from "./entities/Categoria/CategoriaController";
import CategoriaRoutes from "./entities/Categoria/CategoriaRoutes";
import Server from "./infra/Server";
import ExceptionHandler from "./public/middlewares/ExceptionHandler";

prisma.$connect()
    .then(() => {
        console.log('Conectado a base de dados');
        new Server(new ExceptionHandler,
                   new CategoriaRoutes(new CategoriaController())).iniciar(9000);
    })
    .catch((error) => console.log(`Erro ao conectar a base de dados: ${error instanceof Error ? error.message : String(error)}`));