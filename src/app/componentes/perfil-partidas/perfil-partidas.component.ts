import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/Services/current-user.service';
import { DescentPartidaService } from 'src/app/Services/descentPartida.service';
import { GloomhavenPartidaService } from 'src/app/Services/gloomhavenPartida.service';

@Component({
  selector: 'app-perfil-partidas',
  templateUrl: './perfil-partidas.component.html',
  styleUrls: ['./perfil-partidas.component.css']
})
export class PerfilPartidasComponent {
  
@Input() public partida: any
@Input() public rutaNombreJuego: any

@Output() borradoPartida = new EventEmitter();
/*
Crear dos inputs para cuando:
 - se esta visualizando en el perfil con todas las partidas
 - se esta visualizando en la lista de campañas de un juego

 QUIZA NO HACE FALTA PORQUE ES SEGUN EL ARRAY QUE SE LE PASA
*/
public soyAdmin: boolean;
public soyUsuario: boolean;

  constructor(
    private router: Router, 
    private currentUserService: CurrentUserService,
    private descentPartidaService: DescentPartidaService,
    private gloomhavenPartidaService: GloomhavenPartidaService){

      this.soyAdmin = false;
      this.soyUsuario = false;
  }

  ngOnInit(){
    //console.log("entro")
    console.log(this.partida)
    if(this.currentUserService.getCurrentUserType() === "administrador"){
      this.soyAdmin = true;
      this.soyUsuario = false;
    } else {

      this.soyAdmin = false;
      this.soyUsuario = true;
    }
    //this.rutaNombreJuego = this.currentUserService.getJuegoActual();
  }

  verDatos(id:number,nombre:string){
    this.currentUserService.setJuegoActual(nombre);
    //console.log(nombre)
    switch(nombre){

      case "Descent": {
        this.descentPartidaService.setPartidaActualDescent(id)

        break;
      }

      case "Gloomhaven": {
        this.gloomhavenPartidaService.setPartidaActualGloomhaven(id)
        
        break;
      }
    }
    this.router.navigate([nombre.toLowerCase() +'/partidas/datos'])
  }

  borrarPartida(id:number,nombre:string){
    this.currentUserService.setJuegoActual(nombre);

    let datos = [ {
      partidaId: id,
      partidaNombreJuego: nombre
    }]
    //console.log(nombre)
    switch(nombre){

      case "Descent": {
        this.descentPartidaService.setPartidaActualDescent(id)
        break;
      }

      case "Gloomhaven": {
        this.gloomhavenPartidaService.setPartidaActualGloomhaven(id)
        break;
      }
    }

    this.borradoPartida.emit(datos)
    
  }
}
