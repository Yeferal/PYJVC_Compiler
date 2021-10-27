"use strict";
exports.__esModule = true;
exports.Library = void 0;
var Library = /** @class */ (function () {
    function Library() {
        this.listProject = [];
    }
    Library.prototype.getListProject = function () {
        return this.listProject;
    };
    Library.prototype.setListProject = function (listProject) {
        this.listProject = listProject;
    };
    Library.prototype.addProject = function (project) {
        this.listProject.push(project);
    };
    return Library;
}());
exports.Library = Library;
