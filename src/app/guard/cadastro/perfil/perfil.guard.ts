import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

import { GenericGuard } from './../../../generic/generic-guard';

import { UsuarioService } from './../../../service/usuario.service';
import { HomeComponent } from './../../../home/home.component';
import { DeactivateGuard } from './../../../guard/deactivate.guard';
import * as perfilController from './../../../controller/cadastro/perfil/perfil.component';

@Injectable()
export class PerfilListarGuard extends GenericGuard {
  constructor(private r: Router, private servico: UsuarioService) {
      super(r, servico, 'PERFIL_LISTAR');
  }
}

@Injectable()
export class PerfilAdicionarGuard extends GenericGuard {
  constructor(private r: Router, private servico: UsuarioService) {
      super(r, servico, 'PERFIL_ADICIONAR');
  }
}

@Injectable()
export class PerfilEditarGuard extends GenericGuard {
  constructor(private r: Router, private servico: UsuarioService) {
      super(r, servico, 'PERFIL_EDITAR');
  }
}

@Injectable()
export class PerfilDetalharGuard extends GenericGuard {
  constructor(private r: Router, private servico: UsuarioService) {
      super(r, servico, 'PERFIL_DETALHAR');
  }
}

@Injectable()
export class PerfilRemoverGuard extends GenericGuard {
  constructor(private r: Router, private servico: UsuarioService) {
      super(r, servico, 'PERFIL_REMOVER');
  }
}

export class Routing {
    public static route(homeComponent): Route {
        return { path: 'perfil', component: homeComponent,
        children: [{ path: '',
          component: perfilController.PerfilListarComponent, canActivate: [PerfilListarGuard]},
          { path: 'adicionar',
          component: perfilController.PerfilAdicionarComponent,
              canActivate: [PerfilAdicionarGuard],
              canDeactivate: [DeactivateGuard]},
          { path: 'editar/:id',
          component: perfilController.PerfilEditarComponent,
              canActivate: [PerfilEditarGuard],
              canDeactivate: [DeactivateGuard]},
          { path: 'detalhar/:id',
          component: perfilController.PerfilDetalharComponent, canActivate: [PerfilDetalharGuard]}] };
    }
}
