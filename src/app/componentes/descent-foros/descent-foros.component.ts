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

  public mensajes : any;
  public mensajesDiscusion : any[]

  public solicitud: any;
  errorMessage?: string;
  public datos: any;

  public listaDiscusionesActiva : boolean
  public chatDiscusionActiva : boolean

  public soyAdmin: boolean;
  public soyUsuario: boolean;


  constructor(private router: Router, 
    private currentUserService: CurrentUserService, 
    private adminService: AdministradorService,
    private descentForoService : DescentForoService){
    this.solicitud = {
      email: '',
      password: ''
    }

    this.soyAdmin = false;
    this.soyUsuario = false;
    
    this.discusiones = [];

    this.mensajes = []

    this.listaDiscusionesActiva = false;
    this.chatDiscusionActiva = false;
    this.mensajesDiscusion = []
  }

  ngOnInit(){

    if(this.currentUserService.getCurrentUserType() === "administrador"){
      this.soyAdmin = true;
      this.soyUsuario = false;
    } else {

      this.soyAdmin = false;
      this.soyUsuario = true;
    }

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

  borrarDiscusion(discusion : any){
    console.log(this.discusiones)
    console.log(discusion)

    this.currentUserService.setJuegoActual(discusion[0]["discusionNombreJuego"])

    let posicion = this.discusiones.map( (mensaje) => mensaje[0]).indexOf(discusion[0]["discusionId"])


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

    this.discusiones.splice(posicion,1)
    /*
        let posicion2 = this.mensajesDiscusion.map( (e) => e.idMensaje).indexOf(idMensaje)
        this.mensajesDiscusion.splice(posicion2,1)
    */
   
  }

  borrarMensaje(idMensaje : any){

    console.log(this.mensajesDiscusion)
    let posicion = this.mensajesDiscusion.map( (mensaje) => mensaje[0]).indexOf(idMensaje)


    // comprobar a que juego pertecene la discusion para elegir la url de borrado
    console.log("hi")
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
