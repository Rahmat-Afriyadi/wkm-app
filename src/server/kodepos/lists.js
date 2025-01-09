import { AuthGetApi } from "@/lib/fetchApi";

export async function readManyKodepos(query) {
  const response = await AuthGetApi("/kodepos/master-data?" +new URLSearchParams({search:query.search}));

  return { data: response, page: 1 };
}
