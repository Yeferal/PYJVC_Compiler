//const multiparty = require('connect-multiparty');
const colors = require('colors');
// const { text } = require('stream/consumers');
const app = require("./app");
//const { ppid } = require('process');

//Starting the server
app.listen(app.get("port"), () => {
    console.log('Server on port'.yellow,(app.get("port")+'').yellow);
});

console.log('Inicio');

            // var analizador = new AnalyzerManager.AnalyzerManager();
            // analizador.runBiblioteca(data.toString());
            // console.log(analizador.result);


// const fsManager = require('./fsManager');

// text = fsManager.readFile('./server/files/project_files/projects.xml');

// console.log(text);