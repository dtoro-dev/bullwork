export interface SwaggerDocument {
  openapi: string;
  info: {
    title: string;
    version: string;
  };
  tags: any[];
  components: {
    schemas: Record<string, any>;
  };
  paths: Record<string, any>;
}