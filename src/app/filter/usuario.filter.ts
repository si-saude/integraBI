import { GenericFilter } from './../generic/generic-filter';

export class UsuarioFilter extends GenericFilter {
    private chave: string;

    public get $chave(): string {
        return this.chave;
    }

    public set $chave(chave: string) {
        this.chave = chave;
    }
}
