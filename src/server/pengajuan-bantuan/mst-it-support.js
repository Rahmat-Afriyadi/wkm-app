'use server';
import { AuthGetApi } from "@/lib/fetchApi"; // Assuming you are using a custom fetch wrapper

// Function to fetch clients from /mst-user-ts endpoint
export const MstItSupport = async () => {
  try {
    // Replace with the actual API request to fetch data
    const response = await AuthGetApi("/mst-it-support");
    // Check if the response is successful

    // if (!response.ok) {
    //   throw new Error("Failed to fetch clients");
    // }

    // Parse and return the JSON data
    // const data = await response.json();

    return response; // This should be an array of client objects
  } catch (error) {
    console.error("Error fetching IT Support:", error);
    throw error;
  }
};
