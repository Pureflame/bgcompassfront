import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/Services/administrador.service';
import { CurrentUserService } from 'src/app/Services/current-user.service';
import { DescentForoService } from 'src/app/Services/descentForo.service';

@Component({
  selector: 'app-descent-foros',
  templateUrl: './descent-foros.component.html',
  styleUrls: ['./descent-foros.component.css']
})
export class DescentForosComponent {
  

  public discusiones;

  public mensajes;
  public mensajesDiscusion : any[]

  public solicitud: any;
  errorMessage?: string;
  public datos: any;

  public listaDiscusionesActiva : boolean
  public chatDiscusionActiva : boolean


  constructor(private router: Router, 
    private currentUserService: CurrentUserService, 
    private adminService: AdministradorService,
    private descentForoService : DescentForoService){
    this.solicitud = {
      email: '',
      password: ''
    }

   
    
    this.discusiones = [
      {idConversacion:"1", nombreUsuario:"titulo de la discusion", nombreDiscusion:"nombreUsuario1"},
      {idConversacion:"2", nombreUsuario:"titulo de la discusion2", nombreDiscusion:"nombreUsuario2"}
    ];

    this.mensajes = [
      {idMensaje:"1", idConversacion:"1", nombreUsuario:"nombreUsuario1", textoMensaje: "mensaje1"},
      {idMensaje:"2", idConversacion:"1", nombreUsuario:"nombreUsuario2", textoMensaje: "mensaje2"},
      {idMensaje:"3", idConversacion:"2", nombreUsuario:"nombreUsuario3", textoMensaje: "mensaje3"}
    ]

    this.listaDiscusionesActiva = false;
    this.chatDiscusionActiva = false;
    this.mensajesDiscusion = []
  }

  ngOnInit(){
    this.prepararDiscusiones()

    console.log("entramos al foro")
    this.currentUserService.setJuegoActual("descent");
    this.listaDiscusionesActiva = true;
    
  }

  crear(){
   /* this.router.navigate(['descent/partidas/crear'])*/
  }
  
  volver(){
    this.router.navigate([''])
  }

  entrarDiscusion(discusion:any){
    this.mensajesDiscusion = []
    
    this.mensajes.forEach( (mensaje) => {
      

      if(mensaje["idConversacion"] === discusion[0].discusionId){
        this.mensajesDiscusion.push(mensaje);
      }
      
      
    })
    //console.log(this.mensajesDiscusion)
    this.descentForoService.setDiscusionActual(discusion[0].discusionId);
    this.listaDiscusionesActiva = false;
    this.chatDiscusionActiva = true;
  }

  crearDiscusion(){
    this.router.navigate(['foros/discusion/crear'])
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

  prepararDiscusiones(){
    this.descentForoService.getDiscusionesJuego()
    
    this.descentForoService.getTodasLasDiscusiones()
    if(this.descentForoService.getMisDiscusiones()){

    }
  }
}
