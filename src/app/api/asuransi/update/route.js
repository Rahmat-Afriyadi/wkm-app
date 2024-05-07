import { NextResponse } from "next/server";
import { PostApi, AuthGetApi } from "@/lib/fetchApi";
export const POST = async (_req) => {
  const body = await _req.json();
  let response = await PostApi(body, "/asuransi/update");

  console.log("ini res nya yaa 1 ", response);

  return NextResponse.json({ message: "Berhasil guys" });
};
