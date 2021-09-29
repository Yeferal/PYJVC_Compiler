import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavOptionComponent } from './nav-option/nav-option.component';
import { SectionCodeComponent } from './section-code/section-code.component';
import { SectionTabCodeComponent } from './section-tab-code/section-tab-code.component';
import { SectionRunCodeComponent } from './section-run-code/section-run-code.component';


import { CodemirrorModule } from '@ctrl/ngx-codemirror';
// import { CodemirrorModule } from '../lib/public_api';

@NgModule({
  declarations: [
    AppComponent,
    NavOptionComponent,
    SectionCodeComponent,
    SectionTabCodeComponent,
    SectionRunCodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    CommonModule, 
    CodemirrorModule
    // AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
