"use client";

import { InputBase } from "@/components/Input/input-base";
import { useState, useRef } from "react";
import { Form, useForm } from "react-hook-form";
import { DatepickerInputBayar } from "./datepicker-input-bayar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInputBayar } from "@/server/faktur/update-input-bayar";
import Swal from "sweetalert2";

export default function FormInputBayar() {
  const { register, handleSubmit } = useForm();
  const queryCLient = useQueryClient();
  const mutInputBayar = useMutation({
    mutationFn: updateInputBayar,
  });
  const onSubmit = (values) => {
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
    console.log("ini values yaa ", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-x-4">
      <div className="col-span-6">
        <DatepickerInputBayar />
      </div>
      <div className="col-span-6">
        <InputBase name={"no_msn"} lable={"Nomor Mesin"} id={"no_msn"} register={register} disabled={false} />
      </div>
      <div className="col-span-6 mt-7">
        <InputBase
          name={"nm_customer"}
          lable={"Nama Customer"}
          id={"nm_customer"}
          register={register}
          disabled={false}
        />
      </div>
    </form>
  );
}
