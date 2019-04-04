import { Route } from '@angular/router';
import { Injectable } from '@angular/core';

import { GenericGuardService } from './../generic/generic-guard.service';
import { CadastroGuardService } from './cadastro.guard.service';
import { GenericGuard } from 'app/generic/generic-guard';

@Injectable()
export class GuardService {

    private permissoes: Map<string, boolean>;
    private guardService: GenericGuardService;

    constructor(private cadastro: CadastroGuardService) {
        this.clear();
    }

    checkCadastro(funcionalidade: string): boolean {
        this.guardService = this.cadastro;
        this.check(funcionalidade);
        return this.hasPermission(funcionalidade);
    }

    findCheck(funcionalidade: string): boolean {
        this.checkAll(funcionalidade);
        const guardArray: Array<GenericGuardService> = new Array<GenericGuardService>();
        guardArray.push(this.cadastro);
        for (let guard of guardArray){
            this.guardService = guard;
            if (this.hasPermission(funcionalidade) === true) {
                return true;
            }
        }
        return false;
    }

    clear() {
        this.permissoes = new Map<string, boolean>();
    }

    private check(funcionalidade: string) {
        if (!this.permissoes.has(funcionalidade)) {
            this.permissoes.set(funcionalidade,
                this.guardService.hasPermission(funcionalidade).checkPermission());
        }
    }

    private checkAll(funcionalidade: string) {
        if (!this.permissoes.has(funcionalidade)) {
            const guardArray: Array<GenericGuardService> = new Array<GenericGuardService>();
            guardArray.push(this.cadastro);
            for (let guard of guardArray) {
                const genericGuard: GenericGuard = guard.hasPermission(funcionalidade);
                if (genericGuard && genericGuard.checkPermission()) {
                    this.permissoes.set(funcionalidade, true);
                    return;
                }
            }
            this.permissoes.set(funcionalidade, false);
        }
    }

    private hasPermission(funcionalidade: string): boolean {
        return this.permissoes.get(funcionalidade);
    }
}
