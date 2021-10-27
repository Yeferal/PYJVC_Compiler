import { Project } from "./project";

export class Library {

    constructor(listProject = []){
        this.listProject = listProject;
    }

    listProject: Array<Project> = [];

}
