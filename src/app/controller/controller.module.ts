import { NgModule } from '@angular/core';

import { PerfilComponentModule } from './cadastro/perfil/perfil.component.module';
import { UsuarioComponentModule } from './cadastro/usuario/usuario.component.module';


@NgModule({
    imports: [
        PerfilComponentModule,
        UsuarioComponentModule
    ]
})

export class ControllerModule { }
