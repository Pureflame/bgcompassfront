import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CurrentUserService } from 'src/app/Services/current-user.service';
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

  constructor(
    private navegacionService: NavegacionService,
    private currentUserService: CurrentUserService,
    private translate: TranslateService){
    this.sinSesion = false;
    this.conSesionUsuario = false;
    this.admin = false;
    this.translate.setDefaultLang('es');
  }

  ngInit(){

    this.navegacionService.botonPartidaNavegador()
    document.documentElement.style.setProperty('--colorPartida', 'gray' )
    document.documentElement.style.setProperty('--colorForo', 'none' )

  }
  cambiarIdioma(){
    //console.log(this.translate.currentLang)
    if(this.translate.currentLang === 'en' || this.translate.currentLang === undefined){
      this.translate.use('es');
    } else if (this.translate.currentLang === 'es'){
      this.translate.use('en');
    }
  }
  irPartida(){
    this.navegacionService.botonPartidaNavegador()
    document.documentElement.style.setProperty('--colorPartida', 'gray' )
    document.documentElement.style.setProperty('--colorForo', 'none' )
  }

  irForo(){
    this.navegacionService.botonForoNavegador()
    document.documentElement.style.setProperty('--colorPartida', 'none' )
    document.documentElement.style.setProperty('--colorForo', 'gray' )
  }

  borrarColores(){
    this.navegacionService.botonForoNavegador()
    document.documentElement.style.setProperty('--colorPartida', 'none' )
    document.documentElement.style.setProperty('--colorForo', 'none' )
  }

  ngDoCheck() { 
    
    if (this.translate.currentLang === undefined){
      this.translate.use('es');
    }

    if(this.currentUserService.getCurrentUserType() === "usuario"){
      this.conSesionUsuario = true;
      this.sinSesion = false;
      this.admin = false;
    } else if (this.currentUserService.getCurrentUserType() === "administrador"){
      this.admin = true;
      this.sinSesion = false;
      this.conSesionUsuario = false;
    } else {
      this.sinSesion = true;
      this.conSesionUsuario = false;
      this.admin = false;
    }

    /*
    this.sinSesion = this.navegacionService.sinSesion;
    this.conSesionUsuario = this.navegacionService.conSesionUsuario;
    this.admin = this.navegacionService.admin;
    */
  }

}
