

export class FileProject{
    private path: string;
    private name: string;
    private text: string;

    constructor(path: string, name: string){
        this.path = path;
        this.name = name;
        this.text = '';
    }

    public getPath():string {
        return this.path;
    }

    public getName():string {
        return this.name;
    }

    public setPath(path: string){
        this.path = path;
    }

    public setName(name: string){
        this.name = name;
    }

    public setText(text: string){
        this.text = text;
    }

    public getText(): string{
        return this.text;
    }

}