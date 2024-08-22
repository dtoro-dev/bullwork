import { Constructor } from "./constructor.interface";

export interface InjectedParameter {
  index: number;
  target: Constructor<any>;
}
