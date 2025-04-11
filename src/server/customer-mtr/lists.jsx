import { AuthGetApi } from "@/lib/fetchApi";

export async function readManyListPerKecamatan(query) {
  const {  search, limit, pageParams, tgl1, tgl2 } = query;

  const response = await AuthGetApi(
    "/customer-mtr/rekap-per-kecamatan?" +
      new URLSearchParams({
        search,
        tgl1,
        tgl2,
        limit,
        pageParams,
      })
  );

  return {
    data: response,
  };
}

export async function readManyListPerformanceTs(query) {
  const {  search, limit, pageParams, tgl1, tgl2 } = query;

  const response = await AuthGetApi(
    "/customer-mtr/list-performance?" +
      new URLSearchParams({
        tgl1,
        tgl2,
      })
  );

  return {
    data: response,
  };
}

export async function readManyBerminatMembership(query) {
  const {  search, limit, pageParams, tgl1, tgl2 } = query;

  const response = await AuthGetApi(
    "/customer-mtr/list-berminat-membership?" +
      new URLSearchParams({
        search,
        tgl1,
        tgl2,
        limit,
        pageParams,
      })
  );

  return {
    data: response,
  };
}

export async function readManyBerminatAsuransiPA(query) {
  const {  search, limit, pageParams, tgl1, tgl2 } = query;

  const response = await AuthGetApi(
    "/customer-mtr/list-berminat-asuransi-pa?" +
      new URLSearchParams({
        search,
        tgl1,
        tgl2,
        limit,
        pageParams,
      })
  );

  return {
    data: response,
  };
}

export async function readManyBerminatAsuransiMtr(query) {
  const {  search, limit, pageParams, tgl1, tgl2 } = query;

  const response = await AuthGetApi(
    "/customer-mtr/list-berminat-asuransi-mtr?" +
      new URLSearchParams({
        search,
        tgl1,
        tgl2,
        limit,
        pageParams,
      })
  );

  return {
    data: response,
  };
}

