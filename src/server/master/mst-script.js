
import { AuthGetApi, PostApi } from "@/lib/fetchApi"; 
// Function to fetch clients from /mst-user-ts endpoint
export const MstScriptList = async () => {
  try {
    const response = await AuthGetApi("/mst-script/all");
    return response;
  } catch (error) {
    console.error("Error fetching List Script:", error);
    throw error;
  }
};

export const ViewScript = async (id) => {
    console.log("view script");
  if (!id) {
    throw new Error("id tidak boleh kosong.");
  }
  try {
    const endpoint = `/mst-script/detail/${id}`;
    const response = await AuthGetApi(endpoint);

    return response;
  } catch (error) {
    console.error("Error fetching Script:", error);
    throw error;
  }
};


export const CreateScript = async (data) => {
  let response = await PostApi(data, "/mst-script/create");
  console.log(data);
  return response;
};

export const UpdateScript = async (id, data) => {
  
    const endpoint = `/mst-script/update/${id}`; // Tambahkan ID ke URL
    try {
      const response = await PostApi(data, endpoint);
      return response;
    } catch (error) {
      console.error("Error saat mengupdate script:", error);
      throw error;
    }
  };
  

