import { NgModule } from '@angular/core';

import { AuthGuard } from './auth.guard';
import { DeactivateGuard } from './deactivate.guard';
import { GuardService } from './guard.service';
import { CadastroGuardService } from './cadastro.guard.service';

import { PerfilGuardModule } from './cadastro/perfil/perfil.guard.module';
import { UsuarioGuardModule } from './cadastro/usuario/usuario.guard.module';

@NgModule({
    providers: [
        AuthGuard,
        GuardService,
        CadastroGuardService,
        DeactivateGuard
    ],
    imports: [
        PerfilGuardModule,
        UsuarioGuardModule
    ]
})
export class GuardModule { }
