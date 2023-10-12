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
import { DescentPartidaService } from 'src/app/Services/descentPartida.service';
import { GloomhavenPartidaService } from 'src/app/Services/gloomhavenPartida.service';
import { GloomhavenForoService } from 'src/app/Services/gloomhavenForo.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  public infoActiva: boolean;
  public adminInfoActiva: boolean;


  public partidaActiva: boolean;


  public listaDiscusionesActiva: boolean;


  public editarUsuarioActiva: boolean;
  public editarAdminActiva: boolean;

  public chatDiscusionActiva : boolean

  public menuLateralUsuario : boolean
  public menuLateralAdmin : boolean

  public soyAdmin: boolean;
  public soyUsuario: boolean;

  public usuarioNombre;

  // lista de campañas del usuario actual
  public partidasUsuarioActual: any[];

  public listadiscusiones : any[]

  
  public mensajes: any[];
  public mensajesDiscusion : any[]
  

  public administrador: any;
  public usuario: any;

  errorMessage?: string;
  
  public datos: any;
  public headersAdd = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http:HttpClient, 
    private router: Router, 
    private currentUserService: CurrentUserService, 
    private administradorService: AdministradorService,
    private descentForoService: DescentForoService,
    private descentPartidaService: DescentPartidaService,
    private usuarioService: UsuarioService,
    private gloomhavenForoService : GloomhavenForoService,
    private gloomhavenPartidaService : GloomhavenPartidaService){

    this.usuario = {
      id:"",
      correo_usuario:"",
      nombre_usuario:"",
      contrasenha_usuario:""
    }

    this.infoActiva = false;
    this.adminInfoActiva = false;
    this.partidaActiva = false;

    this.listaDiscusionesActiva = false;

    this.editarUsuarioActiva = false;
    this.editarAdminActiva = false;

    this.chatDiscusionActiva = false;

    this.menuLateralUsuario = false;
    this.menuLateralAdmin = false;

    this.soyAdmin = false;
    this.soyUsuario = false;

    this.mensajesDiscusion = []
    
    // CAMPAÑAS DEL USUARIO ACTUAL
    this.partidasUsuarioActual = []
    /*
    this.partidasUsuarioActual = [
      {nombreCampanha:"nombrecampaña1", nombreJuego: "Descent"},
      {nombreCampanha:"nombrecampaña2", nombreJuego: "Descent"}
    ];
    */

    // DISCUSIONES DEL USUARIO ACTUAL
    this.listadiscusiones = []

    /*this.listadiscusiones = [
      {idConversacion:"1", nombreUsuario:"titulo de la discusion", nombreDiscusion:"nombreUsuario1"},
      {idConversacion:"2", nombreUsuario:"titulo de la discusion2", nombreDiscusion:"nombreUsuario2"}
    ];
*/
    // MENSAJES DEL USUARIO ACTUAL
    this.mensajes = []

    this.administrador = {
      id:"",
      dni_admin:"",
      nombre_admin:"",
      apellidos_admin:"",
      contrasenha_admin:"",
      correo_admin:"",
      telefono_admin:"",
      tipo_usuario:"admin"
    }

    this.usuarioNombre = "nombre usuario aqui";
  }

  ngOnInit(){
    

    if(this.currentUserService.getCurrentUserType() === "administrador"){
      this.adminInfoActiva = true;
      this.infoActiva = false;

      this.menuLateralUsuario = false;
      this.menuLateralAdmin = true;

      this.soyAdmin = true;
      this.soyUsuario = false;

      // OBTENER INFORMACION DEL ADMINISTRADOR ACTUAL
      this.administradorService.getAdministradorDatos(
        this.currentUserService.getCurrentUserId()!, 
        this.currentUserService.getCurrentUserToken()!
        ).subscribe({
            next: (result)=>{
              this.administrador['id'] = result["data"]["id"];
              this.administrador['dni_admin'] = result["data"]["dni_admin"];
              this.administrador['nombre_admin'] = result["data"]["nombre_admin"];
              this.administrador['apellidos_admin'] = result["data"]["apellidos_admin"];
              this.administrador['contrasenha_admin'] = result["data"]["contrasenha_admin"];
              this.administrador['correo_admin'] = result["data"]["correo_admin"];
              this.administrador['telefono_admin'] = result["data"]["telefono_admin"];
              console.log(this.administrador)
            },
            error: (error)=>{console.log(error)}
          })

        // LISTAR TODAS LAS PARTIDAS DE TODOS LOS JUEGOS
        this.administradorService.adminListarTodasLasPartidas(
          this.currentUserService.getCurrentUserToken()!
          ).subscribe({
              next: (result)=>{
                console.log(result.data)
                console.log(result.data[0])
                console.log(result.data[0]['id'])

                let counter = 0

                while(result.data[counter] !== undefined){
                  this.partidasUsuarioActual[counter] = result.data[counter]; 
                  counter++;
                }

                console.log(this.partidasUsuarioActual)

              },
              error: (error)=>{console.log(error)}
            })
        // LISTAR TODAS LAS DISCUSIONES DE TODOS LOS JUEGOS
        this.administradorService.adminListarTodasLasDiscusiones(
          this.currentUserService.getCurrentUserToken()!
        ).subscribe({
          next: (result)=>{
            //console.log("discusiones")
            console.log(result.data)
  
            let counter = 0
            while(result.data[counter] !== undefined){

              this.listadiscusiones[counter] = result.data[counter];
              //this.listadiscusiones[counter] =  this.discusion 
              counter++;
            }
            console.log(this.listadiscusiones)
            counter = 0;
            
          },
          error: (error)=>{console.log(error)}
        })

          // QUEDAN LAS URL DEL ADMIN AQUI O ESTAN TODAS??

    } else {
      this.adminInfoActiva = false;
      this.infoActiva = true;

      this.menuLateralUsuario = true;
      this.menuLateralAdmin = false;

      this.soyAdmin = false;
      this.soyUsuario = true;

      // OBTENER INFORMACION DEL USUARIO ACTUAL
      this.usuarioService.getUsuarioDatos(
        this.currentUserService.getCurrentUserId()!, 
        this.currentUserService.getCurrentUserToken()!
        ).subscribe({
            next: (result)=>{
              this.usuario['id'] = result["data"]["id"];
              this.usuario['correo_usuario'] = result["data"]["correo_usuario"];
              this.usuario['nombre_usuario'] = result["data"]["nombre_usuario"];
              this.usuario['contrasenha_usuario'] = result["data"]["contrasenha_usuario"];
            },
            error: (error)=>{console.log(error)}
          })


      // LISTAR TODAS LAS PARTIDAS DEL USUARIO
      let counter = 0

      this.descentPartidaService.listarPartidasDescent(
        this.currentUserService.getCurrentUserId()!, 
        this.currentUserService.getCurrentUserToken()!
      ).subscribe({
        next: (result)=>{

          let counter2 = 0
          while(result.data[counter2] !== undefined){
            this.partidasUsuarioActual[counter] = result.data[counter2]; 
            counter2++;
            counter++;
          }
          //console.log(this.partidasUsuarioActual)
          
        },
        error: (error)=>{console.log(error)}
      })

      this.gloomhavenPartidaService.listarPartidasGloomhaven(
        this.currentUserService.getCurrentUserId()!, 
        this.currentUserService.getCurrentUserToken()!
      ).subscribe({
        next: (result)=>{

          let counter2 = 0
          while(result.data[counter2] !== undefined){
            this.partidasUsuarioActual[counter] = result.data[counter2]; 
            counter2++;
            counter++;
          }
          //console.log(this.partidasUsuarioActual)
          
        },
        error: (error)=>{console.log(error)}
      })




      // LISTAR TODAS LAS DISCUSIONES DEL USUARIO
      let counter3 = 0

      this.descentForoService.listarDiscusionesUsuarioForoDescent(
        this.currentUserService.getCurrentUserToken()!
      ).subscribe({
        next: (result)=>{

          let counter2 = 0
          while(result.data[counter2] !== undefined){
            this.listadiscusiones[counter3] = result.data[counter2]; 
            counter2++;
            counter3++;
          }
          console.log(this.listadiscusiones)
          
        },
        error: (error)=>{console.log(error)}
      })

      this.gloomhavenForoService.listarDiscusionesUsuarioForoGloomhaven(
        this.currentUserService.getCurrentUserToken()!
      ).subscribe({
        next: (result)=>{

          let counter2 = 0
          while(result.data[counter2] !== undefined){
            this.listadiscusiones[counter3] = result.data[counter2]; 
            counter2++;
            counter3++;
          }
          console.log(this.listadiscusiones)
          
        },
        error: (error)=>{console.log(error)}
      })



    }

    /*
        this.listadiscusiones = [
      {idConversacion:"1", nombreUsuario:"titulo de la discusion", nombreDiscusion:"nombreUsuario1"},
      {idConversacion:"2", nombreUsuario:"titulo de la discusion2", nombreDiscusion:"nombreUsuario2"}
    ];
 */


    

  }

  info(){
    if(this.currentUserService.getCurrentUserType() === "administrador"){
      this.infoActiva = false;
      this.adminInfoActiva = true;
      this.partidaActiva = false;
      this.listaDiscusionesActiva = false;
      this.editarUsuarioActiva = false;
      this.editarAdminActiva = false;
      this.chatDiscusionActiva = false;
    } else {
      this.infoActiva = true;
      this.adminInfoActiva = false;
      this.partidaActiva = false;
      this.listaDiscusionesActiva = false;
      this.editarUsuarioActiva = false;
      this.editarAdminActiva = false;
      this.chatDiscusionActiva = false;
    }

  }

  partidas(){
    this.infoActiva = false;
    this.adminInfoActiva = false;
    this.partidaActiva = true;
    this.listaDiscusionesActiva = false;
    this.editarUsuarioActiva = false;
    this.editarAdminActiva = false;
    this.chatDiscusionActiva = false;
  }

  discusiones(){
    this.infoActiva = false;
    this.adminInfoActiva = false;
    this.partidaActiva = false;
    this.listaDiscusionesActiva = true;
    this.editarUsuarioActiva = false;
    this.editarAdminActiva = false;
    this.chatDiscusionActiva = false;
  }
 
  editar(){
    if(this.adminInfoActiva == true){
      this.adminInfoActiva = false;
      this.partidaActiva = false;
      this.listaDiscusionesActiva = false;
      this.editarAdminActiva = true;
      this.chatDiscusionActiva = false;
    } else{
      this.infoActiva = false;
      this.partidaActiva = false;
      this.listaDiscusionesActiva = false;
      this.editarUsuarioActiva = true;
      this.editarAdminActiva = false;
      this.chatDiscusionActiva = false;
    }

  }

  volver(){
    this.router.navigate([''])
  }

  retrocederEdicion(){
    this.infoActiva = true;
    this.editarUsuarioActiva = false;
  }

  retrocederEdicionAdmin(){
    this.adminInfoActiva = true;
    this.editarAdminActiva = false;
  }
  
  logout(){
    console.log("cerramos sesion")
    this.currentUserService.logoutCurrentUser()
    this.router.navigate([''])
  }

  entrarDiscusion(discusion:any){
    this.mensajesDiscusion = []
    //console.log(discusion[0]["discusionNombreJuego"])
    this.descentForoService.setDiscusionActual(discusion[0]["discusionId"]);
    this.currentUserService.setJuegoActual(discusion[0]["discusionNombreJuego"])

  //console.log(discusion[0]["discusionId"])

////
this.descentForoService.listarMensajesDiscusionForoDescent(discusion[0]["discusionId"]).subscribe({
  next: (result)=>{
    //console.log("entramos en la discusion")
    let counter = 0
    while(result.data[counter] !== undefined){
      this.mensajesDiscusion[counter] = result.data[counter]; 
      counter++;
    }
    console.log(this.mensajesDiscusion)
  },
  error: (error)=>{console.log(error)}
})

/////

/*
    
    this.mensajes.forEach( (mensaje) => {
      

      if(mensaje["idConversacion"] === discusion[0].discusionId){
        this.mensajesDiscusion.push(mensaje);
      }
      
      
    })
    */
    //this.descentForoService.setDiscusionActual(discusion[0].discusionId);
    this.listaDiscusionesActiva = false;
    this.chatDiscusionActiva = true;
    
  }

