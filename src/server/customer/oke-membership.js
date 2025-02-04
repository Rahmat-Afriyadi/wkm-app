// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const updateOkeMembership = async (body) => {
  const data = await axiosAuth.post("/customer-mtr/update/oke", body);
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
