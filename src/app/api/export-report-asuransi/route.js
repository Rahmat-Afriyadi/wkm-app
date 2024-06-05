import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { refreshToken } from "@/lib/fetchApi";
export const POST = async (_req) => {
  const BASE_URL = "http://127.0.0.1:3001";
  const url = "/asuransi/export-report-asuransi";
  const session = await getServerSession(authOptions);
  const body = await _req.json();

  let response = await fetch(BASE_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify(body),
    mode: "no-cors",
  });
  if (response.status == 403) {
    console.log("masuk refresh ", session?.user?.accessToken);
    const { access_token, refresh_token } = await refreshToken(session?.user.refreshToken ?? "");
    if (session) session.user.accessToken = access_token;
    if (session) session.user.refreshToken = refresh_token;
    response = await fetch(BASE_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      body: JSON.stringify(body),
      mode: "no-cors",
    });
  }

  console.log("ini blob rouete 1", response);
  let response1 = await response.blob();
  console.log("ini blob rouete ", response1);
  return new NextResponse(response1);
};
