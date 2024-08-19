import 'reflect-metadata';

class Container {
  private services = new Map();

  register<T>(token: new () => T, instance: T) {
    this.services.set(token, instance);
  }

  resolve<T>(token: new () => T): T {
    const instance = this.services.get(token);
    if (!instance) {
      throw new Error(`No instance found for ${token.name}`);
    }
    return instance;
  }
}

export default Container;