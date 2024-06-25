import { NextResponse } from "next/server";
import { PostApi } from "@/lib/fetchApi";
export const POST = async (_req) => {
  const body = await _req.json();
  let response = await PostApi(body, "/otr/create-otr");

  return NextResponse.json({ message: "Berhasil guys" });
};
