"use client"


import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function ResetPassForm(){
    
    const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0891B2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      showLoaderOnConfirm: true,
      preConfirm : async () => {
        try {
          console.log(values);
          const res =  await fetch("/api/reset-password", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            console.log("ini res status ", res.status)
            if(res.status == 200 ){
                console.log("masuk sini gk")
                Swal.fire("Saved!", "Your password has been changed.", "success").then(() => {});
            }else {
                const resResult = await res.json()
                Swal.fire("Failed", resResult.message, "info").then(() => {});
            }
        } catch (error) {
          console.log(error)
          Swal.fire(
              "Failed!",
              error,
              "error"
            )
        }
      }
    });
  };
    
    
    return (
            <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
                <form action="" method="post" onSubmit={handleSubmit(onSubmit)} >
                    {/* {message != '' && <div className='bg-green-500 rounded-lg mb-4 text-white flex justify-center text-lg p-4'>
                    {message}
                </div>} */}
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                        htmlFor="password_lama"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Password Lama
                    </label>    
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                        type="text" name="password_lama" id="password_lama" 
                        {...register("password_lama", {
                            required:  "This field is required"
                        })}
                        />
                        {errors["password_lama"] && (
                            <p className="mt-2 text-sm text-red-600 font-bold text-red mb-2" id={`password-lama-error`}>
                            {errors["password_lama"].message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Password Baru
                    </label>    
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                        type="password" name="password" id="password" 
                        {...register("password", {
                            required:  "This field is required"
                        })}
                        />
                        {errors["password"] && (
                            <p className="mt-2 text-sm text-red-600 font-bold text-red mb-2" id={`password-lama-error`}>
                            {errors["password"].message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                        htmlFor="pasword_konfirmasi"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Konfirmasi Password
                    </label>    
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input className="max-w-lg pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200 cursor-pointer" 
                        type="password" id="" 
                        {...register("pasword_konfirmasi", {
                            validate: (value) =>
                            value === watch("password", "") ||
                            "The passwords do not match",
                        })}
                        />
                        {errors["pasword_konfirmasi"] && (
                            <p className="mt-2 text-sm text-red-600 font-bold text-red mb-2" id={`password-lama-error`}>
                            {errors["pasword_konfirmasi"].message}
                            </p>
                        )}
                    </div>
                </div>
                <button
                        id="button"
                        type="submit"
                        className="w-full px-6 py-2 mt-3 text-lg text-black transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-yellow hover:bg-white hover:shadow-lg focus:outline-none border-2 border-yellow"
                    >
                        Save
                </button>
                </form>
            </div>
    )
}