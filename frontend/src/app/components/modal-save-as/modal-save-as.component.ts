import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-save-as',
  templateUrl: './modal-save-as.component.html',
  styleUrls: ['./modal-save-as.component.css']
})

export class ModalSaveAsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
  public dialog: MatDialog) {}
  
  
  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

}
