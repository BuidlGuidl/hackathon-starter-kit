import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const SIGN_IN_PAGE = "/siwe";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // If no token and the request is not for the sign-in page, redirect to the sign-in page
  if (!token && request.nextUrl.pathname !== SIGN_IN_PAGE) {
    const url = request.nextUrl.clone();
    url.pathname = SIGN_IN_PAGE;
    return NextResponse.redirect(url);
  }

  // If a token is found or the request is for the sign-in page, proceed as normal
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
