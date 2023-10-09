import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/Services/current-user.service';

@Component({
  selector: 'app-foro-discusion',
  templateUrl: './foro-discusion.component.html',
  styleUrls: ['./foro-discusion.component.css']
})
export class ForoDiscusionComponent {
  //@Input() public nombre: any
  @Input() public mensaje: any
  @Output() borrado = new EventEmitter();

  public adminActivo : boolean

  constructor(private router: Router, private currentUserService: CurrentUserService){
    this.adminActivo = false;
  }

  ngOnInit(){
    console.log("entramos al foro");
    //this.currentUserService.setCurrentUser("dd","administrador","dd")
    this.comprobarAdmin();
  }

  comprobarAdmin(){
    if(this.currentUserService.getCurrentUserType() === "administrador"){
      this.adminActivo = true;
    }
  }

  borrarMensaje(id : any, ){
/*
    let discusion = [ {
      discusionId: discusionId,
      discusionNombre: discusionNombre, 
      discusionNombreJuego: discusionNombreJuego
    }]
*/
    this.borrado.emit(id)
    
  }
}
