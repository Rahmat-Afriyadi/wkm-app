import { AuthGetApi } from "@/lib/fetchApi";
import { FormInputTglMerah } from "@/components/form/input-tgl-merah/form-input-tgl-bayar";

export default async function Page() {
  return (
    <>
      <p className="text-2xl font-bold mb-9">Create Tanggal Merah</p>
      <FormInputTglMerah isEditing={false} />
    </>
  );
}
