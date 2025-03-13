import { AuthGetApi } from "@/lib/fetchApi";

export async function listAmbilData() {
  const response = await AuthGetApi("/customer-mtr/list-ambil-data");
  return { data: response.data, page: 1 };
}

export async function seflCount() {
  const response = await AuthGetApi("/customer-mtr/self-count");
  console.log("dari api ", response);
  return response;
}

export async function readAfterCall(query) {
  const { search, jns, sts, limit, pageParams } = query;

  const response = await AuthGetApi(
    "/customer-mtr/master-data?" +
      new URLSearchParams({
        search,
        jns,
        sts,
        limit,
        pageParams,
      })
  );

  const resultLength = await AuthGetApi(
    "/customer-mtr/master-data-count?" +
      new URLSearchParams({
        search,
        jns,
        sts,
      })
  );
  return {
    data: response,
    page: {
      total_rows: resultLength, // Total data
      total_pages: Math.ceil(resultLength / limit), // Total page
    },
  };
}

export async function listKartuBalikan(query) {
  const { search, limit, pageParams } = query;

  const response = await AuthGetApi(
    "/customer-mtr/master-data-balikan?" +
      new URLSearchParams({
        search,
        limit,
        pageParams,
      })
  );

  const resultLength = await AuthGetApi(
    "/customer-mtr/master-data-balikan-count?" +
      new URLSearchParams({
        search,
      })
  );
  return {
    data: response,
    page: {
      total_rows: resultLength, // Total data
      total_pages: Math.ceil(resultLength / limit), // Total page
    },
  };
}
