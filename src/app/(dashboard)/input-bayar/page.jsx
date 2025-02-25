"use client";
// import DatePicker from "@/components/form/datepicker/datepicker"

import { Suspense, useEffect, useRef } from "react";
import FormInputBayar from "../../../components/form/input-bayar/form-input-bayar";
import { InputBase } from "@/components/Input/input-base";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { searchFaktur } from "@/server/faktur/search-faktur";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Datepicker from "react-tailwindcss-datepicker";
import { formatCurrency } from "@/lib/utils/format-currentcy";

export default function Page() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const { register, reset, handleSubmit, setFocus } = useForm();
  const [faktur, setFaktur] = useState(null);
  const [bayarApa, setBayarApa] = useState(1); // 1 Membership, 2 Asuransi PA, 3 Asuransi Motor
  const [message, setMessage] = useState(null);

  const today = new Date();
  const [value, setValue] = useState({
    startDate: today.toISOString().split("T")[0],
    endDate: today.toISOString().split("T")[0],
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("tgl1", value.startDate);
    params.set("tgl2", value.endDate);
    replace(`${pathname}?${params}`);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleValueChange = (newValue) => {
    const params = new URLSearchParams(searchParams);
    params.set("tgl1", newValue.startDate);
    params.set("tgl2", newValue.endDate);
    replace(`${pathname}?${params}`);
    setValue(newValue);
  };

  const searchMut = useMutation({
    mutationFn: searchFaktur,
  });

  useEffect(() => {
    setFocus("kode");
  }, [setFocus]);

  const onSubmit = (values) => {
    setFaktur(null);
    searchMut.mutate(values, {
      onSuccess: (data) => {
        if (data.hasOwnProperty("message")) {
          setFaktur(null);
          setMessage(data.message);
        } else {
          setMessage(null);
          console.log("ini data faktur yaa ", data);
          if (data.faktur.nomor_kartu != "" && data.faktur.mst_card.kd_card != "") {
            data.faktur.harga = formatCurrency(
              "" +
                (data.faktur.mst_card.asuransi + data.faktur.mst_card.asuransi_motor + data.faktur.mst_card.harga_pokok)
            );
          }
          setFaktur(data.faktur);
        }
      },
      onError: (e) => {
        console.log("ini error ", e);
      },
    });
    reset();
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">
          Input Bayar{" "}
          {bayarApa == 1 ? "Memberhip" : bayarApa == 2 ? "Asuransi PA" : bayarApa == 3 ? "Asuransi Motor" : ""}
        </p>
        <div className="w-4/12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputBase name={"kode"} lable={"Search"} id={"kode"} register={register} disabled={false} />
          </form>
        </div>
      </div>
      <br />
      <hr />
      <br />
      {faktur?.kartu.sts_kartu == "2" && (
        <FormInputBayar defaultValues={faktur} setFaktur={setFaktur} bayarApa={bayarApa} setBayarApa={setBayarApa} />
      )}
      {message && (
        <div className="h-screen w-full pt-12 text-center">
          <p className="text-[90px]">{message}</p>
          <div className="text-[90px] text-center">🤡</div>
        </div>
      )}
    </>
  );
}
