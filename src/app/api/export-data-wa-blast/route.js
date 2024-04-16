import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export const POST = async (_req) => {
  const session = await getServerSession(authOptions);
  const body = await _req.json();
  console.log("ini body ", body);
  let response = await fetch("http://127.0.0.1:3001" + "/export-data-wa-blast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify(body),
    mode: "no-cors",
  });
  console.log("ini ressnya ", response.status);
  console.log("ini bodynya ", body);
  let response1 = await response.blob();
  return new NextResponse(response1);
};
