"use client";
import dynamic from "next/dynamic";

import React, { useEffect, useState } from "react";
const InputGroup = dynamic(() => import("@/components/Input/input-group"), { ssr: false });
const TextAreaGroup = dynamic(() => import("@/components/Input/text-area-group"), { ssr: false });
const RadioButtonComponent = dynamic(() => import("@/components/Input/radio-button"), { ssr: false });
const SearchableSelect = dynamic(() => import("@/components/Input/searchable-select"), { ssr: false });
const SelectGroup = dynamic(() => import("@/components/Input/select-group"), { ssr: false });
const TableProdukAsuransi = dynamic(() => import("./table-produk-asuransi"), { ssr: false });
const ModalMotor = dynamic(() => import("@/components/Modal/mtr/modal-mtr"), { ssr: false });
const Drawer = dynamic(() => import("@/components/drawer/drawer"));
const DrawerCenter = dynamic(() => import("@/components/drawer/drawer-center"));

// import InputGroup from "@/components/Input/input-group";
// import TextAreaGroup from "@/components/Input/text-area-group";
// import RadioButtonComponent from "@/components/Input/radio-button";
// import SearchableSelect from "@/components/Input/searchable-select";
// import SelectGroup from "@/components/Input/select-group";
// import Drawer from "@/components/drawer/drawer";
// import DrawerCenter from "@/components/drawer/drawer-center";

