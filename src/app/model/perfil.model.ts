import { Permissao } from './permissao.model';

export class Perfil {
    private id: number;
    private titulo: string;
    private permissoes: Array<Permissao>;
    private version: number;

    public get $id(): number {
        return this.id;
    }

    public get $titulo(): string {
        return this.titulo;
    }

    public get $version(): number {
        return this.version;
    }

    public get $permissoes(): Array<Permissao> {
        return this.permissoes;
    }

    public set $id(value: number) {
        this.id = value;
    }

    public set $titulo(titulo: string){
        this.titulo = titulo;
    }

    public set $permissoes(permissoes: Array<Permissao>){
        this.permissoes = permissoes;
    }

    public set $version(value: number) {
        this.version = value;
    }
}
