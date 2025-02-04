// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const masterAlasanTdkMembership = async () => {
  const data = await axiosAuth.get("/mst-alasan-tdk-membership");
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
