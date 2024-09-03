import { NextResponse } from "next/server";
import { PostApi } from "@/lib/fetchApi";
export const POST = async (_req) => {
  const body = await _req.json();
  let data = await PostApi(body, "/search-no-msn-by-wa");
  return NextResponse.json(data);
};
