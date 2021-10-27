export class FileProject {
    
    constructor(path = "", name = "", text = ""){
        this.path = path;
        this.name = name;
        this.text = text;
    }

    path: string;
    name: string;
    text: string;
}
