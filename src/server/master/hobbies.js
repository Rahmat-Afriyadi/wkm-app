// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const masterHobbies = async () => {
  const data = await axiosAuth.get("/mst-hobbies");
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
