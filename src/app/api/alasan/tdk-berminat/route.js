import { AuthGetApi } from "@/lib/fetchApi";
import { NextResponse } from "next/server";
export const GET = async (_req) => {
  const response = await AuthGetApi("/asuransi/master-alasan-tdk-berminat");
  return NextResponse.json({ response });
};
