import { GenericFilter } from './../generic/generic-filter';

export class PerfilFilter extends GenericFilter {
    private titulo: string;

    public get $titulo(): string {
        return this.titulo;
    }

    public set $titulo(titulo: string) {
        this.titulo = titulo;
    }
}
