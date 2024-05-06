import {AuthGetApi} from "@/lib/fetchApi"

export async function readManyAsuransi(query){


    const response = await AuthGetApi("/asuransi/master-data")
    console.log("ini response 1 ", response)


    return {data:response,page:1}

}