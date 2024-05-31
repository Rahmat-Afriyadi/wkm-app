import { AuthGetApi } from "@/lib/fetchApi";
import { NextResponse } from "next/server";
export const GET = async (_req) => {
  const response = await AuthGetApi("/asuransi/master-alasan-pending");
  return NextResponse.json({ response });
};
