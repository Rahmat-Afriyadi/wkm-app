import {AuthGetApi} from "@/lib/fetchApi"

export async function readManyAsuransi(query){


    const response = await AuthGetApi("/asuransi/master-data")


    return {data:response,page:1}

}