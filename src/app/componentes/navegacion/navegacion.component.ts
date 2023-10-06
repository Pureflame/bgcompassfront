import { Component } from '@angular/core';
import { NavegacionService } from 'src/app/Services/navegacion.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {

  public sinSesion : boolean
  public conSesionUsuario : boolean
  public admin : boolean

  constructor(private navegacionService: NavegacionService){
    this.sinSesion = false;
    this.conSesionUsuario = false;
    this.admin = false;
  }

  ngInit(){
    
  }

  irPartida(){
    this.navegacionService.botonPartidaNavegador()
    document.documentElement.style.setProperty('--colorPartida', 'red' )
    document.documentElement.style.setProperty('--colorForo', 'none' )
  }

  irForo(){
    this.navegacionService.botonForoNavegador()
    document.documentElement.style.setProperty('--colorPartida', 'none' )
    document.documentElement.style.setProperty('--colorForo', 'red' )
  }

  borrarColores(){
    this.navegacionService.botonForoNavegador()
    document.documentElement.style.setProperty('--colorPartida', 'none' )
    document.documentElement.style.setProperty('--colorForo', 'none' )
  }

  ngDoCheck() { 
    
    console.log("miro")


    this.sinSesion = this.navegacionService.sinSesion;
    this.conSesionUsuario = this.navegacionService.conSesionUsuario;
    this.admin = this.navegacionService.admin;
  }

}
