import { AuthGetApi } from "@/lib/fetchApi";
import { FormInputTglMerah } from "@/components/form/input-tgl-merah/form-input-tgl-merah";

export default async function Page({ params }) {
  const { id } = params;
  const tglMerah = await AuthGetApi("/tgl-merah/detail-tgl-merah/" + id);

  return (
    <>
      <p className="text-2xl font-bold mb-9">Detail OTR</p>
      <FormInputTglMerah isEditing={true} defaultValues={tglMerah} />
    </>
  );
}
