import { DeleteApi } from "@/lib/fetchApi";
export const deleteTanggalMerah = async (data) => {
  let response = await DeleteApi(data.id, "/tgl-merah/delete");
  return response;
};
