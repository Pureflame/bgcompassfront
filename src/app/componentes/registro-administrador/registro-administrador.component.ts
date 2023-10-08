import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/Services/administrador.service';
import { CurrentUserService } from 'src/app/Services/current-user.service';

@Component({
  selector: 'app-registro-administrador',
  templateUrl: './registro-administrador.component.html',
  styleUrls: ['./registro-administrador.component.css']
})
export class RegistroAdministradorComponent {
  public administrador: any;
  errorMessage?: string;
  public datos: any;
  public headersAdd = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.currentUserService.getCurrentUserToken()
  });

  constructor(private http:HttpClient, private router: Router, private currentUserService: CurrentUserService, private adminService: AdministradorService){
    this.administrador = {
      dni_admin:"",
      nombre_admin:"",
      apellidos_admin:"",
      contrasenha_admin:"",
      correo_admin:"",
      telefono_admin:"",
      tipo_usuario:"admin"
    }
  }


  ngOnInit(){
   
  }


  onSubmit(){
    if(this.currentUserService.getCurrentUserType() !== "administrador"){
      return this.router.navigate([''])
    } else{
    return this.http.post('http://127.0.0.1:8000/api/usuario-registro/administrador', this.administrador, {headers: this.headersAdd}).subscribe({
      next: (result)=>{
        this.datos = result;

        console.log("Admin registrado correctamente");

        this.router.navigate([''])

      },
      error: (error)=>{console.log(error)}
    })
  }
  }

  volver(){
    this.router.navigate([''])
  }

  ngDoCheck() {  
    if(this.currentUserService.getCurrentUserType() !== "administrador"){
      this.router.navigate([''])
    }
/*
    let test:any = this.currentUserService.getCurrentUser()
    console.log(test);
    if(test != undefined)
      console.log(test["correo_usuario"]);

  */
 }

  
}
