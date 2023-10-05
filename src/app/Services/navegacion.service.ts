import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {

  public partida: boolean
  public foro: boolean

  public sinSesion : boolean
  public conSesionUsuario : boolean
  public admin : boolean

  constructor(){
    this.partida = false;
    this.foro = false;

    this.sinSesion = true;
    this.conSesionUsuario = false;
    this.admin = false;
  }

  public botonPartidaNavegador():void {
    this.partida = true;
    this.foro = false;
  }

  public botonForoNavegador():void {
    this.partida = false;
    this.foro = true;
  }

  public navegadorUsuarioSinSesion(){
    this.sinSesion = true;
    this.conSesionUsuario = false;
    this.admin = false;
  }

  public navegadorUsuarioConSesion(){
    this.sinSesion = false;
    this.conSesionUsuario = true;
    this.admin = false;
  }

  public navegadorAdmin(){
    this.sinSesion = false;
    this.conSesionUsuario = false;
    this.admin = true;
  }


}
