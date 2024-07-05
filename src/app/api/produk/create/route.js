import { NextResponse } from "next/server";
import { PostFileApi } from "@/lib/fetchApi";
export const POST = async (_req) => {
  const body = await _req.formData();
  let response = await PostFileApi(body, "/produk/create-produk");
  return NextResponse.json({ revalidated: true, message: response.message });
};
