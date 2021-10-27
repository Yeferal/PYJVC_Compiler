"use strict";
exports.__esModule = true;
exports.Analyzer = void 0;
var mlgpack_1 = require("./mlgpack");
// let AnalizadorPY = require('./mlgpy');
var Analyzer = /** @class */ (function () {
    function Analyzer() {
    }
    Analyzer.prototype.analizar = function (entrada) {
        var analizador1 = new mlgpack_1.Parser();
        analizador1.parse(entrada);
    };
    return Analyzer;
}());
exports.Analyzer = Analyzer;
