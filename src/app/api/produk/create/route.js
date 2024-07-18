import { NextResponse } from "next/server";
import { PostApi } from "@/lib/fetchApi";
export const POST = async (_req) => {
  const body = await _req.json();
  let responseCreate = await PostApi(body, "/produk/create-produk");
  return NextResponse.json({ revalidated: true, message: responseCreate.message, id_produk: responseCreate.id_produk });
};
