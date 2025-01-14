// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const masterProdukAsuransi = async (jns) => {
  const data = await axiosAuth.get("/produk/master-data", {
    params: {
      jenis_asuransi: jns,
    },
  });
  const res = { data: [] };
  if (data.status == 200) {
    res.data = data.data;
  }
  return res;
};
