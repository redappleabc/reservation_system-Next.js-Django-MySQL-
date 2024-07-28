import { NextResponse } from "next/server";

import { backendAxiosInstance } from "@/utils/http-common";

export async function PUT(request, { params }) {
  try {
    const { id: optionId } = params;
    const payload = await request.json();

    const cookie = request.headers.get('cookie');

    const res = await backendAxiosInstance.put(`service/option/${optionId}`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookie
      }
    })

    const data = res.data;

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const errorMessage = err.response?.data.message || 'Creating or updating service date and time failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id: optionId } = params;

    const cookie = request.headers.get('cookie');

    const res = await backendAxiosInstance.delete(`service/option/${optionId}`, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookie
      }
    })

    const data = res.data;

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const errorMessage = err.response?.data.message || 'Creating or updating service date and time failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
