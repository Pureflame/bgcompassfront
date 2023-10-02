import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { CurrentUserService } from 'src/app/Services/current-user.service';
import { AdministradorService } from 'src/app/Services/administrador.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';
import { Administrador } from 'src/app/Models/administrador';
import {Router} from "@angular/router"


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  public infoActiva: boolean;
  public partidaActiva: boolean;
  public discusionesActiva: boolean;
  public editarUsuarioActiva: boolean;

  public usuario;
  public nombres;


  public solicitud: any;
  errorMessage?: string;
  public datos: any;
  public headersAdd = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http:HttpClient, private router: Router, private currentUserService: CurrentUserService, private adminService: AdministradorService){
    this.solicitud = {
      email: '',
      password: ''
    }
    this.infoActiva = false;
    this.partidaActiva = false;
    this.discusionesActiva = false;
    this.editarUsuarioActiva = false;
    
    this.nombres = [
      {nombreCampanha:"nombrecampaña1", nombreJuego: "NombreJuego1"},
      {nombreCampanha:"nombrecampaña2", nombreJuego: "NombreJuego2"}
    ];

    this.usuario = "nombre usuario aqui";
  }

  ngOnInit(){
    this.infoActiva = true;
  }
  
  onSubmit(){

  }

  info(){
    this.infoActiva = true;
    this.partidaActiva = false;
    this.discusionesActiva = false;
    this.editarUsuarioActiva = false;
  }

  partidas(){
    this.infoActiva = false;
    this.partidaActiva = true;
    this.discusionesActiva = false;
    this.editarUsuarioActiva = false;
  }

  discusiones(){
    this.infoActiva = false;
    this.partidaActiva = false;
    this.discusionesActiva = true;
    this.editarUsuarioActiva = false;
  }

  editar(){
    this.infoActiva = false;
    this.partidaActiva = false;
    this.discusionesActiva = false;
    this.editarUsuarioActiva = true;
  }

  volver(){
    this.router.navigate([''])
  }

  retrocederEdicion(){
    this.infoActiva = true;
    this.editarUsuarioActiva = false;
  }
  



}
