"use client";

import { InputBase } from "@/components/Input/input-base";
import { SelectBase } from "@/components/Input/select-base";
import { DatepickerBase } from "../../Input/date-picker";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { inputExtendBayar } from "@/server/extend-bayar/create-extend-bayar";
import { updateFa } from "@/server/extend-bayar/update-extend-bayar";
import { updateApprovalLf } from "@/server/extend-bayar/update-lf-approval-extend-bayar";
import { useRouter } from "next/navigation";
import { TextareaBase } from "@/components/Input/text-area";
import { useSession } from "next-auth/react";

export function FormInputExtendBayar({ defaultValues, isEditing }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  const router = useRouter();
  const [tab, setTab] = useState(1);
  const [valueTglExtendBayar, setValueTglExtendBayar] = useState({
    startDate: isEditing ? new Date(defaultValues.extend_bayar.tgl_actual_bayar) : null,
    endDate: isEditing ? new Date(defaultValues.extend_bayar.tgl_actual_bayar) : null,
  });
  const { data: session } = useSession();

  const queryClient = useQueryClient();
  const mutExtendBayar = useMutation({
    mutationFn: isEditing ? (session?.user?.role == 6 ? updateApprovalLf : updateFa) : inputExtendBayar,
  });
  const onSubmit = (values) => {
    values.extend_bayar.tgl_actual_bayar = new Date(valueTglExtendBayar.startDate);
    if (!isEditing) {
      values.extend_bayar.no_msn = values.no_msn;
      values.extend_bayar.sts_cetak3 = values.sts_cetak3;
    }
    if (values.extend_bayar.deskripsi.length < 3) {
      return Swal.fire("Failed!", "mohon diisi alasan telat bayar", "error");
    }
    console.log("ini values ", values);
    Swal.fire({
      title: "Apakah data yang dimasukan sudah benar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0891B2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        mutExtendBayar.mutate(
          session?.user?.role == 6
            ? { sts_approval: values.extend_bayar.sts_approval, datas: [{ id: values.extend_bayar.id }] }
            : values.extend_bayar,
          {
            onSuccess: (data) => {
              if (data.status == "fail") {
                Swal.fire("Failed!", data.message, "info");
              } else if (data.status == "success") {
                Swal.fire("Success!", data.message, "success").then(() => {
                  queryClient.invalidateQueries({ queryKey: ["pengajuan-extend-bayar"] });
                  if (session?.user?.role == 6) {
                    router.replace("/approval-extend-bayar");
                  } else {
                    router.replace("/pengajuan-extend-bayar");
                  }
                });
              }
            },
            onError: (e) => {
              console.log("ini error ", e);
              Swal.fire("Failed!", e.response.data.message, "error");
            },
          }
        );
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-x-7">
        <div className="col-span-6">
          <div className="grid grid-cols-12 gap-x-5 md:gap-x-7">
            <div className="col-span-6">
              <DatepickerBase
                disabled={defaultValues.extend_bayar?.sts_approval == "O" || session?.user.role == 6}
                value={valueTglExtendBayar}
                setValue={setValueTglExtendBayar}
                id={"extend_bayar.tgl_actual_bayar"}
                label={"Tanggal Bayar"}
              />
            </div>
            <div className="col-span-6 flex items-end">
              <button
                disabled={defaultValues.extend_bayar?.sts_approval == "O"}
                id="button"
                type="submit"
                className="mr-2 w-full bg-yellow disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed border-yellow focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save
              </button>
            </div>
            {session?.user.role == 6 && (
              <div className="col-span-12 mt-5">
                <SelectBase
                  name={"extend_bayar.sts_approval"}
                  lable={"Status Pengajuan"}
                  id={"sts_approval"}
                  register={register}
                  disabled={defaultValues.extend_bayar?.sts_approval == "O"}
                  options={[
                    { name: "Rejected", value: "R" },
                    { name: "Pending", value: "P" },
                    { name: "Approved", value: "O" },
                  ]}
                />
              </div>
            )}
            <div className="col-span-12 mt-5">
              <TextareaBase
                disabled={(session?.user.role == 6) | (defaultValues.extend_bayar?.sts_approval == "O")}
                placeholder={"Alasan telat input"}
                rows={3}
                register={register}
                label={"Alasan telat input"}
                id={"deskripsi"}
                name={"extend_bayar.deskripsi"}
              />
            </div>

            <div className="col-span-6 mt-5">
              <InputBase name={"no_msn"} lable={"Nomor Mesin"} id={"no_msn"} register={register} disabled={true} />
            </div>
            <div className="col-span-6 mt-5">
              <InputBase
                name={"no_tanda_terima"}
                lable={"Nomor Tanda Terima"}
                id={"no_tanda_terima"}
                register={register}
                disabled={true}
              />
            </div>
            <div className="col-span-6 mt-5">
              <InputBase name={"no_kartu"} lable={"Nomor Kartu"} id={"no_kartu"} register={register} disabled={true} />
            </div>
            <div className="col-span-6 mt-5">
              <DatepickerBase
                label={"Tanggal Expired"}
                id={"tgl_expired"}
                value={{
                  startDate: new Date(defaultValues.kartu.tgl_expired),
                  endDate: new Date(defaultValues.kartu.tgl_expired),
                }}
                disabled={true}
                setValue={setValueTglExtendBayar}
              />
            </div>
            <div className="col-span-12 mt-5">
              <InputBase
                name={"nm_customer11"}
                lable={"Nama Customer"}
                id={"nm_customer11"}
                register={register}
                disabled={true}
              />
            </div>
            <div className="col-span-12 mt-5">
              <InputBase name={"nm_mtr"} lable={"Nama Motor"} id={"nm_mtr"} register={register} disabled={true} />
            </div>
            <div className="col-span-6 mt-5">
              <InputBase
                name={"no_telp1"}
                lable={"Nomor Telepon 1"}
                id={"no_telp1"}
                register={register}
                disabled={true}
              />
            </div>
            <div className="col-span-6 mt-5">
              <InputBase name={"no_hp1"} lable={"Nomor Hp 1"} id={"no_hp1"} register={register} disabled={true} />
            </div>
            <div className="col-span-6 mt-5">
              <InputBase
                name={"kurir.nama_kurir"}
                lable={"Nama Kurir"}
                id={"kurir.nama_kurir"}
                register={register}
                disabled={true}
              />
            </div>
            <div className="col-span-6 mt-5">
              <InputBase
                name={"mst_card.jns_card"}
                lable={"Jenis Kartu"}
                id={"mst_card.jns_card"}
                register={register}
                disabled={true}
              />
            </div>
            <div className="col-span-6 mt-5">
              <SelectBase
                name={"sts_jenis_bayar"}
                lable={"Jenis Bayar"}
                id={"sts_jenis_bayar"}
                register={register}
                disabled={true}
                options={[
                  { name: "Cash", value: "C" },
                  { name: "Transfer", value: "T" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="col-span-6">
          <div className="mt-[18px] border-b border-gray-200 dark:border-gray-700">
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center"
              id="default-styled-tab"
              data-tabs-toggle="#default-styled-tab-content"
              data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500"
              data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300"
              role="tablist"
            >
              <li className="me-2" role="presentation">
                <button
                  onClick={() => setTab(1)}
                  className={`${
                    tab == 1 ? "text-yellow bg-black" : ""
                  } inline-block p-4 border-b-2 rounded-t-lg hover:bg-yellow hover:text-black`}
                  id="profile-styled-tab"
                  data-tabs-target="#styled-profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Rumah
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  onClick={() => setTab(2)}
                  className={`${
                    tab == 2 ? "text-yellow bg-black" : ""
                  } inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 hover:bg-yellow`}
                  id="dashboard-styled-tab"
                  data-tabs-target="#styled-dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                >
                  Kantor
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  onClick={() => setTab(3)}
                  className={`${
                    tab == 3 ? "text-yellow bg-black" : ""
                  } inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 hover:bg-yellow`}
                  id="settings-styled-tab"
                  data-tabs-target="#styled-settings"
                  type="button"
                  role="tab"
                  aria-controls="settings"
                  aria-selected="false"
                >
                  ADC
                </button>
              </li>
            </ul>
          </div>
          <div id="default-styled-tab-content">
            <div
              className={`${tab == 1 ? "" : "hidden"} p-4 grid grid-cols-12 gap-x-4`}
              id="styled-profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="col-span-12 mt-1">
                <InputBase name={"alamat21"} lable={"Alamat"} id={"alamat21"} register={register} disabled={true} />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase name={"kota2"} lable={"Kota"} id={"kota2"} register={register} disabled={true} />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase name={"kec2"} lable={"Kecamatan"} id={"kec2"} register={register} disabled={true} />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase name={"kel2"} lable={"Kelurahan"} id={"kel2"} register={register} disabled={true} />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase name={"rw2"} lable={"RW"} id={"rw2"} register={register} disabled={true} />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase name={"rt2"} lable={"RT"} id={"rt2"} register={register} disabled={true} />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase name={"kodepos2"} lable={"Kodepos"} id={"kodepos2"} register={register} disabled={true} />
              </div>
              <div className="col-span-12 mt-5">
                <TextareaBase
                  disabled={true}
                  placeholder={"Alamat Bantuan"}
                  rows={3}
                  register={register}
                  label={"Alamat Bantuan"}
                  id={"alamat_bantuan"}
                  name={"alamat_bantuan"}
                />
              </div>
            </div>

            <div
              className={`${tab == 2 ? "" : "hidden"} p-4 grid grid-cols-12 gap-x-2 md:gap-x-4`}
              id="styled-profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="col-span-12">
                <InputBase name={"kerja_di"} lable={"Nama PT"} id={"kerja_di"} register={register} disabled={true} />
              </div>
              <div className="col-span-12 mt-5">
                <InputBase
                  name={"alamat_ktr"}
                  lable={"Alamat Kantor"}
                  id={"alamat_ktr"}
                  register={register}
                  disabled={true}
                />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase name={"kota_ktr"} lable={"Kota"} id={"kota_ktr"} register={register} disabled={true} />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase name={"kec_ktr"} lable={"Kecamatan"} id={"kec_ktr"} register={register} disabled={true} />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase name={"kel_ktr"} lable={"Kelurahan"} id={"kel_ktr"} register={register} disabled={true} />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase name={"rw_ktr"} lable={"RW"} id={"rw_ktr"} register={register} disabled={true} />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase name={"rt_ktr"} lable={"RT"} id={"rt_ktr"} register={register} disabled={true} />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase
                  name={"kodepos_ktr"}
                  lable={"Kodepos"}
                  id={"kodepos_ktr"}
                  register={register}
                  disabled={true}
                />
              </div>
              <div className="col-span-12 mt-5">
                <TextareaBase
                  disabled={true}
                  placeholder={"Alamat Bantuan"}
                  rows={3}
                  register={register}
                  label={"Alamat Bantuan"}
                  id={"alamat_bantuan"}
                  name={"alamat_bantuan"}
                />
              </div>
            </div>
            <div
              className={`${tab == 3 ? "" : "hidden"} p-4 grid grid-cols-12 gap-x-4`}
              id="styled-profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="col-span-12">
                <InputBase
                  name={"alamat_srt12"}
                  lable={"Nama PT"}
                  id={"alamat_srt12"}
                  register={register}
                  disabled={true}
                />
              </div>
              <div className="col-span-12 mt-5">
                <InputBase
                  name={"alamat_srt11"}
                  lable={"Alamat"}
                  id={"alamat_srt11"}
                  register={register}
                  disabled={true}
                />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase name={"kota_srt1"} lable={"Kota"} id={"kota_srt1"} register={register} disabled={true} />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase name={"kec_srt1"} lable={"Kecamatan"} id={"kec_srt1"} register={register} disabled={true} />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase name={"kel_srt1"} lable={"Kelurahan"} id={"kel_srt1"} register={register} disabled={true} />
              </div>
              <div className="col-span-6 mt-5">
                <InputBase
                  name={"kodepos_srt1"}
                  lable={"Kodepos"}
                  id={"kodepos_srt1"}
                  register={register}
                  disabled={true}
                />
              </div>
              <div className="col-span-12 mt-5">
                <TextareaBase
                  disabled={true}
                  placeholder={"Alamat Bantuan"}
                  rows={3}
                  register={register}
                  label={"Alamat Bantuan"}
                  id={"alamat_bantuan"}
                  name={"alamat_bantuan"}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <br />
      <br />
    </>
  );
}
