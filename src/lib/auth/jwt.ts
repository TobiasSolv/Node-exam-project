import jwt from "jsonwebtoken";
import type { Cookies } from "@sveltejs/kit";
import { dev } from "$app/environment";
import db from '../../../database/connection.js';

// Types
export interface JwtPayload {
    external_id: string;
    email: string;
    iat?: number;
    exp?: number;
}

interface TokenResponse {
    success: boolean;
    message?: string;
    user?: Omit<JwtPayload, "iat" | "exp">;
    error?: any;
}

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || "My secret key";
const ACCESS_TOKEN_EXPIRY = "1h"; // 1 hour

/**
 * Generate a JWT token for a user
 */
export const generateToken = (
    payload: Omit<JwtPayload, "iat" | "exp">
): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
};

/**
 * Verify the validity of a JWT token
 */
export const verifyToken = (token: string): TokenResponse => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        return {
            success: true,
            user: {
                external_id: decoded.external_id,
                email: decoded.email,
            },
        };
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error ? error.message : "Invalid token",
            error,
        };
    }
};

/**
 * Log JWT token issuance to database
 */
export const logToken = async (
    token: string,
    external_id: string
): Promise<void> => {
    try {
        // Decode token to get claims without verification
        const decoded = jwt.decode(token) as JwtPayload;
        const issuedAt = new Date((decoded.iat || 0) * 1000);
        const expiresAt = new Date((decoded.exp || 0) * 1000);

        // Use the database function to log the token
        await logJwtToken(external_id, token, issuedAt, expiresAt);
    } catch (error) {
        console.error("Error logging token:", error);
        // Don't throw, as token logging failure shouldn't break authentication
    }
};

/**
 * Handle token-based authentication
 * Returns user info if authenticated or null if not
 */
export const authenticateRequest = (
    cookies: Cookies
): TokenResponse => {
    const accessToken = cookies.get("access_token");

    if (!accessToken) {
        return {
            success: false,
            message: "No authentication token found",
        };
    }

    return verifyToken(accessToken);
};

export async function logJwtToken(
    external_id: string,
    token_value: string,
    issued_at: Date,
    expires_at: Date
): Promise<void> {
    try {

        // log JWT token in database
        const logged_at = new Date().toISOString();
        const additional_data = "";
        await db.run('INSERT INTO jwt_token_logs (external_id, token_value, issued_at, expires_at, logged_at, additional_data) VALUES (?, ?, ?, ?, ?, ?)', [external_id, token_value, issued_at, expires_at, logged_at, additional_data]);

    } catch (error) {
        console.error("Error logging JWT token:", error);
    }
};