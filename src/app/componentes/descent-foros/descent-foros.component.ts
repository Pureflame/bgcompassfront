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
  

  public discusiones: any[];

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

   
    
    this.discusiones = [];

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
    this.currentUserService.setJuegoActual("descent");

    // Se mira si debemos pedir todas las discusiones o solo las del usuario como el perfil
    if(this.descentForoService.getMisDiscusiones()){

      this.descentForoService.listarDiscusionesUsuarioForoDescent(
        this.currentUserService.getCurrentUserToken()!
        ).subscribe({
          next: (result)=>{
    
            let counter = 0
            while(result.data[counter] !== undefined){
              this.discusiones[counter] = result.data[counter]; 
              counter++;
            }
            console.log(this.discusiones)
            counter = 0;
          },
          error: (error)=>{console.log(error)}
        })

    } else if (this.descentForoService.getDiscusionesJuego()) {
      this.descentForoService.listarDiscusionesForoDescent(
        ).subscribe({
          next: (result)=>{
    
            let counter = 0
            while(result.data[counter] !== undefined){
              this.discusiones[counter] = result.data[counter]; 
              counter++;
            }
            console.log(this.discusiones)
            counter = 0;
          },
          error: (error)=>{console.log(error)}
        })
    }
    

    //this.prepararDiscusiones()

    console.log("entramos al foro")
    
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
    this.descentForoService.setDiscusionActual(discusion[0]["discusionId"]);

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


    /*
    this.mensajes.forEach( (mensaje) => {
      

      if(mensaje["idConversacion"] === discusion[0].discusionId){
        this.mensajesDiscusion.push(mensaje);
      }
      
      
    })
    */
    //console.log(this.mensajesDiscusion)
    
    this.listaDiscusionesActiva = false;
    this.chatDiscusionActiva = true;
  }

  crearDiscusion(){
    if(this.currentUserService.getCurrentUserType() === "usuario" ||
    this.currentUserService.getCurrentUserType() === "administrador"){
      
      this.router.navigate(['foros/discusion/crear']);
      
    } else{
      this.router.navigate(['login'])
    }
    
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
    if(this.currentUserService.getCurrentUserType() === "usuario" ||
    this.currentUserService.getCurrentUserType() === "administrador"){
      
      this.currentUserService.setJuegoActual("descent");
      this.router.navigate(['foros/mensaje/crear']);

    } else{
      this.router.navigate(['login'])
    }
    
  }

  prepararDiscusiones(){
    this.descentForoService.getDiscusionesJuego()
    
    this.descentForoService.getTodasLasDiscusiones()
    if(this.descentForoService.getMisDiscusiones()){

    }
  }
}
