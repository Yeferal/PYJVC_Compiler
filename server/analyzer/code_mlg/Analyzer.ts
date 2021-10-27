import { Parser as AnalizadorPack } from './mlgpack';
import { Parser as AnalizadorPY } from './mlgpy';
import { Parser as AnalizadorJVC } from './mlgjvc';
// let AnalizadorPY = require('./mlgpy');

export class Analyzer{

    constructor(){ }

    analizar(entrada: string){
        let analizador1 = new AnalizadorPack();
        analizador1.parse(entrada);
        // analizador1.
        
    }

}

