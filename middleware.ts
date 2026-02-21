import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

// Paths to bypass maintenance mode
const isAllowedPath = createRouteMatcher([
    '/maintenance',
    '/studio(.*)',
    '/api(.*)',
    '/_next(.*)',
    '/favicon.ico',
    '/images(.*)'
]);

export default clerkMiddleware((auth, req) => {
    // 1. If Maintenance Mode is ON
    if (isMaintenanceMode) {
        // If trying to access a restricted page, redirect to /maintenance
        if (!isAllowedPath(req)) {
            return NextResponse.redirect(new URL('/maintenance', req.url));
        }
    }
    // 2. If Maintenance Mode is OFF
    else {
        // If user is on /maintenance page but mode is off, redirect to home
        if (req.nextUrl.pathname === '/maintenance') {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};