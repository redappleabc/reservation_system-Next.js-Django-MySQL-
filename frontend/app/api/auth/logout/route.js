import { NextResponse } from "next/server";
import { backendAxiosInstance } from "@/utils/http-common";

export async function GET(request) {
  try {

    const cookie = request.headers.get('cookie') || "";

    // Make the backend request
    const res = await backendAxiosInstance.get('auth/logout', {
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookie
      },
    });

    const data = await res.data;

    // Handle response cookies if necessary
    // Example: Setting a cookie in the response
    const response = NextResponse.json(data);
    response.headers.set('Set-Cookie', 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');

    return response;

  } catch (error) {
    // console.error('Error during login:', error);
    const errorMessage = error.response?.data?.message || "Logout failed";
    return NextResponse.json({ error: errorMessage }, { status: error.response?.status || 500 });
  }
}
