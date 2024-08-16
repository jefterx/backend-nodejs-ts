import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      tokenData?: {
        userId: string;
        platformId: string;
      };
    }
  }
}
