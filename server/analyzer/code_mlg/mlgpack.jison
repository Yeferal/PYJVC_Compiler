%{
    const Posicion = require("./Errores/Posicion.js");
    const ErrorG = require("./Errores/ErrorG.js");

    var resultado;
    var listaErrores = new Array();
    //para la identacion

    function pintar(texto){
        // console.log(texto+"");
    }

    function agregarError(linea, columna, tipoError, tokenS, descripcion){
        let posicion = new Posicion.Posicion(linea, columna);
        let errorG = new ErrorG.ErrorG(posicion, tipoError, tokenS, descripcion);
        console.log(`Error>> Linea: ${linea}, Columna: ${columna}, TipoError: ${tipoError}, Token: ${tokenS}, Descripcion: ${descripcion}`);
        listaErrores.push(errorG);
    }
    function getListaErrores(){
        return listaErrores;
    }

    // this.parseError = function parseError (str, hash) {
        //     console.log('entro')
        // if (hash.recoverable) {
        //     this.trace(str);
        // } else {
        //     var error = new Error(str);
        //     error.hash = hash;
        //     throw error;
        // }
    // }
%}

%lex

//Fila
%options    yylineno 
// %options debug=0
//          output-debug-tables=0
//          default-action-mode=none,none       
//Columna
%locations   
%yyerrok                

%%



//bloques
// '%%'\s+"PY"[^%%]"%%"\s+"JAVA"[^%%]"%%"\s+"PROGRAMA"[^]                          {pintar(yytext); return 'block_py_java_programa';}

(('%%PY')[^%%]*('%%'))                       {pintar(yytext); return 'block_py';}
(('JAVA')[^%%]*('%%'))                       {pintar(yytext); return 'block_jv';}
(('PROGRAMA')[^]*)                       {pintar(yytext); return 'block_programa';}

//Comentarios
[/][/][/]*[^\n]*[\n]?                                           {pintar('comentario_simple'+yytext); return 'comentario_simple';}
[/*][*][^*]*[*]+([^/*][^*]*[*]+)*[/]                            {pintar('comentario_bloque'+yytext); return 'comentario_bloque';}



//Para la seccion de paquetes
"paquete"                                                       {pintar(yytext); return 'paquete'; }

//signos o simbolos reservados
"."                                                             {pintar(yytext); return 'punto';}
"*"                                                             {pintar(yytext); return 'por';}

//regulares
([a-zA-Z])[a-zA-Z0-9_-]*                                        {pintar('id: '+yytext); return 'id';}

\s+                     /* skip whitespace */
<<EOF>>                                                         {return 'EOF';}
.                                                               {
        // console.log('ERROR Lexico');
        agregarError((yylineno + 1), (yylloc.first_column + 1), 'Lexico', yytext, 'Token no reconocido');
        // return 'ERROR';
    }

/lex


%start INICIO

%%

INICIO
    :BLOQUES_CODE EOF
;

BLOQUES_CODE
    :BLOQUE_PAQUETES BLOQUE_PY_JV_PROGRAM
;

BLOQUE_PAQUETES
    :PAQUETE BLOQUE_PAQUETES
    |BLANCOS BLOQUE_PAQUETES
    |
    |error {
        agregarError((@1.first_line+1), (@1.first_column+1), 'Sintactico', $1, 'Error en la estructura del texto de entrada');
    }
;

PAQUETE
    :PAQUETE punto id
    |PAQUETE punto por
    |paquete id
    |error id {
        // console.log(parseError(error));
        // console.log(_$,$$);
        // console.log(this.parseError);
        // console.log(yy.match);
        console.log(this.symbols_);
        // yyerrok;
        // console.log($$);
        // console.log(yytext);
        // console.log(@0,$0);
        // console.log(@1,$1);
        // console.log(@2,$2);
        // console.log(@3,$3);
        agregarError((@1.first_line+1), (@1.first_column+1), 'Sintactico', $1, 'Fallo al agregar paquete'); 
    }
    |error por {
        agregarError((@1.first_line+1), (@1.first_column+1), 'Sintactico', $1, 'Fallo al agregar paquete');
    }
    // |error
;

BLANCOS
    :comentario_bloque
    |comentario_simple
;

BLOQUE_PY_JV_PROGRAM
    :block_py block_jv block_programa
    |block_py error {
        agregarError((@2.first_line+1), (@2.first_column+1), 'Sintactico', $2, 'Error de bloque %%JAVA');
    } 
    |block_jv error{
        agregarError((@2.first_line+1), (@2.first_column+1), 'Sintactico', $1, 'Error de bloque %%PROGRAMA');
    }
;
