
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
import { MenuListaJuegosComponent } from "./componentes/menu-lista-juegos/menu-lista-juegos.component";
import { MenuListaForosComponent } from "./componentes/menu-lista-foros/menu-lista-foros.component";

const appRoutes: Routes = [

    // LOGIN-REGISTER
    {path: 'login', component: LoginComponent},
    {path: 'usuario-registro/usuario', component: RegistroUsuarioComponent},
    {path: 'usuario-registro/administrador', component: RegistroAdministradorComponent},

    // MENÚ PRINCIPAL
    {path: 'menu', component: MenuComponent},
    {path: 'menu/partidas', component: MenuListaJuegosComponent},
    {path: 'menu/foros', component: MenuListaForosComponent},

    // PERFIL
    {path: 'usuario-perfil/usuario/ver/:id', component: PerfilComponent},
    {path: 'usuario-perfil/usuario/partidas/:id', component: PerfilComponent},
    {path: 'usuario-perfil/usuario/discusiones/:id', component: PerfilComponent},

    {path: 'usuario-perfil/administrador/ver/:id', component: PerfilComponent},
    {path: 'usuario-perfil/administrador/partidas/:id', component: PerfilComponent},
    {path: 'usuario-perfil/administrador/discusiones/:id', component: PerfilComponent},

    // DESCENT-PARTIDAS

    // DESCENT-FOROS

    // GLOOMHAVEN-PARTIDAS
    
    // GLOOMHAVEN-FOROS

    {path: '**', component: ErrorComponent},
];


// Exportación del módulo de rutas
export const routing: ModuleWithProviders<Object> = RouterModule.forRoot(appRoutes);