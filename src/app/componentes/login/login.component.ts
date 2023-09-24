import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { CurrentUserService } from 'src/app/Services/current-user.service';
import { AdministradorService } from 'src/app/Services/administrador.service';
import { UsuarioService } from 'src/app/Services/usuario.service';


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

  constructor(private http:HttpClient, private currentUserService: CurrentUserService, private adminService: AdministradorService){
    this.solicitud = {
      email: '',
      password: ''
    }
  }

  ngOnInit(){
    console.log(this.currentUserService.testCurrentUser());
this.adminService.getAdminList().subscribe({
  next: (result)=>{
    this.datos = result["data"];

    console.log("ADMINS:");
    console.log(this.datos);

  },
  error: (error)=>{console.log(error)}
})
  }


  onSubmit(){
    //alert("login enviado");  
    //console.log(this.solicitud);
   /* return this.http.post('http://127.0.0.1:8000/api/login', this.solicitud).subscribe(

      next: data => {
        this.solicitud.correo = data.correo;
      },

      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    );
    */
    let headersAdd = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post('http://127.0.0.1:8000/api/login', this.solicitud, {headers: headersAdd}).subscribe({
      next: (result)=>{
        this.datos = result;

        
        console.log("RESULT:");
        console.log(result);

        console.log("DATOS DEVUELTOS:");
        console.log(this.datos["data"]);

        console.log("DATOS DEVUELTOS CON MAP:");
        console.log(this.datos.map);
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




}
