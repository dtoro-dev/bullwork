export interface EnvOptions<T> {
  defaultValue?: T;
  required?: boolean;
  parse?: (value: string) => T;
}