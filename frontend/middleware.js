import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

import { accessPages } from "./utils/menuInfo";

const verifyToken = async (token, secret) => {
  const encodedSecret = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, encodedSecret);
  return payload.role;
}

export async function middleware(req) {
  const token = req.cookies.get('token');
  const parseUrl = req.nextUrl;
  const pathname = parseUrl.pathname;
  const segments = pathname.split("/");
  const usefulPathname = segments.slice(0, 3).join("/");

  const loginPath = '/auth/login';
  const registerPath = '/auth/register';

  if (!token) {
    if (usefulPathname === loginPath || usefulPathname === registerPath) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const tokenValue = token.value;
    const role = await verifyToken(tokenValue, process.env.SECRET_KEY || 'my_secret_key');
    const pages = accessPages[role];

    if (usefulPathname === loginPath || usefulPathname === registerPath) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    
    if (!pages.includes(usefulPathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/login', '/auth/register'],
};
