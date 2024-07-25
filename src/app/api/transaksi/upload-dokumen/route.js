import { NextResponse } from "next/server";
import { PostFileApi } from "@/lib/fetchApi";
import { revalidatePath, revalidateTag } from "next/cache";
export const POST = async (_req) => {
  const body = await _req.formData();
  console.log("ini body", body);
  let response = await PostFileApi(body, "/transaksi/upload-dokumen");
  return NextResponse.json({ revalidated: true, message: response.message });
};
