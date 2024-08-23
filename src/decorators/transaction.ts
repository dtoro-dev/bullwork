import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function startTransaction() {
  // Iniciar una transacción con Prisma
  return prisma.$transaction();
}

async function commitTransaction(transaction: any) {
  // En Prisma, las transacciones se manejan automáticamente si no se lanza una excepción.
  // No se necesita hacer nada aquí, pero esta función se mantiene para consistencia.
}

async function rollbackTransaction(transaction: any) {
  // En Prisma, las transacciones se manejan automáticamente si se lanza una excepción.
  // No se necesita hacer nada aquí, pero esta función se mantiene para consistencia.
  console.log('Transaction rolled back');
}

export function Transaction(): MethodDecorator {
  return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {
    const originalMethod = descriptor.value as unknown as (...args: any[]) => Promise<any>;

    descriptor.value = async function (this: any, ...args: any[]): Promise<any> {
      if (!originalMethod) {
        throw new Error(`Method ${String(propertyKey)} is not defined`);
      }

      const transaction = await startTransaction();
      try {
        const result = await originalMethod.apply(this, [transaction, ...args]);
        await commitTransaction(transaction);
        return result;
      } catch (error) {
        await rollbackTransaction(transaction);
        throw error;
      }
    } as unknown as T;
  };
}
