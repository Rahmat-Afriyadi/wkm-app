import { AuthGetApi } from "@/lib/fetchApi";

export async function readManyTglMerah(query) {
  const { search, limit, pageParams, tgl1, tgl2 } = query;

  const response = await AuthGetApi(
    "/tgl-merah/master-data?" +
      new URLSearchParams({
        search,
        limit,
        pageParams,
      })
  );

  const resultLength = await AuthGetApi(
    "/tgl-merah/master-data-count?" +
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

export async function readManyExtendBayar(query) {
  const { search, limit, pageParams } = query;

  const response = await AuthGetApi(
    "/otr/master-data?" +
      new URLSearchParams({
        search,
        limit,
        pageParams,
      }),
    "otr"
  );

  const resultLength = await AuthGetApi(
    "/otr/master-data-count?" +
      new URLSearchParams({
        search,
      }),
    "otr"
  );

  return {
    data: response,
    page: {
      total_rows: resultLength, // Total data
      total_pages: Math.ceil(resultLength / limit), // Total page
    },
  };
}

export async function readManyApprovalExtendBayar(query) {
  const { search, limit, pageParams } = query;

  const response = await AuthGetApi(
    "/transaksi/master-data?" +
      new URLSearchParams({
        search,
        limit,
        pageParams,
      })
  );

  const resultLength = await AuthGetApi(
    "/transaksi/master-data-count?" +
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
