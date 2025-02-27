"use client";
import dynamic from "next/dynamic";
const FormInputTelesales = dynamic(() => import("@/components/form/telesales/form-input-telesales"));
const ModalListFaktur = dynamic(() => import("../../modal/list-faktur"));
const TableAmbilData = dynamic(() => import("@/components/form/telesales/table-ambil-data"));
// import FormInputTelesales from "@/components/form/telesales/form-input-telesales";
// import ModalListFaktur from "../../modal/list-faktur";
// import TableAmbilData from "@/components/form/telesales/table-ambil-data";

import { detailAmbilData } from "@/server/telesales/show";
import { formatDate } from "@/lib/utils/format-date";
import { useRouter } from "next/navigation";
import { listAmbilData } from "@/server/telesales/lists";
import { ambilData } from "@/server/telesales/ambil-data";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Suspense } from "react";
import { formatCurrency } from "@/lib/utils/format-currentcy";

export default function Page({ params, searchParams }) {
  const { no_msn } = params;
  const router = useRouter();

  const queryCLient = useQueryClient();
  const { data: faktur, isLoading } = useQuery({
    queryKey: ["detail-ambil-data", { no_msn }],
    queryFn: async () => await detailAmbilData(no_msn),
    initialData: { data: {} },
  });
  const { data: listAmbilData1 } = useQuery({
    queryKey: ["list-ambil-data-detail"],
    queryFn: async () => await listAmbilData(),
    initialData: { data: [{ no_msn: "" }] },
  });
  const ambilDataMut = useMutation({
    mutationFn: ambilData,
  });

  if (isLoading) {
    return "Loading...";
  }

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
  faktur.data.tgl_faktur = faktur.data?.tgl_faktur ? formatDate(new Date(faktur.data?.tgl_faktur)) : "";
  faktur.data.tgl_lahir_fkt = faktur.data?.tgl_lahir_fkt ? formatDate(new Date(faktur.data?.tgl_lahir_fkt)) : "";
  faktur.data.tgl_lahir_wkm = faktur.data?.tgl_lahir_wkm ? formatDate(new Date(faktur.data?.tgl_lahir_wkm)) : "";
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

  const handleAmbilData = (item) => {
    ambilDataMut.mutate(
      {
        no_msn: item.no_msn,
      },
      {
        onSuccess: (data) => {
          queryCLient.invalidateQueries({
            queryKey: ["list-ambil-data-detail"],
          });
          router.replace("/telesales/detail/" + item.no_msn);
          queryCLient.invalidateQueries({
            queryKey: ["detail-ambil-data", , { no_msn: item.no_msn }],
          });
        },
        onError: (e) => {
          queryCLient.invalidateQueries({ queryKey: ["list-ambil-data-detail"] });
          Swal.fire("Failed!", e.response.data.message, "error");
        },
      }
    );
  };

  return (
    <>
      <ModalListFaktur>
        <TableAmbilData options={listAmbilData1.data} handleChange={handleAmbilData} />
      </ModalListFaktur>
      <br />
      <Suspense key={no_msn + faktur.data.no_msn}>
        <FormInputTelesales defaultValues={faktur.data} isEditing={true} />
      </Suspense>
    </>
  );
}
