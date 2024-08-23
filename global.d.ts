import Config from "@core/environment.config";
import { Request, Response } from 'express';

declare global {
  namespace NodeJS {
    interface Global {
      config: Config;
    }
  }

  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }

    interface Response {
      json(data: any): Response;
      status(code: number): Response;
    }
  }
  
  var config: Config;

  const Response: Response;

  const Request: Request;
}

export {};
