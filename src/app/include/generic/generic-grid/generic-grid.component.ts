import { Component, EventEmitter, OnInit, Output, Input, SimpleChanges } from '@angular/core';

import { Helper } from './../../../generic/helper';
import { GenericFilter } from './../../../generic/generic-filter';
import { GenericComponent } from './../../../generic/generic-component';

@Component({
  selector: 'app-generic-grid',
  templateUrl: './generic-grid.component.html',
  styleUrls: ['./generic-grid.component.css']
})
export class GenericGridComponent<T, F extends GenericFilter, G> implements OnInit {

  @Input() id: string;
  @Input() def: Array<Array<string>>;
  @Input() array: Array<any>;
  @Input() component: GenericComponent<T>;
  @Input() delete = false;
  @Input() height = '300px';
  @Input() textInput: any;
  @Input() idProperty = 'id';
  @Input() selection = false;
  @Input() rowClass: string;
  @Input() rowClick: string;

  @Output() changeSelected = new EventEmitter();

  private helper: Helper;
  private models: Array<Array<any>>;
  private filter;
  private filterBuilded = false;
  private filterArray: Array<any>;
  private selectedObject = {};
  private selected = false;

  constructor() {
    this.helper = new Helper();
    this.filter = {};
  }

  ngOnInit() {
  }

  ngOnChanges( changes: SimpleChanges ) {
    this.load();
  }

  add(obj: G) {
    let showErrorMessage = false;
    const a1 = this.getObjectAndProperty(obj, this.idProperty);
    if (a1[0][a1[1]] > 0) {
      if (this.array.find(a => {
          const a2 = this.getObjectAndProperty(a, this.idProperty);
          return a1[0][a1[1]] === a2[0][a2[1]];
        })) {
        showErrorMessage = true;
      }
    } else if (this.textInput) {
      const aux = this.array.find(a => {
        const ar1 = this.getObjectAndProperty(a, this.textInput.property);
        const ar2 = this.getObjectAndProperty(this.textInput.object, this.textInput.property);
        if ( ar1[0][ar1[1]] === ar2[0][ar2[1]] ) {
          return a;
        }
        return undefined;
      });

      if (aux) {
        showErrorMessage = true;
      }
    }

    if (showErrorMessage) {
      this.component.getService().showMessage('O registro já foi adicionado.');
      return;
    }

    this.array.push(obj);
    this.load();
    this.dirtyForm();
  }

  load() {
    this.models = new Array<Array<any>>();
    if (this.array && this.def) {
      for (let a of this.array) {
        let ar = new Array<any>();
        for (let d of this.def) {
          ar.push(this.getObjectAndProperty(a, d[1]));
          if (!this.filterBuilded) {
            if (!this.filter) {
              this.filter = {};
            }
            this.filter[d[1]] = '';
          }
        }
        this.filterBuilded = true;
        this.models.push(ar);
      }
    }
  }

  getObjectAndProperty(obj: any, properties: string) {
    return this.helper.getObjectAndProperty(obj, properties);
  }

  remove(a) {
    const obj = this.array.find(ar => {
      for (let d of this.def) {
        const arAux = this.getObjectAndProperty(ar, d[1]);
        if (arAux[0] === a[0][0]) {
          return true;
        }
      }
      return false;
    });
    this.array.splice(this.array.indexOf(obj), 1);
    this.load();
    this.dirtyForm();
    this.cleanGridSelected();
    this.changeSelected.emit( '' );
  }

  selectAll(property, event) {
    for (let a of this.filterArray) {
      const aux = this.array.find(y => {
        const arAux = this.getObjectAndProperty(y, this.def[0][1]);
        return arAux[0] === a[0][0];
      });
      const ar = this.getObjectAndProperty(this.array[this.array.indexOf(aux)], property);
      ar[0][ar[1]] = event.target.checked;
    }
    this.load();
  }

  dirtyForm() {
    this.helper.dirtyForm(this.component);
  }

  changeFilter() {
    const filter = {};
    for (let key of Object.keys(this.filter)) {
      filter[key] = this.filter[key];
    }
    this.filter = filter;
    this.selectedObject = {};
    this.selected = false;
    this.changeSelected.emit( '' );
  }

  changeBooleanFilter(property) {
    const filter = {};
    for (let key of Object.keys(this.filter)) {
      if (key === property) {
        if (this.filter[key] === 1) {
          filter[key] = false;
        } else if (this.filter[key] === 2) {
          filter[key] = true;
        }
      } else {
        filter[key] = this.filter[key];
      }
    }
    this.filter = filter;
    this.selectedObject = {};
    this.selected = false;
    this.changeSelected.emit( '' );
  }

  select(x, type) {
    if (this.selection && type !== 'checkbox' && type !== 'integer' && type !== 'number' && type !== 'text') {
      const d = this.def[0];
      for (let a of this.array) {
        let ar = this.getObjectAndProperty(a, d[1]);
        if (ar[0] === x[0][0]) {
          const prop = d[1].split('.')[0];
          this.selectedObject = this.array.find(y => y[prop] === ar[0] || y[prop] === ar[0][ar[1]]);
        }
      }
      this.selected = true;
      this.changeSelected.emit( '' );
    }
  }

  selectCell(x, def) {
    if (def) {
      const d = this.def[0];
      for (let a of this.array) {
        let ar = this.getObjectAndProperty(a, d[1]);
        if (ar[0] === x[0][0]) {
          const prop = d[1].split('.')[0];
          const o = this.array.find(y => y[prop] === ar[0] || y[prop] === ar[0][ar[1]]);
          const aux = this.getObjectAndProperty(o, def[0]);
          if (aux[0][aux[1]] === def[1]) {
            aux[0][aux[1]] = def[2];
          } else {
            aux[0][aux[1]] = def[1];
          }
        }
      }
    }
  }

  checkSelectedCell(x, def) {
    if (def) {
      const d = this.def[0];
      for (let a of this.array) {
        let ar = this.getObjectAndProperty(a, d[1]);
        if (ar[0] === x[0][0]) {
          const prop = d[1].split('.')[0];
          const o = this.array.find(y => y[prop] === ar[0] || y[prop] === ar[0][ar[1]]);
          const aux = this.getObjectAndProperty(o, def[0]);
          if (aux[0][aux[1]] === def[1]) {
            return true;
          }
        }
      }
    }
    return false;
  }

  fBold(a, f: string) {
    const property = f.split(':')[1];
    const ar = this.getObjectAndProperty(a[0][0],property)
    return ar[0][ar[1]];
  }

  checkSelected(x) {
    if (this.selection) {
      for (let d of this.def) {
        let ar = this.getObjectAndProperty(this.selectedObject, d[1]);
        if (ar[0] === x[0][0]) {
          return true;
        }
      }
    }
    return false;
  }

  cleanGridSelected() {
    this.selectedObject = {};
    this.selected = false;
  }
}
