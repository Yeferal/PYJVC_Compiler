"use strict";
exports.__esModule = true;
exports.FileProject = void 0;
var FileProject = /** @class */ (function () {
    function FileProject(path, name) {
        this.path = path;
        this.name = name;
        this.text = '';
    }
    FileProject.prototype.getPath = function () {
        return this.path;
    };
    FileProject.prototype.getName = function () {
        return this.name;
    };
    FileProject.prototype.setPath = function (path) {
        this.path = path;
    };
    FileProject.prototype.setName = function (name) {
        this.name = name;
    };
    FileProject.prototype.setText = function (text) {
        this.text = text;
    };
    FileProject.prototype.getText = function () {
        return this.text;
    };
    return FileProject;
}());
exports.FileProject = FileProject;
