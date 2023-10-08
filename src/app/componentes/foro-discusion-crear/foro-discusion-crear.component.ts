import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/Services/administrador.service';
import { CurrentUserService } from 'src/app/Services/current-user.service';
import { DescentForoService } from 'src/app/Services/descentForo.service';

@Component({
  selector: 'app-foro-discusion-crear',
  templateUrl: './foro-discusion-crear.component.html',
  styleUrls: ['./foro-discusion-crear.component.css']
})
export class ForoDiscusionCrearComponent {

  public solicitud: any;
  public solicitudAuxiliar: any;

  public juegoActual: string

  public headersAdd = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http:HttpClient, 
    private router: Router, 
    private currentUserService: CurrentUserService, 
    private adminService: AdministradorService,
    private descentForoService: DescentForoService){

    this.solicitud = {
      nombre: ''
    }
    this.solicitudAuxiliar = {}

    this.juegoActual = ""
  }

  ngOnInit(){
    console.log("entramos en crear discusion");
    console.log(this.currentUserService.getJuegoActual());
  }

  onSubmit(){
    this.juegoActual = this.currentUserService.getJuegoActual()
   
    switch(this.juegoActual){

      case "descent": {

        this.solicitudAuxiliar = {
          titulo_conversacion_dc: this.solicitud.nombre,
        }
        //console.log(this.solicitudAuxiliar)
        //console.log(this.currentUserService.getCurrentUserToken()!)
        this.descentForoService.crearDiscusionForoDescent(
          this.solicitudAuxiliar,
          this.currentUserService.getCurrentUserToken()!)
        .subscribe({
          next: (result)=>{
            console.log("Discusion creada correctamente");
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
    this.router.navigate([this.juegoActual+'/foros'])
    
  }

  volver(){
    let juegoActual = this.currentUserService.getJuegoActual()
    //console.log("volvemos de crear discusion")
    this.descentForoService.pedirDiscusionesJuego()
    this.router.navigate([juegoActual+'/foros'])
  }

}
