"use client"

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import Modal from "@/components/Modal/index";
import ActionInput from "./action-input";
import { siteForm } from "./data";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import ActionCombobox from "./action-combobox";

export default function ModalFormSite({ data, type }) {
  const {data:session} = useSession()
  const [selectedOption, setselectedOption] = useState({
    name: data?.status,
    id: null
  });

  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({defaultValues: data});


  function resetModal() {
    setIsModalOpen(false)
  }

  const onSubmit = async (values) => {
    values.created_by = session?.user.name
    const user_id = values.relation_manager.id
    if(new Date(values.start_date) > new Date(values.end_date)) {
      Swal.fire("Failed!", "Start date cannot be less than end date", "error");
      return;
    }
    let titleAlert = values.id ? "Do you want to save the changes?" : "Do you want to save the record?"
    Swal.fire({
      title: titleAlert,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0891B2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          let message
          if (!values.id) {
            // await addNewSite({ ...values, user_id });
            message = "Site successfully created"
          } else {
            // await updateSite({ ...values, user_id });
            message = "Your file has been changed."
          }          
          Swal.fire(
              "Saved!",
              message,
              "success"
            ).then(() => {
              setIsModalOpen(false);
            });
        } catch (error) {
          Swal.fire("Failed!", error, "error");
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  function handleChange() {
    setIsModalOpen(!isModalOpen);
  }

 
  return (
    <>

      {type == "add" && <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:w-auto" onClick={handleChange}>
        Add New
      </button>}

      {type == "update" && <button className="text-blue-600 hover:text-blue-900" onClick={handleChange}>
        <PencilIcon className="w-6 h-5" aria-hidden="true" />
      </button>}

      

      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={resetModal}
        handleSubmit={handleSubmit(onSubmit)}
        title="Form Site">
        {/* <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4">
          {siteForm.map((item, i) => (
            <div key={i} className="sm:col-span-6">
              {item.type === "text" || item.type === "date" ? (
                <ActionInput
                  label={item.label}
                  id={item.id}
                  name={item.name}
                  type={item.type}
                  required={item.required}
                  errors={errors}
                  register={register}
                />
              ) :item.type === "combobox" ? (
                <ActionCombobox
                  label={item.label}
                  id={item.id}
                  name={item.name}
                  type={item.type}
                  options={[
                    {name:"",id:"Pilih Status"},
                    {name:"Berminat",id:"oke"},
                    {name:"Tidak Berminat",id:"not_oke"},
                    {name:"Pending",id:"pending"},
                  ]}
                  required={item.required}
                  errors={errors}
                  selectedOption={selectedOption}
                  setselectedOption={setselectedOption}
                  register={register}
                  control={control}
                />
              ) : null}
            </div>
          ))}
        </div> */}
      </Modal>
    </>
  );
}
