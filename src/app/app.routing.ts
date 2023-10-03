
// Módulos del router de Ángular
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Componentes a utilizar como menú de navegación
import { MenuComponent } from './componentes/menu/menu.component';
import { LoginComponent } from "./componentes/login/login.component";
import { ErrorComponent } from "./componentes/error/error.component";
import { PerfilComponent } from "./componentes/perfil/perfil.component";
import { RegistroUsuarioComponent } from "./componentes/registro-usuario/registro-usuario.component";
import { RegistroAdministradorComponent } from "./componentes/registro-administrador/registro-administrador.component";
import { DescentPartidasComponent } from "./componentes/descent-partidas/descent-partidas.component";
import { DescentForosComponent } from "./componentes/descent-foros/descent-foros.component";
import { PartidaCrearComponent } from "./componentes/partida-crear/partida-crear.component";
import { DescentPartidaDatosComponent } from "./componentes/descent-partida-datos/descent-partida-datos.component";

const appRoutes: Routes = [

    // LOGIN-REGISTER
    {path: 'login', component: LoginComponent},
    {path: 'usuario-registro/usuario', component: RegistroUsuarioComponent},
    {path: 'usuario-registro/administrador', component: RegistroAdministradorComponent},

    // MENÚ PRINCIPAL
    {path: '', component: MenuComponent},
    /*
    {path: 'menu/partidas', component: MenuListaJuegosComponent},
    {path: 'menu/foros', component: MenuListaForosComponent},
    */

    // PERFIL
    /*
    {path: 'usuario-perfil/usuario/ver/:id', component: PerfilComponent},
    {path: 'usuario-perfil/usuario/partidas/:id', component: PerfilComponent},
    {path: 'usuario-perfil/usuario/discusiones/:id', component: PerfilComponent},
    */
    {path: 'usuario-perfil/usuario/ver', component: PerfilComponent},
    {path: 'usuario-perfil/usuario/partidas', component: PerfilComponent},
    {path: 'usuario-perfil/usuario/discusiones', component: PerfilComponent},




    {path: 'usuario-perfil/administrador/ver/:id', component: PerfilComponent},
    {path: 'usuario-perfil/administrador/partidas/:id', component: PerfilComponent},
    {path: 'usuario-perfil/administrador/discusiones/:id', component: PerfilComponent},

    // DESCENT-PARTIDAS
    {path: 'descent/partidas', component: DescentPartidasComponent},
    {path: 'descent/partidas/datos', component: DescentPartidaDatosComponent},
    {path: 'descent/partidas/crear', component: PartidaCrearComponent},

    // DESCENT-FOROS
    {path: 'descent/foros', component: DescentForosComponent},

    // GLOOMHAVEN-PARTIDAS
    
    // GLOOMHAVEN-FOROS

    {path: '**', component: ErrorComponent},
];


// Exportación del módulo de rutas
export const routing: ModuleWithProviders<Object> = RouterModule.forRoot(appRoutes);