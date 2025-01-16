import { AuthGetApi } from "@/lib/fetchApi";

export async function listAmbilData() {
  const response = await AuthGetApi("/customer-mtr/list-ambil-data");
  return { data: response.data, page: 1 };
}
