import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/Services/administrador.service';
import { CurrentUserService } from 'src/app/Services/current-user.service';

@Component({
  selector: 'app-partida-crear',
  templateUrl: './partida-crear.component.html',
  styleUrls: ['./partida-crear.component.css']
})
export class PartidaCrearComponent {

  public solicitud: any;
  public juegoActual: string
  /*
  El boton de volver y crear debe variar segun el juego

    this.router.navigate(['{{nombre del juego en minusculas}}/partidas'])

  */

  public headersAdd = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http:HttpClient, private router: Router, private currentUserService: CurrentUserService, private adminService: AdministradorService){
    this.solicitud = {
      nombre: ''
    }
    this.juegoActual = ""
  }

  ngOnInit(){
    console.log("el juego actual es " + this.currentUserService.getJuegoActual())
    this.juegoActual = this.currentUserService.getJuegoActual();
  }

  onSubmit(){
    //url crear campaña aqui
    
    this.router.navigate([this.juegoActual+'/partidas'])
  }

  volver(){
    this.router.navigate([this.juegoActual+'/partidas'])
  }

}
