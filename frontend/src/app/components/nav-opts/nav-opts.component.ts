import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-opts',
  templateUrl: './nav-opts.component.html',
  styleUrls: ['./nav-opts.component.css']
})
export class NavOptsComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content:any) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
  }

  getData(){
    console.log("Funciono 1");
  }

  createProject(){

  }

  createFile(){

  }

  openProject(){

  }

  openFile(){

  }

  save(){

  }

  saveAs(){
    
  }

  closeProject(){

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
