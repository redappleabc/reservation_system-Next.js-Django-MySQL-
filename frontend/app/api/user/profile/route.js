import { NextResponse } from "next/server";

import { backendAxiosInstance } from "@/utils/http-common";

export async function GET(request) {
  try {
    const cookie = request.headers.get("cookie") || "";
    const res = await backendAxiosInstance.get("user/profile", {
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookie,
      }
    })

    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Getting profile data failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request) {
  try {

    const formData = await request.formData();
    const cookie = request.headers.get("cookie") || "";

    const res = await backendAxiosInstance.put("user/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Cookie": cookie
      }
    })

    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Updating profile data failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
