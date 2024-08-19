import { prisma } from "../prisma/PrismaSingleton";
import Server from "./infra/Server";

prisma.$connect()
    .then(() => {
        console.log('Conectado a base de dados');
        new Server().iniciar(9000);
    })
    .catch((error) => console.log(`Erro ao conectar a base de dados: ${error instanceof Error ? error.message : String(error)}`));