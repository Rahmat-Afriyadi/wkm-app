import { NextResponse } from "next/server";
import { PostApi } from "@/lib/fetchApi";
export const POST = async (_req) => {
  const body = await _req.json();
  let responseCreate = await PostApi(body, "/transaksi/create-transaksi");
  return NextResponse.json({ revalidated: true, message: responseCreate.message, id: responseCreate.id_transaksi });
};
