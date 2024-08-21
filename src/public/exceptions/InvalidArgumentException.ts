import BaseException from "./BaseException";

export default class InvalidArgumentException extends BaseException {
    constructor(mensagem: string){
        super(mensagem);
        this._status = 400;
    }
}