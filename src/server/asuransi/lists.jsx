import {AuthGetApi} from "@/lib/fetchApi"

export async function readManyAsuransi(query){

    const {dataSource} = query

    const response = await AuthGetApi("/asuransi/master-data?" + new URLSearchParams({
        dataSource
    }))


    return {data:response,page:1}

}

export async function readManyAsuransiPending(query){
    const {search, dataSource} = query

    const response = await AuthGetApi("/asuransi/master-data-pending?" + new URLSearchParams({
        search,
        dataSource
      }))


    return {data:response,page:1}

}

export async function readManyAsuransiOke(query){
    const {search, dataSource} = query


    const response = await AuthGetApi("/asuransi/master-data-oke?" + new URLSearchParams({
        search,
        dataSource
      }))


    return {data:response,page:1}

}