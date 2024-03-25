import { postData } from "@/hooks/fetch-hook";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (_req) => {
  const body = await _req.json();
  let formData = new FormData();
  formData.append("awal_tenor", body["awal_tenor"]);
  formData.append("akhir_tenor", body["akhir_tenor"]);
  formData.append("no_leas", body["no_leas"]);
  formData.append("kode_kerja_filter_type", body["kode_kerja_filter_type"]);
  formData.append("kode_kerja", body["kode_kerja"]);
  console.log("ini form adata ", formData);
  // const response = await postData("/export-data-wa-blast", formData);
  // const response = await postData("/export-data-wa-blast", formData);
  let response = await fetch("http://127.0.0.1:3001" + "/export-data-wa-blast", {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      Accept: "*/*",
    },
    body: formData,
    mode: "no-cors",
  });
  let response1 = await response.blob();
  console.log("ini data blob ", response1);
  return new NextResponse(response1);

  // fetch("http://127.0.0.1:3001" + "/export-data-wa-blast", {
  //   method: "POST",
  //   headers: {
  //     // "Content-Type": "application/json",
  //     Accept: "*/*",
  //   },
  //   body: formData,
  //   mode: "no-cors",
  // })
  //   .then((data) => {
  //     return data.blob();
  //   })
  //   .then(async (data) => {
  //     console.log("ini dari fetch blob ", data);
  //     return new NextResponse(data);
  //   })
  //   .catch((error) => {
  //     console.log("ini errornya ", error);
  //   });
};
