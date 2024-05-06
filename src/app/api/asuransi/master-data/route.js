import { NextResponse } from "next/server";
import { PostFileApi, AuthGetApi } from "@/lib/fetchApi";
export const GET = async (_req) => {
  let response = await AuthGetApi("/asuransi/master-data");

  return NextResponse.json({ message: response });
};
