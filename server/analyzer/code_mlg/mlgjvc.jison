%{
    // const FileProject = require("./FileProject.js");
    // const Project = require("./Project.js");
    // const Library = require("./Library.js");

    function pintar(texto){
        console.log(texto+"");
    }
%}

%lex

%options yylineno          
%locations                   

%%

// \s+                     /* skip whitespace */

//bloques
([^/'%%PY']*('%%PY'))                                           {pintar(yytext); return 'block_python';}
([^%%JAVA]*('%%JAVA'))                                          {pintar(yytext); return 'block_jv';}
// ([^/'%%JAVA']*('%%JAVA'))                                        {pintar(yytext); return 'block_jv';}
(('%%PROGRAMA'))                                                {pintar(yytext); return 'block_programa';}

//Comentarios
[/][/][/]*[^\n]*[\n]?                                           {pintar('comentario_simple'+yytext); return 'comentario_simple';}
[/*][*][^*]*[*]+([^/*][^*]*[*]+)*[/]                            {pintar('comentario_bloque'+yytext); return 'comentario_bloque';}

//Secciones del programa
("Seccion de librerías de C"|"Sección de librerías de C")     {pintar(yytext); return 'seccion_libs';}
("Seccion declaración de Constantes"|"Sección declaración de Constantes")     {pintar(yytext); return 'seccion_const';}
("Seccion de Variables Globales"|"Sección de Variables Globales")             {pintar(yytext); return 'seccion_vars_globals';}
"main"                                                            {pintar(yytext); return 'main';}
"#include"                                                            {pintar(yytext); return 'include';}
"const"                                                            {pintar(yytext); return 'const_r';}
"PY."                                                            {pintar(yytext); return 'py_f';}
"JAVA."                                                            {pintar(yytext); return 'java_f';}
"&"                                                            {pintar(yytext); return 'andpersand';}
"scanf"                                                            {pintar(yytext); return 'scanf';}
"printf"                                                            {pintar(yytext); return 'printf';}
"clrscr"                                                            {pintar(yytext); return 'clrscr';}
"getch"                                                            {pintar(yytext); return 'getch';}
// ""                                                            {pintar(yytext); return '';}
// ""                                                            {pintar(yytext); return '';}

//operadores racionales
"=="                                                            {pintar(yytext); return 'igual_igual';}
">="                                                            {pintar(yytext); return 'mayor_igual';}
"<="                                                            {pintar(yytext); return 'menor_igual';}
"!="                                                            {pintar(yytext); return 'diferente';}
">"                                                             {pintar(yytext); return 'mayor_q';}
"<"                                                             {pintar(yytext); return 'menor_q';}

//signos o simbolos reservados
"."                                                             {pintar(yytext); return 'punto';}
":"                                                             {pintar(yytext); return 'dos_puntos';}
","                                                             {pintar(yytext); return 'coma';}
";"                                                             {pintar(yytext); return 'punto_coma';}
"("                                                             {pintar(yytext); return 'par_a';}
")"                                                             {pintar(yytext); return 'par_c';}
"["                                                             {pintar(yytext); return 'cor_a';}
"]"                                                             {pintar(yytext); return 'cor_c';}
"="                                                             {pintar(yytext); return 'igual';}
"{"                                                             {pintar(yytext); return 'llave_a';}
"}"                                                             {pintar(yytext); return 'llave_c';}

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



//operadores logico
"&&"                                                           {pintar(yytext); return 'and';}
"||"                                                            {pintar(yytext); return 'or';}
"!"                                                           {pintar(yytext); return 'not';}

//solicitud de datos java
"intinput"                                                      {pintar(yytext); return 'intinput';}
"floatinput"                                                    {pintar(yytext); return 'floatinput';}
"charinput"                                                     {pintar(yytext); return 'charinput';}

//ciclos python
"for"                                                           {pintar(yytext); return 'for';}
"do"                                                            {pintar(yytext); return 'do';}
"while"                                                         {pintar(yytext); return 'while';}
"break"                                                         {pintar(yytext); return 'break';}
"continue"                                                      {pintar(yytext); return 'continue';}

// sentencias if-else python
"if"                                                            {pintar(yytext); return 'if';}
"else"                                                          {pintar(yytext); return 'else';}
"switch"                                                        {pintar(yytext); return 'switch';}
"case"                                                          {pintar(yytext); return 'case';}
"default"                                                       {pintar(yytext); return 'default';}
"true"                                                          {pintar(yytext); return 'true';}
"false"                                                         {pintar(yytext); return 'false';}

//declaracion de variables
"int"                                                           {pintar(yytext); return 'int';}
"float"                                                         {pintar(yytext); return 'float';}
"double"                                                        {pintar(yytext); return 'double';}
"char"                                                          {pintar(yytext); return 'char';}
"boolean"                                                       {pintar(yytext); return 'boolean';}
"String"                                                        {pintar(yytext); return 'string';}

//palabras reservadas de PTHON, los procedimientos son funciones que no devuelven nada en python
"public"                                                        {pintar(yytext); return 'public';}
"private"                                                       {pintar(yytext); return 'private';}
"void"                                                          {pintar(yytext); return 'void';}
"return"                                                        {pintar(yytext); return 'return';}

//Clases
"class"                                                         {pintar(yytext); return 'class';}
"extends"                                                       {pintar(yytext); return 'extends';}
"this."                                                         {pintar(yytext); return 'this';}

//regulares
\"[^\"]*\"			                                            { yytext = yytext.substr(0,yyleng-0); return 'cadena'; }
\'[^\']?\'			                                            { yytext = yytext.substr(0,yyleng-0); return 'caracter'; }
[0-9]+\b  	                                                    {pintar('entero: '+yytext); return 'entero';}
[0-9]+(".")([0-9]+)+\b  	                                    {pintar('decimal: '+yytext); return 'decimal';}
([a-zA-Z])[a-zA-Z0-9_]*                                         {pintar('id: '+yytext); return 'id';}
// \`[^\`]*\`			{ yytext = yytext.substr(0,yyleng-0); return 'string'; }

\s+                     /* skip whitespace */
<<EOF>>                                                         {return 'EOF';}
.                                                               {console.log('ERROR'); return 'ERROR';}

/lex

/* Asociación de operadores y precedencia */
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

%start INICIO

%%

INICIO
    :BLOQUES_CODE EOF
;

BLOQUES_CODE
    :BLOQUE_PYTHON BLOQUE_JAVA BLOQUE_PROGRAM
;


BLANCOS
    :comentario_bloque
    |comentario_simple
;


BLOQUE_PYTHON
    :block_python
;

BLOQUE_JAVA
    :block_jv CODE_JAVA
;

BLOQUE_PROGRAM
    :block_programa CODE_PROGRAMA
;

CODE_JAVA
    :CODE_JAVA CLASES
    |
;

CLASES
    :public class id HERENCIA llave_a BLOQUE_CODE_CLASS_JAVA llave_c
    |public class id llave_a BLOQUE_CODE_CLASS_JAVA llave_c
;

HERENCIA
    :HERENCIA coma id
    |extends id
;

MOD_ENCAP
    :public
    |private
    |
;

BLOQUE_CODE_CLASS_JAVA
    :BLOQUE_CODE_CLASS_JAVA CONSTRUCTOR
    |BLOQUE_CODE_CLASS_JAVA STATE_DECLARACION_VAR
    |BLOQUE_CODE_CLASS_JAVA FUNCIONES
    |BLOQUE_CODE_CLASS_JAVA PROCEDIMIENTOS
    |BLOQUE_CODE_CLASS_JAVA comentario_bloque
    |BLOQUE_CODE_CLASS_JAVA comentario_simple
    |
;

STATE_DECLARACION_VAR
    :DECLARACION_VAR punto_coma
;

DECLARACION_VAR
    :DECLARACION_VAR coma id igual VALOR_VAR
    |DECLARACION_VAR coma id
    |MOD_ENCAP TIPO_VAR id
    |MOD_ENCAP TIPO_VAR id igual VALOR_VAR
;

TIPO_VAR
    :int
    |float
    |double
    |char
    |string
    |boolean
;

VALOR_VAR
    :STATE_VALUE
;

/*========================== valor y operadores ==========================*/
valor
    :id
    |this id
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
/*========================== Funciones y procedimientos ==========================*/
FUNCIONES
    :MOD_ENCAP TIPO_VAR id par_a par_c llave_a CODE_FUNCION llave_c
;

PROCEDIMIENTOS
    :MOD_ENCAP void id par_a par_c llave_a CODE_PROCEDIMIENTO llave_c
;

CODE_FUNCION
    :CODE_FUNCION STATE_DECLARACION_VAR
    |CODE_FUNCION SOLICITUD punto_coma
    |CODE_FUNCION CICLOS_JAVA_FUNC
    |CODE_FUNCION SENTENCIA_IF_JV_FUNC
    |CODE_FUNCION SENTENCIA_SWITCH_JV_FUNC
    |CODE_FUNCION ASIGNACION_VARS_JV
    |CODE_FUNCION comentario_bloque
    |CODE_FUNCION comentario_simple
    |CODE_FUNCION return STATE_VALUE punto_coma
    |
;

CODE_PROCEDIMIENTO
    :CODE_PROCEDIMIENTO STATE_DECLARACION_VAR
    |CODE_PROCEDIMIENTO SOLICITUD punto_coma
    |CODE_PROCEDIMIENTO CICLOS_JAVA_PROC
    |CODE_PROCEDIMIENTO SENTENCIA_IF_JV_PROC
    |CODE_PROCEDIMIENTO SENTENCIA_SWITCH_JV_PROC
    |CODE_PROCEDIMIENTO ASIGNACION_VARS_JV
    |CODE_PROCEDIMIENTO comentario_bloque
    |CODE_PROCEDIMIENTO comentario_simple
    |
;

SOLICITUD
    :intinput par_a par_c
    |floatinput par_a par_c
    |charinput par_a par_c 
;

/*========================== CICLOS JAVA ==========================*/
CICLOS_JAVA_FUNC
    :CICLO_FOR_JV_FUNC
    |CICLO_WHILE_JV_FUNC
    |CICLO_DO_WHILE_JV_FUNC
;

CICLOS_JAVA_PROC
    :CICLO_FOR_JV_PROC
    |CICLO_WHILE_JV_PROC
    |CICLO_DO_WHILE_JV_PROC
;

CODE_CICLOS_JV_FUNC
    :CODE_FUNCION
    |CODE_FUNCION continue punto_coma CODE_CICLOS_JV_FUNC
    |CODE_FUNCION break punto_coma
;

CODE_CICLOS_JV_PROC
    :CODE_PROCEDIMIENTO
    |CODE_PROCEDIMIENTO continue punto_coma CODE_CICLOS_JV_PROC
    |break punto_coma
;

/*========================== ciclo for java ==========================*/
CICLO_FOR_JV_FUNC
    :for par_a PARAMS_FOR par_c llave_a CODE_CICLOS_JV_FUNC llave_c
;

CICLO_FOR_JV_PROC
    :for par_a PARAMS_FOR par_c llave_a CODE_CICLOS_JV_PROC llave_c
;

PARAMS_FOR
    :int id igual VALOR_VAR punto_coma STATE_OP_LOGICA punto_coma INCREMENTOS
    |id igual VALOR_VAR punto_coma STATE_OP_LOGICA punto_coma INCREMENTOS
;

INCREMENTOS
    :id mas mas
    |id menos menos
    |id igual STATE_VALUE 
    |this id igual STATE_VALUE 
;

/*========================== ciclo while java ==========================*/
CICLO_WHILE_JV_FUNC
    :while par_a STATE_OP_LOGICA par_c llave_a CODE_CICLOS_JV_FUNC llave_c
;

CICLO_WHILE_JV_PROC
    :while par_a STATE_OP_LOGICA par_c llave_a CODE_CICLOS_JV_PROC llave_c
;
/*========================== ciclo do-while java  ==========================*/
CICLO_DO_WHILE_JV_FUNC
    :do llave_a CODE_CICLOS_JV_FUNC llave_c while par_a STATE_OP_LOGICA par_c punto_coma
;

CICLO_DO_WHILE_JV_PROC
    :do llave_a CODE_CICLOS_JV_PROC llave_c while par_a STATE_OP_LOGICA par_c punto_coma
;

/*========================== IF and SWITCH JAVA  ==========================*/
/*========================== if java  ==========================*/
SENTENCIA_IF_JV_FUNC
    :if par_a STATE_OP_LOGICA par_c llave_a CODE_FUNCION llave_c STATE_ELSE_IF_FUNC
;

STATE_ELSE_IF_FUNC
    :else if par_a STATE_OP_LOGICA par_c llave_a CODE_FUNCION llave_c STATE_ELSE_IF_FUNC
    |else llave_a CODE_FUNCION llave_c
    |
;

SENTENCIA_IF_JV_PROC
    :if par_a STATE_OP_LOGICA par_c llave_a CODE_PROCEDIMIENTO llave_c STATE_ELSE_IF_PROC
;

STATE_ELSE_IF_PROC
    :else if par_a STATE_OP_LOGICA par_c llave_a CODE_PROCEDIMIENTO llave_c STATE_ELSE_IF_PROC
    |else llave_a CODE_PROCEDIMIENTO llave_c
    |
;

/*========================== switch java  ==========================*/
SENTENCIA_SWITCH_JV_FUNC
    :switch par_a STATE_OP_LOGICA par_c llave_a STATE_CASE_FUNC llave_c
;

STATE_CASE_FUNC
    :case VAL_CASE dos_puntos STATE_CODE_CASE_FUNC STATE_CASE_FUNC
    |default dos_puntos STATE_CODE_CASE_FUNC
    |
;

VAL_CASE
    :entero
    |decimal
    |cadena
    |caracter
;

STATE_CODE_CASE_FUNC
    :CODE_FUNCION
    |CODE_FUNCION continue punto_coma STATE_CODE_CASE_FUNC
    |CODE_FUNCION break punto_coma STATE_CODE_CASE_FUNC
;

SENTENCIA_SWITCH_JV_PROC
    :switch par_a STATE_OP_LOGICA par_c llave_a STATE_CASE_PROC llave_c
;

STATE_CASE_PROC
    :case VAL_CASE dos_puntos STATE_CODE_CASE_PROC STATE_CASE_PROC
    |default dos_puntos STATE_CODE_CASE_PROC
    |
;

STATE_CODE_CASE_PROC
    :CODE_PROCEDIMIENTO
    |CODE_PROCEDIMIENTO continue punto_coma STATE_CODE_CASE_PROC
    |CODE_PROCEDIMIENTO break punto_coma
;


/*========================== ASIGNACION VARS JAVA  ==========================*/
ASIGNACION_VARS_JV
    :id igual STATE_VALUE punto_coma
    |this id igual STATE_VALUE punto_coma
;

/*========================== Constructor JAVA  ==========================*/

CONSTRUCTOR
    : id par_a par_c llave_a CODE_PROCEDIMIENTO llave_c
;

/*========================== INVOCACION FUNCIONES Y PROCEDIMIENTOS JAVA  ==========================*/




/*============================================================================================================================================================*/
/*============================================================================================================================================================*/
/*============================================================================================================================================================*/
/*============================================================================================================================================================*/
/*============================================================================================================================================================*/



/*========================== Codigo Programa Principal==========================*/
CODE_PROGRAMA
    :COMENTARIOS_S SECCION_LIBS SECCION_DECLARACION_CONST DECLARACION_VAR_GLOBALES SECCION_MAIN
    // :COMENTARIOS SECCION_LIBS SECCION_DECLARACION_CONST DECLARACION_VAR_GLOBALES SECCION_MAIN
;

COMENTARIOS
    :comentario_bloque
    |comentario_simple
;

COMENTARIOS_S
    :comentario_bloque
    |comentario_simple
    |
;

SECCION_LIBS
    :seccion_libs LIBRERIAS
    |
; 

SECCION_DECLARACION_CONST
    :seccion_const VARS_CONTATES
    |
;

DECLARACION_VAR_GLOBALES
    :seccion_vars_globals VAR_GLOBALES
    |
;

SECCION_MAIN
    :void main par_a par_c llave_a CODE_MAIN llave_c
    |
;

TIPOS_DATOS
    :int
    |char
    |float
;

LIBRERIAS
    :LIBRERIAS include cadena
    |LIBRERIAS COMENTARIOS
    |
;

VARS_CONTATES
    :VARS_CONTATES DECLARACION_VAR_CONST punto_coma
    |VARS_CONTATES COMENTARIOS
    |
;

VAR_GLOBALES
    :VAR_GLOBALES STATE_VAR_GLOBALES punto_coma
    |VAR_GLOBALES DECLARACION_ARREGLO punto_coma
    |VAR_GLOBALES COMENTARIOS
    |
;

DECLARACION_VAR_CONST
    :DECLARACION_VAR_CONST coma id igual STTE_VALUE
    |const_r TIPOS_DATOS id igual STTE_VALUE
;

STATE_VAR_GLOBALES
    :STATE_VAR_GLOBALES coma id igual STTE_VALUE
    |STATE_VAR_GLOBALES coma id
    |TIPOS_DATOS id igual STTE_VALUE
    |TIPOS_DATOS id
;

DECLARACION_ARREGLO
    :DECLARACION_ARREGLO coma id DIMENSION
    |TIPOS_DATOS id DIMENSION
;
DIMENSION
    :DIMENSION cor_a STTE_VALUE cor_c
    |cor_a STTE_VALUE cor_c
;

ASIGNACION_VARS_PROG
    :id igual STTE_VALUE punto_coma
;

ASIGNACION_ARREGLO
    :id DIMENSION igual STTE_VALUE punto_coma
;

/*========================== VALORES  ==========================*/
VALORES
    :id
    |id DIMENSION
    |entero
    |decimal
    |caracter
    |true
    |false
;

OP_ARITMETICA
    :OP_ARITMETICA mas OP_ARITMETICA
    |OP_ARITMETICA menos OP_ARITMETICA
    |OP_ARITMETICA por OP_ARITMETICA
    |OP_ARITMETICA div OP_ARITMETICA
    |OP_ARITMETICA mod OP_ARITMETICA
    |OP_ARITMETICA pot OP_ARITMETICA
    |par_a OP_ARITMETICA par_c
    |VALORES
;

OP_RACIONAL
    :STTE_OP_RACIONAL mayor_q STTE_OP_RACIONAL
    |STTE_OP_RACIONAL menor_q STTE_OP_RACIONAL
    |STTE_OP_RACIONAL igual_igual STTE_OP_RACIONAL
    |STTE_OP_RACIONAL mayor_igual STTE_OP_RACIONAL
    |STTE_OP_RACIONAL menor_igual STTE_OP_RACIONAL
    |STTE_OP_RACIONAL diferente STTE_OP_RACIONAL
;

STTE_OP_RACIONAL
    :OP_RACIONAL
    |par_a OP_RACIONAL par_c
    |OP_ARITMETICA
;

OP_LOGICA
    :STTE_OP_LOGICA and STTE_OP_LOGICA
    |STTE_OP_LOGICA or STTE_OP_LOGICA
    |not STTE_OP_LOGICA
;

STTE_OP_LOGICA
    :OP_LOGICA
    |par_a OP_LOGICA par_c
    |STTE_OP_RACIONAL
;

STTE_VALUE
    :STTE_OP_LOGICA
;

/*========================== CODIGO PARA EL MAIN  ==========================*/
CODE_MAIN
    :CODE_MAIN SENTENCIA_IF_PRO
    |CODE_MAIN SENTENCIA_SWITCH_PROG
    |CODE_MAIN CICLOS_PROG
    |CODE_MAIN ASIGNACION_ARREGLO
    |CODE_MAIN ASIGNACION_VARS_PROG
    |CODE_MAIN RESERVADOS_PROG
    |CODE_MAIN LLAMADA_FUN_PROC punto_coma
    |CODE_MAIN DECLARACION_OBJ punto_coma
    |CODE_MAIN LLAMADA_METODOS_OBJ punto_coma
    |CODE_MAIN COMENTARIOS
    |
;

/*========================== IF and SWITCH PROGRAMA ==========================*/
/*========================== if PROGRAMA  ==========================*/
SENTENCIA_IF_PRO
    :if par_a STTE_OP_LOGICA par_c llave_a CODE_MAIN llave_c STATE_ELSE_IF_PRO
;

STATE_ELSE_IF_PRO
    :else if par_a STTE_OP_LOGICA par_c llave_a CODE_MAIN llave_c STATE_ELSE_IF_PRO
    |else llave_a CODE_MAIN llave_c
    |
;

/*========================== switch PROGRAMA  ==========================*/
SENTENCIA_SWITCH_PROG
    :switch par_a STTE_OP_LOGICA par_c llave_a STATE_CASE_PROG llave_c
;

STATE_CASE_PROG
    :case VAL_CASE_PROG dos_puntos STATE_CODE_CASE_PROG STATE_CASE_PROG
    |default dos_puntos STATE_CODE_CASE_PROG
    |
;

VAL_CASE_PROG
    :entero
    |decimal
    |caracter
;

STATE_CODE_CASE_PROG
    :CODE_MAIN 
    |CODE_MAIN continue punto_coma STATE_CODE_CASE_PROG
    |CODE_MAIN break punto_coma STATE_CODE_CASE_PROG
;

// /*========================== CICLOS PROGRAMA ==========================*/
CICLOS_PROG
    :CICLO_FOR_PROG
    |CICLO_WHILE_PROG
    |CICLO_DO_WHILE_PROG
;

CODE_CICLOS_PROG
    :CODE_MAIN
    |CODE_MAIN continue punto_coma CODE_CICLOS_PROG
    |CODE_MAIN break punto_coma
;

/*========================== ciclo for PROGRAMA ==========================*/
CICLO_FOR_PROG
    :for par_a PARAMS_FOR_PROG par_c llave_a CODE_CICLOS_PROG llave_c
;

PARAMS_FOR_PROG
    :int id igual STTE_VALUE punto_coma STTE_OP_LOGICA punto_coma INCREMENTOS_PROG
    |id igual STTE_VALUE punto_coma STTE_OP_LOGICA punto_coma INCREMENTOS_PROG
;

INCREMENTOS_PROG
    :id mas mas
    |id menos menos
    |id igual STATE_VALUE
;

/*========================== ciclo while PROGRAMA ==========================*/
CICLO_WHILE_PROG
    :while par_a STTE_OP_LOGICA par_c llave_a CODE_CICLOS_PROG llave_c
;

/*========================== ciclo do-while PROGRAMA  ==========================*/
CICLO_DO_WHILE_PROG
    :do llave_a CODE_CICLOS_PROG llave_c while par_a STTE_OP_LOGICA par_c punto_coma
;

/*========================== Llamadas a funciones y procedimientos PROGRAMA  ==========================*/

LLAMADA_FUN_PROC
    :py_f id par_a STATE_PARAMS_PY par_c
;

STATE_PARAMS_PY
    :PARAMAS_PY
    |
;

PARAMAS_PY
    :PARAMAS_PY coma POR_VALOR
    |PARAMAS_PY coma POR_REFERENCIA
    |POR_REFERENCIA
    |POR_VALOR
;

POR_REFERENCIA
    :TIPOS_DATOS andpersand id
;

POR_VALOR
    :TIPOS_DATOS id
;

/*========================== resrvados PROGRAMA  ==========================*/
RESERVADOS_PROG
    :SCANF_RESERV
    |PRINTF_RESERV
    |CLRSCR_RESERV
    |GETCH_RESERV
;

SCANF_RESERV
    :scanf par_a cadena, andpersand id par_c punto_coma
;

PRINTF_RESERV
    :printf par_a  par_c punto_coma
    |printf par_a cadena par_c punto_coma
    |printf par_a cadena coma PRINTF_VARS par_c punto_coma
;

PRINTF_VARS
    :PRINTF_VARS COM andpersand id
    |PRINTF_VARS COM id
    |id
    |andpersand id
;

CLRSCR_RESERV
    :clrscr par_a par_c punto_coma
;

GETCH_RESERV
    :getch par_a par_c punto_coma
;

/*========================== OBJETOS ETC PROGRAMA  ==========================*/
DECLARACION_OBJ
    :DECLARACION_OBJ coma id
    |DECLARACION_OBJ coma id par_a STATE_PARAMS_JV par_c
    |java_f id id
    |java_f id id par_a STATE_PARAMS_JV par_c
;

LLAMADA_METODOS_OBJ
    :java_f id par_a STATE_PARAMS_JV par_c
;

STATE_PARAMS_JV
    :PARAMAS_JV
    |
;

PARAMAS_JV
    :PARAMAS_JV coma POR_VALOR
    |PARAMAS_JV coma POR_REFERENCIA
    |POR_REFERENCIA
    |POR_VALOR
;
