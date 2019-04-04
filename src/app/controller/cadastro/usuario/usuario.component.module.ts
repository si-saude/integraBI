import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared.module';
import * as usuario from './usuario.component';

@NgModule({
    declarations: [
        usuario.UsuarioListarComponent,
        usuario.UsuarioAdicionarComponent,
        usuario.UsuarioEditarComponent,
        usuario.UsuarioDetalharComponent
    ],
imports: [
    SharedModule
]})
export class UsuarioComponentModule { }
