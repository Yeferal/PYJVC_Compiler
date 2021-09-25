const fs = require('fs');

//ruta y el texto que va recibir
var text = 'Hola esta es la entrada';
const nameFile = 'entrada.txt';
const path = './'+nameFile;

/*
fs.writeFile(path, txt)
Crea una archivo, y si tiene function de parametro
es para que se ejecute despues de crear el archivo
*/
function createFile(path,text){
    fs.writeFile(path, text, function (err){
        if(err){
            console.log(err);
        }else{
            console.log('Archivo creador en la ruta: '+path);
        }
    });
    
}

function readFile(path){
    fs.readFile(path,function (err, data){
        if(err){
            console.log(err);
        }else{
            console.log(data.toString());
        }
    });
}

readFile(path);
// function isExisteFile(path){
//     if(fs.existsSync(path)){

//     }else{

//     }
// }