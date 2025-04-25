import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Здесь можно добавить проверку на cookie, IP, user-agent и т.д.
  const res = NextResponse.next();

  // Пример логики доступа к админке
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login")
  ) {
    // тут можно вставить свою авторизацию, если понадобится
    // например: проверка сессионного токена или куки
    // return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
