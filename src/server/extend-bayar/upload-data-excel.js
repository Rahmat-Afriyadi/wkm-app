// import { axiosAuth } from "@/lib/axios";
import { axiosAuth } from "@/lib/axios";

export const UploadExtendBayarExcel = (formData) => {
  return axiosAuth.post("/extend-bayar/upload-excel", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