import { Form, useForm } from "react-hook-form";
import { ArrowDownCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils/format-currentcy";
import Swal from "sweetalert2";
import Link from "next/link";

import { updateOkeMembership } from "@/server/customer/oke-membership";
import { masterKodepos } from "@/server/kodepos/master-kodepos";
import { masterAktifJual } from "@/server/master/aktif-jual";
import { masterJenisKartu } from "@/server/master/jenis-kartu";
import { masterPromoTransfer } from "@/server/master/promo-transfer";
import { masterProdukAsuransi } from "@/server/master/produk-asuransi";
import { masterScript } from "@/server/master/script";
import { masterAlasanTdkMembership } from "@/server/master/alasan_tdk_membership";
import { detailOtrNoMtr } from "@/server/otr/otr-no-mtr";
import { useRouter, useSearchParams } from "next/navigation";

export default function FormInputTelesales({ defaultValues, isEditing = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors },
  } = useForm({ defaultValues: isEditing ? defaultValues : {} });

  const kirimKe = watch("kirim_ke");
  const ketNmWkm = watch("ket_nm_wkm");
  const ketNoKtp = watch("ket_no_ktpnpwp_wkm");
  const ketAlamatWkm = watch("ket_alamat_wkm");
  const ketWaInfo = watch("ket_wa_info");
  const ketNoHpFkt = watch("ket_no_hp_fkt");
  const ketNoTelpFkt = watch("ket_no_telp_fkt");
  const ketHubTs = watch("no_yg_dihub_ts");
  const selectedKodepos = watch("kodepos");
  const selectedKodeposKtr = watch("kodepos_ktr_wkm_1");
  const noMtrAsuransi = watch("asuransi_no_mtr");
  const tahunMtr = watch("asuransi_mtr_tahun");
  const otrValue = watch("otr");
  const rateMtr = watch("rate_mtr");
  const amountValue = watch("amount");
  const biayaAdminMtr = watch("admin_mtr");
  const jnsMembership = watch("jns_membership");
  const alasanTdkMembershipSelected = watch("alasan_tdk_membership");
  const jnsMembershipName = watch("jns_membership_name");
  const jnsBayar = watch("jns_bayar");
  const stsMembership = watch("sts_membership");
  const stsAsuransiPa = watch("sts_asuransi_pa");
  const stsAsuransiMtr = watch("sts_asuransi_mtr");
  const alasanPendingMembership = watch("alasan_pending_membership");
  const membershipId = watch("membership_id");
  const asuransiPaId = watch("asuransi_pa_id");
  const asuransiMtrId = watch("asuransi_mtr_id");

  const onSubmit = async (values) => {
    console.log("ini values yaa ", values);
    if (values.sts_stnk == 1) {
      values.sts_stnk = "O";
    } else {
      values.sts_stnk = "T";
    }
    event.preventDefault();
    if (values.sts_membership !== "P" && values.sts_membership !== "O") {
      if ((values.sts_asuransi_pa == "P" || values.sts_asuransi_pa == "F") && popUpPa == 1) {
        return Swal.fire({
          title: "Apakah kamu sudah menawarkan produk Asuransi PA",
          icon: "question",
          confirmButtonColor: "#0891B2",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oke",
          showLoaderOnConfirm: true,
        }).then(() => {
          setFocus("sts_asuransi_pa");
          setMenuTab(2);
          setPopUpPa(0);
        });
      }

      if ((values.sts_asuransi_mtr == "P" || values.sts_asuransi_mtr == "F") && popUpMtr == 1) {
        return Swal.fire({
          title: "Apakah kamu sudah menawarkan produk Asuransi Motor",
          icon: "question",
          confirmButtonColor: "#0891B2",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oke",
          showLoaderOnConfirm: true,
        }).then((e) => {
          setFocus("sts_asuransi_mtr");
          setMenuTab(2);
          setAsuransiTypeTab(2);
          setPopUpMtr(0);
        });
      }

      if (
        !values.sts_stnk &&
        now.getFullYear() > tglFaktur.getFullYear() &&
        now.getMonth() + 1 == tglFaktur.getMonth() &&
        popUpStnk == 1
      ) {
        return Swal.fire({
          title: "Apakah Kamu Sudah Menawarkan Untuk perpanjang STNK",
          icon: "question",
          confirmButtonColor: "#0891B2",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oke",
          showLoaderOnConfirm: true,
        }).then((e) => {
          setPopUpStnk(0);
        });
      }
    }
    values.asuransi_mtr_otr = parseInt(values?.otr?.replace(/Rp\s?|,/g, ""));
    if (values.asuransi_mtr_otr < 1 && values.sts_asuransi_mtr == "O" && !values.asuransi_mtr_id) {
      return Swal.fire({
        title: "Mohon isi otr motor",
        icon: "question",
        confirmButtonColor: "#0891B2",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oke",
        showLoaderOnConfirm: true,
      }).then((e) => {
        setError("asuransi_mtr_otr", "This Field is Required");
      });
    }

    values.asuransi_mtr_amount = parseInt(values?.amount?.replace(/Rp\s?|,/g, ""));
    values.amount_asuransi_pa = parseInt(values?.amount_asuransi_pa?.replace(/Rp\s?|,/g, ""));
    values.asuransi_mtr_tahun = parseInt(values.asuransi_mtr_tahun);
    values.renewal_ke = parseInt(values.renewal_ke);
    values.tgl_faktur = new Date(values.tgl_faktur);
    values.tgl_lahir_fkt = new Date(values.tgl_lahir_fkt);
    values.tgl_lahir_wkm = new Date(values.tgl_lahir_wkm);
    values.tgl_janji_bayar = new Date(values.tgl_janji_bayar);
    if (values.sts_membership == "F" || values.tgl_prospect_membership != null) {
      values.tgl_prospect_membership = new Date(values.tgl_prospect_membership);
    }
    if (values.sts_asuransi_pa == "F" || values.tgl_prospect_asuransi_pa != null) {
      values.tgl_prospect_asuransi_pa = new Date(values.tgl_prospect_asuransi_pa);
    }
    if (values.sts_asuransi_mtr == "F" || values.tgl_prospect_asuransi_mtr != null) {
      values.tgl_prospect_asuransi_mtr = new Date(values.tgl_prospect_asuransi_mtr);
    }
    Swal.fire({
      title: "Apakah data yang dimasukan sudah benar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0891B2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        mutUpdateCustomer.mutate(values, {
          onSuccess: (data) => {
            queryCLient.invalidateQueries({
              queryKey: [
                "data-pending-membership",
                "data-pending-asuransi-pa",
                "data-pending-asuransi-mtr",
                "data-prospect-membership",
                "data-prospect-asuransi-pa",
                "data-prospect-asuransi-mtr",
              ],
            });
            Swal.fire("Success!", "Input Update Berhasil", "info").then(() => {
              router.push(`/pending/membership?${params}`);
            });
          },
          onError: (e) => {
            console.log("ini error ", e);
            Swal.fire("Failed!", e.response.data.message, "error");
          },
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const handleRpChange = (e, field) => {
    const inputValue = e.target.value.replace(/Rp\s?|,/g, ""); // Remove existing currency symbol and commas
    const formattedValue = formatCurrency(inputValue);
    setValue(field, formattedValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const now = new Date();
  const tglFaktur = new Date(defaultValues?.tgl_faktur);
  const validasiNoTelp = ["1", "1A", "1B"];
  const validasiAlamat = ["1", "2", "4"];
  const validasiAlasanTidak = ["Telp bermasalah", "Telp tidak diangkat/aktif"];

  const [openKodepos, setOpenKodepos] = useState(false);
  const [openKodeposKtr, setOpenKodeposKtr] = useState(false);
  const [popUpPa, setPopUpPa] = useState(1);
  const [popUpMtr, setPopUpMtr] = useState(1);
  const [popUpStnk, setPopUpStnk] = useState(1);
  const [openScript, setOpenScript] = useState(false);
  const [openMstMtr, setOpenMstMtr] = useState(false);
  const [validHub, setValidHub] = useState(false);
  const [openProdukMembership, setOpenProdukMembership] = useState(false);
  const [openProdukAsuransiPa, setOpenProdukAsuransiPa] = useState(false);
  const [openProdukAsuransiMtr, setOpenProdukAsuransiMtr] = useState(false);
  const [disabledOkeMembership, setDisabledOkeMembership] = useState(true);
  const [disabledOkeAsuransiMtr, setDisabledOkeAsuransiMtr] = useState(true);
  const [disabledOkeAsuransiPa, setDisabledOkeAsuransiPa] = useState(true);
  const [disabledPromoTransfer, setDisabledPromotTransfer] = useState(true);
  const [telpBermasalah, setTelpBermasalah] = useState(false);
  const [isRequired, setIsRequired] = useState(false);

  const [menuTab, setMenuTab] = useState(1);
  const [asuransiTypeTab, setAsuransiTypeTab] = useState(1);

  const queryCLient = useQueryClient();
  const mutUpdateCustomer = useMutation({
    mutationFn: updateOkeMembership,
  });
  const { data: kodepos } = useQuery({
    queryKey: ["kodepos"],
    refetchOnWindowFocus: false,
    queryFn: async () => await masterKodepos(),
    initialData: { data: [{ value: "", nama: "" }] },
  });
  const { data: alasanTdkMembership } = useQuery({
    queryKey: ["alasan-tdk-membership", stsMembership],
    refetchOnWindowFocus: false,
    queryFn: async () => await masterAlasanTdkMembership(stsMembership),
    initialData: { data: [{ value: "", nama: "" }] },
  });
  const { data: aktifJual } = useQuery({
    queryKey: ["aktif-jual"],
    refetchOnWindowFocus: false,
    queryFn: async () => await masterAktifJual(),
    initialData: { data: [{ value: "", nama: "" }] },
  });
  const { data: produkAsuransiMtr } = useQuery({
    queryKey: ["produk-asuransi-mtr"],
    refetchOnWindowFocus: false,
    queryFn: async () => await masterProdukAsuransi(1),
    initialData: { data: [{ id: "", nama: "", rate: 0 }] },
  });
  const { data: produkAsuransiPa } = useQuery({
    queryKey: ["produk-asuransi-pa"],
    refetchOnWindowFocus: false,
    queryFn: async () => await masterProdukAsuransi(2),
    initialData: { data: [{ id: "", nama: "", rate: 0 }] },
  });
  const { data: produkMembership } = useQuery({
    queryKey: ["produk-membership"],
    refetchOnWindowFocus: false,
    queryFn: async () => await masterJenisKartu(),
    initialData: { data: [] },
  });
  const { data: promoTransfer } = useQuery({
    queryKey: ["promo-transfer"],
    refetchOnWindowFocus: false,
    queryFn: async () => await masterPromoTransfer(),
    initialData: { data: [] },
  });
  const { data: scripts } = useQuery({
    queryKey: ["scripts"],
    refetchOnWindowFocus: false,
    queryFn: async () => await masterScript(),
    initialData: { data: [] },
  });

  const { data: detailOtr } = useQuery({
    queryKey: ["detail-otr-no-mtr", noMtrAsuransi, tahunMtr],
    refetchOnWindowFocus: false,
    queryFn: async () => await detailOtrNoMtr({ no_mtr: noMtrAsuransi, tahun: parseInt(tahunMtr, 10) }),
    initialData: { data: { id: "", otr: 0, tahun: 0, no_mtr: "" } },
  });

  useEffect(() => {
    if (selectedKodepos) {
      const fillKodepos = selectedKodepos.split(", ");
      setValue("kodepos_wkm", fillKodepos[3]);
      setValue("kel_wkm", fillKodepos[2]);
      setValue("kec_wkm", fillKodepos[1]);
      setValue("kota_wkm", fillKodepos[0]);
    }
  }, [selectedKodepos]); // eslint-disable-line

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === "ArrowDown") {
  //       console.log("Tombol panah bawah ditekan!");
  //       console.log("Down");
  //     }
  //   };

  //   const handleKeyUp = (event) => {
  //     if (event.key === "ArrowDown") {
  //       console.log("Up");
  //       router.push(`/telesales/detail/${defaultValues.no_msn}?${params}`);
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   window.addEventListener("keyup", handleKeyUp);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //     window.removeEventListener("keyup", handleKeyUp);
  //   };
  // }, []);

  useEffect(() => {
    if (selectedKodeposKtr) {
      const fillKodepos = selectedKodeposKtr.split(", ");
      setValue("kodepos_ktr_wkm", fillKodepos[3]);
      setValue("kel_ktr_wkm", fillKodepos[2]);
      setValue("kec_ktr_wkm", fillKodepos[1]);
      setValue("kota_ktr_wkm", fillKodepos[0]);
    }
  }, [selectedKodeposKtr]); // eslint-disable-line

  useEffect(() => {
    if (!defaultValues) return; // Early return jika defaultValues tidak ada

    const isDataReady = [produkMembership].every(Boolean);
    if (!isDataReady) return; // Early return jika ada data yang belum siap

    const fields = ["jns_membership_name"];

    fields.forEach((field) => {
      if (defaultValues?.[field]) {
        setValue(field, defaultValues[field]);
      }
    });
  }, [defaultValues, produkMembership]); // eslint-disable-line

  useEffect(() => {
    if (ketNmWkm == 1) {
      setValue("nm_customer_wkm", watch("nm_customer_fkt"));
    }
  }, [ketNmWkm]); // eslint-disable-line

  useEffect(() => {
    return setValue("jns_membership", produkMembership?.data.filter((e) => e.name == jnsMembershipName)[0]?.value);
  }, [jnsMembershipName]); // eslint-disable-line

  useEffect(() => {
    if (ketNoKtp == 1) {
      setValue("no_ktpnpwp_wkm", watch("no_ktpnpwp_fkt"));
    }
  }, [ketNoKtp]); // eslint-disable-line

  useEffect(() => {
    if (membershipId && stsMembership == "O") {
      setDisabledOkeMembership(true);
    } else {
      setDisabledOkeMembership(false);
    }
  }, [membershipId, stsMembership]); // eslint-disable-line

  useEffect(() => {
    if ((asuransiPaId && stsAsuransiPa == "O") || stsAsuransiPa == "M") {
      setDisabledOkeAsuransiPa(true);
    } else {
      setDisabledOkeAsuransiPa(false);
    }
  }, [asuransiPaId, stsAsuransiPa]); // eslint-disable-line

  useEffect(() => {
    if (asuransiMtrId && stsAsuransiMtr == "O") {
      setDisabledOkeAsuransiMtr(true);
    } else {
      setDisabledOkeAsuransiMtr(false);
    }
  }, [asuransiMtrId, stsAsuransiMtr]); // eslint-disable-line

  useEffect(() => {
    if (
      stsMembership == "F" ||
      stsAsuransiPa == "F" ||
      stsAsuransiMtr == "F" ||
      stsMembership == "T" ||
      stsAsuransiPa == "T" ||
      stsAsuransiMtr == "T"
    ) {
      setValidHub(true);
    } else {
      setValidHub(false);
    }
  }, [stsMembership, stsAsuransiPa, stsAsuransiMtr]); // eslint-disable-line

  useEffect(() => {
    if (ketWaInfo == 1 && validasiNoTelp.includes(ketNoHpFkt)) {
      setValue("no_wa", watch("no_hp_fkt"));
    } else if (ketWaInfo == 2) {
      setValue("no_wa", watch("no_hp_wkm"));
    } else if (ketWaInfo == 4 && validasiNoTelp.includes(ketNoTelpFkt)) {
      setValue("no_wa", watch("no_telp_fkt"));
    } else if (ketWaInfo == 5) {
      setValue("no_wa", watch("no_telp_wkm"));
    } else {
      setValue("no_wa", "");
    }
  }, [ketWaInfo, ketNoTelpFkt, ketNoHpFkt]); // eslint-disable-line

  useEffect(() => {
    if (ketHubTs == 1 && validasiNoTelp.includes(ketNoHpFkt)) {
      setValue("no_hub", watch("no_hp_fkt"));
    } else if (ketHubTs == 2) {
      setValue("no_hub", watch("no_hp_wkm"));
    } else if (ketHubTs == 4 && validasiNoTelp.includes(ketNoTelpFkt)) {
      setValue("no_hub", watch("no_telp_fkt"));
    } else if (ketHubTs == 5) {
      setValue("no_hub", watch("no_telp_wkm"));
    } else {
      setValue("no_hub", "");
    }
  }, [ketHubTs, ketNoTelpFkt, ketNoHpFkt]); // eslint-disable-line

  useEffect(() => {
    handleRpChange({ target: { value: "" + detailOtr.data.otr } }, "otr");
  }, [detailOtr]); // eslint-disable-line

  useEffect(() => {
    if (
      validasiAlasanTidak.includes(
        alasanTdkMembership?.data.filter((e) => e.value == alasanTdkMembershipSelected)[0]?.name
      ) &&
      stsMembership == "T"
    ) {
      setTelpBermasalah(true);
      if (stsAsuransiPa == "P" || stsAsuransiPa == "T") {
        setValue("sts_asuransi_pa", "T");
        setValue("alasan_tdk_asuransi_pa", alasanTdkMembershipSelected);
      }
      if (stsAsuransiMtr == "P" || stsAsuransiMtr == "T") {
        setValue("sts_asuransi_mtr", "T");
        setValue("alasan_tdk_asuransi_mtr", alasanTdkMembershipSelected);
      }
    } else {
      setTelpBermasalah(false);
    }
  }, [alasanTdkMembershipSelected, stsMembership]); // eslint-disable-line

  useEffect(() => {
    if (validasiAlamat.includes(ketAlamatWkm)) {
      setValue("kel_wkm", defaultValues.kel_fkt);
      setValue("kodepos_wkm", defaultValues.kodepos_fkt);
      setValue("kec_wkm", defaultValues.kec_fkt);
      setValue("kota_wkm", defaultValues.kota_fkt);
      setValue("alamat_wkm", defaultValues.alamat_fkt);
    } else {
      setValue("kel_wkm", "");
      setValue("kodepos_wkm", "");
      setValue("kec_wkm", "");
      setValue("kota_wkm", "");
      setValue("alamat_wkm", "");
    }
  }, [ketAlamatWkm]); // eslint-disable-line

  useEffect(() => {
    if (stsMembership == "P") {
      if (stsAsuransiPa == "P") {
        setValue("alasan_pending_asuransi_pa", alasanPendingMembership);
      }
      if (stsAsuransiMtr == "P") {
        setValue("alasan_pending_asuransi_mtr", alasanPendingMembership);
      }
    }
  }, [alasanPendingMembership]); // eslint-disable-line

  useEffect(() => {
    handleRpChange(
      {
        target: {
          value: "" + parseInt(otrValue?.replace(/Rp\s?|,/g, "") * (rateMtr / 100) + biayaAdminMtr),
        },
      },
      "amount"
    );
  }, [otrValue, rateMtr, biayaAdminMtr, detailOtr, amountValue]); // eslint-disable-line

  useEffect(() => {
    if (
      jnsBayar == "T" &&
      produkMembership?.data.filter((e) => {
        return e.value == jnsMembership && e.name.includes("PROMO FINTECH");
      }).length > 0
    ) {
      setDisabledPromotTransfer(false);
    } else {
      if (!membershipId) {
        setValue("kd_promo_transfer", "");
      }
      setDisabledPromotTransfer(true);
    }
  }, [jnsBayar, jnsMembership, produkMembership?.data, membershipId]); // eslint-disable-line

  useEffect(() => {
    if (membershipId && stsMembership == "O") {
      setIsRequired(false);
    } else if (stsMembership == "O" && !telpBermasalah) {
      setIsRequired(true);
    } else {
      setIsRequired(false);
    }
  }, [telpBermasalah, stsMembership, membershipId]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-9 mt-2">
        <div className="fixed bottom-6 right-6 z-10 bg-white">
          <div className="relative group inline-block w-32 mr-4">
            <button
              id="button"
              type="submit"
              className="w-full px-6 py-1 mt-2 text-lg text-black transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-yellow hover:bg-white hover:shadow-lg focus:outline-none border-2 border-yellow"
            >
              Save
            </button>
          </div>
          <div className="relative group inline-block">
            <button
              onClick={(e) => e.preventDefault()}
              className="px-4 py-2  rounded-md ring-1 ring-inset ring-gray-300"
            >
              Help
            </button>
            <div className="absolute right-0 -top-24 w-48 ring-1 ring-inset ring-gray-300 bg-white text-black shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="hover:bg-black hover:text-yellow rounded-top-md">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenScript(true);
                  }}
                  className="w-full  h-12 flex justify-center items-center rounded-top-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                  Script
                  <MagnifyingGlassIcon className="h-6 w-6 ml-1" />
                </button>
              </div>
              <div className="hover:bg-black hover:text-yellow rounded-bottom-md">
                <Link
                  className="w-full  h-12 flex justify-center items-center rounded-bottom-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  href="http://192.168.70.17:3002/merchant"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Merchant
                  <MagnifyingGlassIcon className="h-6 w-6 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <DrawerCenter open={openKodepos} setOpen={setOpenKodepos}>
          <div className="h-screen">
            <SearchableSelect options={kodepos?.data} name={"kodepos"} setValue={setValue} setOpen={setOpenKodepos} />
          </div>
        </DrawerCenter>
        <DrawerCenter open={openProdukMembership} setOpen={setOpenProdukMembership}>
          <div className="h-screen">
            <SearchableSelect
              options={produkMembership?.data.map((e) => e.name)}
              name={"jns_membership_name"}
              setValue={setValue}
              setOpen={setOpenProdukMembership}
            />
          </div>
        </DrawerCenter>
        <DrawerCenter open={openKodeposKtr} setOpen={setOpenKodeposKtr}>
          <div className="h-screen">
            <SearchableSelect
              options={kodepos?.data}
              name={"kodepos_ktr_wkm_1"}
              setValue={setValue}
              setOpen={setOpenKodeposKtr}
            />
          </div>
        </DrawerCenter>
        <DrawerCenter open={openScript} setOpen={setOpenScript}>
          <div className="w-full flex justify-center">
            <div className=" rounded-md bg-white shadow-md w-3/4">
              <div className=" py-4 px-9 max-h-[450px] overflow-y-scroll">
                <div dangerouslySetInnerHTML={{ __html: scripts.data?.length > 0 ? scripts.data[0]?.script : "" }} />
              </div>
            </div>
          </div>
        </DrawerCenter>
        <Drawer open={openProdukAsuransiPa} setOpen={setOpenProdukAsuransiPa}>
          <TableProdukAsuransi
            options={produkAsuransiPa.data}
            handleChange={(e) => {
              setValue("id_produk_asuransi_pa", e.kd_produk);
              setValue("nm_produk_asuransi_pa", e.nm_produk);
              setValue("nm_vendor_pa", e.vendor.nm_vendor);
              setValue("rate_pa", e.rate);
              setValue("admin_pa", e.admin);
              setValue("amount_asuransi_pa", formatCurrency("" + e.premi));
              setOpenProdukAsuransiPa(false);
            }}
          />
        </Drawer>
        <Drawer open={openProdukAsuransiMtr} setOpen={setOpenProdukAsuransiMtr}>
          <TableProdukAsuransi
            options={produkAsuransiMtr.data}
            handleChange={(e) => {
              setValue("id_produk_asuransi_mtr", e.kd_produk);
              setValue("nm_produk_asuransi_mtr", e.nm_produk);
              setValue("nm_vendor_mtr", e.vendor.nm_vendor);
              setValue("rate_mtr", e.rate);
              setValue("admin_mtr", e.admin);
              setOpenProdukAsuransiMtr(false);
            }}
          />
        </Drawer>

        <ModalMotor
          handleClick={(e) => {
            setValue("asuransi_no_mtr", e.no_mtr);
            setValue("asuransi_nm_mtr", e.nm_mtr);
          }}
          isModalOpen={openMstMtr}
          setIsModalOpen={setOpenMstMtr}
        />
        {/* <div className="col-span-2 -mt-2 mb-2">
          <div className="grid grid-cols-2">
            <div className="col-span-1"></div>
            <div className="col-span-1">
              <button
                id="button"
                type="submit"
                className="w-full px-6 py-1 mt-2 text-lg text-black transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-yellow hover:bg-white hover:shadow-lg focus:outline-none border-2 border-yellow"
              >
                Save
              </button>
            </div>
          </div>
        </div> */}
        <div className="col-span-1">
          <p className="text-lg font-bold mb-3">Faktur</p>
          <div className="grid grid-cols-8 gap-3">
            <div className="col-span-7">
              <InputGroup
                name={"nm_customer_fkt"}
                label={"Nama Customer"}
                id={"nm_customer_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-3">
              <InputGroup
                name={"no_msn"}
                label={"Nomor Mesin"}
                id={"no_msn"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer"></div>
            <div className="col-span-3">
              <InputGroup
                name={"nm_dlr"}
                label={"Nama Dealer"}
                id={"nm_dlr"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>

            <div className="col-span-3">
              <InputGroup
                name={"jns_jual_fkt_ket"}
                label={"Jenis Jual"}
                id={"jns_jual_fkt_ket"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer"></div>
            <div className="col-span-3">
              <InputGroup
                name={"desc_tgl_faktur"}
                label={"Tanggal Faktur"}
                id={"desc_tgl_faktur"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>

            <div className="col-span-3 row-span-2 ">
              <TextAreaGroup
                name={"alamat_fkt"}
                label={"Alamat"}
                id={"alamat_fkt"}
                register={register}
                disabled={true}
                errors={errors}
                rows={5}
              />
            </div>
            <div className="col-span-1 row-span-2"></div>
            <div className="col-span-3">
              <InputGroup
                name={"nm_mtr"}
                label={"Motor"}
                id={"nm_mtr"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>

            <div className="col-span-3">
              <InputGroup
                name={"kodepos_fkt"}
                label={"Kodepos"}
                id={"kodepos_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            {/* <div className="col-span-1 flex items-end justify-center cursor-pointer"></div> */}
            <div className="col-span-3">
              <InputGroup
                name={"desc_tgl_lahir_fkt"}
                label={"Tanggal Lahir"}
                id={"desc_tgl_lahir_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>

            <div className="col-span-3">
              <InputGroup
                name={"kel_fkt"}
                label={"Kelurahan"}
                id={"kel_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer"></div>
            <div className="col-span-3">
              <InputGroup
                name={"jns_klm_fkt"}
                label={"Jenis Kelamin"}
                id={"jns_klm_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>

            <div className="col-span-3">
              <InputGroup
                name={"kec_fkt"}
                label={"Kecamatan"}
                id={"kec_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer"></div>
            <div className="col-span-3">
              {/* <SelectGroup
                name={"kode_kerja_fkt"}
                label={"Pekerjaan"}
                id={"kode_kerja_fkt"}
                register={register}
                disabled={true}
                options={kodeKerja?.data}
                errors={errors}
              /> */}
              <InputGroup
                name={"desc_kerja_fkt"}
                label={"Pekerjaan"}
                id={"desc_kerja_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>

            <div className="col-span-3">
              <InputGroup
                name={"kota_fkt"}
                label={"Kota"}
                id={"kota_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer"></div>

            <div className="col-span-3">
              <InputGroup
                name={"no_telp_fkt"}
                label={"Telp"}
                id={"no_telp_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer">
              <SelectGroup
                name="ket_no_telp_fkt"
                id="ket_no_telp_fkt"
                errors={errors}
                register={register}
                validation={{ required: isRequired ? "This field is Required" : false }}
                options={[
                  { name: "", value: "" },
                  { name: "1", value: "1" },
                  { name: "1A", value: "1A" },
                  { name: "1B", value: "1B" },
                  { name: "2", value: "2" },
                  { name: "3", value: "3" },
                  { name: "3X", value: "3X" },
                  { name: "4", value: "4" },
                  { name: "5", value: "5" },
                  { name: "6", value: "6" },
                  { name: "7", value: "7" },
                  { name: "8", value: "8" },
                  { name: "9", value: "9" },
                  { name: "X", value: "X" },
                  { name: "C", value: "C" },
                  { name: "P", value: "P" },
                ]}
              />
            </div>
            <div className="col-span-3">
              {/* <SelectGroup
                name={"agama_fkt"}
                label={"Agama"}
                id={"agama_fkt"}
                register={register}
                options={agama.data}
                disabled={true}
                errors={errors}
              /> */}
              <InputGroup
                name={"desc_agama_fkt"}
                label={"Agama"}
                id={"desc_agama_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-3">
              <InputGroup
                name={"no_hp_fkt"}
                label={"Hp"}
                id={"no_hp_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer">
              <SelectGroup
                name="ket_no_hp_fkt"
                id="ket_no_hp_fkt"
                errors={errors}
                register={register}
                validation={{ required: isRequired ? "This field is Required" : false }}
                options={[
                  { name: "", value: "" },
                  { name: "1", value: "1" },
                  { name: "1A", value: "1A" },
                  { name: "1B", value: "1B" },
                  { name: "2", value: "2" },
                  { name: "3", value: "3" },
                  { name: "3X", value: "3X" },
                  { name: "4", value: "4" },
                  { name: "5", value: "5" },
                  { name: "7", value: "7" },
                  { name: "8", value: "8" },
                  { name: "9", value: "9" },
                  { name: "X", value: "X" },
                  { name: "C", value: "C" },
                  { name: "P", value: "P" },
                ]}
              />
            </div>

            <div className="col-span-3">
              <InputGroup
                name={"desc_didik_fkt"}
                label={"Pendidikan"}
                id={"desc_didik_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>

            <div className="col-span-3">
              {/* <SelectGroup
                name={"keluar_bln_fkt"}
                label={"Pengeluaran"}
                id={"keluar_bln_fkt"}
                register={register}
                options={keluarBln.data}
                disabled={true}
                errors={errors}
              /> */}
              <InputGroup
                name={"desc_bln_fkt"}
                label={"Pengeluaran"}
                id={"desc_bln_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>

            <div className="col-span-3">
              {/* <SelectGroup
                name={"tujuan_pakai_fkt"}
                label={"Tujuan Pakai"}
                id={"tujuan_pakai_fkt"}
                register={register}
                disabled={true}
                errors={errors}
                options={tujuPak.data}
              /> */}
              <InputGroup
                name={"desc_tujuan_pakai_fkt"}
                label={"Tujuan Pakai"}
                id={"desc_tujuan_pakai_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer"></div>
            <div className="col-span-3">
              {/* <SelectGroup
                name={"hobby_fkt"}
                label={"Hobby"}
                id={"hobby_fkt"}
                register={register}
                disabled={true}
                errors={errors}
                options={hobbies.data}
              /> */}
              <InputGroup
                name={"desc_hobby_fkt"}
                label={"Hobby"}
                id={"desc_hobby_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-3">
              <InputGroup
                name={"no_ktpnpwp_fkt"}
                label={"Nomor KTP"}
                id={"no_ktpnpwp_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 ">
          <p className="text-lg font-bold mb-3">WKM</p>
          <div className="grid grid-cols-8 gap-3">
            <div className="col-span-7">
              <InputGroup
                name={"nm_customer_wkm"}
                label={"Nama Customer"}
                id={"nm_customer_wkm"}
                register={register}
                disabled={ketNmWkm == 1}
                validation={{ required: isRequired ? "This field is Required" : false }}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer">
              <SelectGroup
                name="ket_nm_wkm"
                id="ket_nm_wkm"
                errors={errors}
                register={register}
                options={[
                  { name: "0", value: "" },
                  { name: "1", value: "1" },
                ]}
              />
            </div>

            <div className="col-span-3 row-span-2">
              <TextAreaGroup
                name={"alamat_wkm"}
                label={"Alamat"}
                id={"alamat_wkm"}
                register={register}
                validation={{ required: isRequired && kirimKe == "1" ? "This field is Required" : false }}
                errors={errors}
                rows={5}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer">
              <SelectGroup
                name="ket_alamat_wkm"
                id="ket_alamat_wkm"
                errors={errors}
                validation={{ required: isRequired && kirimKe == "1" ? "This field is Required" : false }}
                register={register}
                options={[
                  { name: "", value: "" },
                  { name: "1", value: "1" },
                  { name: "2", value: "2" },
                  { name: "3", value: "3" },
                  { name: "4", value: "4" },
                  { name: "4A", value: "4A" },
                  { name: "X", value: "X" },
                ]}
              />
            </div>
            <div className="col-span-3">
              <InputGroup
                name={"no_wa"}
                label={"Nomor Info"}
                id={"no_wa"}
                register={register}
                validation={{
                  required: isRequired || (validHub && !telpBermasalah) ? "This field is Required" : false,
                }}
                disabled={false}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end">
              <SelectGroup
                name={"ket_wa_info"}
                id={"ket_wa_info"}
                register={register}
                disabled={false}
                options={[
                  { name: "1", value: "1" },
                  { name: "2", value: "2" },
                  { name: "4", value: "4" },
                  { name: "5", value: "5" },
                ]}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-3">
              <InputGroup
                name={"no_ktpnpwp_wkm"}
                label={"Nomor KTP"}
                id={"no_ktpnpwp_wkm"}
                register={register}
                validation={{ required: isRequired ? "This field is Required" : false }}
                disabled={ketNoKtp == 1}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer">
              <SelectGroup
                name="ket_no_ktpnpwp_wkm"
                id="ket_no_ktpnpwp_wkm"
                errors={errors}
                register={register}
                options={[
                  { name: "0", value: "" },
                  { name: "1", value: "1" },
                ]}
              />
            </div>

            <div className="col-span-3">
              <div className="w-full grid grid-cols-2 gap-x-3">
                <div className="col-span-1">
                  <InputGroup
                    name={"rt_wkm"}
                    label={"Rt"}
                    id={"rt_wkm"}
                    register={register}
                    disabled={false}
                    errors={errors}
                  />
                </div>
                <div className="col-span-1">
                  <InputGroup
                    name={"rw_wkm"}
                    label={"Rw"}
                    id={"rw_wkm"}
                    register={register}
                    disabled={false}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-1 flex items-end"></div>
            <div className="col-span-3">
              <InputGroup
                name={"tgl_lahir_wkm"}
                label={"Tanggal Lahir"}
                id={"tgl_lahir_wkm"}
                register={register}
                disabled={false}
                errors={errors}
                type="date"
              />
            </div>
            <div className="col-span-3">
              <InputGroup
                name={"kodepos_wkm"}
                label={"Kodepos"}
                id={"kodepos_wkm"}
                register={register}
                validation={{ required: isRequired && kirimKe == "1" ? "This field is Required" : false }}
                disabled={false}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setOpenKodepos(true);
                }}
                className="w-full  h-9 flex justify-center items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              >
                <MagnifyingGlassIcon className="h-6 w-6 ml-1" />
              </button>
            </div>
            <div className="col-span-3">
              <SelectGroup
                name="kd_aktivitas_jual_membership"
                id="kd_aktivitas_jual_membership"
                label={"Aktivitas Jual"}
                errors={errors}
                register={register}
                validation={{ required: isRequired ? "This field is Required" : false }}
                options={aktifJual.data}
              />
            </div>

            <div className="col-span-3">
              <InputGroup
                name={"kel_wkm"}
                readOnly
                label={"Kelurahan"}
                validation={{ required: isRequired && kirimKe == "1" ? "This field is Required" : false }}
                id={"kel_wkm"}
                register={register}
                disabled={false}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-3 row-span-2">
              <TextAreaGroup
                name={"alamat_bantuan_wkm"}
                label={"Alamat Bantuan"}
                id={"alamat_bantuan_wkm"}
                validation={{ required: isRequired ? "This field is Required" : false }}
                register={register}
                disabled={false}
                errors={errors}
                rows={5}
              />
            </div>
            <div className="col-span-3">
              <InputGroup
                name={"kec_wkm"}
                readOnly
                label={"Kecamatan"}
                validation={{ required: isRequired && kirimKe == "1" ? "This field is Required" : false }}
                id={"kec_wkm"}
                register={register}
                disabled={false}
                errors={errors}
              />
            </div>

            <div className="col-span-3">
              <InputGroup
                name={"kota_wkm"}
                readOnly
                label={"Kota"}
                validation={{ required: isRequired && kirimKe == "1" ? "This field is Required" : false }}
                id={"kota_wkm"}
                register={register}
                disabled={false}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>
            {/* <p>
                    {tglFaktur.getFullYear() > now.getFullYear() &&
                      (tglFaktur.getMonth() == now.getMonth() || now.getMonth() - 1 == tglFaktur.getMonth())}
                  </p> */}

            {now.getFullYear() > tglFaktur.getFullYear() && now.getMonth() + 1 == tglFaktur.getMonth() ? (
              <div className="row-span-5 flex justify-center items-center col-span-3 ">
                <div className="flex flex-col items-center justify-center gap-2 border-2 border-slate-400 bg-slate-50 rounded-lg p-2">
                  <p className="font-bold text-lg text-center leading-tight">
                    STNK Akan Habis Masa Berlaku, Perpanjang STNK ?
                  </p>
                  <div className="w-full flex justify-center gap-x-2">
                    {/* <input
                      type="checkbox"
                      {...register("sts_stnk")}
                      className="block w-full h-12 cursor-pointer  rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    /> */}
                    <label className={`flex items-center gap-1`}>
                      <input
                        type="radio"
                        value={1}
                        {...register("sts_stnk")}
                        className={`w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300 cursor-pointer`}
                      />
                      <span className="text-gray-700">Oke</span>
                    </label>
                    <label className={`flex items-center gap-1`}>
                      <input
                        type="radio"
                        value={0}
                        {...register("sts_stnk")}
                        className={`w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300 cursor-pointer`}
                      />
                      <span className="text-gray-700">Tidak</span>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row-span-5 flex justify-center items-center col-span-3 "></div>
            )}
            {/* <div className="row-span-3 col-span-3 bg-yellow"></div> */}
            {/* <div className="col-span-3"></div> */}
            {/* <div className="col-span-1"></div> */}
            <div className="col-span-3">
              <InputGroup
                name={"no_telp_wkm"}
                label={"Telp"}
                id={"no_telp_wkm"}
                register={register}
                disabled={false}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer">
              <SelectGroup
                name={"ket_no_telp_wkm"}
                id={"ket_no_telp_wkm"}
                register={register}
                disabled={false}
                validation={watch("no_telp_wkm") != "" ? { required: "This field is required" } : {}}
                options={[
                  { name: "", value: "" },
                  { name: "1", value: "1" },
                  { name: "1A", value: "1A" },
                  { name: "1B", value: "1B" },
                  { name: "2", value: "2" },
                  { name: "3", value: "3" },
                  { name: "3X", value: "3X" },
                  { name: "4", value: "4" },
                  { name: "5", value: "5" },
                  { name: "6", value: "6" },
                  { name: "7", value: "7" },
                  { name: "8", value: "8" },
                  { name: "9", value: "9" },
                  { name: "X", value: "X" },
                  { name: "C", value: "C" },
                  { name: "P", value: "P" },
                ]}
                errors={errors}
              />
            </div>
            <div className="col-span-3"></div>
            <div className="col-span-1"></div>
            <div className="col-span-3">
              <InputGroup
                name={"no_hp_wkm"}
                label={"Hp"}
                id={"no_hp_wkm"}
                register={register}
                disabled={false}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer"></div>
            <div className="col-span-3"></div>
            <div className="col-span-1"></div>
            <div className="col-span-3">
              <InputGroup
                name={"no_hub"}
                readOnly
                label={"Nomor di Hubungi"}
                id={"no_hub"}
                register={register}
                validation={{
                  required: isRequired || (validHub && !telpBermasalah) ? "This field is Required" : false,
                }}
                disabled={false}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer">
              <SelectGroup
                name={"no_yg_dihub_ts"}
                id={"no_yg_dihub_ts"}
                register={register}
                disabled={false}
                options={[
                  { name: "1", value: "1" },
                  { name: "2", value: "2" },
                  { name: "4", value: "4" },
                  { name: "5", value: "5" },
                ]}
                errors={errors}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 mt-8">
          <div className="grid grid-cols-8">
            <div className="col-span-7 grid grid-cols-2 border-2 rounded-md border-yellow overflow-hidden">
              <div
                onClick={() => setMenuTab(1)}
                className={`col-span-1 flex justify-center cursor-pointer p-2 font-bold ${
                  menuTab == 1 ? "bg-yellow" : ""
                }`}
              >
                <p>Membership</p>
              </div>
              <div
                onClick={() => setMenuTab(2)}
                className={`col-span-1 flex justify-center cursor-pointer p-2 font-bold ${
                  menuTab == 2 ? "bg-yellow" : ""
                }`}
              >
                <p>Asuransi</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-span-1 mt-8 ${menuTab != 2 ? "hidden" : ""}`}>
          <div className="grid grid-cols-8">
            <div className="col-span-7 grid grid-cols-2 border-2 rounded-md border-yellow overflow-hidden">
              <div
                onClick={() => setAsuransiTypeTab(1)}
                className={`col-span-1 flex justify-center cursor-pointer p-2 font-bold ${
                  asuransiTypeTab == 1 ? "bg-yellow" : ""
                }`}
              >
                <p>PA</p>
              </div>
              <div
                onClick={() => setAsuransiTypeTab(2)}
                className={`col-span-1 flex justify-center cursor-pointer p-2 font-bold ${
                  asuransiTypeTab == 2 ? "bg-yellow" : ""
                }`}
              >
                <p>Motor</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`col-span-2 py-5 ${menuTab != 1 ? "hidden" : ""}`}>
          <div className="grid grid-cols-3 ">
            <div className="col-span-3">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-4 -mt-1">
                  <RadioButtonComponent
                    register={register}
                    validation={{ required: isRequired ? "This field is Required" : false }}
                    errors={errors}
                    label={"Status Membership"}
                    name={"sts_membership"}
                    disabled={disabledOkeMembership}
                    options={[
                      { name: "Oke", value: "O" },
                      { name: "Pending", value: "P" },
                      { name: "Tidak", value: "T" },
                      { name: "Pros", value: "F" },
                    ]}
                  />
                </div>
                <div className="col-span-2">
                  <RadioButtonComponent
                    register={register}
                    validation={{ required: isRequired ? "This field is Required" : false }}
                    errors={errors}
                    label={"Jenis Pembayaran"}
                    name="jns_bayar"
                    disabled={disabledOkeMembership}
                    options={[
                      { name: "Cash", value: "C" },
                      { name: "Transfer", value: "T" },
                    ]}
                  />
                </div>

                <div className="col-span-6 row-span-4 flex items-start justify-center">
                  <p className="font-bold text-3xl">Renewal ke {isEditing ? defaultValues.renewal_ke : ""}</p>
                </div>
                <div className="col-span-4">
                  {stsMembership == "T" && (
                    <SelectGroup
                      name={"alasan_tdk_membership"}
                      label={"Alasan Tidak"}
                      id={"alasan_tdk_membership"}
                      validation={{ required: isRequired ? "This field is Required" : false }}
                      register={register}
                      disabled={false}
                      options={alasanTdkMembership?.data}
                      errors={errors}
                    />
                  )}
                  {stsMembership == "P" && (
                    <SelectGroup
                      name={"alasan_pending_membership"}
                      label={"Alasan Pending"}
                      id={"alasan_pending_membership"}
                      validation={{ required: "This field is required" }}
                      register={register}
                      disabled={false}
                      options={[
                        { name: "Telp Kembali", value: 2 },
                        { name: "Telepon tdk diangkat", value: 3 },
                      ]}
                      errors={errors}
                    />
                  )}
                  {stsMembership == "O" && (
                    <InputGroup
                      name={"tgl_janji_bayar"}
                      label={"Tanggal Bayar"}
                      id={"tgl_janji_bayar"}
                      register={register}
                      disabled={disabledOkeMembership}
                      errors={errors}
                      validation={stsMembership == "O" ? { required: "This field is required" } : {}}
                      type="date"
                    />
                  )}
                  {stsMembership == "F" && (
                    <InputGroup
                      name={"tgl_prospect_membership"}
                      label={"Tanggal Prospect"}
                      id={"tgl_prospect_membership"}
                      register={register}
                      validation={stsMembership == "F" ? { required: "This field is required" } : {}}
                      errors={errors}
                      type="date"
                    />
                  )}
                </div>
                <div className="col-span-2">
                  <RadioButtonComponent
                    register={register}
                    validation={{ required: isRequired ? "This field is Required" : false }}
                    errors={errors}
                    setValue={setValue}
                    label={"Kirim ke"}
                    disabled={disabledOkeMembership}
                    name="kirim_ke"
                    options={[
                      { name: "Rumah", value: "1" },
                      { name: "Kantor", value: "2" },
                    ]}
                  />
                </div>
                <div className="col-span-4 relative">
                  <SelectGroup
                    readOnly
                    name={"jns_membership"}
                    label={"Produk"}
                    id={"jns_membership"}
                    disabled={disabledOkeMembership}
                    register={register}
                    validation={{ required: isRequired ? "This field is Required" : false }}
                    options={produkMembership?.data}
                    errors={errors}
                  />
                  <div className="absolute top-5 right-1">
                    <button
                      disabled={disabledOkeMembership}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenProdukMembership(true);
                      }}
                      className={`w-full  h-9 flex justify-center items-center ${
                        disabledOkeMembership ? "bg-gray-300 cursor-not-allowed" : "bg-white"
                      }`}
                    >
                      <MagnifyingGlassIcon className="h-6 w-6 ml-1 " />
                    </button>
                  </div>
                </div>
                <div className="col-span-2">
                  <RadioButtonComponent
                    register={register}
                    validation={{ required: isRequired ? "This field is Required" : false }}
                    errors={errors}
                    label={"Tipe Kartu"}
                    name={"type_kartu"}
                    disabled={disabledOkeMembership}
                    options={[
                      { name: "Fisik", value: "F" },
                      { name: "E-Card", value: "E" },
                    ]}
                  />
                </div>
                {/* <div className="col-span-7"></div> */}
                <div className="col-span-4">
                  <SelectGroup
                    name={"kd_promo_transfer"}
                    label={"Promo Transfer"}
                    id={"kd_promo_transfer"}
                    register={register}
                    disabled={disabledPromoTransfer || disabledOkeMembership}
                    options={promoTransfer?.data}
                    errors={errors}
                  />
                </div>
                <div className="col-span-4">
                  <InputGroup
                    name={"no_kartu2"}
                    label={"Nomor Kartu Sebelum"}
                    id={"no_kartu2"}
                    disabled={true}
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="col-span-2">
                  <InputGroup
                    name={"jns_membership_sebelum"}
                    label={"Jenis Kartu Sebelum"}
                    id={"jns_membership_sebelum"}
                    disabled={true}
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-span-2 py-5 ${menuTab != 1 ? "hidden" : ""}`}>
          <div
            className={`${kirimKe == 2 ? "" : "hidden"} grid grid-cols-12 gap-x-2 md:gap-x-4 gap-y-5`}
            id="styled-profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="col-span-12 mt-1 mb-3">
              <p className="py-2 px-4 rounded-md border-2 border-gray-300 font-bold inline-block">Kantor</p>
            </div>

            <div className="col-span-6">
              <p className="text-lg font-bold mb-3">Faktur</p>
              <div className="grid grid-cols-7 gap-3">
                <div className="col-span-3 ">
                  <InputGroup
                    errors={errors}
                    name={"kodepos_ktr_fkt"}
                    label={"Kodepos"}
                    id={"kodepos_ktr_fkt"}
                    register={register}
                    disabled={true}
                  />
                </div>
                <div className="col-span-3">
                  <InputGroup
                    errors={errors}
                    name={"kerja_di_fkt"}
                    label={"Nama PT"}
                    id={"kerja_di_fkt"}
                    register={register}
                    disabled={true}
                  />
                </div>
                <div className="col-span-3 ">
                  <InputGroup
                    errors={errors}
                    name={"kel_ktr_fkt"}
                    label={"Kelurahan"}
                    id={"kel_ktr_fkt"}
                    register={register}
                    disabled={true}
                  />
                </div>
                <div className="col-span-1">
                  <InputGroup
                    errors={errors}
                    name={"rw_ktr_fkt"}
                    label={"RW"}
                    id={"rw_ktr_fkt"}
                    register={register}
                    disabled={true}
                  />
                </div>
                <div className="col-span-1">
                  <InputGroup
                    errors={errors}
                    name={"rt_ktr_fkt"}
                    label={"RT"}
                    id={"rt_ktr_fkt"}
                    register={register}
                    disabled={true}
                  />
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-3 ">
                  <InputGroup
                    errors={errors}
                    name={"kec_ktr_fkt"}
                    label={"Kecamatan"}
                    id={"kec_ktr_fkt"}
                    register={register}
                    disabled={true}
                  />
                </div>
                <div className="col-span-3 row-span-2">
                  <TextAreaGroup
                    errors={errors}
                    label={"Alamat Kantor"}
                    name={"alamat_ktr_fkt"}
                    id={"Alamat Kantor"}
                    register={register}
                    disabled={true}
                    rows={5}
                  />
                </div>
                <div className="col-span-3 ">
                  <InputGroup
                    errors={errors}
                    name={"kota_ktr_fkt"}
                    label={"Kota"}
                    id={"kota_ktr_fkt"}
                    register={register}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <p className="text-lg font-bold mb-3">WKM</p>
              <div className="grid grid-cols-7 gap-3">
                <div className="col-span-3 ">
                  <InputGroup
                    readOnly
                    errors={errors}
                    name={"kodepos_ktr_wkm"}
                    label={"Kodepos"}
                    disabled={disabledOkeMembership}
                    id={"kodepos_ktr_wkm"}
                    register={register}
                  />
                </div>
                <div className="col-span-1 flex items-end justify-center cursor-pointer">
                  <button
                    disabled={disabledOkeMembership}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenKodeposKtr(true);
                    }}
                    className={`w-full  h-9 flex justify-center items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ${
                      disabledOkeMembership ? "bg-gray-300 cursor-not-allowed" : ""
                    }`}
                  >
                    <MagnifyingGlassIcon className="h-6 w-6 ml-1" />
                  </button>
                </div>
                <div className="col-span-3">
                  <InputGroup
                    errors={errors}
                    name={"kerja_di_wkm"}
                    label={"Nama PT"}
                    id={"kerja_di_wkm"}
                    register={register}
                    validation={{ required: kirimKe == 2 ? "This field is Required" : false }}
                    disabled={disabledOkeMembership}
                  />
                </div>
                <div className="col-span-3 ">
                  <InputGroup
                    readOnly
                    errors={errors}
                    name={"kel_ktr_wkm"}
                    label={"Kelurahan"}
                    id={"kel_ktr_wkm"}
                    disabled={disabledOkeMembership}
                    validation={{ required: kirimKe == 2 ? "This field is Required" : false }}
                    register={register}
                  />
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-1">
                  <InputGroup
                    errors={errors}
                    name={"rt_ktr_wkm"}
                    label={"RT"}
                    id={"rt_ktr_wkm"}
                    register={register}
                    disabled={disabledOkeMembership}
                  />
                </div>
                <div className="col-span-1">
                  <InputGroup
                    errors={errors}
                    name={"rw_ktr_wkm"}
                    label={"RW"}
                    id={"rw_ktr_wkm"}
                    register={register}
                    disabled={disabledOkeMembership}
                  />
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-3 ">
                  <InputGroup
                    readOnly
                    errors={errors}
                    name={"kec_ktr_wkm"}
                    label={"Kecamatan"}
                    id={"kec_ktr_wkm"}
                    register={register}
                    disabled={disabledOkeMembership}
                    validation={{ required: kirimKe == 2 ? "This field is Required" : false }}
                  />
                </div>
                <div className="col-span-1 row-span-2"></div>
                <div className="col-span-3 row-span-2">
                  <TextAreaGroup
                    errors={errors}
                    label={"Alamat Kantor"}
                    name={"alamat_ktr_wkm"}
                    id={"Alamat Kantor"}
                    register={register}
                    validation={{ required: kirimKe == 2 ? "This field is Required" : false }}
                    disabled={disabledOkeMembership}
                    rows={5}
                  />
                </div>
                <div className="col-span-3 ">
                  <InputGroup
                    readOnly
                    errors={errors}
                    name={"kota_ktr_wkm"}
                    label={"Kecamatan"}
                    id={"kota_ktr_wkm"}
                    register={register}
                    disabled={disabledOkeMembership}
                    validation={{ required: kirimKe == 2 ? "This field is Required" : false }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${kirimKe == 3 ? "" : "hidden"} grid grid-cols-12 gap-x-4`}
            id="styled-profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="col-span-12 mt-1 mb-3">
              <p className="py-2 px-4 rounded-md border-2 border-gray-300 font-bold inline-block">AHAS</p>
            </div>
            <div className="col-span-6">
              <InputGroup
                errors={errors}
                name={"alamat_srt12"}
                label={"Nama PT"}
                id={"alamat_srt12"}
                register={register}
                disabled={false}
              />
            </div>
            <div className="col-span-6">
              <InputGroup
                errors={errors}
                name={"alamat_srt11"}
                label={"Alamat"}
                id={"alamat_srt11"}
                register={register}
                disabled={false}
              />
            </div>
            <div className="col-span-6 mt-5">
              <InputGroup
                errors={errors}
                name={"kota_srt1"}
                label={"Kota"}
                id={"kota_srt1"}
                register={register}
                disabled={false}
              />
            </div>
            <div className="col-span-6 mt-5">
              <InputGroup
                errors={errors}
                name={"kec_srt1"}
                label={"Kecamatan"}
                id={"kec_srt1"}
                register={register}
                disabled={false}
              />
            </div>
            <div className="col-span-6 mt-5">
              <InputGroup
                errors={errors}
                name={"kel_srt1"}
                label={"Kelurahan"}
                id={"kel_srt1"}
                register={register}
                disabled={false}
              />
            </div>
            <div className="col-span-6 mt-5">
              <InputGroup
                errors={errors}
                name={"kodepos_srt1"}
                label={"Kodepos"}
                id={"kodepos_srt1"}
                register={register}
                disabled={false}
              />
            </div>
          </div>
        </div>

        <div className="col-span-1"></div>
        <div className={`col-span-2 mt-5 mb-2 ${asuransiTypeTab == 1 && menuTab == 2 ? "" : "hidden"}`}>
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1">
              <RadioButtonComponent
                register={register}
                errors={errors}
                disabled={disabledOkeAsuransiPa}
                label={"Status Asuransi PA"}
                name={"sts_asuransi_pa"}
                options={[
                  { name: "Oke", value: "O" },
                  { name: "Pending", value: "P" },
                  { name: "Tidak", value: "T" },
                  { name: "Pros", value: "F" },
                ]}
              />
            </div>
            <div className="col-span-1">
              {stsAsuransiPa == "T" && (
                <SelectGroup
                  name={"alasan_tdk_asuransi_pa"}
                  label={"Alasan Tidak"}
                  id={"alasan_tdk_asuransi_pa"}
                  register={register}
                  disabled={false}
                  options={alasanTdkMembership?.data}
                  errors={errors}
                />
              )}
              {stsAsuransiPa == "P" && (
                <SelectGroup
                  name={"alasan_pending_asuransi_pa"}
                  label={"Alasan Pending"}
                  id={"alasan_pending_asuransi_pa"}
                  register={register}
                  disabled={false}
                  options={[
                    { name: "Telp Kembali", value: 2 },
                    { name: "Telepon tdk diangkat", value: 3 },
                  ]}
                  errors={errors}
                />
              )}
              {stsAsuransiPa == "F" && (
                <InputGroup
                  name={"tgl_prospect_asuransi_pa"}
                  label={"Tanggal Prospect"}
                  id={"tgl_prospect_asuransi_pa"}
                  validation={{ required: isRequired || stsAsuransiPa == "F" ? "This field is Required" : false }}
                  register={register}
                  errors={errors}
                  type="date"
                />
              )}
            </div>
            <div className="col-span-1">
              <label htmlFor={"id_produk"} className="block text-sm font-medium text-gray-900 cursor-pointer">
                {"Id Produk"}
              </label>
              <div className="relative mt-1 rounded-md shadow-sm cursor-pointer">
                <input
                  readOnly
                  disabled={disabledOkeAsuransiPa}
                  onClick={() => setOpenProdukAsuransiPa(true)}
                  id={"id_produk_asuransi_pa"}
                  placeholder="Id Produk"
                  {...register("id_produk_asuransi_pa", {
                    validate: (value) => {
                      return stsAsuransiPa === "O" && !value ? "This field is required" : true;
                    }, // ✅ Validasi dinamis
                  })}
                  className={`cursor-pointer block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm ${
                    disabledOkeAsuransiPa ? "bg-gray-300 cursor-not-allowed" : ""
                  }`}
                />
                {errors["id_produk_asuransi_pa"] && (
                  <p className="text-sm text-red absolute" style={{ marginTop: 2 }}>
                    {errors["id_produk_asuransi_pa"]?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <InputGroup
                readOnly
                name={"nm_vendor_pa"}
                label={"Nama Vendor"}
                id={"nm_vendor_pa"}
                register={register}
                disabled={disabledOkeAsuransiPa}
                errors={errors}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                readOnly
                name={"nm_produk_asuransi_pa"}
                label={"Nama Produk"}
                id={"nm_produk_asuransi_pa"}
                register={register}
                disabled={disabledOkeAsuransiPa}
                errors={errors}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                readOnly
                name={"rate_pa"}
                label={"Rate"}
                id={"rate_pa"}
                register={register}
                disabled={disabledOkeAsuransiPa}
                errors={errors}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                readOnly
                name={"admin_pa"}
                label={"Biaya Admin"}
                id={"admin_pa"}
                register={register}
                disabled={disabledOkeAsuransiPa}
                errors={errors}
              />
            </div>
            <div className="col-span-1 mb-16">
              <InputGroup
                readOnly
                name={"amount_asuransi_pa"}
                label={"Biaya Premi"}
                id={"amount_asuransi_pa"}
                register={register}
                disabled={disabledOkeAsuransiPa}
                errors={errors}
              />
            </div>
          </div>
        </div>

        <div className={`col-span-2 mt-5 mb-2 ${asuransiTypeTab == 2 && menuTab == 2 ? "" : "hidden"}`}>
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1">
              <RadioButtonComponent
                register={register}
                errors={errors}
                setValue={setValue}
                disabled={disabledOkeAsuransiMtr}
                label={"Status Asuransi Motor"}
                name={"sts_asuransi_mtr"}
                options={[
                  { name: "Oke", value: "O" },
                  { name: "Pending", value: "P" },
                  { name: "Tidak", value: "T" },
                  { name: "Pros", value: "F" },
                ]}
              />
            </div>
            <div className="col-span-1 flex flex-col justify-end">
              {stsAsuransiMtr == "T" && (
                <SelectGroup
                  name={"alasan_tdk_asuransi_mtr"}
                  label={"Alasan Tidak"}
                  id={"alasan_tdk_asuransi_mtr"}
                  register={register}
                  disabled={false}
                  options={alasanTdkMembership?.data}
                  errors={errors}
                />
              )}
              {stsAsuransiMtr == "P" && (
                <SelectGroup
                  name={"alasan_pending_asuransi_mtr"}
                  label={"Alasan Pending"}
                  id={"alasan_pending_asuransi_mtr"}
                  register={register}
                  disabled={false}
                  options={[
                    { name: "Telp Kembali", value: 2 },
                    { name: "Telepon tdk diangkat", value: 3 },
                  ]}
                  errors={errors}
                />
              )}
              {stsAsuransiMtr == "F" && (
                <InputGroup
                  name={"tgl_prospect_asuransi_mtr"}
                  label={"Tanggal Prospect"}
                  id={"tgl_prospect_asuransi_mtr"}
                  validation={{ required: isRequired || stsAsuransiMtr == "F" ? "This field is Required" : false }}
                  register={register}
                  errors={errors}
                  type="date"
                />
              )}
            </div>
            <div className="col-span-1">
              <label htmlFor={"id_produk"} className="block text-sm font-medium text-gray-900 cursor-pointer">
                {"Id Produk"}
              </label>
              <div className="relative mt-1 rounded-md shadow-sm cursor-pointer">
                <input
                  readOnly
                  disabled={disabledOkeAsuransiMtr}
                  onClick={() => setOpenProdukAsuransiMtr(true)}
                  id={"id_produk"}
                  placeholder="Id Produk"
                  {...register("id_produk_asuransi_mtr", {
                    validate: (value) => {
                      return stsAsuransiMtr === "O" && !value ? "This field is required" : true;
                    }, // ✅ Validasi dinamis
                  })}
                  className={`cursor-pointer block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm ${
                    disabledOkeAsuransiMtr ? "bg-gray-300 cursor-not-allowed" : ""
                  }`}
                />
                {errors["id_produk_asuransi_mtr"] && (
                  <p className="text-sm text-red absolute" style={{ marginTop: 2 }}>
                    {errors["id_produk_asuransi_mtr"]?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-1">
              <InputGroup
                readOnly
                name={"nm_vendor_mtr"}
                label={"Nama Vendor"}
                id={"nm_vendor_mtr"}
                register={register}
                disabled={disabledOkeAsuransiMtr}
                errors={errors}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                readOnly
                name={"nm_produk_asuransi_mtr"}
                label={"Nama Produk"}
                id={"nm_produk_asuransi_mtr"}
                register={register}
                disabled={disabledOkeAsuransiMtr}
                errors={errors}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                readOnly
                name={"rate_mtr"}
                label={"Rate"}
                id={"rate_mtr"}
                register={register}
                disabled={disabledOkeAsuransiMtr}
                errors={errors}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                readOnly
                name={"admin_mtr"}
                label={"Biaya Admin"}
                id={"admin_mtr"}
                register={register}
                disabled={disabledOkeAsuransiMtr}
                errors={errors}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                readOnly
                name={"asuransi_nm_mtr"}
                label={"Nama Motor"}
                id={"asuransi_nm_mtr"}
                register={register}
                disabled={disabledOkeAsuransiMtr}
                errors={errors}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                name={"asuransi_no_mtr"}
                label={"Nomor Motor"}
                placeholder={"Nomor Motor"}
                id={"asuransi_no_mtr"}
                register={register}
                disabled={disabledOkeAsuransiMtr}
                errors={errors}
                readOnly
                onClick={() => setOpenMstMtr(true)}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                name={"asuransi_mtr_tahun"}
                label={"Tahun"}
                id={"asuransi_mtr_tahun"}
                register={register}
                disabled={disabledOkeAsuransiMtr}
                errors={errors}
                type="number"
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                name={"warna"}
                label={"Warna"}
                id={"warna"}
                register={register}
                validation={{ required: stsAsuransiMtr == "O" ? "This field is required" : false }}
                disabled={disabledOkeAsuransiMtr}
                errors={errors}
                type="text"
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                name={"no_pol_wkm"}
                label={"Nomor Polisi"}
                id={"no_pol_wkm"}
                register={register}
                validation={{ required: stsAsuransiMtr == "O" ? "This field is required" : false }}
                disabled={disabledOkeAsuransiMtr}
                errors={errors}
                type="text"
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                name={"asuransi_mtr_otr"}
                label={"OTR"}
                id={"asuransi_mtr_otr"}
                disabled={disabledOkeAsuransiMtr}
                errors={errors}
                type="text"
                value={otrValue || ""}
                onChange={(e) => handleRpChange(e, "otr")}
                register={register}
                validation={{
                  required: false,
                  min: {
                    value: 0,
                    message: "Amount cannot be less than 0",
                  },
                  pattern: {
                    value: /^Rp\s?\d{1,3}(,\d{3})*$/,
                    message: "Invalid amount format",
                  },
                }}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                readOnly
                name={"asuransi_mtr_amount"}
                label={"Amount Asuransi Motor"}
                id={"asuransi_mtr_amount"}
                disabled={disabledOkeAsuransiMtr}
                errors={errors}
                type="text"
                value={amountValue || ""}
                onChange={(e) => handleRpChange(e, "amount")}
                register={register}
                validation={{
                  required: false,
                  min: {
                    value: 0,
                    message: "Amount cannot be less than 0",
                  },
                  // pattern: {
                  //   value: /^Rp\s?\d{1,3}(,\d{3})*$/,
                  //   message: "Invalid amount format",
                  // },
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
