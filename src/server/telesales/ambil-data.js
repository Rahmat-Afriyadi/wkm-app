import { axiosAuth } from "@/lib/axios";
export async function ambilData(body) {
  console.log("ini body yaa ", body);
  const data = await axiosAuth.post("/customer-mtr/ambil-data", { no_msn: body.no_msn });
  const res = { message: "" };
  if (data.status == 200) {
    res.message = data.message;
  }
  return res;
}
