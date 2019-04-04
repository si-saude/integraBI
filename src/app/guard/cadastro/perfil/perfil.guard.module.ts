import { NgModule } from '@angular/core';

import { PerfilGuardService } from './perfil.guard.service';
import * as perfil from './perfil.guard';

@NgModule({
    declarations: [

    ],
    providers: [
        perfil.PerfilListarGuard,
        perfil.PerfilAdicionarGuard,
        perfil.PerfilEditarGuard,
        perfil.PerfilDetalharGuard,
        perfil.PerfilRemoverGuard,
        PerfilGuardService
    ]
})
export class PerfilGuardModule { }
