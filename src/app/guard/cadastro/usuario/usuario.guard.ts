import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

import { GenericGuard } from './../../../generic/generic-guard';

import { UsuarioService } from './../../../service/usuario.service';
import { DeactivateGuard } from './../../../guard/deactivate.guard';
import * as usuarioController from './../../../controller/cadastro/usuario/usuario.component';

@Injectable()
export class UsuarioListarGuard extends GenericGuard {
  constructor(private r: Router, private servico: UsuarioService) {
      super(r, servico, 'USUARIO_LISTAR');
  }
}

@Injectable()
export class UsuarioAdicionarGuard extends GenericGuard {
  constructor(private r: Router, private servico: UsuarioService) {
      super(r, servico, 'USUARIO_ADICIONAR');
  }
}

@Injectable()
export class UsuarioEditarGuard extends GenericGuard {
  constructor(private r: Router, private servico: UsuarioService) {
      super(r, servico, 'USUARIO_EDITAR');
  }
}

@Injectable()
export class UsuarioDetalharGuard extends GenericGuard {
  constructor(private r: Router, private servico: UsuarioService) {
      super(r, servico, 'USUARIO_DETALHAR');
  }
}

@Injectable()
export class UsuarioRemoverGuard extends GenericGuard {
  constructor(private r: Router, private servico: UsuarioService) {
      super(r, servico, 'USUARIO_REMOVER');
  }
}

export class Routing {
    public static route(homeComponent): Route {
        return { path: 'usuario', component: homeComponent,
        children: [{ path: '',
          component: usuarioController.UsuarioListarComponent, canActivate: [UsuarioListarGuard]},
          { path: 'adicionar',
          component: usuarioController.UsuarioAdicionarComponent,
              canActivate: [UsuarioAdicionarGuard],
              canDeactivate: [DeactivateGuard]},
          { path: 'editar/:id',
          component: usuarioController.UsuarioEditarComponent,
              canActivate: [UsuarioEditarGuard],
              canDeactivate: [DeactivateGuard]},
          { path: 'detalhar/:id',
          component: usuarioController.UsuarioDetalharComponent, canActivate: [UsuarioDetalharGuard]}] };
    }
}
