%{
    const Posicion = require("./Errores/Posicion.js");
    const ErrorG = require("./Errores/ErrorG.js");

    var listaErrores = new Array();
    let pilaAmbito = [];
    var resultado;

    //para la identacion
    var estadoIdent = false;
    var contadorAmbito=0, ambitoActual=0;

    function iniciar(){
        pilaAmbito.push(0);
    }

    function pintar(texto){
        // console.log(texto+"");
    }

    function verificarIndentacion(value, size){
        if(!(pilaAmbito.length==0)){
            var ambito = pilaAmbito[pilaAmbito.length - 1]
            if((ambito+1)==size){
                pilaAmbito.push(ambito+1);
                console.log(value.substr(1,value.length),'INDENT:',(ambito+1));
                return 'indent';
            }else if((ambito-1)==size){
                pilaAmbito.push(ambito-1);
                console.log(value.substr(1,value.length),'DEDENT:',(ambito-1));
                return 'dedent';
            }else if(ambito==size){
                console.log(value.substr(1,value.length),'SALTO_:',ambito);
                return null;
            }else{
                console.log(value.substr(1,value.length),'ERROR DE identacion');
                // return ' ';
                // return null;
            }
        }else{
            iniciar();
            return verificarIndentacion(value, size);
        }
    }

    function getTabs(texto, size){
        contador = 0;
        contadorS = 0;
        // console.log('<',texto,'> size:',size);
        for(i = 0; i<size; i++){
            caracter = texto.substr(i,1);
            // console.log('char:',caracter,'| tamanio',caracter.length);
            switch(caracter){
                case '\t':
                // case '\n\t':
                    // console.log('Tchar:|'+caracter+'| t');
                    contador++;
                    break;
                case ' ':
                // case '  ':
                // case '    ':
                // case '      ':
                case '\b':
                // case '':
                    // console.log('Tchar:|'+caracter+'| s');
                    contadorS++;
                    break;
                case '\n':
                case '\r':
                    // console.log('Tchar:|'+caracter+'| n');
                    // contador++;
                    break;
                    default:
                    // console.log('Tchar:|'+caracter+'| l');
            }
            if(contadorS==4){
                contador++;
                contadorS = 0;
            }
        }
        // console.log('Contador:',contador);
        return contador;
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
%}

%lex

//Fila
%options yylineno          
//Columna
%locations                   

// %x INITIAL
// %x PAQUETE
// %x PYTHON
%%

//identacion para PY
([\n]+[\t]*)                                                    {var sim = verificarIndentacion(yytext, getTabs(yytext, yyleng) ); if(sim!=null){return sim;}else{/*IGNORAR*/}}
([\n]+(("    "|"\b\b\b\b"))*)                                   {var sim = verificarIndentacion(yytext, getTabs(yytext, yyleng) ); if(sim!=null){return sim;}else{/*IGNORAR*/}}
// [\n]+                                                           {pintar('SALT'); return ' '; }

[ \r\b\f]+                     /* skip whitespace */

//bloques
([^/'%%PY']*('%%PY'))                                            {pintar(yytext); return 'block_python';}
(('%%JAVA')[^/%%]*('%%'))                                        {pintar(yytext); return 'block_jv';}
(('PROGRAMA')[^]*)                                              {pintar(yytext); return 'block_programa';}


//Comentarios
[/][/][/]*[^\n]*[\n]?                                           {pintar('comentario_simple'+yytext); return 'comentario_simple';}
[/*][*][^*]*[*]+([^/*][^*]*[*]+)*[/]                            {pintar('comentario_bloque'+yytext); return 'comentario_bloque';}


//operadores aritmeticos
"+"                                                             {pintar(yytext); return 'mas';}
"-"                                                             {pintar(yytext); return 'menos';}
"*"                                                             {pintar(yytext); return 'por';}
"/"                                                             {pintar(yytext); return 'div';}
"%"                                                             {pintar(yytext); return 'mod';}
"^"                                                             {pintar(yytext); return 'pot';}
//mensajes a pantalla
"print"                                                         {pintar(yytext); return 'print';}
"println"                                                       {pintar(yytext); return 'println';}

//operadores racionales
">"                                                             {pintar(yytext); return 'mayor_q';}
"<"                                                             {pintar(yytext); return 'menor_q';}
"=="                                                            {pintar(yytext); return 'igual_igual';}
">="                                                            {pintar(yytext); return 'mayor_igual';}
"<="                                                            {pintar(yytext); return 'menor_igual';}
"!="                                                            {pintar(yytext); return 'diferente';}

//operadores logico
"and"                                                           {pintar(yytext); return 'and';}
"or"                                                            {pintar(yytext); return 'or';}
"not"                                                           {pintar(yytext); return 'not';}

//solicitud de datos python
"input"                                                         {pintar(yytext); return 'input';}

//ciclos python
"for"                                                           {pintar(yytext); return 'for';}
"in"                                                            {pintar(yytext); return 'in';}
"range"                                                         {pintar(yytext); return 'range';}
"while"                                                         {pintar(yytext); return 'while';}
//pyton no tiene do while
"break"                                                         {pintar(yytext); return 'break';}
"continue"                                                      {pintar(yytext); return 'continue';}

// sentencias if-else python
"if"                                                            {pintar(yytext); return 'if';}
"elif"                                                          {pintar(yytext); return 'elif';}
"else"                                                          {pintar(yytext); return 'else';}
//python no tiene switch
"true"                                                          {pintar(yytext); return 'true';}
"false"                                                         {pintar(yytext); return 'false';}

//palabras reservadas de PTHON, los procedimientos son funciones que no devuelven nada en python
"def"                                                           {pintar(yytext); return 'def';}
"return"                                                        {pintar(yytext); return 'return';}

//signos o simbolos reservados
":"                                                             {pintar(yytext); return 'dos_puntos';}
","                                                             {pintar(yytext); return 'coma';}
";"                                                             {pintar(yytext); return 'punto_coma';}
"("                                                             {pintar(yytext); return 'par_a';}
")"                                                             {pintar(yytext); return 'par_c';}
"["                                                             {pintar(yytext); return 'cor_a';}
"]"                                                             {pintar(yytext); return 'cor_c';}
"="                                                             {pintar(yytext); return 'igual';}



//regulares
\"[^\"]*\"			                                            { yytext = yytext.substr(0,yyleng-0); return 'cadena'; }
\'[^\']?\'			                                            { yytext = yytext.substr(0,yyleng-0); return 'caracter'; }
[0-9]+\b  	                                                    {pintar('entero: '+yytext); return 'entero';}
[0-9]+(".")([0-9]+)+\b  	                                    {pintar('decimal: '+yytext); return 'decimal';}
([a-zA-Z])[a-zA-Z0-9_]*                                         {pintar('id: '+yytext); return 'id';}
// \`[^\`]*\`			{ yytext = yytext.substr(0,yyleng-0); return 'string'; }

// \s+                     /* skip whitespace */
<<EOF>>                                                         {return 'EOF';}
.                                                               {console.log('ERROR'); return 'ERROR';}


// }
/lex

/* Asociación de operadores y precedencia */
//presedencia de menor a mayor
//Precediencia operadores logicos
%left 'or'
%left 'and'
%right 'not'

//Presedencia operadores matematicos
%left 'igual_igual' 'diferente' 'mayor_q' 'menor_q' 'mayor_igual' 'menor_igual'
%left 'mas' 'menos'
%left 'mod' 'div' 'por'
%left 'pot'
%left UMINUS
// %right 'par_a' 'par_c'
// %right 'OPERACION_RACIONAL'
// %right 'OPERACION_ARITMETICA'
// %left MAS MENOS
// %left POR DIVIDIDO

%start INICIO

%%

INICIO
    :BLOQUES_CODE EOF
;

BLOQUES_CODE
    :BLOQUE_PYTHON BLOQUE_JAVA_PROGRAM
;


BLANCOS
    :comentario_bloque
    |comentario_simple
    |indent
    |dedent
;

STATE_INDENT
    :indent
;

STATE_DEDENT
    :dedent
;

BLOQUE_PYTHON
    :block_python CODIGO_PY
;

BLOQUE_JAVA_PROGRAM
    :block_jv block_programa
;

CODIGO_PY
    :CODIGO_PY STRUCT_FUNCION
    |CODIGO_PY comentario_bloque
    |CODIGO_PY comentario_simple
    |CODIGO_PY indent
    |CODIGO_PY dedent
    |
;

STRUCT_FUNCION
    :def id par_a par_c dos_puntos STATE_INDENT STATE_CODE STATE_DEDENT
    |def id par_a PARAM_DEF par_c dos_puntos STATE_INDENT STATE_CODE STATE_DEDENT
;

PARAM_DEF
    :PARAM_DEF coma id
    |id
;

/*========================== estado para el codigo de funciones y procedimientos ==========================*/
STATE_CODE
    :STATE_CODE DECLARACION_VAR
    |STATE_CODE MENSAJES
    |STATE_CODE SOLICITUD
    |STATE_CODE return STATE_VALUE
    |STATE_CODE CICLOS
    |STATE_CODE SENTENCIA_IF
    |
;
/*========================== valor y operadores ==========================*/
valor
    :id
    |entero
    |decimal
    |cadena
    |caracter
    |true
    |false
;

OPERACION_ARITMETICA
    :OPERACION_ARITMETICA mas OPERACION_ARITMETICA
    |OPERACION_ARITMETICA menos OPERACION_ARITMETICA
    |OPERACION_ARITMETICA por OPERACION_ARITMETICA
    |OPERACION_ARITMETICA div OPERACION_ARITMETICA
    |OPERACION_ARITMETICA mod OPERACION_ARITMETICA
    |OPERACION_ARITMETICA pot OPERACION_ARITMETICA
    |menos OPERACION_ARITMETICA %prec UMINUS
    |par_a OPERACION_ARITMETICA par_c
    |valor
;

OPERACION_RACIONAL
    :STATE_OP_RACIONAL mayor_q STATE_OP_RACIONAL
    |STATE_OP_RACIONAL menor_q STATE_OP_RACIONAL
    |STATE_OP_RACIONAL igual_igual STATE_OP_RACIONAL
    |STATE_OP_RACIONAL mayor_igual STATE_OP_RACIONAL
    |STATE_OP_RACIONAL menor_igual STATE_OP_RACIONAL
    |STATE_OP_RACIONAL diferente STATE_OP_RACIONAL
;

STATE_OP_RACIONAL
    :OPERACION_RACIONAL
    |par_a OPERACION_RACIONAL par_c
    |OPERACION_ARITMETICA
;



OPERACION_LOGICA
    :STATE_OP_LOGICA and STATE_OP_LOGICA
    |STATE_OP_LOGICA or STATE_OP_LOGICA
    |not STATE_OP_LOGICA
;

STATE_OP_LOGICA
    :OPERACION_LOGICA
    |par_a OPERACION_LOGICA par_c
    |STATE_OP_RACIONAL
;

STATE_VALUE
    :STATE_OP_LOGICA
    |SOLICITUD
;
/*========================== Mensajes en pantalla ==========================*/
MENSAJES
    :println par_a STATE_VALUE par_c  
    |print par_a STATE_VALUE par_c  
    |println par_a par_c  
    |print par_a par_c 
;

/*========================== declaracion y asignacion de var ==========================*/
DECLARACION_VAR
    :id  
    |id igual STATE_VALUE 
;

/*========================== Solicitud de datos ==========================*/
SOLICITUD
    :input par_a par_c
;

/*========================== Ciclos ==========================*/
CICLOS
    :CICLO_FOR
    |CICLO_WHILE
;
/*========================== Ciclo For ==========================*/
CICLO_FOR
    :for id in range par_a PARAM_RANGE par_c dos_puntos STATE_INDENT CODE_CICLOS STATE_DEDENT
;

PARAM_RANGE
    :valor
    |valor coma valor
    |valor coma valor coma valor
;

CODE_CICLOS
    :STATE_CODE
    |continue STATE_CODE
    |break STATE_CODE
;

/*========================== Ciclo WHILE ==========================*/
CICLO_WHILE
    :while STATE_OP_LOGICA dos_puntos STATE_INDENT CODE_CICLOS STATE_DEDENT
;

/*========================== Sentencias IF ELSE ==========================*/
SENTENCIA_IF
    : if STATE_OP_LOGICA dos_puntos STATE_INDENT STATE_CODE STATE_DEDENT STATE_ELIF
;

STATE_ELIF
    :elif STATE_OP_LOGICA dos_puntos STATE_INDENT STATE_CODE STATE_DEDENT STATE_ELIF
    |else dos_puntos STATE_INDENT STATE_CODE STATE_DEDENT
    |
;