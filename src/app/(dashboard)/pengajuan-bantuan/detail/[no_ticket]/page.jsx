"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import MultipleSelect from "@/components/Input/multiple-select";
import { SelectBase } from "@/components/Input/select-base";
import { ViewTicket } from "@/server/pengajuan-bantuan/view-ticket";
import { UpdateTicket } from "@/server/pengajuan-bantuan/update-ticket-support";
import { fetchClients } from "@/server/pengajuan-bantuan/mst-client-ts";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

export default function EditTicketPage({ params }) {
  const { no_ticket } = params;
  const router = useRouter();
  const { data: session } = useSession(); 
  const [selectedClients, setSelectedClients] = useState([]);
  const [message, setMessage] = useState(null);

  const { data: ticketData, isLoading: isLoadingTicket } = useQuery({
    queryKey: ["ticket-detail", no_ticket],
    queryFn: async () => await ViewTicket(no_ticket),
  });

  const { data: options, isLoading: isLoadingClients } = useQuery({
    queryKey: ["pengajuan-bantuan"],
    queryFn: async () => await fetchClients()
  });
  const { handleSubmit, control, register, reset } = useForm();


  useEffect(() => {
    if (ticketData?.data) {
      // Fungsi untuk menangani null, string kosong dan memformat datetime
      const handleNullOrEmptyFields = (data) => {
        const defaultValues = {};
  
        for (let key in data) {
          if (data[key] == null || data[key] === "") {
            // Memeriksa null dan string kosong
            defaultValues[key] = "Belum Ditentukan";  // Nilai default untuk null atau kosong
          } else {
            // Memeriksa apakah nilai tersebut adalah datetime yang valid
            if (isValidDate(data[key])) {
              // Jika valid datetime, format tanggal
              defaultValues[key] = format(new Date(data[key]), "dd MMMM yyyy, HH:mm"); 
            } else {
              // Jika bukan datetime dan tidak memenuhi kriteria angka
              defaultValues[key] = data[key];  // Tidak diformat
            }
          }
        }
        return defaultValues;
      };
  
      // Memeriksa apakah nilai adalah datetime yang valid
      const isValidDate = (value) => {
        // Mengecek apakah value adalah string atau Date yang dapat diparsing menjadi tanggal
        const date = new Date(value);
        return value && !isNaN(date.getTime()) && !isNumeric(value); // Memastikan bukan angka yang terkonversi menjadi tanggal
      };
  
      // Memeriksa apakah nilai adalah angka (int) dengan panjang karakter tertentu
      const isNumeric = (value) => {
        return !isNaN(value) && Number(value) === parseInt(value, 10);
      };
  
      // Memperbarui data dengan nilai default dan format datetime
      const updatedData = handleNullOrEmptyFields(ticketData.data);
  
      // Mengonversi kd_user_client ke format yang diharapkan
      const clientData = ticketData.data.kd_user_client ? ticketData.data.kd_user_client.map(client => ({
        id: client.kd_user_client,
        name: client.kd_user_client,
      })) : [];
  
      // Reset form dengan data yang sudah diperbarui
      reset({ ...updatedData, kd_user_client: clientData }); // Menambahkan klien ke data yang di-reset
      setSelectedClients(clientData);  // Menambahkan klien ke data yang di-reset
    }
  }, [ticketData, reset]);

  const onSubmit = async (data) => {
    const formattedData = {
      problem: data.problem,
      status : data.status,
      jenis_ticket: data.jenis_ticket,
      kd_user_clients: selectedClients.map(client => ({ name: client.name })),
    };
    console.log(formattedData);
    const params = data.no_ticket
    try {
      const response = await UpdateTicket(formattedData, params);
      if (response.message?.toLowerCase().includes("successfully")) {
        setMessage("Ticket berhasil diperbarui!");
        setTimeout(() => router.back(), 1000);
      } else {
        setMessage("Gagal memperbarui ticket. Silakan coba lagi.");
        console.log(response);
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      setMessage("Terjadi kesalahan saat memperbarui ticket.");
    }
  };

  if (isLoadingTicket || isLoadingClients) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Edit Ticket</p>
      </div>
      <br />
      <hr />
      <br />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* No Ticket (Disabled) */}
        <div className="form-group">
          <label htmlFor="no_ticket" className="block text-sm font-medium text-gray-700">No Ticket</label>
          <input
            id="no_ticket"
            {...register("no_ticket")}
            className="mt-1 block w-full border-gray-500 rounded-md shadow-sm"
            disabled
          />
        </div>

        {/* Kd User (Disabled) */}
        <div className="form-group">
          <label htmlFor="kd_user" className="block text-sm font-medium text-gray-700">Kode User</label>
          <input
            id="kd_user"
            {...register("kd_user")}
            className="mt-1 block w-full border-gray-500 rounded-md shadow-sm"
            disabled
          />
        </div>

        {/* problem */}
        <div className="form-group">
          <label htmlFor="problem" className="block text-sm font-medium text-gray-700">Problem</label>
          <textarea
            id="problem"
            {...register("problem")}
            className="mt-1 block w-full border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
          />
        </div>

        {/* Status (Disabled) */}
        <div className="form-group">
          <SelectBase 
            name="status"
            id="status"
            lable="status" 
            register={register}
            defaultValues = {ticketData.status}
            options={[
              { name: "On Progress", value: 1 },
              { name: "Pending", value: 2 },
              { name: "Finish", value: 3 },
              { name: "Reject", value: 4 },
            ]}
            className="mt-1 block w-full border-gray-500 rounded-md shadow-sm"
            disabled
          />
        </div>

        {/* Kd User IT */}
        <div className="form-group">
          <label htmlFor="kd_user_it" className="block text-sm font-medium text-gray-700">Ditangani Oleh</label>
          <input
            id="kd_user_it"
            {...register("kd_user_it")}
            className="mt-1 block w-full border-gray-500 rounded-md shadow-sm"
            disabled
          />
        </div>

        {/* Created Date (Read-only) */}
        <div className="form-group">
          <label htmlFor="created" className="block text-sm font-medium text-gray-700">Created</label>
          <input
            id="created"
            {...register("created")}
            className="mt-1 block w-full border-gray-500 rounded-md shadow-sm"
            readOnly
          />
        </div>

        {/* Assign Date */}
        <div className="form-group">
          <label htmlFor="assign_date" className="block text-sm font-medium text-gray-700">Assign Date</label>
          <input
            id="assign_date"
            {...register("assign_date")}
            className="mt-1 block w-full border-gray-500 rounded-md shadow-sm"
            readOnly
          />
        </div>

        {/* Finish Date */}
        <div className="form-group">
          <label htmlFor="finish_date" className="block text-sm font-medium text-gray-700">Finish Date</label>
          <input
            id="finish_date"
            {...register("finish_date")}
            className="mt-1 block w-full border-gray-500 rounded-md shadow-sm"
            readOnly
          />
        </div>

        {/* Jenis Ticket Dropdown */}
        <div className="form-group">
        <label htmlFor="finish_date" className="block text-sm font-medium text-gray-700">Jenis Ticket</label>
          <SelectBase
            name="jenis_ticket"
            id="jenis_ticket"
            label="Jenis Ticket"
            defaultValues = {ticketData.jenis_ticket}
            register={register}
            options={[
              { name: "Hardware", value: "Hardware" },
              { name: "Software", value: "Software" },
              { name: "Data", value: "Data" },
            ]}
            required
          />
        </div>

        {/* Tier Ticket (Disabled) */}
        <div className="form-group">
        <label htmlFor="finish_date" className="block text-sm font-medium text-gray-700">Tier Ticket</label>
          <SelectBase
            id="tier_ticket"
            label="Tier Ticket"
            name="tier_ticket"
            register={register}
            defaultValues = {ticketData.tier_ticket}
            options={[
              { name: "Platinum", value: 1 },
              { name: "Gold", value: 2 },
              { name: "Basic", value: 3 },
            ]}
            // className="mt-1 block w-full border-gray-500 rounded-md shadow-sm"
            disabled
          />
        </div>

        {/* Solution */}
        <div className="form-group">
          <label htmlFor="solution" className="block text-sm font-medium text-gray-700">Solution</label>
          <textarea
            id="solution"
            {...register("solution")}
            className="mt-1 block w-full border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
            disabled
          />
        </div>

        {/* Nama Client Dropdown (Multiple Select) */}
        {session?.user.role == 2 && (
        <div className="form-group">
          <MultipleSelect
            optionsList={options.map((client) => ({
              id: client.name,
              name: client.name,
            }))}
            placeholder="Pilih Client"
            label="Nama Client"
            id="kd_user_client"
            name="kd_user_client"
            setValue={(name, value) => setSelectedClients(value)} 
            defaultValues={selectedClients} 
            required
          />
        </div>
        )}
        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>

      {/* Message after submission */}
      {message && (
        <div className="mt-4 text-center text-lg font-semibold">
          <p>{message}</p>
        </div>
      )}
      <br /><br />
    </div>
  );
}
