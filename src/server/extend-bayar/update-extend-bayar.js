import { PostApi } from "@/lib/fetchApi";
export const updateFa = async (data) => {
  let response = await PostApi(data, "/extend-bayar/update-extend-bayar");
  return response;
};
