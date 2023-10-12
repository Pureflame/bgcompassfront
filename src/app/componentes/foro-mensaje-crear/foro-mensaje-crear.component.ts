import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/Services/administrador.service';
import { CurrentUserService } from 'src/app/Services/current-user.service';
import { DescentForoService } from 'src/app/Services/descentForo.service';
import { GloomhavenForoService } from 'src/app/Services/gloomhavenForo.service';

@Component({
  selector: 'app-foro-mensaje-crear',
  templateUrl: './foro-mensaje-crear.component.html',
  styleUrls: ['./foro-mensaje-crear.component.css']
})
export class ForoMensajeCrearComponent {
  public solicitud: any;
  public solicitudAuxiliar: any;
  
  public juegoActual: string
  /*
  El boton de volver y crear debe variar segun el juego

    this.router.navigate(['{{nombre del juego en minusculas}}/partidas'])

  */

  public headersAdd = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http:HttpClient, 
    private router: Router, 
    private currentUserService: CurrentUserService, 
    private adminService: AdministradorService,
    private descentForoService : DescentForoService,
    private gloomhavenForoservice: GloomhavenForoService){
    this.solicitud = {
      nombre: ''
    }
    this.solicitudAuxiliar = {}
    this.juegoActual = ""
  }

  onSubmit(){

    this.juegoActual = this.currentUserService.getJuegoActual()

    switch(this.juegoActual){

      case "descent": {
        let miDiscusion = this.descentForoService.getDiscusionActual()
        //console.log(this.solicitud.nombre)

        this.solicitudAuxiliar = {
          texto_mensaje_dc: this.solicitud.nombre,
        }

        this.descentForoService.crearMensajeForoDescent(
          this.solicitudAuxiliar,
          miDiscusion,
          this.currentUserService.getCurrentUserToken()!)
          .subscribe({
            
            next: (result)=>{
              console.log("creamos el mensaje en la discusion")
            },
            error: (error)=>{console.log(error)}
        })

        break;
      }

      case "gloomhaven": {
        let miDiscusion = this.gloomhavenForoservice.getDiscusionActual()

        this.solicitudAuxiliar = {
          texto_mensaje_gh: this.solicitud.nombre,
        }
        console.log(this.solicitudAuxiliar)
        
        this.gloomhavenForoservice.crearMensajeForoGloomhaven(
          this.solicitudAuxiliar,
          miDiscusion,
          this.currentUserService.getCurrentUserToken()!)
          .subscribe({
            
            next: (result)=>{
              console.log("creamos el mensaje en la discusion")
            },
            error: (error)=>{console.log(error)}
        })
        break;
      }
    }
    this.router.navigate([this.juegoActual+'/foros'])
  }

  volver(){
    let juego = this.currentUserService.getJuegoActual()
    //console.log("volvemos de crear mensaje")
    this.descentForoService.pedirDiscusionesJuego()
    this.router.navigate([juego + '/foros'])
  }
}
