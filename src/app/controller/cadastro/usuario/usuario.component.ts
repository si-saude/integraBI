import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GenericListComponent } from './../../../generic/generic-list-component';
import { GenericComponent } from './../../../generic/generic-component';

import { Usuario } from './../../../model/usuario.model';
import { UsuarioFilter } from './../../../filter/usuario.filter';
import { UsuarioService } from './../../../service/usuario.service';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario.listar.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioListarComponent extends GenericListComponent<Usuario, UsuarioFilter> implements OnInit {

  constructor(private servico: UsuarioService, private router: Router) {
    super(servico, router, 'Usuário',
      [
        ['Chave', 'chave']
      ]);
  }

  ngOnInit() {
    this.page(1);
  }
}

@Component({
  selector: 'app-usuario-adicionar',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioAdicionarComponent extends GenericComponent<Usuario> implements OnInit {

  constructor(private servico: UsuarioService, router: Router, route: ActivatedRoute) {
    super(servico, router, route, 'Usuário - Adicionar');
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioEditarComponent extends GenericComponent<Usuario> implements OnInit {

  constructor(private servico: UsuarioService, router: Router, route: ActivatedRoute) {
    super(servico, router, route, 'Usuário - Editar');
  }

  ngOnInit() {
    this.init(function(obj){
    });
  }
}

@Component({
  selector: 'app-usuario-detalhar',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioDetalharComponent extends GenericComponent<Usuario> implements OnInit {

  constructor(private servico: UsuarioService, router: Router, route: ActivatedRoute) {
    super(servico, router, route, 'Usuário - Detalhar');
    this.detailMode();
  }

  ngOnInit() {
    this.init(function(obj){
    });
  }
}
