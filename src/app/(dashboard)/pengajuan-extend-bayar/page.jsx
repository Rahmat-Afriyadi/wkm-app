"use server";

import ListItem from "./list-items";
import PageFrame from "./page-frame";
import { Suspense } from "react";
import TableFrame from "./table-frame";

export default async function Page({ params, searchParams }) {
  return (
    <PageFrame>
      <Suspense key={searchParams}>
        <TableFrame searchParams={searchParams} />
      </Suspense>
    </PageFrame>
  );
}
