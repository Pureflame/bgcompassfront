import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/Services/administrador.service';
import { CurrentUserService } from 'src/app/Services/current-user.service';

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

  constructor(private http:HttpClient, private router: Router, private currentUserService: CurrentUserService, private adminService: AdministradorService){
    this.solicitud = {
      nombre: ''
    }
  }

  onSubmit(){

  }

  volver(){
    this.router.navigate([''])
  }

}
