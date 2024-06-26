import { NextResponse } from "next/server";
import { PostFileApi } from "@/lib/fetchApi";
export const POST = async (_req) => {
  const body = await _req.formData();
  let response = await PostFileApi(body, "/edit-jenis-bayar");
  return NextResponse.json({ message: response.message });
};
