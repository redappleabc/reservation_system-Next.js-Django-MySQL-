import { NextResponse } from "next/server";

import { backendAxiosInstance } from "@/utils/http-common";

export async function POST(request) {
  try {
    const payload = await request.json();

    const cookie = request.headers.get('cookie');

    const res = await backendAxiosInstance.post('service/main_data', payload, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookie
      }
    })

    const data = res.data;

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const errorMessage = err.response?.data.message || 'Creating service main data failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
