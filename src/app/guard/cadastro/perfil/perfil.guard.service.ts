import { GenericGuard } from './../../../generic/generic-guard';
import { Injectable } from '@angular/core';

import { GenericGuardService } from './../../../generic/generic-guard.service';
import * as guard from './perfil.guard';

@Injectable()
export class PerfilGuardService implements GenericGuardService {

    constructor(private listar: guard.PerfilListarGuard,
                private adicionar: guard.PerfilAdicionarGuard,
                private editar: guard.PerfilEditarGuard,
                private detalhar: guard.PerfilDetalharGuard,
                private remover: guard.PerfilRemoverGuard) {

    }

    hasPermission(funcionalidade: String): GenericGuard {
        let guard: GenericGuard;
        switch (funcionalidade) {
            case 'PERFIL_LISTAR': {
                guard = this.listar;
                break;
            }
            case 'PERFIL_ADICIONAR': {
                guard = this.adicionar;
                break;
            }
            case 'PERFIL_EDITAR': {
                guard = this.editar;
                break;
            }
            case 'PERFIL_DETALHAR': {
                guard = this.detalhar;
                break;
            }
            case 'PERFIL_REMOVER': {
                guard = this.remover;
                break;
            }
        }
        return guard;
    }
}
