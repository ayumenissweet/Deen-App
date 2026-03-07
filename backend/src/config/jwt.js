// src/config/jwt.js
import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "accesssecret";

export const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "refreshsecret";

export const JWT_EXPIRES_IN =
  process.env.JWT_EXPIRES_IN || "1h";

export const REFRESH_TOKEN_EXPIRES_IN =
  process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";
