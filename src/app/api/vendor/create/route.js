import { NextResponse } from "next/server";
import { PostApi } from "@/lib/fetchApi";
export const POST = async (_req) => {
  const body = await _req.json();
  let response = await PostApi(body, "/vendor/create-vendor");
  return NextResponse.json({ revalidated: true, message: response.message });
};
