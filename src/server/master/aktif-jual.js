// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const masterAktifJual = async () => {
  const data = await axiosAuth.get("/mst-aktivitas-jual");
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  console.log("ini aktif jual ", res.data);
  return res;
};
