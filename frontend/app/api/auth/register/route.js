import { NextResponse } from "next/server";

import { backendAxiosInstance } from "@/utils/http-common";

export async function POST(request) {
  try {
    const payload = await request.json();
    const res = await backendAxiosInstance.post('auth/signup', payload);
    const response = NextResponse.json(res.data, { status: 200 });
    response.cookies.set('token', res.data.result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Signup failed";
    return NextResponse.json({ error: errorMessage }, { status: err.response?.status || 500 })
  }
}
