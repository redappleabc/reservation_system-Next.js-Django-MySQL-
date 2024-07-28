import { NextResponse } from "next/server";

import { backendAxiosInstance } from "@/utils/http-common";

export async function POST(request) {
  try {
    const payload = await request.formData();

    const cookie = request.headers.get('cookie');

    const res = await backendAxiosInstance.post('service/related_images_files', payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Cookie": cookie
      }
    })

    const data = res.data;

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const errorMessage = err.response?.data.message || 'Creating or updating images and files failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
