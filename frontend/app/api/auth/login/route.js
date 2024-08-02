import { NextResponse } from "next/server";
import { backendAxiosInstance } from "@/utils/http-common";

export async function POST(request) {
  try {
    // Parse the request body
    const { email, password } = await request.json();

    const payload = {
      email,
      password,
    };

    // Make the backend request
    const res = await backendAxiosInstance.post('auth/login', payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = res.data;

    // Handle response cookies if necessary
    // Example: Setting a cookie in the response
    const response = NextResponse.json(data, { status: 200 });
    response.cookies.set('token', data.result.token, {
      httpOnly: true,
      secure: false,
    });

    return response;

  } catch (error) {
    // console.error('Error during login:', error);
    const errorMessage = error.response?.data?.message || "Login failed";
    return NextResponse.json({ error: errorMessage }, { status: error.response?.status || 500 });
  }
}
