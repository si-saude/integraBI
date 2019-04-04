export class DateFilter {
	private inicio: number;
	private inicioFront: string;
	private fim: number;
	private fimFront: string;
    private typeFilter: string;

	public get $inicio(): number {
		return this.inicio;
	}

	public get $inicioFront(): string {
		return this.inicioFront;
	}

	public get $fim(): number {
		return this.fim;
	}

	public get $fimFront(): string {
		return this.fimFront;
	}

	public get $typeFilter(): string {
		return this.typeFilter;
	}

	public set $inicio(value: number) {
		this.inicio = value;
	}

	public set $inicioFront(value: string) {
		this.inicioFront = value;
	}

	public set $fim(value: number) {
		this.fim = value;
	}

	public set $fimFront(value: string) {
		this.fimFront = value;
	}

	public set $typeFilter(value: string) {
		this.typeFilter = value;
	}

}
