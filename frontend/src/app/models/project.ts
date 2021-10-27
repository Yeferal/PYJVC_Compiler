import { FileProject } from "./file-project";

export class Project {
    
    constructor(name = "", listFiles = []){
        this.name = name;
        this.listFiles = listFiles;
    }

    name: string;
    listFiles: Array<FileProject> = [];
}
