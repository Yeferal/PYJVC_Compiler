const FileManajer = require('../src/file/FileManager');
const Library = require('../analyzer/library/Library');
const AnalyzerManager = require('../analyzer/library/AnalyzerManager');
const fsManager = require('../fsManager');
const { Project } = require('../analyzer/library/Project');
const { FileProject } = require('../analyzer/library/FileProject');

const analyzerManager = new AnalyzerManager.AnalyzerManager();
const fileManager = new FileManajer.FileManager();
// const fsFile = new fs();

const filesCtrl = {}


filesCtrl.getProjects = async (req, res) => {
    let text = await fsManager.readFile('./server/files/project_files/projects.xml');
    text = fsManager.getResult();
    analyzerManager.runBiblioteca(text);
    let library = analyzerManager.getResult();
    // console.log(library);
    res.json({
        library: library
    });
}

filesCtrl.createProject = async (req, res, next) => {
    // console.log('=> Crear Proyecto: ',req.body.name);
    let nameProject = req.body.name;
    let text = await fsManager.readFile('./server/files/project_files/projects.xml');
    text = fsManager.getResult();
    analyzerManager.runBiblioteca(text);
    let library = analyzerManager.getResult();
    let isExist = fileManager.isExistProject(nameProject,library);
    let newText = text;

    if(!isExist){
        newText = fileManager.createProject(nameProject,library);
        await fsManager.createFile('./server/files/project_files/projects.xml', newText);
        analyzerManager.runBiblioteca(newText);
        library = analyzerManager.getResult();
        fsManager.createCarpeta(nameProject);
    }
    console.log('Resultante: \n',library);
    res.json({
        library: library,
        isExist: isExist,
        nameProject: nameProject
    });
};

filesCtrl.createFile = async (req, res, next) => {
    let nameProject = req.body.namePro;
    let nameFile = req.body.name;
    let text = await fsManager.readFile('./server/files/project_files/projects.xml');
    text = fsManager.getResult();
    analyzerManager.runBiblioteca(text);
    let library = analyzerManager.getResult();
    let isExist = fileManager.isExistFile(nameProject, nameFile, library);
    if(!isExist){
        let newText = fileManager.createFile(nameProject, nameFile, library);
        await fsManager.createFile('./server/files/project_files/projects.xml', newText);
        analyzerManager.runBiblioteca(newText);
        library = analyzerManager.getResult();
        await fsManager.createFile(`./server/files/Projects/${nameProject}/${nameFile}.mlg`, "\n\n%%PY\n\n%%JAVA\n\n%%PROGRAMA\n\n");
    }
    res.json({
        library: library,
        isExist: isExist,
        nameProject: nameProject,
        nameFile: nameFile
    });
};

filesCtrl.openProject = async (req, res, next) => {
    let nameProject = req.params.nameProject;
    let text = await fsManager.readFile('./server/files/project_files/projects.xml');
    text = fsManager.getResult();
    analyzerManager.runBiblioteca(text);
    let library = analyzerManager.getResult();
    let project = fileManager.openProject(nameProject,library);
    
    res.json({
        project: project
    });
};

filesCtrl.openFile = async (req, res, next) => {
    console.log(req.params);
    let nameFile = req.params.nameFile;
    let nameProject = req.params.nameProject;
    let text = await fsManager.readFile('./server/files/Projects/'+nameProject+'/'+nameFile);
    text = fsManager.getResult();
    res.json({
        text: text
    });
};

filesCtrl.save = async (req, res, next) => {
    let nameProject = req.body.namePro;
    let nameFile = req.body.name;
    let text = req.body.text;
    await fsManager.createFile(`./server/files/Projects/${nameProject}/${nameFile}`, text);

    res.json({
        message: "Guardado correctamente"
    });
};

filesCtrl.saveAs = async (req, res, next) => {
    let nameProject = req.body.namePro;
    let nameFile = req.body.name;
    let text = req.body.text;
    text = fsManager.getResult();
    analyzerManager.runBiblioteca(text);
    let library = analyzerManager.getResult();
    let isExist = fileManager.isExistFile(nameProject, nameFile, library);
    if(!isExist){
        let newText = fileManager.createFile(nameProject, nameFile, library);
        await fsManager.createFile('./server/files/project_files/projects.xml', newText);
        analyzerManager.runBiblioteca(newText);
        library = analyzerManager.getResult();
        await fsManager.createFile(`./server/files/Projects/${nameProject}/${nameFile}.mlg`, "\n\n%%PY\n\n%%JAVA\n\n%%PROGRAMA\n\n");
    }
    res.json({
        message: `Guardado como ${nameProject}/${nameFile}.mlg correctamente`
    });
};

filesCtrl.closeProject = async (req, res, next) => {
    
};

module.exports = filesCtrl;