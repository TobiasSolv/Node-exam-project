import { authenticateRequest } from "$lib/auth/jwt";
import type { Handle } from "@sveltejs/kit";
import type { JwtPayload } from "$lib/auth/jwt";

// Extend the Locals interface to include our user property
declare global {
    namespace App {
        interface Locals {
            user?: Omit<JwtPayload, "iat" | "exp">;
        }
    }
}

export const handle: Handle = async ({ event, resolve }) => {
    const { cookies, url } = event;

    // Public routes that don't require authentication
    const publicRoutes = [
        "/about_page",
        "/contact_page",
        "/forgot_password_page",
        "/reset_password_page",
        "/front_page",
        "/signup_page",
    ];

    // Check if the current route is public
    const isPublicRoute = publicRoutes.some((route) => url.pathname === route);

    // First, verify the authentication status for all routes
    const authResult = authenticateRequest(cookies);

    if (authResult.success && authResult.user) {
        // User is authenticated
        event.locals.user = authResult.user;

        // Maintain backward compatibility with existing code
        if (!cookies.get("user")) {
            cookies.set("user", JSON.stringify(authResult.user), {
                path: "/",
                httpOnly: true,
            });
        }

        // If user is authenticated and trying to access public routes like sign-in
        // redirect them to the front page instead
        if (isPublicRoute && url.pathname !== "/auth/logout") {
            return Response.redirect(new URL("/", url));
        }
    } else {
        // User is not authenticated
        if (!isPublicRoute) {
            // Non-public route requires authentication, redirect to front page
            cookies.delete('session_id', { path: '/' });
            cookies.delete('access_token', { path: '/' });
            return Response.redirect(new URL("/front_page", url));
        }
    }

    return resolve(event);
};