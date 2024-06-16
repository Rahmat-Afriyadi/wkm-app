import { NextResponse } from "next/server";
import { PostApi, PostMokita, AuthGetApi } from "@/lib/fetchApi";
export const POST = async (_req) => {
  let message = { message: "Awal nih" };
  const body = await _req.json();
  await PostApi(body, "/approval/update");
  body.AppTransId = body.app_trans_id;
  body.InsuranceTransId = body.id_transaksi;
  body.Status = parseInt(body.sts_beli);

  const tokenRes = await AuthGetApi("/mokita/token");
  message = await PostMokita(body, "/api/v1/ddms/insurance/transaction/verification-update", tokenRes.token);
  return NextResponse.json(message);
};
