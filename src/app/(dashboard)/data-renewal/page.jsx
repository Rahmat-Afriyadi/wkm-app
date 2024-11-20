
import PageFrame from "./page-frame"
import { AuthGetApi, PostApi } from "@/lib/fetchApi";
import ListAsuransi from "./list-items"
import ListAsuransiTS from "./list-items-ts"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page({searchParams}) {
    const today = new Date()
    const currentYear = today.getFullYear(); // Tahun sekarang
    const currentMonth = today.getMonth();
    const session = await getServerSession(authOptions);

    const data = await PostApi({
        year : parseInt(searchParams.year),
        month : parseInt(searchParams.month),
    },"/data-renewal") 

    // console.log(data)
    
    return (
        <>
            <PageFrame data={data.data}>
              
            </PageFrame>
        </>
    )
}
