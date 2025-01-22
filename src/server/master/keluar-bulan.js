// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const masterKeluarBulan = async () => {
  const data = await axiosAuth.get("/mst-keluar-bln");
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
