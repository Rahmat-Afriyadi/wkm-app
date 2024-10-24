import { AuthGetApi } from "@/lib/fetchApi";
import { FormInputExtendBayar } from "@/components/form/extend-bayar/form-input-extend-bayar";

export default async function Page({ params }) {
  const { id } = params;
  const extendBayar = await AuthGetApi("/extend-bayar/detail-extend-bayar/" + id);

  return (
    <>
      <p className="text-2xl font-bold mb-9">Detail Pengajuan Extend Bayar</p>
      <FormInputExtendBayar isEditing={true} defaultValues={extendBayar.faktur} />
    </>
  );
}
