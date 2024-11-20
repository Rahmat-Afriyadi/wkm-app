import { NextResponse } from "next/server";
import { PostApi, AuthGetApi } from "@/lib/fetchApi";
export const POST = async (_req) => {
  const body = await _req.json();
  body.harga = parseInt(body.harga);
  let response = await PostApi(body, "/data-renewal");

  return NextResponse.json({ message: "Berhasil guys" });
};
