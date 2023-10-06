import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { CurrentUserService } from 'src/app/Services/current-user.service';
import { AdministradorService } from 'src/app/Services/administrador.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';
import { Administrador } from 'src/app/Models/administrador';
import {Router} from "@angular/router"
import { DescentForoService } from 'src/app/Services/descentForo.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  public infoActiva: boolean;
  public partidaActiva: boolean;
  public listaDiscusionesActiva: boolean;
  public editarUsuarioActiva: boolean;
  public chatDiscusionActiva : boolean

  public usuario;

  // lista de campañas del usuario actual
  public nombres;

  public listadiscusiones;
  public mensajes;
  public mensajesDiscusion : any[]

  public solicitud: any;
  errorMessage?: string;
  public datos: any;
  public headersAdd = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http:HttpClient, 
    private router: Router, 
    private currentUserService: CurrentUserService, 
    private adminService: AdministradorService,
    private descentForoService: DescentForoService){

    this.solicitud = {
      email: '',
      password: ''
    }
    this.infoActiva = false;
    this.partidaActiva = false;
    this.listaDiscusionesActiva = false;
    this.editarUsuarioActiva = false;
    this.chatDiscusionActiva = false;

    this.mensajesDiscusion = []
    
    this.nombres = [
      {nombreCampanha:"nombrecampaña1", nombreJuego: "Descent"},
      {nombreCampanha:"nombrecampaña2", nombreJuego: "Descent"}
    ];

    this.listadiscusiones = [
      {idConversacion:"1", nombreUsuario:"titulo de la discusion", nombreDiscusion:"nombreUsuario1"},
      {idConversacion:"2", nombreUsuario:"titulo de la discusion2", nombreDiscusion:"nombreUsuario2"}
    ];

    this.mensajes = [
      {idMensaje:"1", idConversacion:"1", nombreUsuario:"nombreUsuario1", textoMensaje: "mensaje1"},
      {idMensaje:"2", idConversacion:"1", nombreUsuario:"nombreUsuario2", textoMensaje: "mensaje2"},
      {idMensaje:"3", idConversacion:"2", nombreUsuario:"nombreUsuario3", textoMensaje: "mensaje3"}
    ]

    this.usuario = "nombre usuario aqui";
  }

  ngOnInit(){
    this.infoActiva = true;
    console.log(this.listadiscusiones)
  }
  
  onSubmit(){

  }

  info(){
    this.infoActiva = true;
    this.partidaActiva = false;
    this.listaDiscusionesActiva = false;
    this.editarUsuarioActiva = false;
  }

  partidas(){
    this.infoActiva = false;
    this.partidaActiva = true;
    this.listaDiscusionesActiva = false;
    this.editarUsuarioActiva = false;
  }

  discusiones(){
    this.infoActiva = false;
    this.partidaActiva = false;
    this.listaDiscusionesActiva = true;
    this.editarUsuarioActiva = false;
  }
 
  editar(){
    this.infoActiva = false;
    this.partidaActiva = false;
    this.listaDiscusionesActiva = false;
    this.editarUsuarioActiva = true;
  }

  volver(){
    this.router.navigate([''])
  }

  retrocederEdicion(){
    this.infoActiva = true;
    this.editarUsuarioActiva = false;
  }
  
  logout(){
    console.log("cerramos sesion")
  }

  entrarDiscusion(discusion:any){
    this.mensajesDiscusion = []
    
    this.mensajes.forEach( (mensaje) => {
      

      if(mensaje["idConversacion"] === discusion[0].discusionId){
        this.mensajesDiscusion.push(mensaje);
      }
      
      
    })
    this.descentForoService.setDiscusionActual(discusion[0].discusionId);
    this.listaDiscusionesActiva = false;
    this.chatDiscusionActiva = true;
  }

  regresoAlListado(){
    this.listaDiscusionesActiva = true;
    this.chatDiscusionActiva = false;
  }

  borrarMensaje(idMensaje : any){

    let posicion = this.mensajes.map( (mensaje) => mensaje.idMensaje).indexOf(idMensaje)
    this.mensajes.splice(posicion,1)

    let posicion2 = this.mensajesDiscusion.map( (e) => e.idMensaje).indexOf(idMensaje)
    this.mensajesDiscusion.splice(posicion2,1)

    // AQUI URL DE BORRADO por el idMensaje
  }

  crearMensaje(){
    this.currentUserService.setJuegoActual("descent");
    this.router.navigate(['foros/mensaje/crear'])
  }
}
