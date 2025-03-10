import { PostApi } from "@/lib/fetchApi";
export const updateInputBayar = async (data) => {
  let response = await PostApi(data, "/faktur-3/input-bayar");
  if (data.type_kartu == "E") {
    await PostApi(data, "/ecardplus/input-bayar");
  }
  return response;
};
