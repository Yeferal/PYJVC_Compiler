import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

//Componentes
import { AppComponent } from './app.component';
import { NavOptsComponent } from './components/nav-opts/nav-opts.component';
import { ModalOptComponent } from './components/modal-opt/modal-opt.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

//Dependecias
// import { ngJsTree } from 'ng-js-tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { CodemirrorModule } from '@ctrl/ngx-codemirror'
import { ModalNewFileComponent } from './components/modal-new-file/modal-new-file.component';
import { ModalOpenProjectComponent } from './components/modal-open-project/modal-open-project.component';
import { ModalOpenFileComponent } from './components/modal-open-file/modal-open-file.component';
import { SecCodeComponent } from './components/sec-code/sec-code.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { ModalSaveAsComponent } from './components/modal-save-as/modal-save-as.component';

@NgModule({
  declarations: [
    AppComponent,
    NavOptsComponent,
    ModalOptComponent,
    HomeComponent,
    ModalNewFileComponent,
    ModalOpenProjectComponent,
    ModalOpenFileComponent,
    SecCodeComponent,
    ModalSaveAsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    CodemirrorModule
  ],
  // exports: [
  //   MatTreeModule
  // ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
