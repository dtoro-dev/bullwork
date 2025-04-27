import { resolveDependencies } from "../decorators/injectable";
import path from "path";

async function getEnv() {
  const envFile = await import(path.join(process.cwd(), "env.config.ts"));
  return envFile.default;
}

export async function bootstrap() {
  const Environment = await getEnv();

  if (!Environment) {
    throw new Error("Environment file not found or not exported correctly.");
  }

  (global as any).env = resolveDependencies(Environment);
}