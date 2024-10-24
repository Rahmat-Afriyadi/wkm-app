"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Datatable from "@/components/table/data-table";
import { readManyExtendBayar } from "@/server/faktur/lists";
import { formatDate } from "@/lib/utils/format-date";
import { PencilIcon } from "@heroicons/react/24/solid";
import { deleteExtendBayar } from "@/server/extend-bayar/delete-extend-bayar";
import { TrashIcon } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function TableFrame({ searchParams }) {
  const pageParams = searchParams?.page || 1;
  const router = useRouter();
  const [selected, setSelected] = useState([]);

  const queryClient = useQueryClient();
  const deleteMut = useMutation({
    mutationFn: deleteExtendBayar,
  });
  const { data, error, isLoading } = useQuery({
    queryKey: ["pengajuan-extend-bayar", searchParams],
    queryFn: async () =>
      await readManyExtendBayar({
        ...searchParams,
        search: searchParams.search_query ? searchParams.search_query : "",
      }),
  });

  if (isLoading) {
    return "Loading...";
  }

  const columns = [
    {
      header: "Nomor Mesin",
      accessorKey: "no_msn",
    },
    {
      accessorFn: (row) => row.faktur.nm_customer11,
      header: "Nama Konsumen",
      id: "nm_customer11",
    },
    {
      header: "Tanggal Actual",
      accessorFn: (row) => formatDate(new Date(row.tgl_actual_bayar)),
      id: "tgl_actual_bayar",
    },
    {
      header: "Tanggal Pengajuan",
      accessorFn: (row) => formatDate(new Date(row.tgl_pengajuan)),
      id: "tgl_pengajuan",
    },
    {
      header: "Deskripsi",
      accessorKey: "deskripsi",
    },
    {
      id: "sts_approval",
      header: "Status Approval",
      cell: ({ row }) => {
        if (row.original.sts_approval == "P") {
          return <p className="shadow-md bg-orange-400 text-center rounded-lg p-1 font-bold text-white">Pending</p>;
        } else if (row.original.sts_approval == "O") {
          return (
            <p className="shadow-md bg-green-500 text-center rounded-lg p-1 font-bold text-md text-white">Approved</p>
          );
        } else if (row.original.sts_approval == "R") {
          return <p className="shadow-md bg-red text-center rounded-lg p-1 font-bold text-md text-white">Rejected</p>;
        }
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          {/* Edit Button */}
          <PencilIcon
            className="w-7 h-6 hover:bg-slate-300 rounded-sm cursor-pointer text-blue-600"
            aria-hidden="true"
            onClick={() => router.push("/approval-extend-bayar/detail/" + row.original.id)}
          />
          <TrashIcon
            className="w-7 h-6 hover:bg-slate-300 rounded-sm text-red cursor-pointer"
            aria-hidden="true"
            onClick={() => {
              Swal.fire({
                title: "Apakah data yang dimasukan sudah benar",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#0891B2",
                cancelButtonColor: "#d33",
                confirmButtonText: "Save",
                showLoaderOnConfirm: true,
                preConfirm: () => {
                  deleteMut.mutate(
                    { id: row.original.id },
                    {
                      onSuccess: (data) => {
                        Swal.fire("Success!", "Pengajuan berhasil dihapus", "info").then(() => {
                          queryClient.invalidateQueries({ queryKey: ["pengajuan-extend-bayar"] });
                        });
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
            }}
          />
          {/* Delete Button */}
        </div>
      ),
    },
  ];

  return (
    <Datatable
      columns={columns}
      data={data?.data}
      totalRows={data?.page.total_rows}
      totalPages={1}
      currentPage={pageParams}
      setRowSelection={setSelected}
    />
  );
}
