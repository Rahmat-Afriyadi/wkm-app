import { NextResponse } from "next/server";
import { PostApi, PostMokita } from "@/lib/fetchApi";
export const POST = async (_req) => {
  let message = { message: "Awal nih" };
  const body = await _req.json();
  let response = await PostApi(body, "/approval/update");
  body.AppTransId = body.app_trans_id;
  body.InsuranceTransId = body.id_transaksi;
  body.Status = parseInt(body.sts_beli);
  message = await PostMokita(body, "/api/v1/ddms/insurance/transaction/verification-update");

  return NextResponse.json(message);
};
