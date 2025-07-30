import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import { prisma } from "./lib/prisma";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Permitir acceso libre a rutas públicas
  if (pathname.startsWith("/api") || pathname === "/" || pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Si no hay sesión, redirigir a login
  if (!session?.user?.email) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Consultar si el perfil está completo
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { profileComplete: true },
  });

    // Si el usuario está autenticado, verificar si su perfil está completo
  if (session?.user?.id) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { profileComplete: true }
      });

      // Si el perfil no está completo y no está en rutas de perfil, redirigir a /dashboard/profile
      if (!user?.profileComplete && 
          !request.nextUrl.pathname.startsWith('/dashboard/profile')) {
        return NextResponse.redirect(new URL('/dashboard/profile', request.url));
      }
    } catch (error) {
      console.error('Error checking profile completion:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
