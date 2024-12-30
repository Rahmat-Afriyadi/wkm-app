import { AuthGetApi } from "@/lib/fetchApi";

export const ViewTicket = async (no_ticket) => {
  console.log("No Ticket",no_ticket);
  if (!no_ticket) {
    throw new Error("no_ticket tidak boleh kosong.");
  }

  try {
    const endpoint = `/ticket-support/view/${no_ticket}`;
    const response = await AuthGetApi(endpoint);

    // Debugging: Log response lengkap
    console.log("Response dari API:", response);

    if (!response) {
      throw new Error("Tidak ada data yang diterima dari API.");
    }

    return { data: response };
  } catch (error) {
    console.error("Error pada ViewTicket:", error);
    throw error; // Lempar kembali error untuk ditangani di tempat lain
  }
};

