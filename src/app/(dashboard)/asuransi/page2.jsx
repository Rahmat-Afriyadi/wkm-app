import { Suspense } from "react";
import SiteFrame from "./page-frame";
import ListSites from "./list-items";
import LoadingPage  from "@/components/LoadingPage/index";

export default function SitePage({searchParams}){


    const pageParams = searchParams?.page ;
    const limit = searchParams?.limit;
    const search = searchParams?.search_query;
    const active = searchParams?.active;
    const period = searchParams?.period;
    const offset = limit * (pageParams - 1);
    const sortBy = searchParams?.sortBy;


    return (
        <SiteFrame>
            <Suspense key={pageParams+limit+search+active+period+offset+sortBy} fallback={<LoadingPage/>}>
                <ListSites searchParams={searchParams}/>
            </Suspense>
        </SiteFrame>
    )
}