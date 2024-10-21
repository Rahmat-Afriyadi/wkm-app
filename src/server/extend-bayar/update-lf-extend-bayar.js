import { PostApi } from "@/lib/fetchApi";
export const updateLf = async (data) => {
  let response = await PostApi(data, "/extend-bayar/update-extend-bayar/lf");
  return response;
};
