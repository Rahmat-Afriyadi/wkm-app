import { AuthGetApi } from "../../../../lib/fetchApi";
import AsuransiDetailPage from "@/components/asuransi/detail";

export default async function Page({ params, searchParams }) {
  const { no_msn } = params;
  const asuransi = await AuthGetApi("/asuransi/" + no_msn);
  const kodepos = await AuthGetApi(
    "/kodepos/master-data?" +
      new URLSearchParams({
        search: searchParams.search_query,
      })
  );
  const dealer = [];
  // const dealer = await AuthGetApi("/dealer/master-data")
  // const dealer = await AuthGetApi(
  //     "/dealer/master-data?" +
  //     new URLSearchParams({
  //         search: searchParams.search_query,
  //     })
  // )
  return (
    <main className="h-full min-h-screen p-5">
      <AsuransiDetailPage asuransi={asuransi} kodepos={kodepos} dealerList={dealer} />
    </main>
  );
}
