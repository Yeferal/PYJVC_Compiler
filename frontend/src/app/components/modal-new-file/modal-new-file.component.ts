import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { /*NgbActiveModal, NgbModalConfig,*/ NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, NgForm, Validators  } from '@angular/forms';

import { FilesOptService } from "../../services/files-opt.service";

@Component({
  selector: 'app-modal-new-file',
  templateUrl: './modal-new-file.component.html',
  styleUrls: ['./modal-new-file.component.css']
})
export class ModalNewFileComponent implements OnInit {

  @Input() rutaProject:string;
  @Input() listaProjects:Array<any>;
  @Output() fileO = new EventEmitter<string>();

  msjExistProject = "";
  
  // libary: Library;
  // listaProjects: Array<string> = [];

  public openProjectForm : FormGroup = new FormGroup({
    namePro: new FormControl(null,Validators.required),
    name: new FormControl(null,Validators.required)
  });

  constructor(private modalService: NgbModal, public filesOptService: FilesOptService) { }

  ngOnInit(): void {
  }


  createFile(){
    if(!this.openProjectForm.valid || (this.openProjectForm.value.namePro==undefined || this.openProjectForm.value.namePro==null)){
      this.msjExistProject = "You must fill in all the fields";
      console.log('Invalid:');
      return;
    }else{
      this.msjExistProject = "";
    }
    console.log(this.openProjectForm.value);
    this.filesOptService.createFile(this.openProjectForm.value).subscribe(
      res =>{
        // console.log(res);
        if(!res.isExist){
          this.fileO.emit(this.openProjectForm.value);
          this.modalService.dismissAll('Cross click');
        }
      },
      error => {

      }
    );
    // this.fileO.emit(this.openProjectForm.value);
    
  }

  open(content: any) {
    // this.getProjects();
    this.modalService.open(content, { centered: true });
    if(this.rutaProject!=undefined && this.rutaProject!= "" && this.rutaProject!=null){
      
    }else{
      // alert("No se ha seleccionado");
    }
  }

  resetForm(form: NgForm) {
    if (form) {
      form.reset();
    }
  }

}
