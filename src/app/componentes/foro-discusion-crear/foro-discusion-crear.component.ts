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

  public headersAdd = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http:HttpClient, 
    private router: Router, 
    private currentUserService: CurrentUserService, 
    private adminService: AdministradorService){
    this.solicitud = {
      nombre: ''
    }
  }

  ngOnInit(){
    console.log("entramos en crear discusion");
    console.log(this.currentUserService.getJuegoActual());
  }

  onSubmit(){
    this.currentUserService.getJuegoActual()
    
    console.log(this.solicitud.nombre);
    //url + juego
  }

  volver(){
    this.router.navigate([''])
  }

}
