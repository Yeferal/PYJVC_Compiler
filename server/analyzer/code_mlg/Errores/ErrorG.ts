import { Posicion } from "./Posicion";

export class ErrorG {
    private posicion: Posicion
    private tipoError: string;
    private token: string;
    private descripcion: string;

    constructor (posicion: Posicion, tipoError: string, token: string, descripcion: string){
        this.posicion = posicion;
        this.tipoError = tipoError;
        this.token = token;
        this.descripcion = descripcion;
    }

    getPosicion(): Posicion {
        return this.posicion;
    }

    getTipoError(): string {
        return this.tipoError;
    }

    getToken(): string {
        return this.token;
    }

    getDescripcion(): string {
        return this.descripcion;
    }

    setPosicion(posicion: Posicion) {
        this.posicion = posicion;
    }

    setTipoError(tipoError: string){
        this.tipoError = tipoError;
    }

    setToken(token: string){
        this.token = token;
    }

    setDescripcion(descripcion: string) {
        this.descripcion = descripcion;
    }

}