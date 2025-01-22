// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const masterTujuanPakai = async () => {
  const data = await axiosAuth.get("/mst-tujuan-pakai");
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
