import { PostApi } from "@/lib/fetchApi";
export const updateTanggalMerah = async (data) => {
  let response = await PostApi(data, "/tgl-merah/update-tgl-merah");
  return response;
};
