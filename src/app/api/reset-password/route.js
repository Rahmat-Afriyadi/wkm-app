import { NextResponse } from "next/server";
import { PostApi, AuthGetApi } from "@/lib/fetchApi";
export const POST = async (_req) => {
  const body = await _req.json();
  let response = await PostApi(body, "/auth/reset-password");
  let status = 200;
  if (!response.message.startsWith("Data")) {
    status = 400;
  }

  return NextResponse.json(response, { status });
};
