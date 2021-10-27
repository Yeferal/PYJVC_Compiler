const fs = require('fs');

const fsManager = {}
let result = null;

const pathXML = './server/files/project_files/projects.xml';
const pathLibrary = './server/Projects/';


fsManager.readFile = function (path) {
    // var result = '';
    result = fs.readFileSync(path,function (err, data){
        if(err){
            console.log(err);
            // result = null;
        }
        // console.log(data.toString());
        // result = data.toString();
        // console.log('RESULTADO: ',result);
        // return result;
        //console.log('RESULTADO: ',result);
    }).toString();
    // console.log('RESULT: ',result);
    
    return result;
}

// fsManager.readFile = function (path) {
//     // var result = '';
//      fs.readFile(path,function (err, data){
//         if(err){
//             console.log(err);
//             result = null;
//         }
//         // console.log(data.toString());
//         result = data.toString();
//         // console.log('RESULTADO: ',result);
//         // return result;
//         //console.log('RESULTADO: ',result);
//     });
//     console.log('RESULT: ',result);
    
//     return result;
// }

fsManager.createFile = (path,text) => {
    return fs.writeFile(path, text, function (err){
        if(err){
            console.log(err);
            return false;
        }else{
            console.log('Archivo creador en la ruta: '+path);
            return true;
        }
    });
    
}

fsManager.createCarpeta = (nameProject) =>{
    fs.mkdirSync(`./server/files/Projects/${nameProject}`,{recursive:true});
}

fsManager.getResult = () => {
    return result;
    
}

module.exports = fsManager;