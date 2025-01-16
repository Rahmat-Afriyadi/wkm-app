"use client";

import React, { useEffect, useState } from "react";
import InputGroup from "@/components/Input/input-group";
import RadioButtonComponent from "@/components/Input/radio-button";
import SearchableSelect from "@/components/Input/searchable-select";
import { Form, useForm } from "react-hook-form";
import SelectGroup from "@/components/Input/select-group";
import { ArrowDownCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DrawerCenter from "@/components/drawer/drawer-center";
import Drawer from "@/components/drawer/drawer";
import { masterKodepos } from "@/server/kodepos/master-kodepos";
import { masterAktifJual } from "@/server/master/aktif-jual";
import { masterProdukAsuransi } from "@/server/master/produk-asuransi";
import { useQuery } from "@tanstack/react-query";
import TableProdukAsuransi from "./table-produk-asuransi";

export default function FormInputTelesales({ defaultValues, isEditing = false }) {
  console.log(defaultValues.tgl_lahir_fkt);
  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: isEditing ? defaultValues : {} });

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    return reset(defaultValues);
  }, [defaultValues]); // eslint-disable-line

  const [openKodepos, setOpenKodepos] = useState(false);
  const [openProdukAsuransi, setOpenProdukAsuransi] = useState(false);

  const [menuTab, setMenuTab] = useState(1);
  const [asuransiTypeTab, setAsuransiTypeTab] = useState(1);

  const { data: kodepos } = useQuery({
    queryKey: ["kodepos"],
    queryFn: async () => await masterKodepos(),
    initialData: { data: [{ value: "", nama: "" }] },
  });
  const { data: aktifJual } = useQuery({
    queryKey: ["aktif-jual"],
    queryFn: async () => await masterAktifJual(),
    initialData: { data: [{ value: "", nama: "" }] },
  });
  const { data: produkAsuransi } = useQuery({
    queryKey: ["produk-asuransi"],
    queryFn: async () => await masterProdukAsuransi(1),
    initialData: { data: [{ id: "", nama: "", rate: 0 }] },
  });

  const kirimKe = watch("kirim_ke");
  const ketNmWkm = watch("ket_nm_wkm");
  const selectedKodepos = watch("kodepos");

  useEffect(() => {
    if (selectedKodepos) {
      const fillKodepos = selectedKodepos.split(",");
      setValue("kodepos_wkm", fillKodepos[3]);
      setValue("kel_wkm", fillKodepos[2]);
      setValue("kec_wkm", fillKodepos[1]);
      setValue("kota_wkm", fillKodepos[0]);
    }
  }, [selectedKodepos]); // eslint-disable-line

  useEffect(() => {
    if (ketNmWkm == 1) {
      setValue("nm_customer_wkm", watch("nm_customer_fkt"));
    }
  }, [ketNmWkm]); // eslint-disable-line

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-9">
        <DrawerCenter open={openKodepos} setOpen={setOpenKodepos}>
          <div className="h-screen">
            <SearchableSelect options={kodepos?.data} name={"kodepos"} setValue={setValue} setOpen={setOpenKodepos} />
          </div>
        </DrawerCenter>
        <Drawer open={openProdukAsuransi} setOpen={setOpenProdukAsuransi}>
          <TableProdukAsuransi
            options={produkAsuransi.data}
            handleChange={(e) => {
              setValue("id_produk_asuransi", e.kd_produk);
              setValue("nm_produk_asuransi", e.nm_produk);
              setValue("nm_vendor", e.vendor.nm_vendor);
              setOpenProdukAsuransi(false);
            }}
          />
        </Drawer>
        <div className="col-span-1">
          <p className="text-lg font-bold mb-3">Faktur</p>
          <div className="grid grid-cols-8 gap-3">
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
                name={"nm_customer_fkt"}
                label={"Nama Customer"}
                id={"nm_customer_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer"></div>
            <div className="col-span-3">
              <InputGroup
                name={"tgl_faktur"}
                label={"Tanggal Faktur"}
                id={"tgl_faktur"}
                register={register}
                disabled={true}
                errors={errors}
                type="date"
              />
            </div>
            <div className="col-span-1"></div>

            <div className="col-span-3">
              <InputGroup
                name={"alamat_fkt"}
                label={"Alamat"}
                id={"alamat_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer"></div>
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
            <div className="col-span-1"></div>

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
            <div className="col-span-1 flex items-end justify-center cursor-pointer"></div>
            <div className="col-span-3">
              <InputGroup
                name={"tgl_lahir_fkt"}
                label={"Tanggal Lahir"}
                id={"tgl_lahir_fkt"}
                register={register}
                disabled={true}
                errors={errors}
                type="date"
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
              <SelectGroup
                name={"kode_kerja_fkt"}
                label={"Pekerjaan"}
                id={"kode_kerja_fkt"}
                register={register}
                disabled={true}
                options={[{ name: "", value: "" }]}
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
              <SelectGroup
                name={"agama_fkt"}
                label={"Agama"}
                id={"agama_fkt"}
                register={register}
                options={[{ name: "", value: "" }]}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>

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
              <SelectGroup
                name={"kode_didik_fkt"}
                label={"Pendidikan"}
                id={"kode_didik_fkt"}
                register={register}
                disabled={true}
                errors={errors}
                options={[{ name: "", value: "" }]}
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
                name="ket_no_telp_fkt"
                id="ket_no_telp_fkt"
                errors={errors}
                register={register}
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
              <SelectGroup
                name={"keluar_bln_fkt"}
                label={"Pengeluaran"}
                id={"keluar_bln_fkt"}
                register={register}
                options={[{ name: "", value: "" }]}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>

            <div className="col-span-3">
              <InputGroup
                name={"tujuan_pakai_fkt"}
                label={"Tujuan Pakai"}
                id={"tujuan_pakai_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer"></div>
            <div className="col-span-3">
              <InputGroup
                name={"hobby_fkt"}
                label={"Hobby"}
                id={"hobby_fkt"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>
          </div>
        </div>
        <div className="col-span-1 ">
          <p className="text-lg font-bold mb-3">WKM</p>
          <div className="grid grid-cols-8 gap-3">
            <div className="col-span-3">
              <InputGroup
                name={"nm_customer_wkm"}
                label={"Nama Customer"}
                id={"nm_customer_wkm"}
                register={register}
                disabled={ketNmWkm == 1}
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
            <div className="col-span-3">
              <InputGroup
                name={"no_info"}
                label={"Nomor Info"}
                id={"no_info"}
                register={register}
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
                  { name: "6", value: "6" },
                  { name: "7", value: "7" },
                  { name: "8", value: "8" },
                ]}
                errors={errors}
              />
            </div>
            <div className="col-span-3">
              <InputGroup
                name={"alamat_wkm"}
                label={"Alamat"}
                id={"alamat_wkm"}
                register={register}
                disabled={false}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer">
              <SelectGroup
                name="ket_alamat_wkm"
                id="ket_alamat_wkm"
                errors={errors}
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
                name={"alasan_tdk_membership"}
                label={"Alasan"}
                id={"alasan_tdk_membership"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>
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
            <div className="col-span-1 flex items-end justify-center cursor-pointer"></div>
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
            <div className="col-span-1 flex items-end"></div>
            <div className="col-span-3">
              <InputGroup
                name={"kodepos_wkm"}
                label={"Kodepos"}
                id={"kodepos_wkm"}
                register={register}
                disabled={false}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer">
              <button
                onClick={() => setOpenKodepos(true)}
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
                options={aktifJual.data}
              />
            </div>
            <div className="col-span-1 flex items-end"></div>
            <div className="col-span-3">
              <InputGroup
                name={"kel_wkm"}
                label={"Kelurahan"}
                id={"kel_wkm"}
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
                name={"kec_wkm"}
                label={"Kecamatan"}
                id={"kec_wkm"}
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
                name={"kota_wkm"}
                label={"Kota"}
                id={"kota_wkm"}
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
                options={[{ name: "", value: "" }]}
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
                name={"no_yg_dihub_ts"}
                label={"No Hub"}
                id={"no_yg_dihub_ts"}
                register={register}
                disabled={false}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer">
              <button
                onClick={() => setOpenKetTelp1(true)}
                className="w-full  h-9 flex justify-center items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              >
                <p>X</p>
                <ArrowDownCircleIcon className="h-6 w-6 ml-1" />
              </button>
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
                <div className="col-span-3 -mt-1">
                  <RadioButtonComponent
                    setValue={setValue}
                    label={"Status Membership"}
                    name={"sts_membership"}
                    options={[
                      { name: "Oke", value: "O" },
                      { name: "Pending", value: "P" },
                      { name: "Tidak", value: "T" },
                      { name: "Pros", value: "F" },
                    ]}
                  />
                </div>
                <div className="col-span-2">
                  <SelectGroup
                    name={"jns_membership"}
                    label={"Produk"}
                    id={"jns_membership"}
                    register={register}
                    disabled={false}
                    options={[{ name: "", value: "" }]}
                    errors={errors}
                  />
                </div>
                <div className="col-span-7 bg-gray-300 row-span-4"></div>
                <div className="col-span-2">
                  <SelectGroup
                    name={"alasan_tdk_membership"}
                    label={"Alasan"}
                    id={"alasan_tdk_membership"}
                    register={register}
                    disabled={false}
                    options={[{ name: "", value: "" }]}
                    errors={errors}
                  />
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-2">
                  <SelectGroup
                    name={"kd_promo_transfer"}
                    label={"Promo Transfer"}
                    id={"kd_promo_transfer"}
                    register={register}
                    disabled={false}
                    options={[{ name: "", value: "" }]}
                    errors={errors}
                  />
                </div>
                {/* <div className="col-span-7"></div> */}
                <div className="col-span-3">
                  <RadioButtonComponent
                    setValue={setValue}
                    label={"Status"}
                    name="jns_bayar"
                    options={[
                      { name: "Cash", value: "C" },
                      { name: "Transfer", value: "T" },
                      { name: "QR", value: "Q" },
                      { name: "Etc", value: "0" },
                    ]}
                  />
                </div>
                <div className="col-span-2">
                  <InputGroup
                    name={"tgl_janji_bayar"}
                    label={"Tanggal Bayar"}
                    id={"tgl_janji_bayar"}
                    register={register}
                    disabled={false}
                    errors={errors}
                    type="date"
                  />
                </div>
                {/* <div className="col-span-7"></div> */}
                <div className="col-span-3">
                  <RadioButtonComponent
                    setValue={setValue}
                    label={"Kirim ke"}
                    name="kirim_ke"
                    options={[
                      { name: "Rumah", value: "1" },
                      { name: "Kantor", value: "2" },
                      { name: "ADC", value: "3" },
                    ]}
                  />
                </div>
                <div className="col-span-2">
                  <RadioButtonComponent
                    setValue={setValue}
                    label={"Tipe Kartu"}
                    name={"type_kartu"}
                    options={[
                      { name: "Fisik", value: "F" },
                      { name: "E-Card", value: "E" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-span-2 py-5 ${menuTab != 1 ? "hidden" : ""}`}>
          <div
            className={`${kirimKe == 2 ? "" : "hidden"} grid grid-cols-12 gap-x-2 md:gap-x-4`}
            id="styled-profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="col-span-12 mt-1 mb-3">
              <p className="py-2 px-4 rounded-md border-2 border-gray-300 font-bold inline-block">Kantor</p>
            </div>
            <div className="col-span-6">
              <InputGroup
                errors={errors}
                name={"kerja_di"}
                label={"Nama PT"}
                id={"kerja_di"}
                register={register}
                disabled={false}
              />
            </div>
            <div className="col-span-6">
              <InputGroup
                errors={errors}
                label={"Alamat Kantor"}
                name={"alamat_ktr_fkt"}
                id={"Alamat Kantor"}
                register={register}
                disabled={false}
              />
            </div>
            <div className="col-span-6 mt-5">
              <InputGroup
                errors={errors}
                name={"kota_ktr_fkt"}
                label={"Kota"}
                id={"kota_ktr_fkt"}
                register={register}
                disabled={false}
              />
            </div>
            <div className="col-span-6 mt-5">
              <InputGroup
                errors={errors}
                name={"kec_ktr_fkt"}
                label={"Kecamatan"}
                id={"kec_ktr_fkt"}
                register={register}
                disabled={false}
              />
            </div>
            <div className="col-span-6 mt-5">
              <InputGroup
                errors={errors}
                name={"kel_ktr_fkt"}
                label={"Kelurahan"}
                id={"kel_ktr_fkt"}
                register={register}
                disabled={false}
              />
            </div>
            <div className="col-span-6 mt-5">
              <InputGroup
                errors={errors}
                name={"rw_ktr_fkt"}
                label={"RW"}
                id={"rw_ktr_fkt"}
                register={register}
                disabled={false}
              />
            </div>
            <div className="col-span-6 mt-5">
              <InputGroup
                errors={errors}
                name={"rt_ktr_fkt"}
                label={"RT"}
                id={"rt_ktr_fkt"}
                register={register}
                disabled={false}
              />
            </div>
            <div className="col-span-6 mt-5">
              <InputGroup
                errors={errors}
                name={"kodepos_ktr_fkt"}
                label={"Kodepos"}
                id={"kodepos_ktr_fkt"}
                register={register}
                disabled={false}
              />
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
                setValue={setValue}
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
              <label htmlFor={"id_produk"} className="block text-sm font-medium text-gray-900 cursor-pointer">
                {"Id Produk"}
              </label>
              <div className="relative mt-1 rounded-md shadow-sm cursor-pointer">
                <input
                  readOnly
                  onClick={() => setOpenProdukAsuransi(true)}
                  id={"id_produk"}
                  placeholder="Id Produk"
                  {...register("id_produk_asuransi")}
                  className={`cursor-pointer block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm`}
                />
              </div>
            </div>
            <div className="col-span-1">
              <InputGroup
                name={"nm_vendor"}
                label={"Nama Vendor"}
                id={"nm_vendor"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                name={"nm_produk_asuransi"}
                label={"Nama Produk"}
                id={"nm_produk_asuransi"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
          </div>
        </div>

        <div className={`col-span-2 mt-5 mb-2 ${asuransiTypeTab == 2 && menuTab == 2 ? "" : "hidden"}`}>
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1">
              <RadioButtonComponent
                setValue={setValue}
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
            <div className="col-span-1">
              <label htmlFor={"id_produk"} className="block text-sm font-medium text-gray-900 cursor-pointer">
                {"Id Produk"}
              </label>
              <div className="relative mt-1 rounded-md shadow-sm cursor-pointer">
                <input
                  readOnly
                  onClick={() => setOpenProdukAsuransi(true)}
                  id={"id_produk"}
                  placeholder="Id Produk"
                  {...register("id_produk_asuransi")}
                  className={`cursor-pointer block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm`}
                />
              </div>
            </div>
            <div className="col-span-1">
              <InputGroup
                name={"nm_vendor"}
                label={"Nama Vendor"}
                id={"nm_vendor"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                name={"nm_produk_asuransi"}
                label={"Nama Produk"}
                id={"nm_produk_asuransi"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                name={"asuransi_mtr_nm_motor"}
                label={"Nama Motor"}
                id={"asuransi_mtr_nm_motor"}
                register={register}
                disabled={true}
                errors={errors}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                name={"asuransi_mtr_no_mtr"}
                label={"Nomor Motor"}
                placeholder={"Nomor Motor"}
                id={"asuransi_mtr_no_mtr"}
                register={register}
                disabled={false}
                errors={errors}
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                name={"asuransi_mtr_tahun"}
                label={"Tahun"}
                id={"asuransi_mtr_tahun"}
                register={register}
                disabled={false}
                errors={errors}
                type="number"
              />
            </div>
            <div className="col-span-1">
              <InputGroup
                name={"asuransi_mtr_otr"}
                label={"OTR"}
                id={"asuransi_mtr_otr"}
                register={register}
                disabled={false}
                errors={errors}
                type="number"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
