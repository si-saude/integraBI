import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IComponent } from './../generic/generic-component';
import { ConfirmService } from './../util/confirm/confirm.service';

@Injectable()
export class DeactivateGuard implements CanDeactivate<IComponent> {

    constructor(private confirmService: ConfirmService) {

    }

    canDeactivate(
        component: IComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        if ( component.deactivate() ) {
            return true;
        } else {
            return new Observable<boolean>(observer => {
                this.confirmService.show('Os dados não foram salvos. Deseja realmente sair desta página?', 
                    observer,
                    function(o) {
                        o.next(true);
                    },
                    observer,
                    function(o) {
                        o.next(false);
                    }
                );
            });
        }
    }
}
