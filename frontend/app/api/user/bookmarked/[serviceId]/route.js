import { NextResponse } from "next/server";

import { backendAxiosInstance } from "@/utils/http-common";

export async function POST(request, { params }) {
  try {
    const { serviceId } = params;

    const cookie = request.headers.get('cookie');

    const res = await backendAxiosInstance.post(`user/bookmarked/${serviceId}`, {}, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookie
      }
    })

    const data = res.data;

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const errorMessage = err.response?.data.message || 'Creating bookmarked service failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { serviceId } = params;

    const cookie = request.headers.get('cookie');

    const res = await backendAxiosInstance.put(`user/bookmarked/${serviceId}`, {}, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookie
      }
    })

    const data = res.data;

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const errorMessage = err.response?.data.message || 'Updating bookmarked status failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { serviceId } = params;

    const cookie = request.headers.get('cookie');

    const res = await backendAxiosInstance.delete(`user/bookmarked/${serviceId}`, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookie
      }
    })

    const data = res.data;

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const errorMessage = err.response?.data.message || 'Deleting bookmarked service failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
