"use server"

import ListItem from "./list-items"
import PageFrame from "./page-frame"

export default async function Page({params, searchParams}){

    return (
        <PageFrame>
            <ListItem searchParams={searchParams}/>
        </PageFrame>
    )
}