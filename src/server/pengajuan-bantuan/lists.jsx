// /server/ticket-support/lists.jsx

import { AuthGetApi } from "@/lib/fetchApi";

// Fungsi untuk mengambil data user ticket tanpa parameter
export async function fetchUserTicket() {
  // Memanggil API untuk mengambil data user ticket
  const response = await AuthGetApi("/ticket-support/user-ticket");

  return {
    data: response,
  };
}

export async function fetchTicketIT() {
  // Memanggil API untuk mengambil data user ticket
  const response = await AuthGetApi("/ticket-support/it-ticket");

  return {
    data: response,
  };
}

// Fungsi untuk mengambil data dari ticket queue tanpa parameter
export async function fetchTicketQueue(month, year) {
  try {

    const queryParams = new URLSearchParams({
      month: month.toString(),
      year: year.toString(),
    });

    const response = await AuthGetApi(`/ticket-support/ticket-queue?${queryParams.toString()}`);
 
    return response;
  } catch (error) {
    console.error("Gagal mengambil data ticket queue:", error.message);
    throw error;
  }
}


