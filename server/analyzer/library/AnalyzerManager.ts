import { Parser } from './analyzer_xml';

export class AnalyzerManager {
    
    private result: any;
    
    constructor(){}

    runBiblioteca(text: string){
        let analizador = new Parser();
        let r = analizador.parse(text);
        this.result = r;
    }

    getResult(): any{
        return this.result;
    }


}