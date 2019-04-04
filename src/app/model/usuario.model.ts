import { Perfil } from './perfil.model';

export class Usuario {
    private id: number;
    private chave: string;
    private email: string;
    private password: string;
    private senhaConfirm: string;
    private perfis: Array<Perfil>;
    private gestorCss: boolean;
    private token: string;
    private sessionTime: Date;
    private version: number;

    public get $id(): number {
        return this.id;
    }

    public get $chave(): string {
        return this.chave;
    }

    public get $email(): string {
        return this.email;
    }

    public get $password(): string {
        return this.password;
    }

    public get $senhaConfirm(): string {
        return this.senhaConfirm;
    }

    public get $perfis(): Array<Perfil> {
        return this.perfis;
    }

    public get $gestorCss(): boolean {
        return this.gestorCss;
    }

    public get $sessionTime(): Date {
        return this.sessionTime;
    }

    public get $token(): string {
        return this.token;
    }

    public get $version(): number {
        return this.version;
    }

    public set $id(value: number) {
        this.id = value;
    }

    public set $chave(value: string) {
        this.chave = value;
    }

    public set $email(value: string) {
        this.email = value;
    }

    public set $password(value: string) {
        this.password = value;
    }

    public set $senhaConfirm(value: string) {
        this.senhaConfirm = value;
    }

    public set $perfis(perfis: Array<Perfil>) {
        this.perfis = perfis;
    }

    public set $token(value: string) {
        this.token = value;
    }

    public set $gestorCss(gestorCss: boolean) {
        this.gestorCss = gestorCss;
    }

    public set $sessionTime(sessionTime: Date) {
        this.sessionTime = sessionTime;
    }

    public set $version(value: number) {
        this.version = value;
    }

}
