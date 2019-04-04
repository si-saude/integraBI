import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UsuarioService } from './../service/usuario.service';
import { Usuario } from './../model/usuario.model';

export abstract class GenericGuard implements CanActivate {

    constructor(private router: Router, private usuarioService: UsuarioService, private funcionalidade: String) {

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            return this.checkPermission();
    }

    checkPermission(): boolean {
        if (localStorage.getItem('token')) {
            const usuario: Usuario = this.usuarioService.toObject(JSON.parse(localStorage.getItem('user')));
            return usuario.$perfis.findIndex(p =>
                p.$permissoes.findIndex(pp =>
                    pp.$funcionalidade === this.funcionalidade &&
                    pp.$valor === true) >= 0) >= 0;
        }
        return false;
    }
}
