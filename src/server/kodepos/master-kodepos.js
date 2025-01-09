// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const masterKodepos = async () => {
  const data = await axiosAuth.get("/mst-kodepos");
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data.map((e) => `${e.kota}, ${e.kecamatan}, ${e.kelurahan}, ${e.kodepos}`);
  }
  return res;
};
