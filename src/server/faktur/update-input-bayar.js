import { PostApi } from "@/lib/fetchApi";
export const updateInputBayar = async (data) => {
  let response = await PostApi(data, "/asuransi/update");
  return response;
};
