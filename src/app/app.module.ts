import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { NavegacionComponent } from './componentes/navegacion/navegacion.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { LoginComponent } from './componentes/login/login.component';
import { ErrorComponent } from './componentes/error/error.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { RegistroAdministradorComponent } from './componentes/registro-administrador/registro-administrador.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PerfilPartidasComponent } from './componentes/perfil-partidas/perfil-partidas.component';
import { PerfilDiscusionesComponent } from './componentes/perfil-discusiones/perfil-discusiones.component';
import { PerfilEditarComponent } from './componentes/perfil-editar/perfil-editar.component';
import { MenuJuegosComponent } from './componentes/menu-juegos/menu-juegos.component';
import { MenuForosComponent } from './componentes/menu-foros/menu-foros.component';
import { DescentPartidasComponent } from './componentes/descent-partidas/descent-partidas.component';
import { DescentPartidaDatosComponent } from './componentes/descent-partida-datos/descent-partida-datos.component';
import { DescentForosComponent } from './componentes/descent-foros/descent-foros.component';
import { PartidaCrearComponent } from './componentes/partida-crear/partida-crear.component';


@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    MenuComponent,
    LoginComponent,
    PerfilComponent,
    ErrorComponent,
    RegistroUsuarioComponent,
    RegistroAdministradorComponent,
    PerfilPartidasComponent,
    PerfilDiscusionesComponent,
    PerfilEditarComponent,
    MenuJuegosComponent,
    MenuForosComponent,
    DescentPartidasComponent,
    DescentPartidaDatosComponent,
    DescentForosComponent,
    PartidaCrearComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
