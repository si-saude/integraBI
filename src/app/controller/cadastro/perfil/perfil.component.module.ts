import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared.module';
import * as perfil from './perfil.component';

@NgModule({
    declarations: [
        perfil.PerfilListarComponent,
        perfil.PerfilAdicionarComponent,
        perfil.PerfilEditarComponent,
        perfil.PerfilDetalharComponent
    ],
imports: [
    SharedModule
]})
export class PerfilComponentModule { }
