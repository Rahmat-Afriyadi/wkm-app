import { NextResponse } from "next/server";
import { PostApi } from "@/lib/fetchApi";
export const POST = async (_req) => {
  const body = await _req.json();
  let response = await PostApi(body, "/mst-mtr/update-mst-mtr");
  return NextResponse.json({ message: response.message });
};
