import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/Services/administrador.service';
import { CurrentUserService } from 'src/app/Services/current-user.service';
import { GloomhavenPartidaService } from 'src/app/Services/gloomhavenPartida.service';

@Component({
  selector: 'app-gloomhaven-partidas',
  templateUrl: './gloomhaven-partidas.component.html',
  styleUrls: ['./gloomhaven-partidas.component.css']
})
export class GloomhavenPartidasComponent {

  public partidas : any;

  public partidasUsuarioActual: any[];

  public solicitud: any;
  errorMessage?: string;
  public datos: any;

  public soyUsuario: boolean;

  constructor(private router: Router, 
    private currentUserService: CurrentUserService, 
    private gloomhavenPartidaService: GloomhavenPartidaService,
    private adminService: AdministradorService){

    this.partidasUsuarioActual = []
    this.soyUsuario = false;

  }



  ngOnInit(){
    this.currentUserService.setJuegoActual("gloomhaven");

    // LISTAR TODAS LAS PARTIDAS DEL USUARIO O EL TOTAL SI ES ADMINISTRADOR

    if(this.currentUserService.getCurrentUserType() === "administrador"){

      this.soyUsuario = false;

      this.adminService.adminListarTodasLasPartidasGloomhaven(
        this.currentUserService.getCurrentUserToken()!
      ).subscribe({
        next: (result)=>{
  
          let counter = 0
          while(result.data[counter] !== undefined){
            this.partidasUsuarioActual[counter] = result.data[counter]; 
            counter++;
          }
          console.log(this.partidasUsuarioActual)
          counter = 0;
        },
        error: (error)=>{console.log(error)}
      })
    

    } else{

      this.soyUsuario = true;

      this.gloomhavenPartidaService.listarPartidasGloomhaven(
        this.currentUserService.getCurrentUserId()!, 
        this.currentUserService.getCurrentUserToken()!
      ).subscribe({
        next: (result)=>{
  
          let counter = 0
          while(result.data[counter] !== undefined){
            this.partidasUsuarioActual[counter] = result.data[counter]; 
            counter++;
          }
          console.log(this.partidasUsuarioActual)
          counter = 0;
        },
        error: (error)=>{console.log(error)}
      })
    }

  }




  crear(){
    this.currentUserService.setJuegoActual("gloomhaven");
    this.router.navigate(['gloomhaven/partidas/crear'])
  }
  
  volver(){
    this.router.navigate([''])
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

    if(this.currentUserService.getJuegoActual() === "Gloomhaven"){

      this.gloomhavenPartidaService.eliminarPartidaGloomhaven(
        partida[0]["partidaId"],
        this.currentUserService.getCurrentUserToken()!
        ).subscribe({
            next: (result)=>{
              console.log("Partida borrada correctamente")
            },
            error: (error)=>{console.log(error)}
          })
          this.partidasUsuarioActual.splice(posicion,1)
    } 

    
    /*
        let posicion2 = this.mensajesDiscusion.map( (e) => e.idMensaje).indexOf(idMensaje)
        this.mensajesDiscusion.splice(posicion2,1)
    */
   
  }
}
