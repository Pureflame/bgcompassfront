import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/Services/current-user.service';

@Component({
  selector: 'app-menu-juegos',
  templateUrl: './menu-juegos.component.html',
  styleUrls: ['./menu-juegos.component.css']
})
export class MenuJuegosComponent {
  @Input() public juego: any

  @Output() descentPartidas = new EventEmitter();
  @Output() gloomhavenPartidas = new EventEmitter();

  public menuSinSesion : boolean
  public menuConSesion : boolean
  public menuAdmin : boolean

  constructor(private router: Router, private currentUserService: CurrentUserService){

      this.menuSinSesion = false;
      this.menuConSesion = false;
      this.menuAdmin = false;
  }

  ngOnInit(){
    //console.log(this.currentUserService.getCurrentUserType())
    this.comprobarUsuario()
  }

  irAPartidas(nombre:string){
    this.currentUserService.setJuegoActual(nombre);

    switch(nombre){

      case "Descent": {
        this.descentPartidas.emit();
        break;
      }

      case "Gloomhaven": {
        this.gloomhavenPartidas.emit();
        break;
      }
    }
  }

  crearPartida(nombre:string){
    if(this.currentUserService.getCurrentUserType() === "usuario" ||
    this.currentUserService.getCurrentUserType() === "administrador"){
      
      this.currentUserService.setJuegoActual(nombre.toLowerCase());
      this.router.navigate([nombre.toLowerCase() + '/partidas/crear'])
    } else {    
      
      this.router.navigate(['login'])
    }

  }

  comprobarUsuario(){
    if(this.currentUserService.getCurrentUserType()==="usuario") {
      //console.log("con sesion")
      this.menuSinSesion = false;
      this.menuConSesion = true;
      this.menuAdmin = false;
    } else if(this.currentUserService.getCurrentUserType()==="administrador") {
      this.menuSinSesion = false;
      this.menuConSesion = false;
      this.menuAdmin = true;
    } else{
      //console.log("sin sesion")
      this.menuSinSesion = true;
      this.menuConSesion = false;
      this.menuAdmin = false;
    }
  }
}
