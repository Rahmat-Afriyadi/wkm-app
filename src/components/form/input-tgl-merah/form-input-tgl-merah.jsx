"use client";

import { InputBase } from "@/components/Input/input-base";
import { useState, useRef } from "react";
import { Form, useForm } from "react-hook-form";
import { DatepickerInputTglMerah } from "./datepicker-tgl-merah";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { TextareaBase } from "@/components/Input/text-area";
import { inputTanggalMerah } from "@/server/tanggal-merah/create-tanggal-merah";
import { updateTanggalMerah } from "@/server/tanggal-merah/update-tanggal-merah";
import { useRouter } from "next/navigation";

export function FormInputTglMerah({ defaultValues, isEditing }) {
  const { register, handleSubmit } = useForm({ defaultValues: defaultValues });
  const [valueTglMrh, setValueTglMrh] = useState({
    startDate: isEditing ? defaultValues.tgl_awal : null,
    endDate: isEditing ? defaultValues.tgl_akhir : null,
  });
  const router = useRouter();

  const queryCLient = useQueryClient();
  const mutTanggalMerah = useMutation({
    mutationFn: isEditing ? updateTanggalMerah : inputTanggalMerah,
  });
  const onSubmit = (values) => {
    values.tgl_awal = new Date(valueTglMrh.startDate);
    values.tgl_akhir = new Date(valueTglMrh.endDate);
    Swal.fire({
      title: "Apakah data yang dimasukan sudah benar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0891B2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        mutTanggalMerah.mutate(values, {
          onSuccess: (data) => {
            queryCLient.invalidateQueries({ queryKey: ["tanggal-merah"] });
            if (data.status == "success") {
              Swal.fire(
                "Success!",
                isEditing ? "Tanggal Merah berhasil diperbarui" : "Tanggal Merah berhasil ditambahkan",
                "success"
              ).then(() => {
                router.replace("/input-tanggal-merah");
              });
            } else {
              Swal.fire(
                "Failed!",
                isEditing ? "Tanggal Merah gagal diperbarui" : "Tanggal Merah gagal ditambahkan",
                "error"
              ).then(() => {});
            }
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-x-4">
      <div className="col-span-6">
        <DatepickerInputTglMerah valueTglMrh={valueTglMrh} setValueTglMrh={setValueTglMrh} />
      </div>
      <div className="col-span-6">
        <TextareaBase
          label={"Deskripsi"}
          rows={4}
          register={register}
          placeholder={"Deskripsi"}
          name={"deskripsi"}
          id={"deskripsi"}
        />
      </div>
      <div className="col-span-12">
        <button
          id="button"
          type="submit"
          className="w-full px-6 py-1 mt-12 text-lg text-black transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-yellow hover:bg-white hover:shadow-lg focus:outline-none border-2 border-yellow"
        >
          Save
        </button>
      </div>
    </form>
  );
}
