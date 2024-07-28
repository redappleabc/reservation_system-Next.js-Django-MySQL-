import { NextResponse } from "next/server";

import { backendAxiosInstance } from "@/utils/http-common";

export async function GET(request, { params }) {
  try {
    const { serviceId } = params;

    const res = await backendAxiosInstance.get(`allService/detail/${serviceId}`, {
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
