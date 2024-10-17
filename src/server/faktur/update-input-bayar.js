import { PostApi } from "@/lib/fetchApi";
export const updateInputBayar = async (data) => {
  let response = await PostApi(data, "/faktur-3/input-bayar");
  return response;
};
