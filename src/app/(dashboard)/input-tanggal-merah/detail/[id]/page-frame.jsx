"use client";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputForm from "@/components/Input/input-form";
import { form } from "./form";
import { useRouter } from "next/navigation";
import { revalidateTag } from "next/cache";

export default function PageFrame({ otr }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: otr });

  const router = useRouter();

  const onSubmit = async (values) => {
    values.id = otr.id;
    values.otr = parseInt(values.otr);
    values.tahun = parseInt(values.tahun);

    Swal.fire({
      title: "Do you want to save the record?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0891B2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const res = await fetch("/api/tgl-merah/update", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          if (res.status == 200) {
            const message = await res.json();
            Swal.fire({
              title: "Info",
              text: message.message,
              icon: "info",
              preConfirm: () => {
                router.back();
              },
            });
          }
        } catch (error) {
          Swal.fire("Failed!", error.message, "error");
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="-mx-3 mb-6 w-full grid grid-cols-12">
          {form.map((e) => {
            return (
              <InputForm
                disabled={e.disabled}
                key={e.id}
                name={e.name}
                title={e.title}
                type={e.type}
                id={e.id}
                register={register}
              />
            );
          })}
        </div>

        <br />

        <button
          id="button"
          type="submit"
          className="w-full mb-14 px-6 py-1 mt-2 text-lg text-black transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-yellow hover:bg-white hover:shadow-lg focus:outline-none border-2 border-yellow"
        >
          Save
        </button>
      </form>
    </>
  );
}
