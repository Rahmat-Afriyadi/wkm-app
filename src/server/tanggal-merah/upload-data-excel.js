// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const UploadTanggalMerahExcel = (formData) => {
  return axiosAuth.post("/tgl-merah/upload-excel", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
