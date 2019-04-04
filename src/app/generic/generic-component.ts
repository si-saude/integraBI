import { ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GenericFilter } from './generic-filter';
import { GenericService } from './generic-service';
import { Helper } from './helper';

export interface IComponent {
  deactivate(): boolean;
}

export class GenericComponent<T> implements IComponent {

  readonly emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  readonly dateMask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };

  protected t: T;
  protected helper: Helper;
  protected _detailMode = false;
  protected _save = false;
  @ViewChild( 'form' ) form;

  constructor(protected service: GenericService<T, GenericFilter>, protected rtr: Router,
    protected rt: ActivatedRoute, protected title: string) {
    this.t = service.initializeObject();
    this.helper = new Helper();
    this.setTitle(title);
  }

  setTitle(title: string) {
    this.title = title;
    this.rtr.routerState.snapshot.url = this.title;
  }

  init(func) {
    const c = this;
    const s = this.service;
    this.service.get(this.rt.params['_value']['id'], function(res){
      c.t = s.toObject(res.json());
      if (func) {
        func(c.t);
      }
    }, undefined);
  }

  showErrorMessage(errors) {
    if (errors) {
      if (errors.unique) {
        return errors.unique;
      }else if (errors.genericError) {
        return errors.genericError;
      } else if (errors.minlength) {
        return 'Tamanho mínimo: ' + errors.minlength.requiredLength;
      } else if (errors.pattern) {
        if (this.emailPattern === errors.pattern.requiredPattern) {
          return 'Email inválido';
        }
      }else if (errors.validateEqual === false) {
        return 'Campo divergente';
      } else if (errors.required) {
        return 'Campo obrigatório';
      }
    }
    return '';
  }

  salvar() {
    const component = this;
    this.save(function(res) {
      component.goBack();
    }, function(error) {
      component.finishSave();
    });
  }

  save(fThen, fCatch) {
    this.initSave();
    this.service.save(this.t, fThen, fCatch);
  }

  initSave() {
    this._save = true;
  }

  finishSave() {
    this._save = false;
  }

  detailMode() {
    this._detailMode = true;
  }

  goBack() {
    this.rtr.navigate([this.service.getPath()]);
  }

  deactivate(): boolean {
    return !this.form.dirty || this._save;
  }

  catch(error) {
    this.service.catch(error);
  }

  getService() {
    return this.service;
  }

  toDate(date: any) {
    return this.helper.toDate(date);
  }
}
