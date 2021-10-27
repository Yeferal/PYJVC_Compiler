import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { FileProject } from "../models/file-project";
import { Project } from "../models/project";
import { Library } from "../models/library";


@Injectable({
  providedIn: 'root'
})
export class FilesOptService {

  selectedLibrary: Library;
  selectedProject: Project;
  selectedFileProject: FileProject;

  readonly URL_API = "http://localhost:9000/pyjvc/";

  constructor(private http: HttpClient) {
    this.selectedLibrary= new Library();
    this.selectedProject = new Project();
    this.selectedFileProject = new FileProject();
   }

  getProjects(){
    return this.http.get<any>(this.URL_API+'projects/');
  }

  createProject(nameProject: string){
    return this.http.post<any>(this.URL_API+'create_project/',nameProject);
  }

 createFile(data: any){
    return this.http.post<any>(this.URL_API+'create_file/', data);
  }

  openProject(nameProject: string){
    return this.http.get<any>(this.URL_API+'open_project/'+`${nameProject}`);
  }

  openFile(nameFile: string, nameProject: string){
    return this.http.get<any>(this.URL_API+'open_file/'+`${nameFile}&${nameProject}`);
  }

  save(data: any){
    return this.http.post<any>(this.URL_API+'fileSave/', data);
  }

  saveAs(data: any){
    return this.http.post<any>(this.URL_API+'fileAsSave/', data);
  }

  closeProject(nameProject: string){
    return this.http.get<any>(this.URL_API+'open_project/'+`${nameProject}`);
  }
  

}
