import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GenericService } from '../generic/generic-service';
import { Router } from '@angular/router';

import { DialogService } from './../util/dialog/dialog.service';
import { SpinnerService } from './../util/spinner/spinner.service';

import { Perfil } from '../model/perfil.model';
import { PerfilFilter } from '../filter/perfil.filter';
import { Permissao } from '../model/permissao.model';

@Injectable()
export class PerfilService extends GenericService<Perfil, PerfilFilter> {
    constructor(http: Http, router: Router, private dialogService: DialogService,
        private spinnerService: SpinnerService) {
        super(http, 'perfil', router, dialogService, spinnerService);
    }

    initializeObject() {
        return new Perfil();
    }

    initializeFilter() {
        return new PerfilFilter();
    }

    toObject(obj: any): Perfil {
        const perfil: Perfil = new Perfil();
        perfil.$id = obj['id'];
        perfil.$titulo = obj['titulo'];
        perfil.$version = obj['version'];
        perfil.$permissoes = new Array<Permissao>();
        if (obj['permissoes']) {
            for (let x = 0; x < obj['permissoes'].length; x++) {
                const permissao: Permissao = this.toPermissao(obj['permissoes'][x]);
                permissao.$perfil.$id = perfil.$id;
                perfil.$permissoes.push(permissao);
            }
        }
        return perfil;
    }

    toPermissao(obj: Permissao): Permissao{
        const permissao: Permissao = new Permissao();
        permissao.$id = obj['id'];
        permissao.$perfil = new Perfil();
        permissao.$funcionalidade = obj['funcionalidade'];
        permissao.$valor = obj['valor'];
        permissao.$version = obj['version'];
        return permissao;
    }
}
