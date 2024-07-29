import {AuthGetApi} from "@/lib/fetchApi"

export async function readManyAsuransi(query){

    const {dataSource, sts, search, limit, pageParams, tgl1, tgl2, ap} = query

    const response = await AuthGetApi("/asuransi/master-data/" + sts + "?" + new URLSearchParams({
        dataSource,
        search,
        tgl1,
        tgl2,
        limit,
        ap,
        pageParams
    }))

    const resultLength = await AuthGetApi("/asuransi/master-data-count/" + sts + "?" + new URLSearchParams({
        dataSource,
        search,
        tgl1,
        tgl2,
        ap,
    }))


    return {data:response, page: {
        total_rows: resultLength, // Total data
        total_pages: Math.ceil(resultLength  / limit), // Total page
    }}

}

export async function readManyOtr(query){

    const {search, limit, pageParams} = query

    const response = await AuthGetApi("/otr/master-data?" + new URLSearchParams({
        search,
        limit,
        pageParams
    }),"otr")

    const resultLength = await AuthGetApi("/otr/master-data-count?" + new URLSearchParams({
        search,
    }),"otr")


    return {data:response, page: {
        total_rows: resultLength, // Total data
        total_pages: Math.ceil(resultLength  / limit), // Total page
    }}

}

export async function readManyTransaksi(query){

    const {search, limit, pageParams} = query

    const response = await AuthGetApi("/transaksi/master-data?" + new URLSearchParams({
        search,
        limit,
        pageParams
    }))

    const resultLength = await AuthGetApi("/transaksi/master-data-count?" + new URLSearchParams({
        search,
    }))


    return {data:response, page: {
        total_rows: resultLength, // Total data
        total_pages: Math.ceil(resultLength  / limit), // Total page
    }}

}

export async function readManyMstMtr(query){

    const {search, limit, pageParams} = query

    const response = await AuthGetApi("/mst-mtr/master-data?" + new URLSearchParams({
        search,
        limit,
        pageParams
    }))

    const resultLength = await AuthGetApi("/mst-mtr/master-data-count?" + new URLSearchParams({
        search,
    }))


    return {data:response, page: {
        total_rows: resultLength, // Total data
        total_pages: Math.ceil(resultLength  / limit), // Total page
    }}

}

export async function readManyProduk(query){

    const {search, jenis_asuransi, limit, pageParams} = query

    const response = await AuthGetApi("/produk/master-data?" + new URLSearchParams({
        search,
        jenis_asuransi,
        limit,
        pageParams
    }))

    const resultLength = await AuthGetApi("/produk/master-data-count?" + new URLSearchParams({
        search,
        jenis_asuransi,
    }))


    return {data:response, page: {
        total_rows: resultLength, // Total data
        total_pages: Math.ceil(resultLength  / limit), // Total page
    }}

}

export async function readManyVendor(query){

    const {search, jenis_asuransi, limit, pageParams} = query

    const response = await AuthGetApi("/vendor/master-data?" + new URLSearchParams({
        search,
        limit,
        pageParams
    }))

    const resultLength = await AuthGetApi("/vendor/master-data-count?" + new URLSearchParams({
        search,
        jenis_asuransi,
    }))


    return {data:response, page: {
        total_rows: resultLength, // Total data
        total_pages: Math.ceil(resultLength  / limit), // Total page
    }}

}

export async function readManyApproval(query){

    const {search, limit, pageParams, tgl1, tgl2, sb} = query

    const response = await AuthGetApi("/asuransi/master-approval?" + new URLSearchParams({
        search,
        sb,
        tgl1,
        tgl2,
        limit,
        pageParams
    }))

    const resultLength = await AuthGetApi("/asuransi/master-approval-count?" + new URLSearchParams({
        search,
        sb,
        tgl1,
        tgl2,
    }))


    return {data:response, page: {
        total_rows: resultLength, // Total data
        total_pages: Math.ceil(resultLength  / limit), // Total page
    }}

}

export async function readManyRekapAsuransi(query){

    const {tgl1, tgl2} = query
    const response = await AuthGetApi("/asuransi/master-data-rekap?" + new URLSearchParams({
        tgl1,
        tgl2,
    }))


    return {data:response,page:1}

}

export async function rekapAsuransiByStatusKdUser(query){

    const {tgl1, tgl2} = query
    const response = await AuthGetApi("/asuransi/rekap-by-status-kduser?" + new URLSearchParams({
        tgl1,
        tgl2,
    }))


    return {data:response,page:1}

}