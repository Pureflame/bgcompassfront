import { Component } from '@angular/core';
import { AdministradorService } from './Services/administrador.service';
import { CurrentUserService } from './Services/current-user.service';
import { UsuarioService } from './Services/usuario.service';
import { DescentForoService } from './Services/descentForo.service';
import { DescentPartidaService } from './Services/descentPartida.service';
import { GloomhavenPartidaService } from './Services/gloomhavenPartida.service';
import { GloomhavenForoService } from './Services/gloomhavenForo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    CurrentUserService, AdministradorService, UsuarioService, 
    DescentPartidaService, DescentForoService, 
    GloomhavenPartidaService, GloomhavenForoService
  ]
})
export class AppComponent {
  title = 'bgcompassfront';

  constructor(private currentUserService: CurrentUserService){

  }

  ngOnInit(){
    //this.currentUserService.refrescarUsuarios();
}
}
