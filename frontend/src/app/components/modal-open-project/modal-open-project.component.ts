import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { /*NgbActiveModal, NgbModalConfig,*/ NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, NgForm, Validators  } from '@angular/forms';

import { FilesOptService } from "../../services/files-opt.service";
import { Library } from 'src/app/models/library';
@Component({
  selector: 'app-modal-open-project',
  templateUrl: './modal-open-project.component.html',
  styleUrls: ['./modal-open-project.component.css']
})
export class ModalOpenProjectComponent implements OnInit {

  @Output() projectO = new EventEmitter<string>();
  // closeResult: string;
  msjExistProject = "";
  
  libary: Library;
  listaProjects: Array<string> = [];

  public openProjectForm : FormGroup = new FormGroup({
    name: new FormControl(null,Validators.required)
  });

  constructor(private modalService: NgbModal, public filesOptService: FilesOptService) {}


  ngOnInit(): void {
    
  }

  openProject(){
    if(!this.openProjectForm.valid){
      this.msjExistProject = "You must fill in all the fields";
      console.log('Invalid:');
      return;
    }else{
      this.msjExistProject = "";
    }
    // console.log(this.openProjectForm.value.name);
    this.projectO.emit(this.openProjectForm.value.name);
    this.modalService.dismissAll('Cross click');
  }

  getProjects(){
    this.filesOptService.getProjects().subscribe(
      res => {
        let lb = res;
        console.log(lb.library);
        this.listaProjects = [];
        for(let i = 0; i<lb.library.listProject.length; i++){
          console.log(lb.library.listProject[i].name);
          this.listaProjects.push(lb.library.listProject[i].name);
        }
      },
      error => {

      }
    );
  }

  open(content: any) {
    this.getProjects();
    this.modalService.open(content, { centered: true });
  }

  resetForm(form: NgForm) {
    if (form) {
      form.reset();
    }
  }

}
