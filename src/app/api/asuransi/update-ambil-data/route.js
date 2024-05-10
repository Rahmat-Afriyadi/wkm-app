import { NextResponse } from "next/server";
import { PostApi, AuthGetApi } from "@/lib/fetchApi";
export const POST = async (_req) => {
  const body = await _req.json();
  let response = await PostApi(body, "/asuransi/update-ambil-asuransi");
  console.log("ini response yaa ", response);

  return NextResponse.json({ message: "Berhasil guys" });
};
