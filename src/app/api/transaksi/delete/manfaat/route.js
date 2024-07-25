import { NextResponse } from "next/server";
import { PostFileApi, DeleteApi } from "@/lib/fetchApi";
import { revalidatePath, revalidateTag } from "next/cache";
export const POST = async (_req) => {
  const body = await _req.json();
  let response = await DeleteApi(body.id, "/produk/delete-manfaat");
  return NextResponse.json({ revalidated: true, message: "response.message" });
};
