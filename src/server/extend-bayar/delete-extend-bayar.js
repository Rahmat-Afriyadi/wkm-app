import { DeleteApi } from "@/lib/fetchApi";
export const deleteExtendBayar = async (data) => {
  let response = await DeleteApi(data.id, "/extend-bayar/delete");
  return response;
};
