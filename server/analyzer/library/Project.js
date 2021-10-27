"use strict";
exports.__esModule = true;
exports.Project = void 0;
var Project = /** @class */ (function () {
    function Project(name) {
        this.listFiles = [];
        this.name = name;
    }
    Project.prototype.getName = function () {
        return this.name;
    };
    Project.prototype.setName = function (name) {
        this.name = name;
    };
    Project.prototype.getListFiles = function () {
        return this.listFiles;
    };
    Project.prototype.setListFiles = function (listFiles) {
        this.listFiles = listFiles;
    };
    Project.prototype.addFile = function (file) {
        this.listFiles.push(file);
    };
    return Project;
}());
exports.Project = Project;
