// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const detailOtrNoMtr = async ({ no_mtr, tahun }) => {
  const data = await axiosAuth.post("/otr/detail-otr-by-no-mtr", { no_mtr, tahun });
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
