import { PostApi } from "@/lib/fetchApi";
export const searchFaktur = async (data) => {
  let response = await PostApi(data, "/faktur-3/search/will-bayar");
  return response;
};
