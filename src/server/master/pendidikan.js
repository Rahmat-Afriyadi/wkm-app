// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const masterPendidikan = async () => {
  const data = await axiosAuth.get("/mst-pendidikan");
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};