import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/Services/administrador.service';
import { CurrentUserService } from 'src/app/Services/current-user.service';

@Component({
  selector: 'app-descent-partidas',
  templateUrl: './descent-partidas.component.html',
  styleUrls: ['./descent-partidas.component.css']
})
export class DescentPartidasComponent {

  public listaPartidasActiva: boolean;

  public nombres;

  public solicitud: any;
  errorMessage?: string;
  public datos: any;


  constructor(private router: Router, private currentUserService: CurrentUserService, private adminService: AdministradorService){
    this.solicitud = {
      email: '',
      password: ''
    }

    this.listaPartidasActiva = false;
    
    this.nombres = [
      {nombreCampanha:"nombrecampaña1", nombreJuego: "NombreJuego1"},
      {nombreCampanha:"nombrecampaña2", nombreJuego: "NombreJuego2"}
    ];

  }

  ngOnInit(){
    this.listaPartidasActiva = true;
  }

  crear(){
    this.router.navigate(['descent/partidas/crear'])
  }
  
  volver(){
    this.router.navigate([''])
  }
}
