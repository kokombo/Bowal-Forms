import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const { nextUrl } = req;
  const isLoggedIn = !!token;

  if (nextUrl.pathname.startsWith("/forms") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isLoggedIn && nextUrl.pathname === ("/sign-in" || "/sign-up")) {
    return NextResponse.redirect(new URL("/forms", nextUrl));
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
