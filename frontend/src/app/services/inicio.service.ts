import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  invocationCode = new EventEmitter();
  invocationUpdateCode = new EventEmitter();

  constructor() { }

  onCodeListen(data:any){
    this.invocationCode.emit(data);
  }

  onUpdateCodeListen(data:any){
    this.invocationUpdateCode.emit(data);
  }

}
