import { NgModule } from '@angular/core';

import { PerfilService } from './perfil.service';
import { UsuarioService } from './usuario.service';
import { UtilService } from './util.service';

@NgModule({
    providers: [
        PerfilService,
        UsuarioService,
        UtilService
    ]
})
export class ServiceModule { }
