import { GenericGuard } from './../../../generic/generic-guard';
import { Injectable } from '@angular/core';

import { GenericGuardService } from './../../../generic/generic-guard.service';
import * as guard from './usuario.guard';

@Injectable()
export class UsuarioGuardService implements GenericGuardService {

    constructor(private listar: guard.UsuarioListarGuard,
                private adicionar: guard.UsuarioAdicionarGuard,
                private editar: guard.UsuarioEditarGuard,
                private detalhar: guard.UsuarioDetalharGuard,
                private remover: guard.UsuarioRemoverGuard) {

    }

    hasPermission(funcionalidade: String): GenericGuard {
        let guard: GenericGuard;
        switch (funcionalidade) {
            case 'USUARIO_LISTAR': {
                guard = this.listar;
                break;
            }
            case 'USUARIO_ADICIONAR': {
                guard = this.adicionar;
                break;
            }
            case 'USUARIO_EDITAR': {
                guard = this.editar;
                break;
            }
            case 'USUARIO_DETALHAR': {
                guard = this.detalhar;
                break;
            }
            case 'USUARIO_REMOVER': {
                guard = this.remover;
                break;
            }
        }
        return guard;
    }
}
