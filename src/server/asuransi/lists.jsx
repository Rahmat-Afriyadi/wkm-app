import {AuthGetApi} from "@/lib/fetchApi"

export async function readManyAsuransi(query){

    const {dataSource, sts, search} = query

    const response = await AuthGetApi("/asuransi/master-data/" + sts + "?" + new URLSearchParams({
        dataSource,
        search
    }))


    return {data:response,page:1}

}

export async function readManyRekapAsuransi(query){


    const response = await AuthGetApi("/asuransi/master-data-rekap")


    return {data:response,page:1}

}