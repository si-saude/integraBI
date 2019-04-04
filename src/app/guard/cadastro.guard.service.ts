import { GenericGuard } from './../generic/generic-guard';
import { Injectable } from '@angular/core';

import { Helper } from './../generic/helper';
import { GenericGuardService } from './../generic/generic-guard.service';

import { PerfilGuardService } from './cadastro/perfil/perfil.guard.service';
import { UsuarioGuardService } from './cadastro/usuario/usuario.guard.service';

@Injectable()
export class CadastroGuardService implements GenericGuardService {

    private helper: Helper;

    constructor(
        private perfil: PerfilGuardService,
        private usuario: UsuarioGuardService) {

            this.helper = new Helper();
    }

    hasPermission(funcionalidade: string): GenericGuard {
        let guardService: GenericGuardService;
        const grupo = this.helper.ignoreLastStringArrayItem(funcionalidade, '_');
        switch (grupo) {
            case 'PERFIL': {
                guardService = this.perfil;
                break;
            }
            case 'USUARIO': {
                guardService = this.usuario;
                break;
            }
        }
        return guardService ? guardService.hasPermission(funcionalidade) : undefined;
    }
}
