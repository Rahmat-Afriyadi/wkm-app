"use server";

import ListItemTicketQueue from "./list-items-ticket-queue";
import ListItemTicketUser from "./list-items-ticket-user"; // Pastikan sudah ada komponen ListItem yang sesuai
import PageFrame from "./page-frame"; // Pastikan sudah ada komponen PageFrame yang sesuai

// Fungsi utama untuk Page yang menerima params dan searchParams
export default async function Page({ params, searchParams }) {
  // Anda bisa menggunakan params atau searchParams di sini jika diperlukan
  // Misalnya, untuk melakukan API request atau query berdasarkan params

  return (
    <>
    <PageFrame>
      {/* Menyertakan ListItem dan meneruskan searchParams untuk digunakan di dalamnya */}
      <div className="overflow-y-auto max-h-96">
        
      <ListItemTicketQueue searchParams={searchParams} />
        </div> 
      <br /><br /><br /><br /><br />
      <div className="overflow-y-auto max-h-96">
        
        <ListItemTicketUser searchParams={searchParams} />
          </div> 
          <br /><br />
    </PageFrame>
  
    </>
  );
}
