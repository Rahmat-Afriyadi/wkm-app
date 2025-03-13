import { PostApi } from "@/lib/fetchApi";
export const updateState = async (data) => {
  let response = await PostApi(data, "/mst-update-state");
  return response;
};
