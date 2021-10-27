import { FileProject } from "./FileProject"


export class Project {
    
    private name: string;
    private listFiles: Array<FileProject> = [];

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string){
        this.name = name;
    }

    public getListFiles(): Array<FileProject> {
        return this.listFiles;
    }

    public setListFiles(listFiles: Array<FileProject>) {
        this.listFiles = listFiles;
    }

    public addFile( file: FileProject){
        this.listFiles.push(file);
    }

}