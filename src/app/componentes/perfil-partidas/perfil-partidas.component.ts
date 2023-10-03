import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-partidas',
  templateUrl: './perfil-partidas.component.html',
  styleUrls: ['./perfil-partidas.component.css']
})
export class PerfilPartidasComponent {
@Input() public nombre: any
@Input() public rutaNombreJuego: any

/*
Crear dos inputs para cuando:
 - se esta visualizando en el perfil con todas las partidas
 - se esta visualizando en la lista de campañas de un juego

 QUIZA NO HACE FALTA PORQUE ES SEGUN EL ARRAY QUE SE LE PASA
*/

constructor(private router: Router){

  
}

  ngOnInit(){
    this.rutaNombreJuego = "descent";
  }

  verDatos(){
    this.router.navigate([this.rutaNombreJuego +'/partidas/datos'])
  }

}
