"use client";

import { InputBase } from "@/components/Input/input-base";
import { useState, useRef } from "react";
import { Form, useForm } from "react-hook-form";
import { DatepickerInputTglMerah } from "./datepicker-tgl-merah";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInputBayar } from "@/server/faktur/update-input-bayar";
import Swal from "sweetalert2";
import { TextareaBase } from "@/components/Input/text-area";

export function FormInputTglMerah() {
  const { register, handleSubmit } = useForm();
  const [valueTglMrh, setValueTglMrh] = useState({
    startDate: null,
    endDate: null,
  });

  const queryCLient = useQueryClient();
  const mutInputBayar = useMutation({
    mutationFn: updateInputBayar,
  });
  const onSubmit = (values) => {
    values.tgl_awal = valueTglMrh.startDate;
    values.tgl_akhir = valueTglMrh.endDate;

    Swal.fire({
      title: "Apakah data yang dimasukan sudah benar",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0891B2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        mutInputBayar.mutate(values, {
          onSuccess: (data) => {
            queryCLient.invalidateQueries({ queryKey: ["member-cards"] });
            Swal.fire("Success!", "Kartu berhasil ditambahkan", "info");
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
