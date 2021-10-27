import { Project } from "./Project";

export class Library {
    private listProject: Array<Project> = [];

    constructor(){}

    public getListProject(): Array<Project> {
        return this.listProject;
    }

    public setListProject(listProject: Array<Project>){
        this.listProject = listProject;
    }

    public addProject(project: Project){
        this.listProject.push(project);
    }
}