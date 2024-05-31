import {AuthGetApi} from "@/lib/fetchApi"

export async function readManyAsuransi(query){

    const {dataSource, sts, search, limit, pageParams} = query

    const response = await AuthGetApi("/asuransi/master-data/" + sts + "?" + new URLSearchParams({
        dataSource,
        search,
        limit,
        pageParams
    }))

    const resultLength = await AuthGetApi("/asuransi/master-data-count/" + sts + "?" + new URLSearchParams({
        dataSource,
        search,
    }))


    return {data:response, page: {
        total_rows: resultLength, // Total data
        total_pages: Math.ceil(resultLength  / limit), // Total page
    }}

}

export async function readManyRekapAsuransi(query){


    const response = await AuthGetApi("/asuransi/master-data-rekap")


    return {data:response,page:1}

}