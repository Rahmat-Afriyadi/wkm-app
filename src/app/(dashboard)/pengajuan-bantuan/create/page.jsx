"use client";

import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { SelectBase } from "@/components/Input/select-base";
import MultipleSelect from "@/components/Input/multiple-select";
import { fetchClients } from "@/server/pengajuan-bantuan/mst-client-ts";  // Function to fetch clients
import { useQuery } from "@tanstack/react-query";
import {CreateTicket} from "@/server/pengajuan-bantuan/create-ticket-support"
import { useRouter } from "next/navigation"; 
import { useSession } from "next-auth/react";


export default function CreateTicketPage() {
  const { handleSubmit, control, register, reset } = useForm();
  const [selectedClients, setSelectedClients] = useState([]);
  const router = useRouter(); 
  const [message, setMessage] = useState(null); // State for submission message
  const { data: session } = useSession(); 
  const { data: options, isLoading } = useQuery({
    queryKey: ["pengajuan-bantuan"],
    queryFn: async()=>await fetchClients(),
  });

  if (isLoading) return <p>Loading...</p>;

  const onSubmit = async (data) => {
    const formattedData = {
      case: data.case,
      jenis_ticket: data.jenis_ticket,
      kd_user_clients: selectedClients.map(client => ({ name: client.name })),
    };

    try {
      const response = await CreateTicket(formattedData); // Call CreateTicket with formatted data
      if (response.message?.toLowerCase().includes("successfully")) {
        setMessage("Ticket has been created successfully!"); // Set success message
        // reset();
        // setSelectedClients([]);
        setTimeout(() => router.back(), 1000);
      } else {
        setMessage("Failed to create ticket. Please try again."); // Set error message
        console.log(response); 
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      setMessage("An error occurred while creating the ticket."); // Set error message
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Create Ticket</p>
      </div>
      <br />
      <hr />
      <br />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Case */}
        <div className="form-group">
          <label htmlFor="case" className="block text-sm font-medium text-gray-700">Case</label>
          <textarea
            id="case"
            {...register("case", { required: "Case is required" })}
            className="mt-1 block w-full border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
          />
        </div>

        {/* Jenis Ticket Dropdown */}
        <div className="form-group">
          <SelectBase
            name="jenis_ticket"
            id="jenis_ticket"
            lable="Jenis Ticket" 
            register={register}
            options={[
                  { name: "Hardware", value: "Hardware" },
                  { name: "Software", value: "Software" },
                  { name: "Data", value: "Data" },
                ]}
            required
          />
        </div>

        {/* Nama Client Dropdown (Multiple Select) */}
        {session?.user.role == 2 && (
        <div className="form-group">  
              <MultipleSelect
                optionsList={options.map(client => ({ name: client.name, id: client.name }))}
                placeholder = 'Pilih Client'
                label = 'Nama Client'
                id = 'kd_user_client'
                name = 'kd_user_client'
                setValue={(name, value) => setSelectedClients(value)} 
                defaultValues={selectedClients} 
              />
        </div>
        )}
        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Message after submission */}
      {message && (
        <div className="mt-4 text-center text-lg font-semibold">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}