export class MyError extends Error {
    constructor(code, mess) {
        super(mess)
        this.code = code ? code : 500
        this.mess = mess ? mess : "erreur inconnue"
    }
}