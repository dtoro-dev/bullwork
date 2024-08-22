import 'reflect-metadata';

class Container {
  private services = new Map();

  // Registra una instancia o un proveedor
  register<T>(token: new () => T, instanceOrProvider: T | (() => T)) {
    if (typeof instanceOrProvider === 'function') {
      // Si es un proveedor (factory function), guárdalo
      this.services.set(token, { provider: instanceOrProvider });
    } else {
      // Si es una instancia directa, guárdala
      this.services.set(token, { instance: instanceOrProvider });
    }
  }

  // Resuelve la instancia de un servicio o lo crea si no existe
  resolve<T>(token: new () => T): T {
    const serviceEntry = this.services.get(token);

    if (!serviceEntry) {
      throw new Error(`No instance or provider found for ${token.name}`);
    }

    if (!serviceEntry.instance) {
      // Si la instancia aún no existe, créala usando el proveedor
      serviceEntry.instance = serviceEntry.provider();
      this.services.set(token, serviceEntry); // Guarda la instancia creada
    }

    return serviceEntry.instance;
  }
}

export default Container;