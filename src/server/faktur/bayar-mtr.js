import { PostApi } from "@/lib/fetchApi";
export const inputBayarMtr = async (data) => {
  let response = await PostApi(data, "/faktur-3/input-bayar/asuransi-mtr");
  return response;
};
