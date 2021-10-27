/*
Equivale al parseCode de CUP
Codigo para el parser
Basicamente aqui van los imports, funciones, metodos, variables
BloqueI:
%{

%}
BloqueF:
*/

%{
    const FileProject = require("./FileProject.js");
    const Project = require("./Project.js");
    const Library = require("./Library.js");

    var resultado;
%}


/* Directivas Lexicas y Expresiones regulares | Tokens
Aqui van todo el analisis lexico 
Basicamente aqui va las expresiones regulares, los simbolos terminales
Y tambien podemos meter codigo dentro

BloqueI:
%lex
//directivas -> options. ejemplo:
%options case-sensitive
%options yylineno  //Fila
%location //Columna

//ejemplo expresion regular
<NOMBRE>    [expresion_regular]
NUM         [0-9]+
MAS         "+"
%%

/lex
BloqueF:

*/
%lex

//Fila
%options yylineno          
//Columna
%locations                   

%x INITIAL
%%
// Letra			[a-zA-Z][a-zA-Z0-9]*
// Digito          [0-9]
// Numero          {Digito} {Digito}*


// <INITIAL>{
\s+                     /* skip whitespace */
<INITIAL>"<libreria>"               {return 'libreria_a';}
<INITIAL>"</libreria>"              {return 'libreria_c';}
<INITIAL>"<proyecto"                {return 'proyecto_a';}
<INITIAL>"\""[^\"]*"\""		        {yytext = yytext.substr(1,yyleng-2); return 'cadena'; }
<INITIAL>"nombre="                  {return 'nombre';}
<INITIAL>">"                        {return 'cierre';}
<INITIAL>"<archivo"                 {return 'archivo_a';}
<INITIAL>"path="                    {return 'path';}
<INITIAL>"</archivo>"               {return 'archivo_c';}
<INITIAL>"</proyecto>"              {return 'proyecto_c';}
<INITIAL>([a-zA-Z])[a-zA-Z0-9_-]*   {return 'id';}
<<EOF>>                             {return 'EOF';}
.                                   {return 'INVALID';}


// }
/lex

/* Asociación de operadores y precedencia */
// %left MAS MENOS
// %left POR DIVIDIDO

%start ini

%%


ini: 
    LIBRERIA EOF { /*console.log($1);*/ resultado = $1; return $1; }
;

LIBRERIA:
    libreria_a PROYECTOS libreria_c 
        {
            let library = new Library.Library();
            library.setListProject($2);
            $$ = library;
        }
;

PROYECTOS
    :PROYECTOS proyecto_a nombre cadena cierre ARCHIVOS proyecto_c 
        {
            let array_projects1 = $1;
            let project = new Project.Project($4);
            project.setListFiles($6);
            array_projects1.push(project);
            // console.log(array_projects1);
            $$ = array_projects1;
        }
    |   { 
            let array_projects = []; 
            $$ = array_projects;
            // $$ = new Array();
        }
;

ARCHIVOS
    :ARCHIVOS archivo_a path cadena cierre id archivo_c 
        {
            // console.log($1,$2,(@3.first_column+1),$4,$5,$6,'lalr',yytext);
            // console.log($1,$2,$3,$4,$5,$6,$7);
            let array_files1 = $1;
            let fileProject = new FileProject.FileProject($4, $6);
            array_files1.push(fileProject);
            // console.log(array_files1);
            $$ = array_files1;
        }
    |   { 
            let array_files = []; 
            // console.log("dd");
            $$ = array_files;
            // $$ = new Array();
        }
;