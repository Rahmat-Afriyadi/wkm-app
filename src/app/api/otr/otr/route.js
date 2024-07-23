import { AuthGetApi } from "@/lib/fetchApi";
import { NextResponse } from "next/server";
export const GET = async (_req) => {
  const response = await AuthGetApi(
    "/otr/master-data?" +
      new URLSearchParams({
        search: _req.nextUrl.searchParams.get("search"),
        limit: 20,
        pageParams: 1,
      })
  );
  return NextResponse.json({ response });
};
