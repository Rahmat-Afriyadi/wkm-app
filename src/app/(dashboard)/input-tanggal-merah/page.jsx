"use server";

import PageFrame from "./page-frame";
import TableFrame from "./table-frame";
import { Suspense } from "react";

export default async function Page({ searchParams }) {
  return (
    <PageFrame>
      <Suspense key={searchParams}>
        <TableFrame searchParams={searchParams} />
      </Suspense>
    </PageFrame>
  );
}
