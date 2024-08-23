import "reflect-metadata";

class Container {
  private services = new Map();

  register<T>(token: new () => T, instanceOrProvider: T | (() => T)) {
    if (typeof instanceOrProvider === "function") {
      this.services.set(token, { provider: instanceOrProvider });
    } else {
      this.services.set(token, { instance: instanceOrProvider });
    }
  }

  resolve<T>(token: new () => T): T {
    const serviceEntry = this.services.get(token);

    if (!serviceEntry) {
      throw new Error(`No instance or provider found for ${token.name}`);
    }

    if (!serviceEntry.instance) {
      serviceEntry.instance = serviceEntry.provider();
      this.services.set(token, serviceEntry);
    }

    return serviceEntry.instance;
  }
}

export default Container;
