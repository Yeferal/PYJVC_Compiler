"use strict";
exports.__esModule = true;
exports.ErrorG = void 0;
var ErrorG = /** @class */ (function () {
    function ErrorG(posicion, tipoError, token, descripcion) {
        this.posicion = posicion;
        this.tipoError = tipoError;
        this.token = token;
        this.descripcion = descripcion;
    }
    ErrorG.prototype.getPosicion = function () {
        return this.posicion;
    };
    ErrorG.prototype.getTipoError = function () {
        return this.tipoError;
    };
    ErrorG.prototype.getToken = function () {
        return this.token;
    };
    ErrorG.prototype.getDescripcion = function () {
        return this.descripcion;
    };
    ErrorG.prototype.setPosicion = function (posicion) {
        this.posicion = posicion;
    };
    ErrorG.prototype.setTipoError = function (tipoError) {
        this.tipoError = tipoError;
    };
    ErrorG.prototype.setToken = function (token) {
        this.token = token;
    };
    ErrorG.prototype.setDescripcion = function (descripcion) {
        this.descripcion = descripcion;
    };
    return ErrorG;
}());
exports.ErrorG = ErrorG;
