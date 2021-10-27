export class Posicion {
    private fila: number;
    private columna: number;

    constructor (fila: number, columna: number){
        this.fila = fila;
        this.columna = columna;
    }

    public getFila(): number {
        return this.fila;
    }

    public getColumna(): number {
        return this.columna;
    }

    public setFila(fila: number): void {
        this.fila = fila;
    }
    
    public setColumna(columna: number): void {
        this.columna = columna;
    }
}
