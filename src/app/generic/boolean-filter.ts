export class BooleanFilter {
	private value = 0;

	public get $value(): number {
		return this.value;
	}

	public set $value(value: number) {
		this.value = value;
	}

}
