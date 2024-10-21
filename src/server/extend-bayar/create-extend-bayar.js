import { PostApi } from "@/lib/fetchApi";
export const inputExtendBayar = async (data) => {
  let response = await PostApi(data, "/extend-bayar/create-extend-bayar");
  return response;
};
