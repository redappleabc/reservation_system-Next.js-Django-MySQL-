import { NextResponse } from "next/server";

import { backendAxiosInstance } from "@/utils/http-common";

export async function GET(request) {
  try {
    const queryObj = request.nextUrl.searchParams;
    const searchParams = new URLSearchParams(queryObj)
    let queryStr = searchParams.toString();

    const res = await backendAxiosInstance.get(`allService/basic?${queryStr}`, {
      headers: {
        "Content-Type": "application/json",
      }
    })

    const data = res.data;

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const errorMessage = err.response?.data.message || 'Getting Service List Info failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
