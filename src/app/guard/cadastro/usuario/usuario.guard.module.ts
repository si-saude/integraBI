import { NgModule } from '@angular/core';

import { UsuarioGuardService } from './usuario.guard.service';
import * as usuario from './usuario.guard';

@NgModule({
    providers: [
        usuario.UsuarioListarGuard,
        usuario.UsuarioAdicionarGuard,
        usuario.UsuarioEditarGuard,
        usuario.UsuarioDetalharGuard,
        usuario.UsuarioRemoverGuard,
        UsuarioGuardService
    ]
})
export class UsuarioGuardModule { }
