import { NextResponse } from "next/server";
import { PostApi, AuthGetApi } from "@/lib/fetchApi";
export const POST = async (_req) => {
  const body = await _req.json();
  console.log("ini bodynya ", body);
  let response = await PostApi(body, "/asuransi/update");

  return NextResponse.json({ message: response });
};
