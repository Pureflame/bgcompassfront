import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/Services/administrador.service';
import { CurrentUserService } from 'src/app/Services/current-user.service';
import { DescentPartidaService } from 'src/app/Services/descentPartida.service';

@Component({
  selector: 'app-partida-crear',
  templateUrl: './partida-crear.component.html',
  styleUrls: ['./partida-crear.component.css']
})
export class PartidaCrearComponent {

  public solicitud: any;
  public solicitudAuxiliar: any;

  public juegoActual: string
  /*
  El boton de volver y crear debe variar segun el juego

    this.router.navigate(['{{nombre del juego en minusculas}}/partidas'])

  */

  public headersAdd = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http:HttpClient, 
    private router: Router, 
    private currentUserService: CurrentUserService, 
    private adminService: AdministradorService,
    private descentPartidaservice: DescentPartidaService){

    this.solicitud = {
      nombre: ''
    }
    this.juegoActual = ""

    this.solicitudAuxiliar = {}
  }

  ngOnInit(){
    //console.log("el juego actual es " + this.currentUserService.getJuegoActual())
    this.juegoActual = this.currentUserService.getJuegoActual();
    //console.log(this.currentUserService.getCurrentUserToken())
  }

  onSubmit(){
    //url crear campaña aqui
    switch(this.juegoActual){

      case "descent": {

        this.solicitudAuxiliar = {
          nombre_partida: this.solicitud.nombre,
          oro: '0',
          id_mision_dc: '1'
        }
        //console.log(this.solicitudAuxiliar)
        //console.log(this.currentUserService.getCurrentUserToken()!)
        this.descentPartidaservice.crearPartidaDescent(
          this.solicitudAuxiliar,
          this.currentUserService.getCurrentUserToken()!)
        .subscribe({
          next: (result)=>{
            console.log("Partida creada correctamente");
          },
          error: (error)=>{console.log(error)}
        })


        
        break;
      }

      case "gloomhaven": {

        this.solicitudAuxiliar = {
          nombre_partida: this.solicitud.nombre,
          xxxxxxxxxxxxxx: '0',
          ddddddddddddddd: '1'
        }
        console.log(this.solicitudAuxiliar)
        
        // URL AQUI
        break;
      }
    }
    
    this.router.navigate([this.juegoActual+'/partidas'])
  }

  volver(){
    this.router.navigate([this.juegoActual+'/partidas'])
  }

}
