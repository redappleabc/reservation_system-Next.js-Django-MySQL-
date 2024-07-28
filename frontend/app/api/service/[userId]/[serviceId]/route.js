import { NextResponse } from "next/server";

import { backendAxiosInstance } from "@/utils/http-common";

export async function GET(request, { params }) {
  try {
    const { userId, serviceId } = params;

    const cookie = request.headers.get('cookie');

    const res = await backendAxiosInstance.get(`service/${userId}/${serviceId}`, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookie
      }
    })

    const data = res.data;

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const errorMessage = err.response?.data.message || 'Getting Service List Info failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
