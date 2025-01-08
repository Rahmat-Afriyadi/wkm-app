"use client";

import React, { useState } from "react";
import InputGroup from "@/components/Input/input-group";
import { Form, useForm } from "react-hook-form";
import SelectGroup from "@/components/Input/select-group";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import DrawerCenter from "@/components/drawer/drawer-center";

export default function FormInputTelesales() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const [openKetTelp1, setOpenKetTelp1] = useState(false);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-9">
        <DrawerCenter open={openKetTelp1} setOpen={setOpenKetTelp1}>
          <SelectGroup
            name="ket_no_telp_fkt"
            id="ket_no_telp_fkt"
            errors={errors}
            register={register}
            options={[{ name: "", value: "" }]}
          />
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
              <button
                onClick={() => setOpenKetTelp1(true)}
                className="w-full  h-9 flex justify-center items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              >
                <p>X</p>
                <ArrowDownCircleIcon className="h-6 w-6 ml-1" />
              </button>
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
              <button
                onClick={() => setOpenKetTelp1(true)}
                className="w-full  h-9 flex justify-center items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              >
                <p>X</p>
                <ArrowDownCircleIcon className="h-6 w-6 ml-1" />
              </button>
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
                name={"tgl_faktur"}
                label={"Tanggal Faktur"}
                id={"tgl_faktur"}
                register={register}
                disabled={false}
                errors={errors}
                type="date"
              />
            </div>
            <div className="col-span-1"></div>

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
                name={"nm_mtr"}
                label={"Motor"}
                id={"nm_mtr"}
                register={register}
                disabled={false}
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
                name={"nm_mtr"}
                label={"Motor"}
                id={"nm_mtr"}
                register={register}
                disabled={false}
                errors={errors}
              />
            </div>
            <div className="col-span-1"></div>

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
                onClick={() => setOpenKetTelp1(true)}
                className="w-full  h-9 flex justify-center items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              >
                <p>X</p>
                <ArrowDownCircleIcon className="h-6 w-6 ml-1" />
              </button>
            </div>
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
            <div className="col-span-1"></div>

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
            <div className="col-span-3">
              <InputGroup
                name={"jns_klm_wkm"}
                label={"Jenis Kelamin"}
                id={"jns_klm_wkm"}
                register={register}
                disabled={false}
                errors={errors}
              />
            </div>
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
            <div className="col-span-3">
              <SelectGroup
                name={"kode_kerja_wkm"}
                label={"Pekerjaan"}
                id={"kode_kerja_wkm"}
                register={register}
                disabled={false}
                options={[{ name: "", value: "" }]}
                errors={errors}
              />
            </div>
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
            <div className="col-span-3">
              <SelectGroup
                name={"agama_wkm"}
                label={"Agama"}
                id={"agama_wkm"}
                register={register}
                options={[{ name: "", value: "" }]}
                disabled={false}
                errors={errors}
              />
            </div>
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
      </form>
    </>
  );
}
