"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Search from "@/components/Search/index";
import TableFrame from "./table-frame";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApprovalLf } from "@/server/extend-bayar/update-lf-approval-extend-bayar";
import Swal from "sweetalert2";

export default function PageFrame({ searchParams }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { register, handleSubmit, watch } = useForm();
  const [selected, setSelected] = useState({ rows: [] });
  const stsApprovalSelected = watch("sts_approval", "");
  const [statusApproval, setstatusApproval] = useState(searchParams.sp ? searchParams.sp : "");

  const [value, setValue] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("tgl1", "");
    params.set("tgl2", "");
    params.set("sa", "P");
    replace(`${pathname}?${params}`);
    setstatusApproval("P");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleValueChange = (newValue) => {
    const params = new URLSearchParams(searchParams);
    if (newValue.startDate != null && newValue.endDate) {
      params.set("tgl1", newValue.startDate);
      params.set("tgl2", newValue.endDate);
      replace(`${pathname}?${params}`);
    } else {
      params.set("tgl1", "");
      params.set("tgl2", "");
      replace(`${pathname}?${params}`);
    }
    setValue(newValue);
  };

  const queryClient = useQueryClient();
  const mutExtendBayar = useMutation({
    mutationFn: updateApprovalLf,
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
        mutExtendBayar.mutate(
          {
            sts_approval: values.sts_approval,
            datas: [
              ...selected?.rows.map((e) => {
                return { id: e.original.id };
              }),
            ],
          },
          {
            onSuccess: (data) => {
              queryClient.invalidateQueries({ queryKey: ["pengajuan-extend-bayar"] });
              if (data.status == "fail") {
                Swal.fire("Failed!", data.message, "info");
              } else if (data.status == "success") {
                Swal.fire("Success!", data.message, "success");
              }
              setSelected(false);
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
      <div className="grid mb-6 md:grid-cols-12">
        <div className="col-span-10 mr-2 mt-2 flex justify-start items-end ">
          <Search id="search-query" name="search_query" placeholder={"Search..."} />
          <div className="w-5"></div>
          <div className="w-3/12 flex items-end">
            <select
              value={statusApproval}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams);
                params.set("sa", e.target.value);
                replace(`${pathname}?${params}`);
                setstatusApproval(e.target.value);
              }}
              className={
                "block w-full border-gray-300 rounded-md cursor-pointer disabled:cursor-not-allowed focus:ring-cyan-500 focus:border-cyan-500 pl-4 sm:text-sm"
              }
            >
              <option value={"all"} className=" py-1 cursor-pointer">
                All
              </option>
              <option value={"P"} className=" py-1 cursor-pointer">
                Pending
              </option>
              <option value={"O"} className=" py-1 cursor-pointer">
                Approval
              </option>
              <option value={"R"} className=" py-1 cursor-pointer">
                Rejected
              </option>
            </select>
          </div>
          <div className="w-5"></div>
          <div className="w-6/12">
            <Datepicker
              id={"range_tgl_merah"}
              toggleClassName="absolute rounded-r-lg -top-0 right-0 h-full px-3 text-black focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
              inputClassName="block w-full border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 pl-4 sm:text-sm"
              name={"range_tgl_merah"}
              value={value}
              primaryColor={"amber"}
              onChange={handleValueChange}
            />
          </div>
          <div className="w-5"></div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-10/12 grid grid-cols-12 gap-x-4">
            <div className="col-span-6 flex items-end">
              <select
                disabled={selected?.rows?.length < 1}
                {...register("sts_approval")}
                id={"bulk_updated"}
                className={
                  "block w-full border-gray-300 rounded-md cursor-pointer disabled:cursor-not-allowed focus:ring-cyan-500 focus:border-cyan-500 pl-4 sm:text-sm"
                }
              >
                <option value={""} className="py-1 cursor-pointer">
                  Update all selected data
                </option>
                <option value={"R"} className="py-1 cursor-pointer">
                  Reject all selected data
                </option>
                <option value={"O"} className="py-1 cursor-pointer">
                  Approved all selected data
                </option>
              </select>
            </div>
            <div className="col-span-6 flex items-end">
              <button
                id="button"
                disabled={selected?.rows?.length < 1 || stsApprovalSelected == ""}
                type="submit"
                className="mr-2 w-full bg-yellow disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed border-yellow focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            {/* <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">{children}</div> */}
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <Suspense key={searchParams}>
                <TableFrame searchParams={searchParams} setSelected={setSelected} selected={selected} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
