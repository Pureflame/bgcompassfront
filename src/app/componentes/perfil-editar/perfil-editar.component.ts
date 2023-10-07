import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CurrentUserService } from 'src/app/Services/current-user.service';

@Component({
  selector: 'app-perfil-editar',
  templateUrl: './perfil-editar.component.html',
  styleUrls: ['./perfil-editar.component.css']
})
export class PerfilEditarComponent {
  public solicitud: any;

  public soyAdmin: boolean;
  public soyUsuario: boolean;
  
  @Input() public usuario: any;
  @Input() public administrador: any;
  @Output() retroceso = new EventEmitter();
  @Output() retrocesoAdmin = new EventEmitter();
  

  constructor(private currentUserService: CurrentUserService){
    this.solicitud = {
      nombre: ''
    }

    this.soyAdmin = false;
    this.soyUsuario = false;
  } 

  ngOnInit(){
    if(this.currentUserService.getCurrentUserType() === "administrador"){
      this.soyAdmin = true;
      this.soyUsuario = false;
    } else {
      this.soyAdmin = false;
      this.soyUsuario = true;
    }

  }

  retroceder(){
    this.retroceso.emit();
  }

  retrocederAdmin(){
    this.retrocesoAdmin.emit();
  }

  editarUsuario(){
    console.log(this.usuario)
  }
  
  editarAdmin(){
    console.log(this.administrador)
  }


  
}
