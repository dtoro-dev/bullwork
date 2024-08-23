import { Env } from "@decorators/env";
import "reflect-metadata";

class Config {
  @Env("NODE_ENV", { required: true })
  public nodeEnv!: string;

  @Env("PORT", { required: true, parse: (value) => parseInt(value, 10) })
  public port!: number;

  @Env("DATABASE_URL", { required: true })
  public databaseUrl!: string;

  @Env("SW_NAME_DOC", { required: true })
  public swaggerNameDoc!: string;

  @Env("SW_VERSION_DOC", { required: true })
  public swaggerVersionDoc!: string;

  @Env("API_ENTRY_POINT", { required: true })
  public apiEntryPoint!: string;
}

global.config = new Config(); // Asignar `config` al objeto global

export default Config;
