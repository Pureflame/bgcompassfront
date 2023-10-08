import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/Services/current-user.service';
import { DescentPartidaService } from 'src/app/Services/descentPartida.service';

@Component({
  selector: 'app-perfil-partidas',
  templateUrl: './perfil-partidas.component.html',
  styleUrls: ['./perfil-partidas.component.css']
})
export class PerfilPartidasComponent {
  
@Input() public partida: any
@Input() public rutaNombreJuego: any

/*
Crear dos inputs para cuando:
 - se esta visualizando en el perfil con todas las partidas
 - se esta visualizando en la lista de campañas de un juego

 QUIZA NO HACE FALTA PORQUE ES SEGUN EL ARRAY QUE SE LE PASA
*/

constructor(
  private router: Router, 
  private currentUserService: CurrentUserService,
  private descentPartidaService: DescentPartidaService){

  
}

  ngOnInit(){
    //console.log("entro")
    console.log(this.partida)
    //this.rutaNombreJuego = this.currentUserService.getJuegoActual();
  }

  verDatos(id:number,nombre:string){
    
    this.currentUserService.setJuegoActual(nombre);
    this.descentPartidaService.setPartidaActualDescent(id)
    this.router.navigate([nombre.toLowerCase() +'/partidas/datos'])
  }

}
