// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const masterAlasanTdkMembership = async (stsMembership, tipe = "V") => {
  const data = await axiosAuth.get("/mst-alasan-tdk-membership/" + tipe);
  const res = { data: [] };
  if (data.status == 200) {
    const validasiAlasanTidak = ["Telp bermasalah", "Telp tidak diangkat/aktif"];
    res.data = data.data;
    if (stsMembership == "O") {
      res.data = res.data.filter((e) => !validasiAlasanTidak.includes(e.name));
    }
  }
  return res;
};
