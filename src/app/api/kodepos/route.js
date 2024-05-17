import { AuthGetApi } from "@/lib/fetchApi";
import { NextResponse } from "next/server";
export const GET = async (_req) => {
  console.log("ini query ", _req.nextUrl.searchParams.get("search"));
  const response = await AuthGetApi(
    "/kodepos/master-data?" +
      new URLSearchParams({
        search: _req.nextUrl.searchParams.get("search"),
      })
  );
  return NextResponse.json({ response });
};
