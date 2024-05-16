import {AuthGetApi} from "@/lib/fetchApi"

export async function readManyAsuransi(query){


    const response = await AuthGetApi("/asuransi/master-data")


    return {data:response,page:1}

}

export async function readManyAsuransiPending(query){
    const {search} = query

    const response = await AuthGetApi("/asuransi/master-data-pending?" + new URLSearchParams({
        search
      }))


    return {data:response,page:1}

}

export async function readManyAsuransiOke(query){


    const response = await AuthGetApi("/asuransi/master-data-oke")


    return {data:response,page:1}

}