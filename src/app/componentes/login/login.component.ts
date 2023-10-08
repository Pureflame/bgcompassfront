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
import { NavegacionService } from 'src/app/Services/navegacion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CurrentUserService, AdministradorService, UsuarioService]
})
export class LoginComponent {
  public solicitud: any;
  errorMessage?: string;
  public datos: any;
  public headersAdd = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http:HttpClient, 
    private router: Router, 
    private currentUserService: CurrentUserService,
    private navegacionService: NavegacionService, 
    private adminService: AdministradorService){
    this.solicitud = {
      email: '',
      password: ''
    }
  }

  ngOnInit(){
    //this.currentUserService.refrescarUsuarios()
    //console.log(this.currentUserService.testCurrentUser());
    //console.log("ESTE ES EL USUARIO ACTUAL: ");
    //console.log(this.currentUserService.getCurrentUser());
    
/*
this.adminService.getAdminList().subscribe({
  next: (result)=>{
    this.datos = result["data"];

    console.log("ADMINS:");
    console.log(this.datos);

  },
  error: (error)=>{console.log(error)}
})
*/

  }


  onSubmit(){
    return this.http.post('http://127.0.0.1:8000/api/login', this.solicitud, {headers: this.headersAdd}).subscribe({
      next: (result)=>{
        this.datos = result;
        let token = this.datos["data"][0];
        let id = this.datos["data"][1];
        let tipoUsuario = this.datos["mensaje"]

        this.currentUserService.setCurrentUser(token, tipoUsuario, this.solicitud.email, id);
        this.navegacionService.navegadorUsuarioConSesion();

        //console.log("LOGIN - USUARIO ACTUAL: ");
        /*
        this.currentUserService.getActualUserData(
          this.currentUserService.getCurrentUserEmail()!, 
          this.currentUserService.getCurrentUserToken()!
            ).subscribe({
          next: (result)=>{console.log(result["data"])},
          error: (error)=>{console.log(error)}
        })
*/

        //let test:any = this.currentUserService.getCurrentUser()
        console.log("Has iniciado sesión");
        this.router.navigate([''])
/*
        if(test["correo_usuario"] == undefined){
          let admin: Administrador = test;
          console.log("admin: ");
          console.log(admin["correo_admin"]);
        }else{
          let usuario: Usuario = test;
          console.log("usuario: ");
          console.log(usuario["correo_usuario"]);
        }
*/
      },
      error: (error)=>{console.log(error)}
    })

  }

/*
  const observable = new Observable(suscriptor =>{
    suscriptor.next(1);
    suscriptor.next(2);
    suscriptor.next(3);
    setTimeout(() => {
      suscriptor.next(4);
      suscriptor.complete();
    }, 1000);
  });



  console.log("Antes de la suscripción");
  
  const suscripcion=observable.subscribe({
    next(x){console.log("tengo valor "+ x + " y estoy esperando para el siguiente");},
    error (err){console.log("error: " + err);},
    complete (){console.log("finalizado");
    }
  })
  console.log("Después de la suscripción");

*/
volver(){
  this.router.navigate([''])
}



}
