"use strict";
exports.__esModule = true;
exports.FileManager = void 0;
var AnalyzerManager_1 = require("../../analyzer/library/AnalyzerManager");
var FileProject_1 = require("../../analyzer/library/FileProject");
var Project_1 = require("../../analyzer/library/Project");
// const fs = require('fs');
// import { fs } from '../../fs';
var FileManager = /** @class */ (function () {
    function FileManager() {
        this.analizadorXML = new AnalyzerManager_1.AnalyzerManager();
    }
    //crear un nuevo proyecto
    FileManager.prototype.createProject = function (nameProject, library) {
        var texto = '<libreria>\n';
        library.getListProject().push(new Project_1.Project(nameProject));
        for (var i = 0; i < library.getListProject().length; i++) {
            texto += '\t<proyecto nombre=\"' + library.getListProject()[i].getName() + '\">\n';
            for (var j = 0; j < library.getListProject()[i].getListFiles().length; j++) {
                texto += '\t\t<archivo path=\"' + library.getListProject()[i].getListFiles()[j].getPath() + '\">' + library.getListProject()[i].getListFiles()[j].getName() + '</archivo>\n';
            }
            texto += '\t</proyecto>\n';
        }
        texto += '</libreria>\n';
        console.log(texto);
        return texto;
    };
    //crear un nuevo archivo .mlg en un proyecto
    FileManager.prototype.createFile = function (nameProject, nameFile, library) {
        // let newFile: FileProject = new FileProject(nameProject+"/"+nameFile+".mlg",nameFile);
        var newFile = new FileProject_1.FileProject(nameFile + ".mlg", nameFile);
        for (var i = 0; i < library.getListProject().length; i++) {
            if (nameProject == library.getListProject()[i].getName()) {
                library.getListProject()[i].getListFiles().push(newFile);
                break;
            }
        }
        var texto = '<libreria>\n';
        for (var i = 0; i < library.getListProject().length; i++) {
            texto += '\t<proyecto nombre=\"' + library.getListProject()[i].getName() + '\">\n';
            for (var j = 0; j < library.getListProject()[i].getListFiles().length; j++) {
                texto += '\t\t<archivo path=\"' + library.getListProject()[i].getListFiles()[j].getPath() + '\">' + library.getListProject()[i].getListFiles()[j].getName() + '</archivo>\n';
            }
            texto += '\t</proyecto>\n';
        }
        texto += '</libreria>\n';
        return texto;
    };
    // abre un proyecto
    FileManager.prototype.openProject = function (nameProject, library) {
        var project;
        for (var i = 0; i < library.getListProject().length; i++) {
            console.log(nameProject, library.getListProject()[i].getName());
            if (nameProject == library.getListProject()[i].getName()) {
                console.log('Encontro');
                return library.getListProject()[i];
            }
        }
        console.log('No Encontro');
        return project;
    };
    // abre un archivo de un proyecto
    FileManager.prototype.openFile = function (nameFile, nameProject, library) {
        var salida;
        for (var i = 0; i < library.getListProject().length; i++) {
            if (nameProject == library.getListProject()[i].getName()) {
                for (var j = 0; j < library.getListProject()[i].getListFiles().length; j++) {
                    if (nameFile == library.getListProject()[i].getListFiles()[j].getName()) {
                        return library.getListProject()[i].getListFiles()[j].getPath();
                    }
                }
            }
        }
        return salida;
    };
    //guarda un archivo
    FileManager.prototype.save = function (nameFile) {
    };
    //guarda un archivo con un nuevo nombre
    FileManager.prototype.saveAs = function (nameFile) {
    };
    //cierra un proyecto
    FileManager.prototype.closeProject = function (nameProject) {
    };
    FileManager.prototype.isExistProject = function (nameproject, library) {
        for (var i = 0; i < library.getListProject().length; i++) {
            if (library.getListProject()[i].getName() == nameproject) {
                console.log('Ya existe');
                return true;
            }
        }
        console.log('No existe');
        return false;
    };
    FileManager.prototype.isExistFile = function (nameproject, nameFile, library) {
        for (var i = 0; i < library.getListProject().length; i++) {
            if (library.getListProject()[i].getName() == nameproject) {
                for (var j = 0; j < library.getListProject()[i].getListFiles.length; j++) {
                    if (nameFile == library.getListProject()[i].getListFiles()[j].getName()) {
                        console.log('Ya existe file');
                        return true;
                    }
                }
            }
        }
        console.log('No existe file');
        return false;
    };
    return FileManager;
}());
exports.FileManager = FileManager;
