interface DocPropertyOptions {
  description: string;
  example: any;
  required?: boolean;
  type: Function;
}

interface DocProperties {
  [key: string]: DocPropertyOptions;
}