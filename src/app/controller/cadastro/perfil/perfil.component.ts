import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GenericListComponent } from './../../../generic/generic-list-component';
import { GenericComponent } from './../../../generic/generic-component';

import { Perfil } from './../../../model/perfil.model';
import { PerfilFilter } from './../../../filter/perfil.filter';
import { PerfilService } from './../../../service/perfil.service';

@Component({
  selector: 'app-perfil-listar',
  templateUrl: './perfil.listar.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilListarComponent extends GenericListComponent<Perfil, PerfilFilter> implements OnInit {

  constructor(private servico: PerfilService, private router: Router) {
    super(servico, router, 'Perfil',
      [
        ['Título', 'titulo']
      ]);
  }

  ngOnInit() {
    this.page(1);
  }
}

@Component({
  selector: 'app-perfil-adicionar',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilAdicionarComponent extends GenericComponent<Perfil> implements OnInit {

  constructor(private servico: PerfilService, router: Router, route: ActivatedRoute) {
    super(servico, router, route, 'Perfil - Adicionar');
  }

  ngOnInit() {
    const c = this;
    const s = this.service;
    this.service.get(0, function(res){
      c.t = s.toObject(res.json());
    }, undefined);
  }
}

@Component({
  selector: 'app-perfil-editar',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilEditarComponent extends GenericComponent<Perfil> implements OnInit {

  constructor(private servico: PerfilService, router: Router, route: ActivatedRoute) {
    super(servico, router, route, 'Perfil - Editar');
  }

  ngOnInit() {
    this.init(function(obj){
    });
  }
}

@Component({
  selector: 'app-perfil-detalhar',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilDetalharComponent extends GenericComponent<Perfil> implements OnInit {

  constructor(private servico: PerfilService, router: Router, route: ActivatedRoute) {
    super(servico, router, route, 'Perfil - Detalhar');
    this.detailMode();
  }

  ngOnInit() {
    this.init(function(obj){
    });
  }
}
