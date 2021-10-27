export class FileTab {
    public padre:string;
    public hijo:string;
    public texto: string;
    public id: number;
    public nombre: string;

    constructor(padre:string, hijo:string, texto: string, id: number, nombre: string){
        this.padre = padre;
        this.hijo = hijo;
        this.texto = texto;
        this.id = id;
        this.nombre = nombre;
    }


}
