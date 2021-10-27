import { Component, Input, OnInit } from '@angular/core';
import { InicioService } from 'src/app/services/inicio.service';

// import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { CodemirrorModule } from '../../lib/public_api';


const defaults = {
  markdown: '%%PY\n\n%%JAVA\n\n%%CPP\n\n',
  pyjvc: '%%PY\n\n%%JAVA\n\n%%CPP\n\n',
};

const myModeSpec = {
  name: "htmlmixed",
  tags: {
    style: [["type", /^text\/(x-)?scss$/, "text/x-scss"],
            [null, null, "css"]],
    custom: [[null, null, "customMode"]]
  }
}

@Component({
  selector: 'app-sec-code',
  templateUrl: './sec-code.component.html',
  styleUrls: ['./sec-code.component.css']
})
export class SecCodeComponent implements OnInit {

  public code: any;
  @Input() codigo: string;

  readOnly = false;
  mode: keyof typeof defaults = 'pyjvc';
  options = {
    lineNumbers: true,
    //value:'Hola',
    mode: this.mode,
    theme: 'material',
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
    focus: true,
  };
  defaults = defaults;

  changeMode(): void {
    this.options = {
      ...this.options,
      mode: this.mode,
    };
  }

  handleChange($event: Event): void {
    this.incioService.onUpdateCodeListen($event);
    // console.log('ngModelChange', $event);

  }

  handleChange1($event: Event): void {
    console.log('ngModel', $event);
    
  }

  public clear(): void {
    this.defaults[this.mode] = '';
  }

  public getValor(): string{
    return this.defaults[this.mode];
  }

  getC(){
    console.log(this.mode);
    console.log(this.defaults);
  }

  constructor(private incioService: InicioService) { 
    // this.defaults[this.mode] = this.codigo;
  }

  ngOnInit(): void {
    // this.defaults[this.mode] = this.codigo;
    this.initCode();
  }

  initCode(){
    this.incioService.invocationCode.subscribe(
      (data) => {
        this.defaults[this.mode] = data
      }
    );
  }

}
