import { PostApi } from "@/lib/fetchApi";
export const updateInputBayar = async (data) => {
  console.log("ini response yaa ", data);
  let response = await PostApi(data, "/asuransi/update");
  return response;
};
