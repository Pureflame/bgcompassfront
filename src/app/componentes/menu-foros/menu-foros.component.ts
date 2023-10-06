import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/Services/current-user.service';
import { DescentForoService } from 'src/app/Services/descentForo.service';

@Component({
  selector: 'app-menu-foros',
  templateUrl: './menu-foros.component.html',
  styleUrls: ['./menu-foros.component.css']
})
export class MenuForosComponent {
  @Input() public juego: any

  @Output() descentForos = new EventEmitter();
  @Output() gloomhavenForos = new EventEmitter();

  public menuSinSesion : boolean
  public menuConSesion : boolean
  public menuAdmin : boolean

  constructor(private router: Router, private currentUserService: CurrentUserService, private descentForoService: DescentForoService){

    this.menuSinSesion = false;
    this.menuConSesion = false;
    this.menuAdmin = false;
  }

  ngOnInit(){
    console.log(this.currentUserService.getCurrentUserType())
    this.comprobarUsuario()
  }

  irAForos(nombre:string){
    this.currentUserService.setJuegoActual(nombre);
    console.log(nombre)
    switch(nombre){

      case "Descent": {
        this.descentForoService.pedirDiscusionesJuego()
        this.descentForos.emit();
        break;
      }

      case "Gloomhaven": {
        //this.gloomhavenForoService.pedirDiscusionesJuego()
        this.gloomhavenForos.emit();
        break;
      }
    }
  }

  irAMisForos(nombre:string){
    this.currentUserService.setJuegoActual(nombre);
    console.log(nombre)
    switch(nombre){

      case "Descent": {
        this.descentForoService.pedirMisDiscusiones()
        this.descentForos.emit();
        break;
      }

      case "Gloomhaven": {
        //this.gloomhavenForoService.pedirMisDiscusiones()
        this.gloomhavenForos.emit();
        break;
      }
    }
  }

  comprobarUsuario(){
    if(this.currentUserService.getCurrentUserType()===""){
      console.log("sin sesion")
      this.menuSinSesion = true;
      this.menuConSesion = false;
      this.menuAdmin = false;
    }
    else if(this.currentUserService.getCurrentUserType()==="usuario") {
      console.log("con sesion")
      this.menuSinSesion = false;
      this.menuConSesion = true;
      this.menuAdmin = false;
    } else if(this.currentUserService.getCurrentUserType()==="administrador") {
      this.menuSinSesion = false;
      this.menuConSesion = false;
      this.menuAdmin = true;
    }
  }

}
