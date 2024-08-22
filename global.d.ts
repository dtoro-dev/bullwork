import Config from "@core/environment.config";

declare global {
  namespace NodeJS {
    interface Global {
      config: Config;
    }
  }

  var config: Config;
}

export {};
