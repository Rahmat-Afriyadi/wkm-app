// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const masterAlasanVoidKonfirmasi = async () => {
  const data = await axiosAuth.get("/mst-alasan-void-konfirmasi");
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
