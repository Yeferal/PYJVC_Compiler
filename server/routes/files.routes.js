const express = require("express");
const router = express.Router();

const files = require("../controllers/files.controller");

//obtener todo los proyectos
router.get("/projects", files.getProjects);
//nuevo proyecto
router.post("/create_project", files.createProject);
//nuevo archivo
router.post("/create_file", files.createFile);
//abrir proyecto
router.get("/open_project/:nameProject", files.openProject);
//abrir archivo
router.get("/open_file/:nameFile&:nameProject", files.openFile);
//guardar
router.post("/fileSave", files.save);
//guardar como
router.post("/fileAsSave", files.saveAs);
//cerra
router.get("/file:id", files.closeProject);

module.exports = router;