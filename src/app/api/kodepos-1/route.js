import { AuthGetApi } from "@/lib/fetchApi";
import { NextResponse } from "next/server";
export const GET = async (_req) => {
  const response = await AuthGetApi(
    "/kodepos/master-data-1?" +
      new URLSearchParams({
        search: _req.nextUrl.searchParams.get("search"),
      })
  );
  return NextResponse.json({ response });
};
