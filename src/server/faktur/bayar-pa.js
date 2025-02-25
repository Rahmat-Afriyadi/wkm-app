import { PostApi } from "@/lib/fetchApi";
export const inputBayarPA = async (data) => {
  let response = await PostApi(data, "/faktur-3/input-bayar/asuransi-pa");
  return response;
};
