import { AuthGetApi } from "@/lib/fetchApi";
import { NextResponse } from "next/server";
export const GET = async (_req) => {
  const response = await AuthGetApi(
    "/produk/master-data?" +
      new URLSearchParams({
        jenis_asuransi: _req.nextUrl.searchParams.get("jenis_asuransi"),
      })
  );
  return NextResponse.json({ response });
};
