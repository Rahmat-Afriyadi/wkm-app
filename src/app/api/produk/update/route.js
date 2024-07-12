import { NextResponse } from "next/server";
import { PostApi, PostFileApi } from "@/lib/fetchApi";
import { revalidatePath, revalidateTag } from "next/cache";
export const POST = async (_req) => {
  const body = await _req.json();
  let response = await PostApi(body, "/produk/update-produk");
  return NextResponse.json({ revalidated: true, message: response.message });
};
