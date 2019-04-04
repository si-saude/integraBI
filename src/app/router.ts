import { Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';
import { DeactivateGuard } from './guard/deactivate.guard';
import { HomeComponent } from './home/home.component';

import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './usuario/login/login.component';
import { NovaSenhaComponent } from './usuario/nova-senha/nova-senha.component';

import * as perfilGuard from './guard/cadastro/perfil/perfil.guard';
import * as usuarioGuard from './guard/cadastro/usuario/usuario.guard';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'login', component: UsuarioComponent,
        children: [{ path: '', component: LoginComponent }]
    },
    {
        path: 'nova-senha', component: UsuarioComponent,
        children: [{ path: '', component: NovaSenhaComponent }]
    },
    perfilGuard.Routing.route(HomeComponent),
    usuarioGuard.Routing.route(HomeComponent),
    
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
