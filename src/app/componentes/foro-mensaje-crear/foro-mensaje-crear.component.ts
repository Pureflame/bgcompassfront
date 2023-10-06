import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/Services/administrador.service';
import { CurrentUserService } from 'src/app/Services/current-user.service';
import { DescentForoService } from 'src/app/Services/descentForo.service';

@Component({
  selector: 'app-foro-mensaje-crear',
  templateUrl: './foro-mensaje-crear.component.html',
  styleUrls: ['./foro-mensaje-crear.component.css']
})
export class ForoMensajeCrearComponent {
  public solicitud: any;

  /*
  El boton de volver y crear debe variar segun el juego

    this.router.navigate(['{{nombre del juego en minusculas}}/partidas'])

  */

  public headersAdd = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http:HttpClient, 
    private router: Router, 
    private currentUserService: CurrentUserService, 
    private adminService: AdministradorService,
    private descentForoService : DescentForoService){
    this.solicitud = {
      nombre: ''
    }
  }

  onSubmit(){
    let miDiscusion = this.descentForoService.getDiscusionActual()
    // con esto tenemos ya el id de la discusion para meter en el http
      
    
  }

  volver(){
    let juego = this.currentUserService.getJuegoActual()
    this.router.navigate([juego + '/foros'])
  }
}
