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
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si el usuario está autenticado, verificar si su perfil está completo
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { 
        profileComplete: true,
        age: true,
        career: true,
        hobbies: true,
        description: true,
        userStrengths: {
          select: {
            strengthId: true
          }
        }
      }
    });

    if (user) {
      // Calcular el estado real del perfil (por si acaso el campo en DB no está actualizado)
      const actuallyComplete = !!(
        user.age &&
        user.career && 
        user.career.length >= 2 &&
        user.hobbies && 
        user.hobbies.length >= 10 &&
        user.description && 
        user.description.length >= 20 &&
        user.userStrengths && 
        user.userStrengths.length === 5
      );

      // Si el perfil no está completo y no está en rutas de perfil, redirigir a /dashboard/profile
      if (!actuallyComplete && !pathname.startsWith('/dashboard/profile')) {
        return NextResponse.redirect(new URL('/dashboard/profile', request.url));
      }

      // Si el perfil está completo pero el usuario está en /dashboard/profile (página principal),
      // redirigir al dashboard para mejor UX
      if (actuallyComplete && pathname === '/dashboard/profile') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  } catch (error) {
    console.error('Error checking profile completion:', error);
    // En caso de error, permitir continuar para evitar bloquear la aplicación
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
