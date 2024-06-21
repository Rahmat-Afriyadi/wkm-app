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

export async function readManyApproval(query){

    const {search, limit, pageParams, tgl1, tgl2} = query

    const response = await AuthGetApi("/asuransi/master-approval?" + new URLSearchParams({
        search,
        tgl1,
        tgl2,
        limit,
        pageParams
    }))

    const resultLength = await AuthGetApi("/asuransi/master-approval-count?" + new URLSearchParams({
        search,
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