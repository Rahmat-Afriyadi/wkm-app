import { PostApi } from "@/lib/fetchApi";
export const searchFaktur = async (data) => {
  console.log("ini function ", data);
  let response = await PostApi(data, "/faktur-3/search/will-bayar");
  console.log("response ", response);
  return response;
};
