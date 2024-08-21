export default class BaseException extends Error {
    protected _status: number;

    constructor(mensagem: string) {
        super(mensagem);
        this._status = 500;
    }

    get status(): number {
        return this._status;
    }
}