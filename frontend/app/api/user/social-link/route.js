import { NextResponse } from "next/server";

import { backendAxiosInstance } from "@/utils/http-common";

export async function GET(request) {
  try {
    const cookie = request.headers.get('cookie') || '';

    const res = await backendAxiosInstance.get('user/social_link', {
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookie,
      }
    })

    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Getting social link info failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const cookie = request.headers.get('cookie') || '';
    const payload = await request.json();

    const res = await backendAxiosInstance.put('user/social_link', payload, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookie,
      }
    })

    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Updating social link info failed";
    return NextResponse.json({ error: errorMessage }, { status:  500 });
  }
}
