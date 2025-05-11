import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Since this is a client-side only app, we don't need any API routes
  // All data persistence is handled via localStorage in the browser
  // The server is only used to serve the static files

  const httpServer = createServer(app);

  return httpServer;
}
