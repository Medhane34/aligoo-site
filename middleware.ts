import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest, type NextFetchEvent } from "next/server";

const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

// Paths to bypass maintenance mode
const isAllowedPath = createRouteMatcher([
  "/maintenance",
  "/studio(.*)",
  "/api(.*)",
  "/_next(.*)",
  "/favicon.ico",
  "/images(.*)",
]);

// Paths that REQUIRE Clerk authentication
const isProtectedRoute = createRouteMatcher([
  "/telegram(.*)",
  "/proposal(.*)",
  "/studio(.*)", // Keep studio protected if it was before (usually it is)
]);

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // 1. Handle Maintenance Mode FIRST (Highest Priority)
  if (isMaintenanceMode) {
    if (!isAllowedPath(req)) {
      return NextResponse.redirect(new URL("/maintenance", req.url));
    }
  } else {
    if (pathname === "/maintenance") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // 2. If it's a protected route, delegate to clerkMiddleware
  if (isProtectedRoute(req)) {
    return clerkMiddleware()(req, event);
  }

  // 3. For public routes, explicitly return next() with BFCache-friendly headers
  // This SURGICALLY BYPASSES Clerk for all public pages to prevent 'no-store' headers.
  const response = NextResponse.next();

  // BFCache Optimization: Ensure public pages are eligible for memory restoration.
  response.headers.set(
    "Cache-Control",
    "public, max-age=0, must-revalidate, stale-while-revalidate=300"
  );

  // Set Locale Header for Layout
  const localeMatch = pathname.match(/^\/(en|am)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "en";
  response.headers.set("x-locale", locale);

  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
