import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/Services/current-user.service';

@Component({
  selector: 'app-perfil-discusiones',
  templateUrl: './perfil-discusiones.component.html',
  styleUrls: ['./perfil-discusiones.component.css']
})
export class PerfilDiscusionesComponent {
  @Input() public discusion: any
  @Input() public rutaNombreJuego: any

  @Output() discusionChat = new EventEmitter();
  @Output() borradoDiscusion = new EventEmitter();

  public soyAdmin: boolean;
  public soyUsuario: boolean;

  constructor(
    private router: Router,
    private currentUserService: CurrentUserService){

    this.soyAdmin = false;
    this.soyUsuario = false;
  }

  ngOnInit(){
    if(this.currentUserService.getCurrentUserType() === "administrador"){
      this.soyAdmin = true;
      this.soyUsuario = false;
    } else {

      this.soyAdmin = false;
      this.soyUsuario = true;
    }
  }

  /*
  verDatos(){
    this.router.navigate(['foros/discusion'])
  }
  */
  discusionIrChat(discusionId:number , discusionNombre:string, discusionNombreJuego:string){

    let datos = [ {
      discusionId: discusionId,
      discusionNombre: discusionNombre, 
      discusionNombreJuego: discusionNombreJuego
    }]
    
    this.discusionChat.emit(datos)
  }

  borrarDiscusion(discusionId:number, discusionNombreJuego:string){

    let datos = [ {
      discusionId: discusionId, 
      discusionNombreJuego: discusionNombreJuego
    }]

    this.borradoDiscusion.emit(datos)
  }


}