/*
  this.mensajes = [
    {idMensaje:"1", idConversacion:"1", nombreUsuario:"nombreUsuario1", textoMensaje: "mensaje1"},
    {idMensaje:"2", idConversacion:"1", nombreUsuario:"nombreUsuario2", textoMensaje: "mensaje2"},
    {idMensaje:"3", idConversacion:"2", nombreUsuario:"nombreUsuario3", textoMensaje: "mensaje3"}
  ]
*/

  regresoAlListado(){
    this.listaDiscusionesActiva = true;
    this.chatDiscusionActiva = false;
  }



  borrarPartida(partida : any){
    console.log(this.partidasUsuarioActual)

    this.currentUserService.setJuegoActual(partida[0]["partidaNombreJuego"])

    let posicion = this.partidasUsuarioActual.map( (mensaje) => mensaje["id"]).indexOf(partida[0]["partidaId"])
    console.log(partida)
    console.log(this.partidasUsuarioActual.map( (mensaje) => mensaje["id"]))
    console.log(posicion)

    // comprobar a que juego pertecene la discusion para elegir la url de borrado
    
    console.log(this.currentUserService.getJuegoActual())

    if(this.currentUserService.getJuegoActual() === "Descent"){

      this.descentPartidaService.eliminarPartidaDescent(
        partida[0]["partidaId"],
        this.currentUserService.getCurrentUserToken()!
        ).subscribe({
            next: (result)=>{
              console.log("Partida borrada correctamente")
            },
            error: (error)=>{console.log(error)}
          })

    } else if(this.currentUserService.getJuegoActual() === "Gloomhaven"){
      this.gloomhavenPartidaService.eliminarPartidaGloomhaven(
        partida[0]["partidaId"],
        this.currentUserService.getCurrentUserToken()!
        ).subscribe({
            next: (result)=>{
              console.log("Partida borrada correctamente")
            },
            error: (error)=>{console.log(error)}
          })
    }



    this.partidasUsuarioActual.splice(posicion,1)
    /*
        let posicion2 = this.mensajesDiscusion.map( (e) => e.idMensaje).indexOf(idMensaje)
        this.mensajesDiscusion.splice(posicion2,1)
    */
   
  }










  borrarDiscusion(discusion : any){
    console.log(this.listadiscusiones)

    this.currentUserService.setJuegoActual(discusion[0]["discusionNombreJuego"])

    let posicion = this.listadiscusiones.map( (mensaje) => mensaje[0]).indexOf(discusion[0]["discusionId"])


    // comprobar a que juego pertecene la discusion para elegir la url de borrado
    
    console.log(this.currentUserService.getJuegoActual())

    if(this.currentUserService.getJuegoActual() === "descent"){

      this.descentForoService.eliminarDiscusionForoDescent(
        discusion[0]["discusionId"],
        this.currentUserService.getCurrentUserToken()!
        ).subscribe({
            next: (result)=>{
              console.log("Discusión borrada correctamente")
            },
            error: (error)=>{console.log(error)}
          })

    } else if(this.currentUserService.getJuegoActual() === "gloomhaven"){
      // URL DE BORRAR MENSAJE GLOOMHAVEN
    }



    this.listadiscusiones.splice(posicion,1)
    /*
        let posicion2 = this.mensajesDiscusion.map( (e) => e.idMensaje).indexOf(idMensaje)
        this.mensajesDiscusion.splice(posicion2,1)
    */
   
  }

  borrarMensaje(idMensaje : any){

    console.log(this.mensajesDiscusion)
    let posicion = this.mensajesDiscusion.map( (mensaje) => mensaje[0]).indexOf(idMensaje)


    // comprobar a que juego pertecene la discusion para elegir la url de borrado
    
    console.log(this.currentUserService.getJuegoActual())
    if(this.currentUserService.getJuegoActual() === "descent"){

    this.descentForoService.eliminarMensajeForoDescent(
      idMensaje,
      this.currentUserService.getCurrentUserToken()!
      ).subscribe({
          next: (result)=>{
            console.log("Mensaje borrado correctamente")
          },
          error: (error)=>{console.log(error)}
        })

    } else if(this.currentUserService.getJuegoActual() === "gloomhaven"){
      // URL DE BORRAR MENSAJE GLOOMHAVEN
    }



    this.mensajesDiscusion.splice(posicion,1)
    /*
        let posicion2 = this.mensajesDiscusion.map( (e) => e.idMensaje).indexOf(idMensaje)
        this.mensajesDiscusion.splice(posicion2,1)
    */
   
  }

  crearMensaje(){

    // algo para recordar la discusion del mensaje a crear?
    // esta puesto al entrar en el chat de la discusion
    

    this.currentUserService.setJuegoActual("descent");
    this.router.navigate(['foros/mensaje/crear'])
  }
}
