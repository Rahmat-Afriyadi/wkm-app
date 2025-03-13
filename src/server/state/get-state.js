import { AuthGetApi } from "@/lib/fetchApi";
export const getState = async (tipe) => {
  let response = await AuthGetApi("/mst-get-state/" + tipe);
  return response;
};
