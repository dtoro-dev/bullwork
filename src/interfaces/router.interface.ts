import { Router } from "express";

export interface RouteDefinition {
  method: keyof Router;
  path: string;
  handler: string;
}