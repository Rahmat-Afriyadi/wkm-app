"use client";

import React, { useEffect, useState } from "react";
import InputGroup from "@/components/Input/input-group";
import RadioButtonComponent from "@/components/Input/radio-button";
import SearchableSelect from "@/components/Input/searchable-select";
import { Form, useForm } from "react-hook-form";
import SelectGroup from "@/components/Input/select-group";
import { ArrowDownCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import DrawerCenter from "@/components/drawer/drawer-center";
import { masterKodepos } from "@/server/kodepos/master-kodepos";
import { masterAktifJual } from "@/server/master/aktif-jual";
import { useQuery } from "@tanstack/react-query";

export default function FormInputTelesales() {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const [openAlamat, setOpenAlamat] = useState(false);
  const [openKodepos, setOpenKodepos] = useState(false);

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

  console.log("ini data ", aktifJual.data);

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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-9">
        <DrawerCenter open={openKodepos} setOpen={setOpenKodepos}>
          <div className="h-screen">
            <SearchableSelect options={kodepos?.data} name={"kodepos"} setValue={setValue} setOpen={setOpenKodepos} />
          </div>
        </DrawerCenter>

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

        <div className="col-span-1">
          <p className="text-lg font-bold mb-3">WKM</p>
          <div className="grid grid-cols-8 gap-3">
            <div className="col-span-3">
              <InputGroup
                name={"nm_customer_wkm"}
                label={"Nama Customer"}
                id={"nm_customer_wkm"}
                register={register}
                disabled={false}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end justify-center cursor-pointer"></div>
            <div className="col-span-3">
              <InputGroup
                name={"no_info"}
                label={"Nomor Into"}
                id={"no_info"}
                register={register}
                disabled={false}
                errors={errors}
              />
            </div>
            <div className="col-span-1 flex items-end">
              <button
                onClick={() => setOpenKetTelp1(true)}
                className="w-full  h-9 flex justify-center items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              >
                <p>X</p>
                <ArrowDownCircleIcon className="h-6 w-6 ml-1" />
              </button>
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
            <div className="col-span-3"></div>
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
              <button
                onClick={() => setOpenKetTelp1(true)}
                className="w-full  h-9 flex justify-center items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              >
                <p>X</p>
                <ArrowDownCircleIcon className="h-6 w-6 ml-1" />
              </button>
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

        <br />

        <div className="col-span-2">
          <div className="grid grid-cols-3">
            <div className="col-span-3">
              <div className="grid grid-cols-12">
                <div className="col-span-3">
                  <RadioButtonComponent
                    name={"Status Membership"}
                    options={[
                      { name: "Oke", value: "O" },
                      { name: "Pending", value: "P" },
                      { name: "Tidak", value: "T" },
                      { name: "Pros", value: "F" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
