export interface DocPropertyOptions {
  description: string;
  example: any;
  required?: boolean;
  type: Function;
}

export interface DocProperties {
  [key: string]: DocPropertyOptions;
}