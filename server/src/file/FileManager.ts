import { AnalyzerManager } from "../../analyzer/library/AnalyzerManager";
import { FileProject } from "../../analyzer/library/FileProject";
import { Library } from "../../analyzer/library/Library";
import { Project } from "../../analyzer/library/Project";
// const fs = require('fs');
// import { fs } from '../../fs';

export class FileManager {

    analizadorXML = new AnalyzerManager();

    constructor(){}

    //crear un nuevo proyecto
    public createProject(nameProject: string, library: Library): string{
        let texto = '<libreria>\n';
        library.getListProject().push(new Project(nameProject));
        for(let i = 0; i<library.getListProject().length; i++){
            texto += '\t<proyecto nombre=\"'+library.getListProject()[i].getName()+'\">\n';    
            for(let j =0 ; j<library.getListProject()[i].getListFiles().length; j++){
                texto += '\t\t<archivo path=\"'+library.getListProject()[i].getListFiles()[j].getPath()+'\">'+library.getListProject()[i].getListFiles()[j].getName()+'</archivo>\n';
            }
            texto += '\t</proyecto>\n';
        }
        texto += '</libreria>\n';
        console.log(texto);
        return texto;
    }

    //crear un nuevo archivo .mlg en un proyecto
    public createFile(nameProject: string, nameFile: string, library: Library): string{
        // let newFile: FileProject = new FileProject(nameProject+"/"+nameFile+".mlg",nameFile);
        let newFile: FileProject = new FileProject(nameFile+".mlg",nameFile);
        for(let i = 0; i<library.getListProject().length; i++){
            if(nameProject==library.getListProject()[i].getName()){
                library.getListProject()[i].getListFiles().push(newFile);
                break;
            }
        }
        let texto = '<libreria>\n';
        for(let i = 0; i<library.getListProject().length; i++){
            texto += '\t<proyecto nombre=\"'+library.getListProject()[i].getName()+'\">\n';    
            for(let j =0 ; j<library.getListProject()[i].getListFiles().length; j++){
                texto += '\t\t<archivo path=\"'+library.getListProject()[i].getListFiles()[j].getPath()+'\">'+library.getListProject()[i].getListFiles()[j].getName()+'</archivo>\n';
            }
            texto += '\t</proyecto>\n';
        }
        texto += '</libreria>\n';
        return texto;
    }
    
    // abre un proyecto
    public openProject(nameProject: string, library: Library):Project{
        let project: Project;
        for(let i = 0; i<library.getListProject().length; i++){
            console.log(nameProject,library.getListProject()[i].getName());
            if(nameProject==library.getListProject()[i].getName()){
                console.log('Encontro')
                return library.getListProject()[i];
            }
        }
        console.log('No Encontro')
        return project;
    }
    // abre un archivo de un proyecto
    public openFile(nameFile: string, nameProject: string, library: Library):string{
        let salida:string;
        for(let i = 0; i<library.getListProject().length; i++){
            if(nameProject==library.getListProject()[i].getName()){
                for(let j =0 ; j<library.getListProject()[i].getListFiles().length; j++){
                    if(nameFile==library.getListProject()[i].getListFiles()[j].getName()){
                        return library.getListProject()[i].getListFiles()[j].getPath();
                    }
                }
            }
        }
        return salida;
    }
  
    //guarda un archivo
    public save(nameFile: string){
  
    }
    
    //guarda un archivo con un nuevo nombre
    public saveAs(nameFile: string){
      
    }
  
    //cierra un proyecto
    public closeProject(nameProject: string){
  
    }

    public isExistProject(nameproject: string, library: Library): boolean{
        for(let i = 0; i<library.getListProject().length; i++){
            if(library.getListProject()[i].getName()==nameproject){
                console.log('Ya existe');
                return true;
            }
        }
        console.log('No existe');
        return false;
    }

    public isExistFile(nameproject: string, nameFile: string, library: Library): boolean{
        for(let i = 0; i<library.getListProject().length; i++){
            if(library.getListProject()[i].getName()==nameproject){
                for(let j = 0; j<library.getListProject()[i].getListFiles.length; j++){
                    if(nameFile==library.getListProject()[i].getListFiles()[j].getName()){
                        console.log('Ya existe file');
                        return true;
                    }
                }
            }
        }
        console.log('No existe file');
        return false;
    }


    

}