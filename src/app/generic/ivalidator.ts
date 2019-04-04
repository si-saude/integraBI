export interface IValidator<T> {
    validate(t: T): boolean;
}
