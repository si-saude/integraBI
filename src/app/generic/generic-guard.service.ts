import { GenericGuard } from './../generic/generic-guard';

export interface GenericGuardService {

    hasPermission(funcionalidade: String): GenericGuard;
}
