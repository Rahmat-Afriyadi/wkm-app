"use server";
import dynamic from "next/dynamic";
const FormInputTelesales = dynamic(() => import("@/components/form/telesales/form-input-telesales"));
import { AuthGetApi } from "../../../../../lib/fetchApi";

import { detailAmbilData } from "@/server/telesales/show";
import { formatDate, formatDateIndo } from "@/lib/utils/format-date";
import { Suspense } from "react";
import { formatCurrency } from "@/lib/utils/format-currentcy";

export default async function Page({ params }) {
  const { no_msn } = params;
  // const { data: faktur, isLoading } = useQuery({
  //   queryKey: ["detail-ambil-data", { no_msn }],
  //   queryFn: async () => await detailAmbilData(no_msn),
  //   initialData: { data: {} },
  // });

  // if (isLoading) {
  //   return "Loading...";
  // }

  const faktur = await AuthGetApi("/customer-mtr/show/" + no_msn);

  if (faktur.data.asuransi_pa?.id !== "" && faktur.data.asuransi_pa?.id !== undefined) {
    faktur.data.asuransi_pa_id = faktur.data.asuransi_pa?.id;
    faktur.data.id_produk_asuransi_pa = faktur.data.asuransi_pa.id_produk;
    faktur.data.nm_produk_asuransi_pa = faktur.data.asuransi_pa.produk.nm_produk;
    faktur.data.nm_vendor_pa = faktur.data.asuransi_pa.produk.vendor.nm_vendor;
    faktur.data.rate_pa = faktur.data.asuransi_pa.produk.rate;
    faktur.data.admin_pa = faktur.data.asuransi_pa.produk.admin;
    faktur.data.amount_asuransi_pa = formatCurrency("" + faktur.data.asuransi_pa.amount_asuransi_pa);
  }
  if (faktur.data.asuransi_mtr?.id !== "" && faktur.data.asuransi_mtr?.id !== undefined) {
    faktur.data.asuransi_mtr_id = faktur.data.asuransi_mtr?.id;
    faktur.data.id_produk_asuransi_mtr = faktur.data.asuransi_mtr.id_produk;
    faktur.data.nm_produk_asuransi_mtr = faktur.data.asuransi_mtr.produk.nm_produk;
    faktur.data.warna = faktur.data.asuransi_mtr.warna;
    faktur.data.nm_vendor_mtr = faktur.data.asuransi_mtr.id_produk;
    faktur.data.rate_mtr = faktur.data.asuransi_mtr.produk.rate;
    faktur.data.admin_mtr = faktur.data.asuransi_mtr.produk.admin;
  }
  if (faktur.data.memberships?.length > 0) {
    faktur.data.membership_id = faktur.data?.memberships[0].id;
    faktur.data.kd_promo_transfer = faktur.data?.memberships[0].kd_promo_transfer;
    faktur.data.kirim_ke = faktur.data?.memberships[0].kirim_ke;
    faktur.data.jns_bayar = faktur.data?.memberships[0].jns_bayar;
    faktur.data.jns_membership = faktur.data?.memberships[0].jns_membership;
    faktur.data.type_kartu = faktur.data?.memberships[0].type_kartu;
    faktur.data.tgl_janji_bayar = faktur.data?.memberships[0].tgl_janji_bayar?.substring(0, 10);
  }
  faktur.data.tgl_lahir_wkm = faktur.data?.tgl_lahir_wkm ? formatDate(new Date(faktur.data?.tgl_lahir_wkm)) : "";
  faktur.data.desc_tgl_faktur = faktur.data?.tgl_faktur ? formatDateIndo(faktur.data?.tgl_faktur) : "";
  faktur.data.desc_tgl_lahir_fkt = faktur.data?.tgl_lahir_fkt ? formatDateIndo(faktur.data?.tgl_lahir_fkt) : "";
  faktur.data.asuransi_mtr_tahun = new Date(faktur.data?.tgl_faktur).getFullYear();
  faktur.data.asuransi_nm_mtr = faktur.data?.nm_mtr;
  faktur.data.asuransi_no_mtr = faktur.data?.no_mtr;

  if (faktur.data.no_yg_dihub_ts == 1) {
    faktur.data.no_hub = faktur.data.no_hp_fkt;
  } else if (faktur.data.no_yg_dihub_ts == 2) {
    faktur.data.no_hub = faktur.data.no_hp_wkm;
  } else if (faktur.data.no_yg_dihub_ts == 4) {
    faktur.data.no_hub = faktur.data.no_telp_fkt;
  } else if (faktur.data.no_yg_dihub_ts == 5) {
    faktur.data.no_hub = faktur.data.no_telp_wkm;
  }

  if (faktur.data.sts_membership == "F") {
    faktur.data.tgl_prospect_membership = faktur.data?.tgl_prospect_membership.substring(0, 10);
  }
  if (faktur.data.sts_asuransi_pa == "F") {
    faktur.data.tgl_prospect_asuransi_pa = faktur.data?.tgl_prospect_asuransi_pa.substring(0, 10);
  }
  if (faktur.data.sts_asuransi_mtr == "F") {
    faktur.data.tgl_prospect_asuransi_mtr = faktur.data?.tgl_prospect_asuransi_mtr.substring(0, 10);
  }

  if (faktur.data.jns_jual_fkt == 1) {
    faktur.data.jns_jual_fkt_ket = "Cash";
  } else if (faktur.data.jns_jual_fkt == 2) {
    faktur.data.jns_jual_fkt_ket = "Kredit";
  }

  if (faktur.data.ket_wa_info == 1) {
    faktur.data.no_info = faktur.data.no_hp_fkt;
  } else if (faktur.data.ket_wa_info == 2) {
    faktur.data.no_info = faktur.data.no_hp_wkm;
  } else if (faktur.data.ket_wa_info == 4) {
    faktur.data.no_info = faktur.data.no_telp_fkt;
  } else if (faktur.data.ket_wa_info == 5) {
    faktur.data.no_info = faktur.data.no_telp_wkm;
  }

  if (faktur.data.no_kartu2 != "") {
    if (faktur.data.no_kartu2?.slice(2, 4) == "02") {
      faktur.data.jns_membership_sebelum = "Gold";
    } else if (faktur.data.no_kartu2?.slice(2, 4) == "03") {
      faktur.data.jns_membership_sebelum = "Platinum";
    } else if (faktur.data.no_kartu2?.slice(2, 4) == "23") {
      faktur.data.jns_membership_sebelum = "Platinum Plus";
    }
  }

  return (
    <>
      <Suspense key={no_msn}>
        <FormInputTelesales defaultValues={faktur.data} isEditing={true} />
      </Suspense>
    </>
  );
}
