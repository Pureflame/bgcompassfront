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
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
  providers: [CurrentUserService, AdministradorService, UsuarioService]
})
export class RegistroUsuarioComponent {
  public solicitud: any;
  errorMessage?: string;
  public datos: any;
  public headersAdd = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http:HttpClient, private router: Router, private currentUserService: CurrentUserService, private adminService: AdministradorService){
    this.solicitud = {
      email: '',
      password: '',
      nombre: ''
    }
  }


  ngOnInit(){}

  onSubmit(){
    return this.http.post('http://127.0.0.1:8000/api/login', this.solicitud, {headers: this.headersAdd}).subscribe({
      next: (result)=>{
        this.datos = result;

        console.log("REGISTRO DE USUARIO");

        this.router.navigate([''])

      },
      error: (error)=>{console.log(error)}
    })

  }

  volver(){
    this.router.navigate([''])
  }


}
