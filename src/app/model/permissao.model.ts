import { Perfil } from './perfil.model';

export class Permissao {
    private id: number;
    private funcionalidade: string;
    private valor: boolean;
    private perfil: Perfil;
    private version: number;

    public get $id(): number {
        return this.id;
    }

    public get $funcionalidade(): string {
        return this.funcionalidade;
    }

    public get $valor(): boolean {
        return this.valor;
    }

    public get $perfil(): Perfil {
        return this.perfil;
    }

    public get $version(): number {
        return this.version;
    }

    public set $id(value: number) {
        this.id = value;
    }

    public set $funcionalidade(funcionalidade: string) {
        this.funcionalidade = funcionalidade;
    }

    public set $valor(valor: boolean) {
        this.valor = valor;
    }

    public set $perfil(perfil: Perfil) {
        this.perfil = perfil;
    }

    public set $version(value: number) {
        this.version = value;
    }
}
