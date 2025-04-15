import {NextRequest, NextResponse} from "next/server";

export const config = {
  matcher: ["/", "/my/:path*"],
};

export async function middleware(req: NextRequest) {
  const authToken = req.cookies.get("authToken");

  if (!authToken && req.nextUrl.pathname !== "/signIn") {
    const redirectUrl = new URL("/signIn", req.url);
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
