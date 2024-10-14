// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const UploadTransaksiExcel = (formData) => {
  return axiosAuth.post("/transaksi/import-excell", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
