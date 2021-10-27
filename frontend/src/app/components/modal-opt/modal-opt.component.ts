import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { /*NgbActiveModal, NgbModalConfig,*/ NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { FilesOptService } from '../../services/files-opt.service'

import { FilesOptService } from "../../services/files-opt.service";
import { NgForm } from "@angular/forms";
import { FileProject } from "../../models/file-project";
import { Project } from "../../models/project";
import { Library } from "../../models/library";


@Component({
  selector: 'app-modal-opt',
  templateUrl: './modal-opt.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal-opt.component.css']
})
export class ModalOptComponent implements OnInit {

  @Output() projectO = new EventEmitter<string>();
  // closeResult: string;
  msjExistProject = "";

  constructor(private modalService: NgbModal, public filesOptService: FilesOptService) {}

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  createProject(form: NgForm){
    if(form.valid){
      this.filesOptService.createProject(form.value).subscribe((res) => {
        // console.log('respuesta: ', res.isExist);
        // console.log('respuesta: ', res);
        if(res.isExist){
          this.msjExistProject = "Ya existe un projecto con el mismo nombre"
        }else{
          this.msjExistProject = ""
          this.modalService.dismissAll('Cross click');
          this.projectO.emit(res.nameProject);
        }
        // this.modalService.dismissAll('Cross click')
        this.resetForm(form);
      });
    }else{
      this.msjExistProject = "Los campos no no son los correctos"
    }
  }

  openProject(nameProject:string){
    this.filesOptService.openProject(nameProject).subscribe(
      res => {
        let project = res;
        console.log(project);
        // this.listaProjects.push(project);
      },
      error => {

      }
    );
  }

  ngOnInit(): void {
  }
  
  resetForm(form: NgForm) {
    if (form) {
      form.reset();
    }
  }

}
