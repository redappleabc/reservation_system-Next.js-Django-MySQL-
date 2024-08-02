import { NextResponse } from "next/server";
import { backendAxiosInstance } from "@/utils/http-common";

export async function GET(request) {
  try {
    const token = request.cookies.get('token') || "";
    if (!token) {
      return NextResponse.json({
        isAuthenticate: false,
        user: null,
      }, { status: 200 })
    } else {
      const cookie = request.headers.get('cookie') || "";
      const res = await backendAxiosInstance.get('auth/login_with_token', {
        headers: {
          "Content-Type": "application/json",
          "Cookie": cookie,
        }
      })
      const response = NextResponse.json({
        isAuthenticate: true,
        user: res.data.result.user,
      }, { status: 200 });

      response.cookies.set('token', res.data.result.token, {
        httpOnly: true,
        secure: false,
      });

      return response;
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
