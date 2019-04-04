import { Component, OnInit, Input } from '@angular/core';

import { Helper } from './../../../generic/helper';
import { GenericFilter } from './../../../generic/generic-filter';
import { GenericListComponent } from './../../../generic/generic-list-component';
import { GuardService } from './../../../guard/guard.service';
import { ConfirmService } from './../../../util/confirm/confirm.service';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent<T, F extends GenericFilter> implements OnInit {

  @Input() component: GenericListComponent<T, F>;
  @Input() adicionar: string;
  @Input() detalhar: string;
  @Input() editar: string;
  @Input() remover: string;
  @Input() functions: Array<Array<string>>;

  private helper: Helper;
  private canAdicionar = false;
  private canDetalhar = false;
  private canEditar = false;
  private canRemover = false;

  constructor(private guardService: GuardService, private confirmService: ConfirmService) {
    this.helper = new Helper();
  }

  ngOnInit() {
    this.canAdicionar = this.adicionar ? this.guardService.findCheck(this.adicionar) : false;
    this.canEditar = this.editar ? this.guardService.findCheck(this.editar) : false;
    this.canDetalhar = this.detalhar ? this.guardService.findCheck(this.detalhar) : false;
    this.canRemover = this.remover ? this.guardService.findCheck(this.remover) : false;
  }

  remove(id) {
    this.confirmService.show('Deseja remover o registro?', this.component, function(c){
      c.getService().delete(id, function(res){
        c.callPage();
      }, undefined);
    }, undefined, undefined);
  }

  getProperty(obj: any, properties: string, type: string) {
    let value = this.helper.getProperty(obj, properties);
    if (type === 'checkbox') {
      if (value.toString() === 'true') {
        value = 'SIM';
      } else if (value.toString() === 'false') {
        value = 'NÃO';
      }
    }
    return value;
  }
}
