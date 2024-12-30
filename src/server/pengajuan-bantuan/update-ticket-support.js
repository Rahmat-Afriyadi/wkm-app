import { PostApi } from "@/lib/fetchApi";
export const UpdateTicket = async (data, params) => {
  if (!params) {
    throw new Error("no_ticket tidak boleh kosong.");
  }
try {
    const endpoint = `/ticket-support/edit/${params}`;
    const response = await PostApi(data, endpoint);

    // Debugging: Log response lengkap
    console.log("Response dari API:", response);

    if (!response) {
      throw new Error("Tidak ada data yang diterima dari API.");
    }

    return response;
  } catch (error) {
    console.error("Error pada ViewTicket:", error);
    throw error; // Lempar kembali error untuk ditangani di tempat lain
  }
  
};
