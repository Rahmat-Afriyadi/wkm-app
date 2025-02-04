import { AuthGetApi } from "@/lib/fetchApi";

export async function detailAmbilData(no_msn) {
  if (no_msn != "") {
    const response = await AuthGetApi("/customer-mtr/show/" + no_msn);
    return response;
  }
  return { data: {} };
}
