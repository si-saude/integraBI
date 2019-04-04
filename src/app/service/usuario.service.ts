import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GenericService } from '../generic/generic-service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { DialogService } from './../util/dialog/dialog.service';
import { SpinnerService } from './../util/spinner/spinner.service';

import { Perfil } from '../model/perfil.model';
import { Usuario } from '../model/usuario.model';
import { UsuarioFilter } from '../filter/usuario.filter';
import { PerfilService } from './perfil.service';

@Injectable()
export class UsuarioService extends GenericService<Usuario, UsuarioFilter> {
    constructor(http: Http, router: Router, private perfilService: PerfilService,
        private dialogService: DialogService, private spinnerService: SpinnerService) {
        super(http, 'usuario', router, dialogService, spinnerService);
    }

    initializeObject() {
        const usuario: Usuario = new Usuario();
        usuario.$perfis = new Array<Perfil>();
        return usuario;
    }

    initializeFilter() {
        return new UsuarioFilter();
    }

    toObject(obj: any): Usuario {
        const usuario: Usuario = new Usuario();
        usuario.$id = obj['id'];
        usuario.$email = obj['email'];
        usuario.$gestorCss = obj['gestorCss'];
        usuario.$password = obj['password'];
        usuario.$chave = obj['chave'];
        usuario.$senhaConfirm = obj['senhaConfirm'];
        usuario.$sessionTime = obj['sessionTime'];
        usuario.$token = obj['token'];
        usuario.$version = obj['version'];
        usuario.$perfis = new Array<Perfil>();
        if (obj['perfis']) {
            for (let x = 0; x < obj['perfis'].length; x++) {
                const perfil: Perfil = this.perfilService.toObject(obj['perfis'][x]);
                usuario.$perfis.push(perfil);
            }
        }
        return usuario;
    }

    autenticar(t: Usuario) {
        return this.http.post(this.rootUrl + this.path + '/autenticar', t, { headers: this.getHeaders() }  )
            .toPromise();
    }

    gerarToken(t: Usuario) {
        return this.http.post(this.rootUrl + this.path + '/gerar-token', t, { headers: this.getHeaders() }  )
            .toPromise();
    }

    alterarSenha(t: Usuario) {
        return this.http.post(this.rootUrl + this.path + '/alterar-senha', t, { headers: this.getHeaders() }  )
            .toPromise();
    }

    checkEmail(email: string) {
        return this.http.get(this.rootUrl + this.path + '/check-email?email=' + email, { headers: this.getHeaders() }  )
            .toPromise();
    }

    check(chave: string) {
        this.showSpinner();
        return this.http.get(this.rootUrl + this.path + '/check?chave=' + chave, { headers: this.getHeaders() }  )
            .toPromise();
    }

    getPerfilService(): PerfilService {
        return this.perfilService;
    }
}
