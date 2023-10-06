import { Component } from '@angular/core';
import { AdministradorService } from './Services/administrador.service';
import { CurrentUserService } from './Services/current-user.service';
import { UsuarioService } from './Services/usuario.service';
import { DescentForoService } from './Services/descentForo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CurrentUserService, AdministradorService, UsuarioService, DescentForoService]
})
export class AppComponent {
  title = 'bgcompassfront';

  constructor(private currentUserService: CurrentUserService){

  }

  ngOnInit(){
    //this.currentUserService.refrescarUsuarios();
}
}
