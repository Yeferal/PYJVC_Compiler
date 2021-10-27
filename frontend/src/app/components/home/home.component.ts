import { Component, Inject, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {MatTreeModule} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
// import {  } from '../../../../node_modules/jstree';
import { FilesOptService } from "../../services/files-opt.service";
import { NgForm } from "@angular/forms";
import { FileProject } from "../../models/file-project";
import { Project } from "../../models/project";
import { Library } from "../../models/library";
import { FileTab } from "../../models/file-tab";
import { ThemePalette } from '@angular/material/core';
import { InicioService } from 'src/app/services/inicio.service';
import { ModalSaveAsComponent } from '../modal-save-as/modal-save-as.component';

declare var $: any;
export interface FoodNode {
  name: string;
  // padre?: string;
  children?: FoodNode[];
}

var TREE_DATA: FoodNode[] = [ ];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  // padre: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  projectOpens: Array<FileTab> = [];
  background: ThemePalette = 'primary';
  index: number = 0;
  listaProjects: Array<any> = [];
  dirSelected:string;
  fileSelected:string;
  codigo:string;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: (level == 0) || (!!node.children && node.children.length > 0),
      name: node.name,
      level: level,
      // padre: node.padre
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(public dialog: MatDialog, 
    public filesOptService: FilesOptService, config: NgbModalConfig, private modalService: NgbModal, private incioService: InicioService) {
    
      this.dataSource.data = TREE_DATA;
    config.backdrop = 'static';
    config.keyboard = false;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.listeEmmitUpdateCode();
  }

  listeEmmitUpdateCode(){
    this.incioService.invocationUpdateCode.subscribe(
      (data) => {
        // console.log
        this.projectOpens[this.index].texto = data;
        console.log('actualizo',this.projectOpens[this.index].texto);
      }
    );
  }

  openProject(nameProject:string){
    this.filesOptService.openProject(nameProject).subscribe(
      res => {
        let project = res;
        console.log(project.project);
        if(!this.isExisteProjectOpen(nameProject)){
          this.listaProjects.push(project.project);
        }else{
          for(let i = 0; i<this.listaProjects.length; i++){
            if(nameProject==this.listaProjects[i].name){
              this.listaProjects[i] = project.project
            }
          }
        }
        let arbol = this.getTree();
        this.resetNodes();
        this.dataSource.data = TREE_DATA;
      },
      error => {

      }
    );
  }

  openProject1(data:any){
    this.openProject(data);
  }

  openFile1(data:any){
    console.log("eNTROO");
    this.openFile(data.name, data.namePro);
    this.setProject(data.name, data.namePro);
  }

  isExisteProjectOpen(name: string):boolean {
    for(let i = 0; i<this.listaProjects.length; i++){
      if(name==this.listaProjects[i].name){
        return true;
      }
    }
    return false;
  }

  openFile(nameProject:string, nameFile:string){
    this.filesOptService.openFile(nameFile,nameProject).subscribe(
      res => {
        // console.log(res.text);
        let fl: FileTab = new FileTab(nameProject, nameFile, res.text, this.projectOpens.length, nameFile);
        // console.log(fl);
        this.addTab(fl);
        // this.selectedTab(this.projectOpens.length-1);
        // this.incioService.onCodeListen(fl.texto);
      },
      error => {

      }
    );
  }

  getParent(name:string):string{
    var splitted = name.split("/"); 
    return splitted[0];
  }

  getChild(name:string):string{
    var splitted = name.split("/"); 
    return splitted[1];
  }

  setFileSelected(txt:string){
    this.fileSelected = txt;
  }

  setDirSelected(txt:string){
    this.dirSelected = txt;
  }

  getTree(): any{
    let treeT: Array<any> = [];
    for(let i = 0; i<this.listaProjects.length; i++){
      let childs: Array<any> = [];
      for(let j = 0; j<this.listaProjects[i].listFiles.length; j++){
        childs.push({name: this.listaProjects[i].listFiles[j].path});
      }
      console.log(childs);
      treeT.push(
        {
          name: this.listaProjects[i].name,
          children: childs
        }
      );
    }
    
  }

  resetNodes(){
    TREE_DATA = [];
    for(let i = 0; i<this.listaProjects.length; i++){
      let childs: Array<any> = [];
      for(let j = 0; j<this.listaProjects[i].listFiles.length; j++){
        childs.push({name: this.listaProjects[i].name+'/'+this.listaProjects[i].listFiles[j].path});
      }
      console.log(childs);
      TREE_DATA.push(
        {
          name: this.listaProjects[i].name+'/'+this.listaProjects[i].name,
          children: childs
        }
      );
    }
    console.log(TREE_DATA);
  }

  setProject(nameFile: string, nameProject:string){
    for(let i = 0; i<TREE_DATA.length; i++){
      // console.log(nameProject,"==",this.getParent(TREE_DATA[i].name));
      if(nameProject == this.getParent(TREE_DATA[i].name)){
        TREE_DATA[i].children?.push({name: nameProject+"/"+nameFile+".mlg"});
        console.log("Se agrego", TREE_DATA);
        this.dataSource.data = TREE_DATA;
        break;
      }
    }
    // console.log("Si", TREE_DATA);
  }
  
  open(content:any) {
    this.modalService.open(content);
  }

  getData(){
    console.log("Funciono 1");
    this.projectOpens.length
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }


  selectedTab(id:number){
    // console.log("cambia a:",id);
    this.index = id;
    this.activeLink = this.projectOpens[id].nombre;
    this.codigo = this.projectOpens[id].texto;
    this.incioService.onCodeListen(this.projectOpens[id].texto);
    // console.log("cambia a:",this.codigo);
  }

  deletedTab(id:number){
    console.log('Elimina',id);
    this.projectOpens.splice(id,1);
    this.updateIndex();
  }

  addTab(fl: FileTab){
    let isExst:boolean = true;
    for(let i=0; i<this.projectOpens.length; i++){
      console.log(fl.nombre,"==",this.projectOpens[i].nombre);
      if(fl.nombre===this.projectOpens[i].nombre){
        this.selectedTab(i);
        isExst = false;
        // this.selectedTab(i);
        break;
      }
    }
    if(isExst){
      this.projectOpens.push(fl);
      this.selectedTab(this.projectOpens.length-1);
      this.selectedTab(this.projectOpens.length-1);
    }
    
  }

  updateIndex(){
    for(let i=0; i<this.projectOpens.length; i++){
      this.projectOpens[i].id = i;
    }
    
  }

  createProject(){

  }

  createFile(){

  }

  save(){
    let data = {
      namePro: this.projectOpens[this.index].padre,
      name: this.projectOpens[this.index].hijo,
      text: this.projectOpens[this.index].texto
    };
    this.filesOptService.save(data).subscribe(
      res => {
        alert(res.message);
      },
      error => {
        console.log(error);
      }
    );
  }

  saveAs(nameF: string){
    if(nameF==this.projectOpens[this.index].hijo){
      alert(`Ya existe un archivo con el nombre ${nameF} dentro del proyecto ${this.projectOpens[this.index].padre}`);  
      return;
    }
    let data = {
      namePro: this.projectOpens[this.index].padre,
      name: nameF,
      text: this.projectOpens[this.index].texto
    };
    this.filesOptService.save(data).subscribe(
      res => {
        alert(res.message);
      },
      error => {
        console.log(error);
      }
    );
  }

  saveAs1(){
    this.dialog.open(ModalSaveAsComponent);
  }

  closeProject(){
    let nameProject = this.dirSelected;
    for(let i = 0; i<this.listaProjects.length; i++){
      if(nameProject==this.listaProjects[i].name){
        for(let j = this.projectOpens.length-1; j>-1; j--){
          console.log("h",this.projectOpens[j]);
          if(nameProject==this.projectOpens[j].padre){
            this.deletedTab(j);
          }
        }
        this.listaProjects.splice(i, 1);
        break;
      }
    }
    this.updateIndex();
    // this.listaProjects = [];
    let arbol = this.getTree();
    this.resetNodes();
    this.dataSource.data = TREE_DATA;
  }

  generateCode3D(){

  }

  generateCodeOptimised(){

  }

  generateCodeASM(){

  }

  downloadCode3D(){

  }

  downloadCodeOptimized(){
    
  }

  downloadCodeASM(){
    
  }


}