import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/Services/administrador.service';
import { CurrentUserService } from 'src/app/Services/current-user.service';

@Component({
  selector: 'app-descent-foros',
  templateUrl: './descent-foros.component.html',
  styleUrls: ['./descent-foros.component.css']
})
export class DescentForosComponent {
  

  public discusiones;
  public mensajes;

  public solicitud: any;
  errorMessage?: string;
  public datos: any;

  public listaDiscusionesActiva : boolean
  public chatDiscusionActiva : boolean


  constructor(private router: Router, private currentUserService: CurrentUserService, private adminService: AdministradorService){
    this.solicitud = {
      email: '',
      password: ''
    }

   
    
    this.discusiones = [
      {nombreUsuario:"nombreUsuario1", nombreDiscusion:"nombreDiscusion1"},
      {nombreUsuario:"nombreUsuario2", nombreDiscusion:"nombreDiscusion2"}
    ];

    this.mensajes = [
      {textoMensaje: "mensaje1"},
      {textoMensaje: "mensaje2"},
      {textoMensaje: "mensaje3"}
    ]

    this.listaDiscusionesActiva = false;
    this.chatDiscusionActiva = false;
  }

  ngOnInit(){
    this.chatDiscusionActiva = true;
    
  }

  crear(){
   /* this.router.navigate(['descent/partidas/crear'])*/
  }
  
  volver(){
    this.router.navigate([''])
  }

  entrarDiscusion(discusion:any){
    console.log(discusion)
    this.listaDiscusionesActiva = false;
    this.chatDiscusionActiva = true;
  }

  crearDiscusion(){
    this.router.navigate(['foros/discusion/crear'])
  }
}
