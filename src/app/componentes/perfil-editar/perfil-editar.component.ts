import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-perfil-editar',
  templateUrl: './perfil-editar.component.html',
  styleUrls: ['./perfil-editar.component.css']
})
export class PerfilEditarComponent {
  public solicitud: any;
  
  @Input() public usuario: any;
  @Output() retroceso = new EventEmitter();
  

  constructor(){
    this.solicitud = {
      nombre: ''
    }
  } 

  retroceder(){
    this.retroceso.emit();
  }

  editarUsuario(){
    console.log(this.usuario)
  }


  
}
