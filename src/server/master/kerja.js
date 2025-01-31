// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const masterKerja = async () => {
  const data = await axiosAuth.get("/kerja/master-data/choices");
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
