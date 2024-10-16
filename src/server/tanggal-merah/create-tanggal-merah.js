import { PostApi } from "@/lib/fetchApi";
export const inputTanggalMerah = async (data) => {
  let response = await PostApi(data, "/tgl-merah/create-tgl-merah");
  return response;
};
