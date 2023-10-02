import { Component } from '@angular/core';
import { Administrador } from 'src/app/Models/administrador';
import { Usuario } from 'src/app/Models/usuario';
import { AdministradorService } from 'src/app/Services/administrador.service';
import { CurrentUserService } from 'src/app/Services/current-user.service';
import { DescentPartidaService } from 'src/app/Services/descentPartida.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [DescentPartidaService]
})
export class MenuComponent {

  public actualUser = []
  public aux : any = []
  public id : number = -1

  public juegosListaActiva: boolean;
  public forosListaActiva: boolean;

  public listaJuegos;

  constructor(private currentUserService: CurrentUserService,
    private descentService: DescentPartidaService){

      this.juegosListaActiva = false;
      this.forosListaActiva = false;

      this.listaJuegos = [
        {nombreJuegoImagen:"Descent", nombreJuegoTitulo: "Descent: Viaje a las TInieblas"},
        {nombreJuegoImagen:"Gloomhaven", nombreJuegoTitulo: "Gloomhaven"}
      ];

  }
  ngOnChanges(){
    
  }
  ngOnInit(){

    this.juegosListaActiva = true;
    console.log(this.juegosListaActiva)
    console.log(this.forosListaActiva)

    //this.currentUserService.refrescarUsuarios()
    console.log("MENU DE INICIO - USUARIO ACTUAL: ");
  
    console.log(this.currentUserService.getCurrentUserToken());
    console.log(this.currentUserService.getCurrentUserType());
    console.log(this.currentUserService.getCurrentUserEmail());
    //console.log(this.currentUserService.testCurrenttoken(this.currentUserService.getCurrentUserToken()!));

    this.currentUserService.getActualUserData(
      this.currentUserService.getCurrentUserEmail()!, 
      this.currentUserService.getCurrentUserToken()!
        ).subscribe({
      next: (result)=>{
        
        this.aux = result["data"][0]

        if(this.aux["correo_usuario"] == undefined){

          let actualUser: Administrador = this.aux;
          console.log("es un admin: ");
          console.log(actualUser["correo_admin"]);
          this.id = actualUser["id"]

        }else{

          let actualUser: Usuario = this.aux;
          console.log("es un usuario: ");
          console.log(actualUser["correo_usuario"]);
          console.log(actualUser["id"]);
          this.id = actualUser["id"]
        }

        //console.log(this.actualUser["id"])
      },

      error: (error)=>{console.log(error)}
    })
}

listar(){
//console.log(this.id)
//console.log(this.currentUserService.getCurrentUserToken())

  this.descentService.listarPartidasDescent(
    this.id, 
    this.currentUserService.getCurrentUserToken()!
    ).subscribe(
      {
        next: (result)=>{
          let aux = result
          console.log(aux)
          console.log(aux["data"]["0"]["nombre_partida"])
        },
        error: (error)=>{console.log(error)}
      }
      )
    
     //console.log("me has pulsado")
     
}


  ngDoCheck() {  
    

/*
    let test:any = this.currentUserService.getCurrentUser()
    console.log(test);
    if(test != undefined)
      console.log(test["correo_usuario"]);

  */
 }

  
}