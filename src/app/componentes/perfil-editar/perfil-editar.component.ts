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
  public solicitudAdmin: any;

  public soyAdmin: boolean;
  public soyUsuario: boolean;
  
  @Input() public usuario: any;
  @Input() public administrador: any;
  @Output() retroceso = new EventEmitter();
  @Output() retrocesoAdmin = new EventEmitter();
  

  constructor(private currentUserService: CurrentUserService){
    this.solicitud = {
      nombre_usuario: ''
    }

    this.solicitudAdmin = {
      dni_admin:"",
      nombre_admin:"",
      apellidos_admin:"",
      contrasenha_admin:"",
      correo_admin:"",
      telefono_admin:"",
      tipo_usuario:"admin"
    }

    this.soyAdmin = false;
    this.soyUsuario = false;
  } 

  ngOnInit(){

    if(this.currentUserService.getCurrentUserType() === "administrador"){
      this.soyAdmin = true;
      this.soyUsuario = false;

      this.solicitudAdmin.dni_admin = this.administrador.dni_admin
      this.solicitudAdmin.nombre_admin = this.administrador.nombre_admin
      this.solicitudAdmin.apellidos_admin = this.administrador.apellidos_admin
      this.solicitudAdmin.contrasenha_admin = this.administrador.contrasenha_admin
      this.solicitudAdmin.correo_admin = this.administrador.correo_admin
      this.solicitudAdmin.telefono_admin = this.administrador.telefono_admin


    } else {
      this.solicitud.nombre_usuario = this.usuario.nombre_usuario
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
    this.currentUserService.actualizarDatosUsuario(
      this.solicitud,
      this.currentUserService.getCurrentUserId()!,
      this.currentUserService.getCurrentUserToken()!
      ).subscribe({
      next: (result)=>{
        console.log("usuario actualizado correctamente")
        this.usuario.nombre_usuario = this.solicitud.nombre_usuario
        this.retroceso.emit();
      },
      error: (error)=>{console.log(error)}
    })
  }
  
  editarAdmin(){
    
    this.currentUserService.actualizarDatosAdmin(
      this.solicitudAdmin,
      this.currentUserService.getCurrentUserId()!,
      this.currentUserService.getCurrentUserToken()!
      ).subscribe({
      next: (result)=>{
        console.log("administrador actualizado correctamente")

        this.administrador.dni_admin = this.solicitudAdmin.dni_admin
        this.administrador.nombre_admin = this.solicitudAdmin.nombre_admin
        this.administrador.apellidos_admin = this.solicitudAdmin.apellidos_admin
        this.administrador.contrasenha_admin = this.solicitudAdmin.contrasenha_admin
        this.administrador.correo_admin = this.solicitudAdmin.correo_admin
        this.administrador.telefono_admin = this.solicitudAdmin.telefono_admin

        this.retrocesoAdmin.emit();
      },
      error: (error)=>{console.log(error)}
    })
    
  }


  
}
