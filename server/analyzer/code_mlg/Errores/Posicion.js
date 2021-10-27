"use strict";
exports.__esModule = true;
exports.Posicion = void 0;
var Posicion = /** @class */ (function () {
    function Posicion(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
    Posicion.prototype.getFila = function () {
        return this.fila;
    };
    Posicion.prototype.getColumna = function () {
        return this.columna;
    };
    Posicion.prototype.setFila = function (fila) {
        this.fila = fila;
    };
    Posicion.prototype.setColumna = function (columna) {
        this.columna = columna;
    };
    return Posicion;
}());
exports.Posicion = Posicion;
