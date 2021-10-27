"use strict";
exports.__esModule = true;
exports.AnalyzerManager = void 0;
var analyzer_xml_1 = require("./analyzer_xml");
var AnalyzerManager = /** @class */ (function () {
    function AnalyzerManager() {
    }
    AnalyzerManager.prototype.runBiblioteca = function (text) {
        var analizador = new analyzer_xml_1.Parser();
        var r = analizador.parse(text);
        this.result = r;
    };
    AnalyzerManager.prototype.getResult = function () {
        return this.result;
    };
    return AnalyzerManager;
}());
exports.AnalyzerManager = AnalyzerManager;
