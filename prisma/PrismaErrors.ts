import { Prisma } from "@prisma/client";
export default class PrismaErrors {
    public static getPrismaClientKnownRequestErrorMessage(erro: Prisma.PrismaClientKnownRequestError): string {                
        switch (erro.code) {            
            case 'P2025':
                return 'Registro não encontrado';  
                
            case 'P2002':
                return `Violação de chave única da tabela ${erro.meta!.modelName}. Campos problemáticos: ${Array(erro.meta!.target).join(', ')}`;
        
            default:
                return `Erro gerado pelo Prisma e não mapeado: Codigo: ${erro.code} - Mensagem: ${String(erro.message)}`;
        }
    }

    public static getPrismaClientValidationErrorMessage(erro: Prisma.PrismaClientValidationError): string {          
        return erro.message.substring(erro.message.indexOf('Argument '), erro.message.length);        
    }
}