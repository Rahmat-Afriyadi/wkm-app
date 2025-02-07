// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const masterScript = async () => {
  const data = await axiosAuth.get("/mst-script/active");
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
