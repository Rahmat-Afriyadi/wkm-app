import { postData } from "@/hooks/fetch-hook";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export const POST = async (_req) => {
  const body = await _req.json();
  let response = await fetch("http://127.0.0.1:3001" + "/export-data-wa-blast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: JSON.stringify(body),
    mode: "no-cors",
  });
  let response1 = await response.blob();
  console.log("ini data blob ", response1);
  return new NextResponse(response1);
};
