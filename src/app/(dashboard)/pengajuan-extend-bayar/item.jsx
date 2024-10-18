"use client";

import { PencilIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
import { deleteTanggalMerah } from "@/server/tanggal-merah/delete-tanggal-merah";
import Swal from "sweetalert2";
import { formatDate } from "@/lib/utils/format-date";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Asuransi = ({ site, id }) => {
  const router = useRouter();

  const queryCLient = useQueryClient();
  const deleteMut = useMutation({
    mutationFn: deleteTanggalMerah,
  });

  if (site) {
    return (
      <>
        <tr key={site.id} className={classNames("hover:text-yellow hover:bg-black", id % 2 === 0 ? " " : "bg-gray-50")}>
          <td className="px-3 py-4 text-sm whitespace-nowrap">{formatDate(new Date(site.tgl_awal))}</td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">{formatDate(new Date(site.tgl_akhir))}</td>
          <td className="px-3 py-4 text-sm whitespace-nowrap">{site.deskripsi}</td>
          <td className="px-2 py-4 text-sm whitespace-nowrap cursor-pointer">
            <span className="text-blue-600 flex">
              <PencilIcon
                className="w-7 h-6 hover:bg-slate-300 rounded-sm"
                aria-hidden="true"
                onClick={() => router.push("/input-tanggal-merah/detail/" + site.id)}
              />
              <TrashIcon
                className="w-7 h-6 hover:bg-slate-300 rounded-sm text-red"
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
                        { id: site.id },
                        {
                          onSuccess: (data) => {
                            Swal.fire("Success!", "Tanggal Merah berhasil ditambahkan", "info").then(() => {
                              router.refresh();
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
            </span>
          </td>
        </tr>
      </>
    );
  } else return null;
};

const memoizedSite = memo(Asuransi);

export default memoizedSite;
