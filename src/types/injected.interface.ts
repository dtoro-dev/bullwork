import { Constructor } from "./constructor.type";

export interface InjectedParameter {
  index: number;
  target: Constructor<any>;
}
